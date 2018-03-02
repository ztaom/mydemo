import ControlBar from './control/control-bar.js';
import Danmaku from './danmaku/play.js';
import mergeOptions from './utils/merge.js';
import HTML5 from './html5.js';
import Emitter from './utils/emitter.js';
import Log from './utils/log.js';
import userBrowser from './utils/brower.js';
import * as Dom from './utils/dom.js';
import * as Guid from './utils/guid.js';
import * as Events from './utils/events.js';
import * as WindVane from '@ali/lib-windvane';
import * as Env from 'amfe-env';

//import videoStyle from "./cssrem/video.css";
//import videoStyle from "./css/video.css";

const Hls = window.Hls;

class Player extends Emitter {
  /**
   * player's constructor function
   *
   * @constructs
   * @param {Element} tag        The original video tag used for configuring options
   * @param {Object=} options    Player options
   */
  constructor(tag, options) {

    super();

    tag.id = this.id_ = tag.id || `v_video_${Guid.newGUID()}`;

    this.tag = tag || Dom.$('.lib-video');

    this.tagAttributes = tag && Dom.getElAttributes(tag);

    this.options_ = mergeOptions(this.options_, options, Player.getTagSettings(tag), this.tagAttributes);

    if (this.options_.live !== undefined) {
      this.options_.live = true;
    }

    this.parentEl_ = this.tag.parentNode;

    this.el_ = this.createEl();

    this.startPlayEl = Dom.$('.vjs-center-start', this.el_);

    Dom.removeElClass(this.el_, 'vjs-hidden');

    this.init();
  }

  init(isReload) {
    // flash live not support Event/API
    if (this.playerType == 'flash') return;

    this.bindEvent();

    // play danmaku
    if (this.options_.danmakuPlayerList) {
      this.danmakuPlay = new Danmaku(this);
    }

    if (this.options_['custom-controls'] !== 'false') {
      // new ControlBar
      !isReload && (this.controlBar = this.getControlBar());
      // new HTML5
      this.videoPlayer = this.getVideoPlayer();

      this.controlBar.setPlayer(this.videoPlayer);
    } else {
      // new HTML5
      this.videoPlayer = this.getVideoPlayer();
    }

    this.autoPlay();
  }

  autoPlay() {
    let that = this;

    that.videoPlayer.load();

    if (that.options_.autoplay && !Env.os.isAndroid && !Env.browser.isSafari && Env.os.version.gte('10.0')) {
      that.play();
    }

    // if(WindVane.isAvailable){
    //   window.WindVane.call('TBBase', 'getNetworkStatus', {}, function(e) {
    //     if(e.network === 'wifi' && !Env.os.isAndroid && that.options_.autoplay){
    //       that.play();
    //     }
    //   });
    // }
    // else if(that.options_.autoplay){
    //   that.play();
    // }
  }

  bindEvent(isReload) {
    let videoDomParent = Dom.$('video', this.el_).parentNode;
    let that = this;

    videoDomParent.addEventListener('touchend', ev => this.triggerPlayerClick_(ev), true);
    videoDomParent.addEventListener('click', ev => this.triggerPlayerClick_(ev), true);
    videoDomParent.addEventListener('touchmove', ev => this.preventTouch_(ev), true);

    !isReload && this.startPlayEl.addEventListener('click', ev => this.triggerStartPlayerClick_(ev));

    !isReload && this.on('video:error', this.error);
    // timeupdate is ready play
    !isReload && this.on('video:timeupdate', this.startPlay);
    !isReload && this.on('video:pause', this.triggerPausePlay)
  }

  getVideoPlayer() {
    if (this.playerType === 'flash') {
      // flash not support global API
      return {};
    } else if (this.playerType === 'html5') {
      return new HTML5(this);
    }
  }

  getControlBar() {
    return new ControlBar(this);
  }

  createEl() {
    let formats = this.options_.sources;
    let currentSource;
    let attrSrc = this.options_.src;

    // pc terminal && not safari
    if (!Env.os.isIOS &&
      !Env.os.isAndroid &&
      userBrowser() !== 'Safari'
    ) {
      this.playerType = 'flash';
      currentSource = formats['rtmp/flv'] || formats['application/x-mpegURL'];

      if (!currentSource && (currentSource = formats['video/mp4'])) {
        this.playerType = 'html5';

        this.currentSrc = currentSource.src;

        return this.html5El(this.currentSrc);
      } else if (!currentSource) {
        this.playerType = 'html5';
        console.error('Live video need to set up application/x-mpegURL properties');
        return this.html5El();
      }

      this.currentSrc = currentSource.src;
      // flash live use flv
      return this.flashEl(this.currentSrc);
    }
    // mobile terminal && support Hls
    else if (!currentSource &&
      Hls &&
      Hls.isSupported() &&
      formats['application/x-mpegURL'] &&
      !Env.os.isIOS &&
      !Env.os.isAndroid &&
      userBrowser() !== 'Safari'
    ) {
      this.playerType = 'html5';
      this.currentSrc = formats['application/x-mpegURL'].src;
      this.isDecodeHls = true;
      return this.html5El(this.currentSrc);
    }
    // mobile terminal && live
    else if (this.options_.live) {
      this.playerType = 'html5';

      if (!formats['application/x-mpegURL']) {
        console.error('Live video need to set up application/x-mpegURL properties');
        return this.html5El();
      } else {
        this.currentSrc = formats['application/x-mpegURL'].src;
        return this.html5El(this.currentSrc);
      }
    }
    // mobile terminal && video
    else {
      this.playerType = 'html5';

      if (!(currentSource = formats['video/mp4'] || formats['application/x-mpegURL'])) {
        if (attrSrc) {
          return this.html5El(attrSrc);
        } else {
          console.error('video need to set up src properties');
          return this.html5El();
        }
      } else {
        this.currentSrc = currentSource.src;
      }

      return this.html5El(currentSource.src);
    }
  }

  flashEl(src, removeEl) {

    let playerSkin = '1';
    let isLive = '0';
    let isAutoPlay = '0';

    if (this.options_['custom-controls'] == 'false') {
      playerSkin = '0'
    }

    if (this.options_.live) {
      isLive = '1';
    }

    if (this.options_.autoplay || this.options_.live) {
      isAutoPlay = '1';
    }

    let tag = this.tag;
    let el = Dom.createEl('div', {
      className: 'vjs-flash-container',
      innerHTML: `
        <object width="100%" height="100%" type="application/x-shockwave-flash" data="https://g.alicdn.com/de/prismplayer-flash/1.2.7/PrismPlayer.swf?from=ataLive&autoPlay=${isAutoPlay}&playerSkin=${playerSkin}&isLive=${isLive}&vurl=${src}">
         <param name="wmode" value="transparent">
         <param name="allowScriptAccess" value="always">
         <param name="allowFullScreen" value="true">
         <param name="allowNetworking" value="all">
         <param name="wmode" value="opaque">
         <param name="menu" value="false">
         <param name="flashvars" value="image=${this.options_.poster}" />
         <param name="bgcolor" value="#000000">
        </object>
      `
        // innerHTML : `
        //   <object codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="100%" height="100%">
        //    <param name="wmode" value="transparent">
        //    <param name="FlashVars" value="from=prism_aliyun&autoPlay=${isAutoPlay}&playerSkin=${playerSkin}&isLive=${isLive}&vurl=${src}">
        //    <param name="allowScriptAccess" value="always">
        //    <param name="allowFullScreen" value="true">
        //    <param name="allowNetworking" value="all">
        //    <param name="wmode" value="opaque">
        //    <param name="menu" value="false">
        //    <param name="bgcolor" value="#000000">
        //    <embed src="//g.alicdn.com/de/prismplayer-flash/1.2.7/PrismPlayer.swf" quality="high" pluginspage="//www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true" allowfullscreeninteractive="true" wmode="opaque" flashvars="autoPlay=1&from=prism_aliyun&isInner=0&actRequest=1&vid=undefined&domain=//tv.taobao.com&statisticService=//videocloud.cn-hangzhou.log.aliyuncs.com/logstores/player/track&videoInfoService=/player/json/getBaseVideoInfo.do&disablePing=0&namespace=prism-player-FE094E36-F915-4F14-AFB1-2636F2FE0E61&barMode=1&isLive=1&waterMark=&vurl=http%3A%2F%2Ftbflive.alicdn.com%2Fmediaplatform%2Fb7b6683a-d1d7-4526-938e-19e1fac6f98a.flv%3Fauth_key%3D1481268866-0-0-b18ecbcf5d2ac2ba7dbb3a7cca60c9d3&plugins=&snapShotShow=0&accessId=&accessKey=&stsToken=&domainRegion=&authInfo=&formats=&notShowTips=0&showBarTime=0&encryp=&secret="/>
        //   </object>
        // `
    });

    this.copyElAttr(el);
    this.parentEl_.removeChild(removeEl || tag);
    Dom.appendContent(this.parentEl_, el);
    Dom.removeElClass(el, 'vjs-hidden');
    return el;
  }

  html5El(src) {
    let el = this.el_ = Dom.createEl('div');
    let videoEL = Dom.createEl('video');
    let tag = this.tag;
    let width = tag.style.width;
    let height = tag.style.height;
    let poster = tag.poster;
    let centerBtnEl = Dom.createEl('div', {
      className: 'vjs-center-container',
      innerHTML: `
        <button class="vjs-center-load vjs-button" role="button" type="button">
          <span class="vjs-control-text">Load</span>
        </button>
        <button class="vjs-center-start vjs-button" role="button" type="button">
          <span class="vjs-control-text">start</span>
        </button>
      `
    });

    let mockMaskEl = Dom.createEl('div', {
      className: 'vjs-mock-mask'
    });

    let mockUCPoster = Dom.createEl('div', {
      className: 'vjs-center-poster'
    });

    mockUCPoster.style.backgroundImage = 'url(' + poster + ')';

    this.copyElAttr(el);
    this.copyVideoElAttr(videoEL, tag);

    videoEL.playerId = tag.id;
    videoEL.id += '_html5_api';
    videoEL.className = 'v-tech';
    videoEL.player = el.player = this;

    if (src) {
      videoEL.src = src;
    }
    videoEL.poster = '';
    videoEL.setAttribute('playsinline', 'playsinline');
    videoEL.setAttribute('webkit-playsinline', 'webkit-playsinline');

    Dom.appendContent(el, centerBtnEl);
    Dom.appendContent(el, mockMaskEl);

    //if(this.checkUC()){
    // UC mock poster
    Dom.appendContent(el, mockUCPoster);
    //}

    if (tag.parentNode) {
      tag.parentNode.replaceChild(videoEL, tag);
      videoEL.parentNode.insertBefore(el, videoEL);
    }

    Dom.insertElFirst(videoEL, el);

    this.tag = videoEL;

    return el;
  }

  copyElAttr(el) {
    const attrs = Dom.getElAttributes(this.tag);
    Object.getOwnPropertyNames(attrs).forEach(function(attr) {
      if (attr === 'class') {
        el.className += ' ' + attrs[attr];
      }
    });
  }

  copyVideoElAttr(newel, oldel) {
    const attrs = Dom.getElAttributes(oldel);
    Dom.setElAttributes(newel, attrs);
  }

  startPlay(e) {
    if (this.startPlayed) {
      return;
    }

    let posterNode = Dom.$('.vjs-center-poster', this.el_);
    let exe = () => {

      Log('Player::startPlay()');
      Dom.addElClass(this.el_, 'vjs-has-started');
      Dom.removeElClass(this.el_, 'vjs-has-paused');
      posterNode && Dom.addElClass(posterNode, 'vjs-hidden');
      this.controlBar && this.controlBar.emit('video:realPlay');
      this.startPlayed = true;
      this.videoLoading = false;
    }

    exe();

    // this.emit('video:play');
  }

  triggerPlayerClick_(e) {
    // this.touchend = false;
    if (
      e.target.nodeName.toUpperCase() !== 'VIDEO' &&
      e.target.className !== 'vjs-danmaku-container'
    ) {
      return;
    }

    if (e.type == 'touchend') {
      this.touchend = true;
    }

    // support pc && hack uc fullscreen
    if (e.type == 'click' && this.touchend) {
      return;
    }

    if (!this.checkUC()) {
      //e && e.preventDefault();
    }

    Log('Player::triggerPlayerClick_()');

    this.controlBar && this.controlBar.triggerShowHideBar();
  }

  triggerStartPlayerClick_(e) {
    e && e.preventDefault();
    Log('Player::triggerStartPlayerClick_()');

    let targetDom = (e && e.target) || this.startPlayEl;

    Dom.addElClass(targetDom.parentNode, 'loading');

    this.videoLoading = true;

    this.videoPlayer.play();
  }

  triggerPausePlay() {
    let parentNode = this.startPlayEl.parentNode;
    Dom.removeElClass(this.startPlayEl.parentNode, 'loading');
    this.videoLoading = false;

    Dom.removeElClass(this.el_, 'vjs-has-started');
    Dom.addElClass(this.el_, 'vjs-has-paused');
    setTimeout(() => {
      this.startPlayed = false;
    }, 100);
  }

  checkUC() {
    let uc = navigator.userAgent.match(/UCBrowser/);

    if (Env.aliapp && uc) {
      return true;
    } else {
      return false;
    }
  }

  preventTouch_(e) {
    //e.preventDefault();
  }

  error() {
    Dom.addElClass(this.el_, 'vjs-error');

    Dom.removeElClass(this.startPlayEl.parentNode, 'loading');

    this.videoLoading = false;
  }

  /**
   * Gets tag settings
   *
   * @param {Element} tag The player tag
   * @return {Array} An array of sources and track objects
   * @static
   * @method getTagSettings
   */
  static getTagSettings(tag) {
    let baseOptions = {
      'sources': {}
    };

    const tagOptions = Dom.getElAttributes(tag);

    // Get tag children settings
    if (tag.hasChildNodes()) {
      const children = tag.childNodes;

      for (let i = 0, j = children.length; i < j; i++) {
        const child = children[i];
        const childName = child.nodeName.toLowerCase();
        if (childName === 'source') {
          baseOptions.sources[child.type] = child;
        }
      }
    }

    return baseOptions;
  }

  enterFullscreen() {
    this.fullscreen = true;
    this.controlBar && this.controlBar.fullscreenButton();
  }

  exitFullscreen() {
    if (this.fullscreen) {
      return;
    }
    this.fullscreen = false;
    this.controlBar && this.controlBar.fullscreenButton();
  }

  pause() {
    this.videoPlayer.pause();
  }

  play() {
    if (this.playerType === 'flash') {
      this.reloadFlash_();
    } else if (this.playerType === 'html5') {
      this.triggerStartPlayerClick_();
    }
  }

  stop() {
    if (this.playerType === 'html5') {
      this.videoPlayer.stop();
    }
  }

  getVideoEl() {
    return this.tag;
  }

  removeVideoEl() {
    // return this.el_.remove(); 
    this.videoPlayer.pause();
    this.el_.remove();
  }

  setTimelineTag(time) {
    return this.controlBar.controlProgress.setTimeline(time);
  }

  reload(src) {
    if (this.playerType === 'flash') {
      this.reloadFlash_(src);
    } else if (this.playerType === 'html5') {
      this.reloadHtml5_(src);
    }
  }

  reloadFlash_(src) {
    this.flashEl(src || this.currentSrc, Dom.$('.vjs-flash-container', this.el_.parentEl_));
  }

  reloadHtml5_(src) {
    if (!this.videoPlayer.el_) {
      console.error('Unable to find a video element');
      return;
    }

    if (src) {
      this.currentSrc = src;
    }

    if (this.currentSrc) {
      this.videoPlayer.setSrc(this.currentSrc)
    }

    this.videoPlayer.load();
    this.videoPlayer.currentTime = 0;

    if (this.startPlayed) {
      this.triggerStartPlayerClick_();
    } else if (!Env.os.isAndroid && this.options_.autoplay) {
      this.triggerStartPlayerClick_();
    }
  }
}

export default Player;
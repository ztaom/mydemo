'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controlBar = require('./control/control-bar.js');

var _controlBar2 = _interopRequireDefault(_controlBar);

var _play = require('./danmaku/play.js');

var _play2 = _interopRequireDefault(_play);

var _merge = require('./utils/merge.js');

var _merge2 = _interopRequireDefault(_merge);

var _html = require('./html5.js');

var _html2 = _interopRequireDefault(_html);

var _emitter = require('./utils/emitter.js');

var _emitter2 = _interopRequireDefault(_emitter);

var _log = require('./utils/log.js');

var _log2 = _interopRequireDefault(_log);

var _brower = require('./utils/brower.js');

var _brower2 = _interopRequireDefault(_brower);

var _dom = require('./utils/dom.js');

var Dom = _interopRequireWildcard(_dom);

var _guid = require('./utils/guid.js');

var Guid = _interopRequireWildcard(_guid);

var _events = require('./utils/events.js');

var Events = _interopRequireWildcard(_events);

var _libWindvane = require('@ali/lib-windvane');

var WindVane = _interopRequireWildcard(_libWindvane);

var _amfeEnv = require('amfe-env');

var Env = _interopRequireWildcard(_amfeEnv);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import videoStyle from "./cssrem/video.css";
//import videoStyle from "./css/video.css";

var Hls = window.Hls;

var Player = function (_Emitter) {
  _inherits(Player, _Emitter);

  /**
   * player's constructor function
   *
   * @constructs
   * @param {Element} tag        The original video tag used for configuring options
   * @param {Object=} options    Player options
   */
  function Player(tag, options) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this));

    tag.id = _this.id_ = tag.id || 'v_video_' + Guid.newGUID();

    _this.tag = tag || Dom.$('.lib-video');

    _this.tagAttributes = tag && Dom.getElAttributes(tag);

    _this.options_ = (0, _merge2.default)(_this.options_, options, Player.getTagSettings(tag), _this.tagAttributes);

    if (_this.options_.live !== undefined) {
      _this.options_.live = true;
    }

    _this.parentEl_ = _this.tag.parentNode;

    _this.el_ = _this.createEl();

    _this.startPlayEl = Dom.$('.vjs-center-start', _this.el_);

    Dom.removeElClass(_this.el_, 'vjs-hidden');

    _this.init();
    return _this;
  }

  _createClass(Player, [{
    key: 'init',
    value: function init(isReload) {
      // flash live not support Event/API
      if (this.playerType == 'flash') return;

      this.bindEvent();

      // play danmaku
      if (this.options_.danmakuPlayerList) {
        this.danmakuPlay = new _play2.default(this);
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
  }, {
    key: 'autoPlay',
    value: function autoPlay() {
      var that = this;

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
  }, {
    key: 'bindEvent',
    value: function bindEvent(isReload) {
      var _this2 = this;

      var videoDomParent = Dom.$('video', this.el_).parentNode;
      var that = this;

      videoDomParent.addEventListener('touchend', function (ev) {
        return _this2.triggerPlayerClick_(ev);
      }, true);
      videoDomParent.addEventListener('click', function (ev) {
        return _this2.triggerPlayerClick_(ev);
      }, true);
      videoDomParent.addEventListener('touchmove', function (ev) {
        return _this2.preventTouch_(ev);
      }, true);

      !isReload && this.startPlayEl.addEventListener('click', function (ev) {
        return _this2.triggerStartPlayerClick_(ev);
      });

      !isReload && this.on('video:error', this.error);
      // timeupdate is ready play
      !isReload && this.on('video:timeupdate', this.startPlay);
      !isReload && this.on('video:pause', this.triggerPausePlay);
    }
  }, {
    key: 'getVideoPlayer',
    value: function getVideoPlayer() {
      if (this.playerType === 'flash') {
        // flash not support global API
        return {};
      } else if (this.playerType === 'html5') {
        return new _html2.default(this);
      }
    }
  }, {
    key: 'getControlBar',
    value: function getControlBar() {
      return new _controlBar2.default(this);
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      var formats = this.options_.sources;
      var currentSource = void 0;
      var attrSrc = this.options_.src;

      // pc terminal && not safari
      if (!Env.os.isIOS && !Env.os.isAndroid && (0, _brower2.default)() !== 'Safari') {
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
      else if (!currentSource && Hls && Hls.isSupported() && formats['application/x-mpegURL'] && !Env.os.isIOS && !Env.os.isAndroid && (0, _brower2.default)() !== 'Safari') {
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
  }, {
    key: 'flashEl',
    value: function flashEl(src, removeEl) {

      var playerSkin = '1';
      var isLive = '0';
      var isAutoPlay = '0';

      if (this.options_['custom-controls'] == 'false') {
        playerSkin = '0';
      }

      if (this.options_.live) {
        isLive = '1';
      }

      if (this.options_.autoplay || this.options_.live) {
        isAutoPlay = '1';
      }

      var tag = this.tag;
      var el = Dom.createEl('div', {
        className: 'vjs-flash-container',
        innerHTML: '\n        <object width="100%" height="100%" type="application/x-shockwave-flash" data="https://g.alicdn.com/de/prismplayer-flash/1.2.7/PrismPlayer.swf?from=ataLive&autoPlay=' + isAutoPlay + '&playerSkin=' + playerSkin + '&isLive=' + isLive + '&vurl=' + src + '">\n         <param name="wmode" value="transparent">\n         <param name="allowScriptAccess" value="always">\n         <param name="allowFullScreen" value="true">\n         <param name="allowNetworking" value="all">\n         <param name="wmode" value="opaque">\n         <param name="menu" value="false">\n         <param name="flashvars" value="image=' + this.options_.poster + '" />\n         <param name="bgcolor" value="#000000">\n        </object>\n      '
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
  }, {
    key: 'html5El',
    value: function html5El(src) {
      var el = this.el_ = Dom.createEl('div');
      var videoEL = Dom.createEl('video');
      var tag = this.tag;
      var width = tag.style.width;
      var height = tag.style.height;
      var poster = tag.poster;
      var centerBtnEl = Dom.createEl('div', {
        className: 'vjs-center-container',
        innerHTML: '\n        <button class="vjs-center-load vjs-button" role="button" type="button">\n          <span class="vjs-control-text">Load</span>\n        </button>\n        <button class="vjs-center-start vjs-button" role="button" type="button">\n          <span class="vjs-control-text">start</span>\n        </button>\n      '
      });

      var mockMaskEl = Dom.createEl('div', {
        className: 'vjs-mock-mask'
      });

      var mockUCPoster = Dom.createEl('div', {
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
  }, {
    key: 'copyElAttr',
    value: function copyElAttr(el) {
      var attrs = Dom.getElAttributes(this.tag);
      Object.getOwnPropertyNames(attrs).forEach(function (attr) {
        if (attr === 'class') {
          el.className += ' ' + attrs[attr];
        }
      });
    }
  }, {
    key: 'copyVideoElAttr',
    value: function copyVideoElAttr(newel, oldel) {
      var attrs = Dom.getElAttributes(oldel);
      Dom.setElAttributes(newel, attrs);
    }
  }, {
    key: 'startPlay',
    value: function startPlay(e) {
      var _this3 = this;

      if (this.startPlayed) {
        return;
      }

      var posterNode = Dom.$('.vjs-center-poster', this.el_);
      var exe = function exe() {

        (0, _log2.default)('Player::startPlay()');
        Dom.addElClass(_this3.el_, 'vjs-has-started');
        Dom.removeElClass(_this3.el_, 'vjs-has-paused');
        posterNode && Dom.addElClass(posterNode, 'vjs-hidden');
        _this3.controlBar && _this3.controlBar.emit('video:realPlay');
        _this3.startPlayed = true;
        _this3.videoLoading = false;
      };

      exe();

      // this.emit('video:play');
    }
  }, {
    key: 'triggerPlayerClick_',
    value: function triggerPlayerClick_(e) {
      // this.touchend = false;
      if (e.target.nodeName.toUpperCase() !== 'VIDEO' && e.target.className !== 'vjs-danmaku-container') {
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

      (0, _log2.default)('Player::triggerPlayerClick_()');

      this.controlBar && this.controlBar.triggerShowHideBar();
    }
  }, {
    key: 'triggerStartPlayerClick_',
    value: function triggerStartPlayerClick_(e) {
      e && e.preventDefault();
      (0, _log2.default)('Player::triggerStartPlayerClick_()');

      var targetDom = e && e.target || this.startPlayEl;

      Dom.addElClass(targetDom.parentNode, 'loading');

      this.videoLoading = true;

      this.videoPlayer.play();
    }
  }, {
    key: 'triggerPausePlay',
    value: function triggerPausePlay() {
      var _this4 = this;

      var parentNode = this.startPlayEl.parentNode;
      Dom.removeElClass(this.startPlayEl.parentNode, 'loading');
      this.videoLoading = false;

      Dom.removeElClass(this.el_, 'vjs-has-started');
      Dom.addElClass(this.el_, 'vjs-has-paused');
      setTimeout(function () {
        _this4.startPlayed = false;
      }, 100);
    }
  }, {
    key: 'checkUC',
    value: function checkUC() {
      var uc = navigator.userAgent.match(/UCBrowser/);

      if (Env.aliapp && uc) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'preventTouch_',
    value: function preventTouch_(e) {
      //e.preventDefault();
    }
  }, {
    key: 'error',
    value: function error() {
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

  }, {
    key: 'enterFullscreen',
    value: function enterFullscreen() {
      this.fullscreen = true;
      this.controlBar && this.controlBar.fullscreenButton();
    }
  }, {
    key: 'exitFullscreen',
    value: function exitFullscreen() {
      if (this.fullscreen) {
        return;
      }
      this.fullscreen = false;
      this.controlBar && this.controlBar.fullscreenButton();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.videoPlayer.pause();
    }
  }, {
    key: 'play',
    value: function play() {
      if (this.playerType === 'flash') {
        this.reloadFlash_();
      } else if (this.playerType === 'html5') {
        this.triggerStartPlayerClick_();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.playerType === 'html5') {
        this.videoPlayer.stop();
      }
    }
  }, {
    key: 'getVideoEl',
    value: function getVideoEl() {
      return this.tag;
    }
  }, {
    key: 'removeVideoEl',
    value: function removeVideoEl() {
      // return this.el_.remove(); 
      this.videoPlayer.pause();
      this.el_.remove();
    }
  }, {
    key: 'setTimelineTag',
    value: function setTimelineTag(time) {
      return this.controlBar.controlProgress.setTimeline(time);
    }
  }, {
    key: 'reload',
    value: function reload(src) {
      if (this.playerType === 'flash') {
        this.reloadFlash_(src);
      } else if (this.playerType === 'html5') {
        this.reloadHtml5_(src);
      }
    }
  }, {
    key: 'reloadFlash_',
    value: function reloadFlash_(src) {
      this.flashEl(src || this.currentSrc, Dom.$('.vjs-flash-container', this.el_.parentEl_));
    }
  }, {
    key: 'reloadHtml5_',
    value: function reloadHtml5_(src) {
      if (!this.videoPlayer.el_) {
        console.error('Unable to find a video element');
        return;
      }

      if (src) {
        this.currentSrc = src;
      }

      if (this.currentSrc) {
        this.videoPlayer.setSrc(this.currentSrc);
      }

      this.videoPlayer.load();
      this.videoPlayer.currentTime = 0;

      if (this.startPlayed) {
        this.triggerStartPlayerClick_();
      } else if (!Env.os.isAndroid && this.options_.autoplay) {
        this.triggerStartPlayerClick_();
      }
    }
  }], [{
    key: 'getTagSettings',
    value: function getTagSettings(tag) {
      var baseOptions = {
        'sources': {}
      };

      var tagOptions = Dom.getElAttributes(tag);

      // Get tag children settings
      if (tag.hasChildNodes()) {
        var children = tag.childNodes;

        for (var i = 0, j = children.length; i < j; i++) {
          var child = children[i];
          var childName = child.nodeName.toLowerCase();
          if (childName === 'source') {
            baseOptions.sources[child.type] = child;
          }
        }
      }

      return baseOptions;
    }
  }]);

  return Player;
}(_emitter2.default);

exports.default = Player;
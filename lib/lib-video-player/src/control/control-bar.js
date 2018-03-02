import * as Dom from '../utils/dom.js';
import mergeOptions from '../utils/merge.js';
import Emitter from '../utils/emitter.js';
import Log from '../utils/log.js';
import Progress from './progress.js';
import * as Events from '../utils/events.js';
import * as Env from 'amfe-env';
import * as WindVane from '@ali/lib-windvane';

class ControlBar extends Emitter {

  constructor(player) {

    super();

    this.options_ = {
      'playButtonClassName': 'vjs-play-control',
      'playStatusButtonClassName': 'vjs-playing',
      'playFullscreenClassName': 'vjs-fullscreen-control',
      'showHiddenFullscreenClassName': 'vjs-fullscreen',
      'itemClassName': 'J_Interact_Item'
    }

    this.options_ = mergeOptions(this.options_, player.options_);

    this.parent_ = player.el_;

    this.player = player;

    this.el_ = this.createEl();

    this.playBtnEl_ = Dom.$('.vjs-play-control', this.el_);

    this.fullScreenBtnEl_ = Dom.$('.vjs-fullscreen-control', this.el_);

    this.screen = 'Vertical';

    if (!this.options_.live) {
      this.controlProgress = new Progress(this);
    }

    this.bindEvent();
  }

  setPlayer(videoPlayer) {
    this.videoPlayer = videoPlayer;
  }

  createEl() {
    let hiddenClass = '';
    let hiddenClassPause = '';
    let hiddenInteractClass = 'vjs-hidden';
    let uc = navigator.userAgent.match(/UCBrowser/);

    if ((Env.aliapp && Env.aliapp.appname == 'TB' && !uc && Env.os.isAndroid) || this.player.options_.noFullscreen) {
      hiddenClass = 'vjs-hidden';
    }

    if (this.player.options_.live) {
      hiddenClassPause = 'vjs-hidden';
    }

    if (this.player.options_.interact) {
      hiddenInteractClass = '';
    }

    let el = Dom.createEl('div', {
      className: 'vjs-control-bar vjs-hidden',
      innerHTML: `
        <button class="${hiddenClassPause} vjs-play-control vjs-control vjs-button" tabindex="0" role="button" type="button">
          <span class="vjs-control-text">Play</span>
        </button>
        <div class="progress-wrap"></div>
        <button class="interact-item J_Interact_Item ${hiddenInteractClass}"></button>
        <button class="${hiddenClass} vjs-fullscreen-control vjs-control vjs-button " tabindex="0" role="button" type="button">
          <span class="vjs-control-text">Fullscreen</span>
        </button>
      `
    });

    Dom.appendContent(this.parent_, el);

    return el;
  }

  bindEvent() {
    var that = this;

    this.on('video:realPlay', this.realPlay);
    this.on('video:timeupdate', this.timeupdate);
    this.on('video:ended', this.playEnded);
    this.on('video:pause', this.playPause);
    Events.on(this.el_, 'click', ev => this.triggerControllBarClick_(ev));
  }

  timeupdate(e) {
    // Log('ControlBar:::video:timeupdate');
    this.controlProgress && this.controlProgress.timeupdate(e);
  }

  triggerShowHideBar() {
    if (Dom.hasElClass(this.el_, 'vjs-opacity-hidden')) {
      this.showControlBar();
    } else {
      this.hiddenControlBar_();
    }
  }

  showControlBar() {

    this.timer_ && clearTimeout(this.timer_);

    Dom.removeElClass(this.el_, 'vjs-hidden');
    setTimeout(() => {
      Dom.removeElClass(this.el_, 'vjs-opacity-hidden');
    }, 0);

    this.timer_ = setTimeout(() => {
      // progress is running
      if (this.controlProgress && this.controlProgress.progressing) {
        this.showControlBar();
        return;
      }
      this.hiddenControlBar_();
    }, 4000);
  }

  hiddenControlBar_() {

    Dom.addElClass(this.el_, 'vjs-opacity-hidden');
    setTimeout(() => {
      Dom.addElClass(this.el_, 'vjs-hidden');
    }, 300);
  }

  triggerControllBarClick_(e) {
    Log('ControlBar::triggerControllBarClick_()');
    var targetDom = e.target;
    e.preventDefault();

    if (Dom.hasElClass(targetDom, this.options_.playButtonClassName)) {
      this.playButton(targetDom);
    } else if (Dom.hasElClass(targetDom, this.options_.playFullscreenClassName)) {
      this.fullscreenButton(targetDom);
    } else if (Dom.hasElClass(targetDom, this.options_.itemClassName)) {
      this.player.emit('video:item:click');
    }
  }

  fullscreenButton(targetDom) {
    if (this.options_.fullscreen != 'default' && Env.os.isIPhone && WindVane.isAvailable) {
      this.mockFullScreen_(targetDom || this.fullScreenBtnEl_);
    } else if (this.options_.fullscreen != 'default' && Env.os.isAndroid && WindVane.isAvailable) {
      this.mockFullScreenRotateY_(targetDom || this.fullScreenBtnEl_);
    } else if (this.options_.fullscreen == 'default') {
      this.mockFullScreenVertical_(targetDom || this.fullScreenBtnEl_);
    } else {
      this.videoPlayer.enterFullScreen();
    }
  }

  /**
   * TB iOS mock fullscreen
   * @param  {object} targetDom [fullscreen button dom]
   */
  mockFullScreen_(targetDom) {
    let isOpenLandscape = (this.screen === 'Vertical');

    this.transverseFullScreen_(isOpenLandscape, (error) => {

      if (!error && isOpenLandscape) {
        Dom.addElClass(document.body, 'vjs-body-fullscreen');
        Dom.addElClass(this.parent_, 'vjs-player-fullscreen');
        window.scrollTo(0, 0);
        this.screen = 'landscape';
        this.player.emit('video:enterFullscreen');
      } else if (!error && !isOpenLandscape) {
        Dom.removeElClass(document.body, 'vjs-body-fullscreen');
        Dom.removeElClass(this.parent_, 'vjs-player-fullscreen');
        this.screen = 'Vertical';
        window.scrollTo(0, this.parent_.offsetTop - window.scrollY);
        this.player.emit('video:exitFullscreen');
      } else {
        this.videoPlayer.enterFullScreen();
        this.player.emit('video:enterFullscreen');
      }
    })
  }

  mockFullScreenRotateY_(targetDom) {
    let isOpenLandscape = (this.screen === 'Vertical');
    let deRect = document.documentElement.getBoundingClientRect();
    let screenWidth = deRect.width;
    let screenHeight = deRect.height;
    let meta = document.querySelector('meta[name="viewport"]');
    let metaScale = this.options_['initial-scale'] || 1;
    let metaViewport = screenWidth;

    this.androidBgMaskEl = Dom.$('.vjs-android-bg-mask');

    if (!this.androidBgMaskEl) {
      this.androidBgMaskEl = Dom.createEl('div', {
        className: 'vjs-android-bg-mask'
      });
    }

    if (!this.oldWidth) {
      this.oldWidth = this.parent_.offsetWidth;
      this.oldHeight = this.parent_.offsetHeight;
    }

    if (isOpenLandscape) {
      window.WindVane.call('WebAppInterface', 'setNaviBarHidden', {
        hidden: '1',
        animated: '1',
      }, () => {
        let cssHeight = screenWidth + 'px';
        let cssWidth = screenHeight + (50 / metaScale) + 'px';

        Dom.addElClass(document.body, 'vjs-body-fullscreen');
        Dom.addElClass(this.parent_, 'vjs-player-fullscreen-rotate');
        Dom.appendContent(this.parent_.parentNode.parentNode, this.androidBgMaskEl);

        this.parent_.style.height = cssHeight;
        this.parent_.style.width = cssWidth;

        document.body.style.height = cssHeight;
        this.screen = 'landscape';
        window.scrollTo(0, 0);
        this.player.emit('video:enterFullscreen');
      }, () => {
        this.videoPlayer.enterFullScreen();
        this.player.emit('video:enterFullscreen');
      });
    } else {
      window.WindVane.call('WebAppInterface', 'setNaviBarHidden', {
        hidden: '0',
        animated: '0'
      }, () => {
        Dom.removeElClass(document.body, 'vjs-body-fullscreen');
        Dom.removeElClass(this.parent_, 'vjs-player-fullscreen-rotate');
        if (this.androidBgMaskEl) {
          this.parent_.parentNode.parentNode.removeChild(this.androidBgMaskEl);
        }

        this.parent_.style.height = this.oldHeight + 'px';
        this.parent_.style.width = this.oldWidth + 'px';
        document.body.style.height = '100%';

        this.screen = 'Vertical';

        setTimeout(() => {
          window.scrollTo(0, this.parent_.offsetTop - window.scrollY);
        }, 500)
      }, () => {});
      this.player.emit('video:exitFullscreen');
    }
  }

  mockFullScreenVertical_(targetDom) {
    let isOpenLandscape = (this.screen === 'Vertical');

    if (isOpenLandscape) {
      Dom.addElClass(document.body, 'vjs-body-fullscreen');
      Dom.addElClass(this.parent_, 'vjs-player-fullscreen');
      window.scrollTo(0, 0);
      this.screen = 'landscape';
      this.player.emit('video:enterFullscreen');
    } else {
      Dom.removeElClass(document.body, 'vjs-body-fullscreen');
      Dom.removeElClass(this.parent_, 'vjs-player-fullscreen');
      this.screen = 'Vertical';
      window.scrollTo(0, this.parent_.offsetTop - window.scrollY);
      this.player.emit('video:exitFullscreen');
    }
  }

  transverseFullScreen_(open, cb) {
    window.WindVane.call('WebAppInterface', 'transverseFullScreen', {
      open: open.toString()
    }, function(e) {
      cb(null, true);
    }, function(e) {
      cb(true, e);
    });
  }

  playButton(target, isRun) {
    this.showControlBar();

    if (Dom.hasElClass(target, this.options_.playStatusButtonClassName)) {
      // playing
      this.exePause(target, isRun);
    } else {
      // pauseing
      this.exePlay(target, isRun);
    }
  }

  playEnded() {
    this.exePause(this.playBtnEl_, true);
  }

  playPause() {
    this.exePause(this.playBtnEl_, true);
  }

  realPlay() {
    this.showControlBar();
    this.exePlay(this.playBtnEl_, true);
  }

  exePlay(target, isRun) {
    Dom.addElClass(this.playBtnEl_, this.options_.playStatusButtonClassName);
    !isRun && this.videoPlayer.play();
  }

  exePause(target, isRun) {
    Dom.removeElClass(this.playBtnEl_, this.options_.playStatusButtonClassName);
    if (!isRun) {
      this.videoPlayer.pause();
    }
  }

  getVideoEl_() {
    return this.player.getVideoEl();
  }
}

export default ControlBar;
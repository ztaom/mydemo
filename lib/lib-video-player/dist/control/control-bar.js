'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('../utils/dom.js');

var Dom = _interopRequireWildcard(_dom);

var _merge = require('../utils/merge.js');

var _merge2 = _interopRequireDefault(_merge);

var _emitter = require('../utils/emitter.js');

var _emitter2 = _interopRequireDefault(_emitter);

var _log = require('../utils/log.js');

var _log2 = _interopRequireDefault(_log);

var _progress = require('./progress.js');

var _progress2 = _interopRequireDefault(_progress);

var _events = require('../utils/events.js');

var Events = _interopRequireWildcard(_events);

var _amfeEnv = require('amfe-env');

var Env = _interopRequireWildcard(_amfeEnv);

var _libWindvane = require('@ali/lib-windvane');

var WindVane = _interopRequireWildcard(_libWindvane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlBar = function (_Emitter) {
  _inherits(ControlBar, _Emitter);

  function ControlBar(player) {
    _classCallCheck(this, ControlBar);

    var _this = _possibleConstructorReturn(this, (ControlBar.__proto__ || Object.getPrototypeOf(ControlBar)).call(this));

    _this.options_ = {
      'playButtonClassName': 'vjs-play-control',
      'playStatusButtonClassName': 'vjs-playing',
      'playFullscreenClassName': 'vjs-fullscreen-control',
      'showHiddenFullscreenClassName': 'vjs-fullscreen',
      'itemClassName': 'J_Interact_Item'
    };

    _this.options_ = (0, _merge2.default)(_this.options_, player.options_);

    _this.parent_ = player.el_;

    _this.player = player;

    _this.el_ = _this.createEl();

    _this.playBtnEl_ = Dom.$('.vjs-play-control', _this.el_);

    _this.fullScreenBtnEl_ = Dom.$('.vjs-fullscreen-control', _this.el_);

    _this.screen = 'Vertical';

    if (!_this.options_.live) {
      _this.controlProgress = new _progress2.default(_this);
    }

    _this.bindEvent();
    return _this;
  }

  _createClass(ControlBar, [{
    key: 'setPlayer',
    value: function setPlayer(videoPlayer) {
      this.videoPlayer = videoPlayer;
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      var hiddenClass = '';
      var hiddenClassPause = '';
      var hiddenInteractClass = 'vjs-hidden';
      var uc = navigator.userAgent.match(/UCBrowser/);

      if (Env.aliapp && Env.aliapp.appname == 'TB' && !uc && Env.os.isAndroid || this.player.options_.noFullscreen) {
        hiddenClass = 'vjs-hidden';
      }

      if (this.player.options_.live) {
        hiddenClassPause = 'vjs-hidden';
      }

      if (this.player.options_.interact) {
        hiddenInteractClass = '';
      }

      var el = Dom.createEl('div', {
        className: 'vjs-control-bar vjs-hidden',
        innerHTML: '\n        <button class="' + hiddenClassPause + ' vjs-play-control vjs-control vjs-button" tabindex="0" role="button" type="button">\n          <span class="vjs-control-text">Play</span>\n        </button>\n        <div class="progress-wrap"></div>\n        <button class="interact-item J_Interact_Item ' + hiddenInteractClass + '"></button>\n        <button class="' + hiddenClass + ' vjs-fullscreen-control vjs-control vjs-button " tabindex="0" role="button" type="button">\n          <span class="vjs-control-text">Fullscreen</span>\n        </button>\n      '
      });

      Dom.appendContent(this.parent_, el);

      return el;
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this2 = this;

      var that = this;

      this.on('video:realPlay', this.realPlay);
      this.on('video:timeupdate', this.timeupdate);
      this.on('video:ended', this.playEnded);
      this.on('video:pause', this.playPause);
      Events.on(this.el_, 'click', function (ev) {
        return _this2.triggerControllBarClick_(ev);
      });
    }
  }, {
    key: 'timeupdate',
    value: function timeupdate(e) {
      // Log('ControlBar:::video:timeupdate');
      this.controlProgress && this.controlProgress.timeupdate(e);
    }
  }, {
    key: 'triggerShowHideBar',
    value: function triggerShowHideBar() {
      if (Dom.hasElClass(this.el_, 'vjs-opacity-hidden')) {
        this.showControlBar();
      } else {
        this.hiddenControlBar_();
      }
    }
  }, {
    key: 'showControlBar',
    value: function showControlBar() {
      var _this3 = this;

      this.timer_ && clearTimeout(this.timer_);

      Dom.removeElClass(this.el_, 'vjs-hidden');
      setTimeout(function () {
        Dom.removeElClass(_this3.el_, 'vjs-opacity-hidden');
      }, 0);

      this.timer_ = setTimeout(function () {
        // progress is running
        if (_this3.controlProgress && _this3.controlProgress.progressing) {
          _this3.showControlBar();
          return;
        }
        _this3.hiddenControlBar_();
      }, 4000);
    }
  }, {
    key: 'hiddenControlBar_',
    value: function hiddenControlBar_() {
      var _this4 = this;

      Dom.addElClass(this.el_, 'vjs-opacity-hidden');
      setTimeout(function () {
        Dom.addElClass(_this4.el_, 'vjs-hidden');
      }, 300);
    }
  }, {
    key: 'triggerControllBarClick_',
    value: function triggerControllBarClick_(e) {
      (0, _log2.default)('ControlBar::triggerControllBarClick_()');
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
  }, {
    key: 'fullscreenButton',
    value: function fullscreenButton(targetDom) {
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

  }, {
    key: 'mockFullScreen_',
    value: function mockFullScreen_(targetDom) {
      var _this5 = this;

      var isOpenLandscape = this.screen === 'Vertical';

      this.transverseFullScreen_(isOpenLandscape, function (error) {

        if (!error && isOpenLandscape) {
          Dom.addElClass(document.body, 'vjs-body-fullscreen');
          Dom.addElClass(_this5.parent_, 'vjs-player-fullscreen');
          window.scrollTo(0, 0);
          _this5.screen = 'landscape';
          _this5.player.emit('video:enterFullscreen');
        } else if (!error && !isOpenLandscape) {
          Dom.removeElClass(document.body, 'vjs-body-fullscreen');
          Dom.removeElClass(_this5.parent_, 'vjs-player-fullscreen');
          _this5.screen = 'Vertical';
          window.scrollTo(0, _this5.parent_.offsetTop - window.scrollY);
          _this5.player.emit('video:exitFullscreen');
        } else {
          _this5.videoPlayer.enterFullScreen();
          _this5.player.emit('video:enterFullscreen');
        }
      });
    }
  }, {
    key: 'mockFullScreenRotateY_',
    value: function mockFullScreenRotateY_(targetDom) {
      var _this6 = this;

      var isOpenLandscape = this.screen === 'Vertical';
      var deRect = document.documentElement.getBoundingClientRect();
      var screenWidth = deRect.width;
      var screenHeight = deRect.height;
      var meta = document.querySelector('meta[name="viewport"]');
      var metaScale = this.options_['initial-scale'] || 1;
      var metaViewport = screenWidth;

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
          animated: '1'
        }, function () {
          var cssHeight = screenWidth + 'px';
          var cssWidth = screenHeight + 50 / metaScale + 'px';

          Dom.addElClass(document.body, 'vjs-body-fullscreen');
          Dom.addElClass(_this6.parent_, 'vjs-player-fullscreen-rotate');
          Dom.appendContent(_this6.parent_.parentNode.parentNode, _this6.androidBgMaskEl);

          _this6.parent_.style.height = cssHeight;
          _this6.parent_.style.width = cssWidth;

          document.body.style.height = cssHeight;
          _this6.screen = 'landscape';
          window.scrollTo(0, 0);
          _this6.player.emit('video:enterFullscreen');
        }, function () {
          _this6.videoPlayer.enterFullScreen();
          _this6.player.emit('video:enterFullscreen');
        });
      } else {
        window.WindVane.call('WebAppInterface', 'setNaviBarHidden', {
          hidden: '0',
          animated: '0'
        }, function () {
          Dom.removeElClass(document.body, 'vjs-body-fullscreen');
          Dom.removeElClass(_this6.parent_, 'vjs-player-fullscreen-rotate');
          if (_this6.androidBgMaskEl) {
            _this6.parent_.parentNode.parentNode.removeChild(_this6.androidBgMaskEl);
          }

          _this6.parent_.style.height = _this6.oldHeight + 'px';
          _this6.parent_.style.width = _this6.oldWidth + 'px';
          document.body.style.height = '100%';

          _this6.screen = 'Vertical';

          setTimeout(function () {
            window.scrollTo(0, _this6.parent_.offsetTop - window.scrollY);
          }, 500);
        }, function () {});
        this.player.emit('video:exitFullscreen');
      }
    }
  }, {
    key: 'mockFullScreenVertical_',
    value: function mockFullScreenVertical_(targetDom) {
      var isOpenLandscape = this.screen === 'Vertical';

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
  }, {
    key: 'transverseFullScreen_',
    value: function transverseFullScreen_(open, cb) {
      window.WindVane.call('WebAppInterface', 'transverseFullScreen', {
        open: open.toString()
      }, function (e) {
        cb(null, true);
      }, function (e) {
        cb(true, e);
      });
    }
  }, {
    key: 'playButton',
    value: function playButton(target, isRun) {
      this.showControlBar();

      if (Dom.hasElClass(target, this.options_.playStatusButtonClassName)) {
        // playing
        this.exePause(target, isRun);
      } else {
        // pauseing
        this.exePlay(target, isRun);
      }
    }
  }, {
    key: 'playEnded',
    value: function playEnded() {
      this.exePause(this.playBtnEl_, true);
    }
  }, {
    key: 'playPause',
    value: function playPause() {
      this.exePause(this.playBtnEl_, true);
    }
  }, {
    key: 'realPlay',
    value: function realPlay() {
      this.showControlBar();
      this.exePlay(this.playBtnEl_, true);
    }
  }, {
    key: 'exePlay',
    value: function exePlay(target, isRun) {
      Dom.addElClass(this.playBtnEl_, this.options_.playStatusButtonClassName);
      !isRun && this.videoPlayer.play();
    }
  }, {
    key: 'exePause',
    value: function exePause(target, isRun) {
      Dom.removeElClass(this.playBtnEl_, this.options_.playStatusButtonClassName);
      if (!isRun) {
        this.videoPlayer.pause();
      }
    }
  }, {
    key: 'getVideoEl_',
    value: function getVideoEl_() {
      return this.player.getVideoEl();
    }
  }]);

  return ControlBar;
}(_emitter2.default);

exports.default = ControlBar;
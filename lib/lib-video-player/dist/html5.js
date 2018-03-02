'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = require('./utils/log.js');

var _log2 = _interopRequireDefault(_log);

var _events = require('./utils/events.js');

var Events = _interopRequireWildcard(_events);

var _fn = require('./utils/fn.js');

var Fn = _interopRequireWildcard(_fn);

var _amfeEnv = require('amfe-env');

var Env = _interopRequireWildcard(_amfeEnv);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTML5 = function () {
  function HTML5(player) {
    _classCallCheck(this, HTML5);

    this.el_ = player.tag;
    this.player = player;
    this.controlBar = player.controlBar;
    this.danmakuPlay = player.danmakuPlay;
    this.sources = player.options_.sources;
    this.bindEvent();
    this.timeout = player.options_.timeout;
  }

  _createClass(HTML5, [{
    key: 'bindEvent',
    value: function bindEvent() {
      var _this = this;

      // mediaevents : https://www.w3.org/TR/html5/embedded-content-0.html#mediaevents
      this.el_.addEventListener('error', function (ev) {
        return _this.errorEmit(ev);
      });
      this.el_.addEventListener('ended', function (ev) {
        return _this.endedEmit(ev);
      });
      this.el_.addEventListener('progress', function (ev) {
        return _this.progressEmit(ev);
      });
      this.el_.addEventListener('play', function (ev) {
        return _this.playEmit(ev);
      });
      this.el_.addEventListener('loadstart', function (ev) {
        return _this.loadstartEmit(ev);
      });
      this.el_.addEventListener('playing', function (ev) {
        return _this.playingEmit(ev);
      });
      this.el_.addEventListener('suspend', function (ev) {
        return _this.suspendEmit(ev);
      });
      this.el_.addEventListener('abort', function (ev) {
        return _this.abortEmit(ev);
      });
      this.el_.addEventListener('stalled', function (ev) {
        return _this.stalledEmit(ev);
      });
      this.el_.addEventListener('waiting', function (ev) {
        return _this.waitingEmit(ev);
      });
      this.el_.addEventListener('canplay', function (ev) {
        return _this.canplayEmit(ev);
      });
      this.el_.addEventListener('canplaythrough', function (ev) {
        return _this.canplaythroughEmit(ev);
      });
      this.el_.addEventListener('timeupdate', function (ev) {
        return _this.timeupdateEmit(ev);
      });
      this.el_.addEventListener('seeked', function (ev) {
        return _this.seekedEmit(ev);
      });
      this.el_.addEventListener('pause', function (ev) {
        return _this.pauseEmit(ev);
      });
    }
  }, {
    key: 'pauseEmit',
    value: function pauseEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:pause::' + new Date().getTime());
      this.controlBar && this.controlBar.emit('video:pause', e);
      this.player.emit('video:pause', e);
      this.pauseEmited = true;
      this.playEmited = false;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.pause();
      this.el_.currentTime = 0;
    }
  }, {
    key: 'seekedEmit',
    value: function seekedEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:seeked::' + new Date().getTime());
    }
  }, {
    key: 'stalledEmit',
    value: function stalledEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:stalled::' + new Date().getTime());
      this.setTimeoutError();
    }
  }, {
    key: 'waitingEmit',
    value: function waitingEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:waiting::' + new Date().getTime());
      this.setTimeoutError();
    }
  }, {
    key: 'abortEmit',
    value: function abortEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:abort::' + new Date().getTime());
    }
  }, {
    key: 'suspendEmit',
    value: function suspendEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:suspend::' + new Date().getTime());
    }
  }, {
    key: 'canplayEmit',
    value: function canplayEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:canplay::' + new Date().getTime());
    }
  }, {
    key: 'canplaythroughEmit',
    value: function canplaythroughEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:canplaythrough::' + new Date().getTime());
      this.setTimeoutError();
    }
  }, {
    key: 'errorEmit',
    value: function errorEmit(e) {
      if (this.player.isDecodeHls && e.isTrusted) {
        return;
      }

      (0, _log2.default)('HTML5:emit:::video:error::' + new Date().getTime());

      if (this.waitTimer_) {
        clearTimeout(this.waitTimer_);
        this.waitTimer_ = 0;
      }

      this.played = false;
      this.playEmited = false;

      this.player.emit('video:error', e);
    }
  }, {
    key: 'progressEmit',
    value: function progressEmit() {
      (0, _log2.default)('HTML5:emit:::video:progress::' + new Date().getTime());
      this.controlBar && this.controlBar.emit('video:progress');
    }
  }, {
    key: 'endedEmit',
    value: function endedEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:ended::');
      this.player.emit('video:ended', e);
      this.controlBar && this.controlBar.emit('video:ended', e);
    }
  }, {
    key: 'timeupdateEmit',
    value: function timeupdateEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:timeupdate::' + this.el_.currentTime);
      var currentTime = e.currentTarget.currentTime;
      var uc = navigator.userAgent.match(/UCBrowser/);

      if (this.playEmited) {
        return;
      }

      if (currentTime > 0 || this.player.videoLoading && this.player.options_.live && Env.os.isAndroid) {

        if (this.waitTimer_) {
          clearTimeout(this.waitTimer_);
          this.waitTimer_ = 0;
        }

        this.player.emit('video:timeupdate', e);
        this.controlBar && this.controlBar.emit('video:timeupdate', e);
        this.danmakuPlay && this.danmakuPlay.emit('video:timeupdate', e);
      }
    }
  }, {
    key: 'playEmit',
    value: function playEmit(e) {
      if (this.pauseEmited && this.player.videoLoading && this.player.options_.live && Env.os.isAndroid) {
        this.playEmited = true;
        this.player.emit('video:timeupdate', e);
        this.controlBar && this.controlBar.emit('video:timeupdate', e);
        this.danmakuPlay && this.danmakuPlay.emit('video:timeupdate', e);
      }
      this.player.emit('video:play', e);
    }
  }, {
    key: 'loadstartEmit',
    value: function loadstartEmit(e) {
      (0, _log2.default)('HTML5:emit:::video:loadstart::' + new Date().getTime());
      this.player.emit('video:loadstart');
    }
  }, {
    key: 'playingEmit',
    value: function playingEmit() {
      (0, _log2.default)('HTML5:emit:::video:playing::' + new Date().getTime());
      this.player.emit('video:playing');
      this.setTimeoutError();
    }
  }, {
    key: 'loadEmit',
    value: function loadEmit() {
      (0, _log2.default)('HTML5:emit:::video:load::' + new Date().getTime());
      this.player.emit('video:load');
    }
  }, {
    key: 'play',
    value: function play() {
      var _this2 = this;

      this.played = true;

      if (this.player.isDecodeHls) {
        var hls = new Hls();

        hls.loadSource(this.player.currentSrc);
        hls.attachMedia(this.el_);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          _this2.el_.play();
        });
      } else {
        this.el_.play();
      }
    }
  }, {
    key: 'load',
    value: function load() {
      this.el_.load();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.el_.pause();
    }
  }, {
    key: 'setSrc',
    value: function setSrc(url) {
      this.el_.src = url;
    }
  }, {
    key: 'setTimeoutError',
    value: function setTimeoutError() {
      var _this3 = this;

      if (this.waitTimer_ || !this.played) return;

      this.waitTimer_ = setTimeout(function () {
        if (_this3.el_.networkState === _this3.el_.NETWORK_NO_SOURCE) {
          _this3.errorEmit({
            errorCode: 'NETWORK_NO_SOURCE'
          });
        } else {
          _this3.errorEmit({
            errorCode: 'NETWORK_TIMEOUT'
          });
        }
      }, this.timeout || 20000);
    }
  }, {
    key: 'enterFullScreen',
    value: function enterFullScreen() {
      var video = this.el_;

      if ('webkitDisplayingFullscreen' in video) {
        Events.one(video, 'webkitbeginfullscreen', function () {
          Events.one(video, 'webkitendfullscreen', function () {
            Events.trigger(video, 'fullscreenchange', {
              isFullscreen: false
            });
          });

          Events.trigger(video, 'fullscreenchange', {
            isFullscreen: true
          });
        });
      }

      if (video.paused && video.networkState <= video.HAVE_METADATA) {
        // attempt to prime the video element for programmatic access
        // this isn't necessary on the desktop but shouldn't hurt
        this.el_.play();

        // playing and pausing synchronously during the transition to fullscreen
        // can get iOS ~6.1 devices into a play/pause loop
        setTimeout(function () {
          video.pause();
          video.webkitEnterFullScreen();
        }, 0);
      } else {
        video.webkitEnterFullScreen();
      }
    }
  }]);

  return HTML5;
}();

exports.default = HTML5;
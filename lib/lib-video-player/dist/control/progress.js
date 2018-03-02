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

var _amfeEnv = require('amfe-env');

var Env = _interopRequireWildcard(_amfeEnv);

var _events = require('../utils/events.js');

var Events = _interopRequireWildcard(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = function (_Emitter) {
  _inherits(Progress, _Emitter);

  function Progress(controlBar) {
    _classCallCheck(this, Progress);

    var _this = _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this));

    _this.options_ = (0, _merge2.default)(_this.options_, controlBar.options_);

    _this.parent_ = controlBar.el_;

    _this.controlBar = controlBar;

    _this.el_ = _this.getProgressEl();

    _this.totalTimeEl = Dom.$('.J_TotalTime', _this.el_);
    _this.currentTimeEl = Dom.$('.J_CurrentTime', _this.el_);
    _this.progressBarEl = Dom.$('.J_ProgressBar', _this.el_);
    _this.progressEl = Dom.$('.J_Progress', _this.el_);

    _this.bindEvent();
    return _this;
  }

  _createClass(Progress, [{
    key: 'getProgressEl',
    value: function getProgressEl() {
      var el = Dom.createEl('div', {
        className: 'vjs-progress-bar',
        innerHTML: '\n        <span class="current-time"><em class="J_CurrentTime">00:00</em></span>\n        <span class="progress-bar J_ProgressBar">\n          <span class="progress J_Progress">\n            <span class="control J_Update"></span>\n          </span>\n        </span>\n        <span class="total-time"><em class="J_TotalTime">10:25</em></span>\n      '
      });

      Dom.appendContent(Dom.$('.progress-wrap', this.parent_), el);

      return el;
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this2 = this;

      var isMouseDown = false,
          wasPlaying = false,
          mouseEventRefresh = '',
          media = this.controlBar.getVideoEl_();

      var mouseDown = function mouseDown(e) {
        // console.log(e.type + ':::mouseDown');
        _this2.progressing = true;
        isMouseDown = true;
        wasPlaying = !media.paused;
        _this2.controlBar.exePause();
        _this2.setMediaProgress(e);
      };

      var mouseUp = function mouseUp(e) {
        console.log(e.type + ':::mouseUp');
        e.preventDefault();
        clearInterval(mouseEventRefresh);
        isMouseDown = false;
        if (wasPlaying == true) {
          _this2.controlBar.exePlay();
          wasPlaying = false;
        } else {
          _this2.controlBar.exePause();
        }

        _this2.progressing = false;
      };
      var mouseMove = function mouseMove(e) {
        e.preventDefault();
        // console.log(e.type + ':::mouseMove');
        if (isMouseDown === true) {
          mouseEventRefresh = setInterval(_this2.setMediaProgress(e), 1000);
          _this2.controlBar.showControlBar();
        }
      };

      Events.on(this.el_, 'touchstart', function (ev) {
        return mouseDown(ev);
      });
      Events.on(this.el_, 'touchmove', function (ev) {
        return mouseMove(ev);
      });
      Events.on(this.el_, 'touchend', function (ev) {
        return mouseUp(ev);
      });

      Events.on(this.el_, 'mousedown', function (ev) {
        return mouseDown(ev);
      });
      Events.on(this.el_, 'mousemove', function (ev) {
        return mouseMove(ev);
      });
      Events.on(this.el_, 'mouseup', function (ev) {
        return mouseUp(ev);
      });
    }
  }, {
    key: 'setMediaProgress',
    value: function setMediaProgress(e) {
      var media = this.controlBar.getVideoEl_();
      var tempTime = this.timeFromCursorPosition(this.progressBarEl, e, media.duration);

      media.currentTime = tempTime;
      this.updateProgress_();
    }
  }, {
    key: 'timeFromCursorPosition',
    value: function timeFromCursorPosition(element, event, duration) {
      var dimensions = element.getBoundingClientRect();
      var pixelsOfBar = (event.clientX || event.changedTouches[0].clientX) - dimensions.left;
      var width = dimensions.width;
      //安卓全屏方案兼容，经旋转后
      if (Env.aliapp && Env.aliapp.appname == 'TB' && Env.os.isAndroid && this.controlBar.screen === 'landscape') {
        pixelsOfBar = (event.clientY || event.changedTouches[0].clientY) - dimensions.top;
        width = dimensions.height;
      }
      var percentToSecs = pixelsOfBar / width;
      return percentToSecs * duration;
    }
  }, {
    key: 'timeupdate',
    value: function timeupdate(e) {
      this.updateProgress_(e);
      this.updateTimeCount_(e);
    }
  }, {
    key: 'updateProgress_',
    value: function updateProgress_(e) {
      //this.updateTimeCount();
      var media = this.controlBar.getVideoEl_();
      var value = 0;
      if (media.currentTime > 0) {
        value = 100 / media.duration * media.currentTime;
      }
      this.progressEl.style.width = value + "%";
    }
  }, {
    key: 'updateTimeCount_',
    value: function updateTimeCount_(e) {
      var media = this.controlBar.getVideoEl_();
      var currTime = this.formatTime(media.currentTime);
      var totalTime = this.formatTime(media.duration);
      if (isNaN(media.duration) === true) {
        totalTime = "00:00";
      };
      this.currentTimeEl.innerHTML = currTime;
      this.totalTimeEl.innerHTML = totalTime;
    }
  }, {
    key: 'formatTime',
    value: function formatTime(time) {
      var minutes = Math.floor(time / 60);
      var seconds = ("0" + Math.round(time - minutes * 60)).slice(-2);
      return minutes + ":" + seconds;
    }
  }, {
    key: 'setTimeline',
    value: function setTimeline(time) {
      var tagDom = Dom.createEl('span', {
        className: 'vjs-progress-tag'
      });
      var media = this.controlBar.getVideoEl_();
      var value = 100 / media.duration * time;

      tagDom.style.left = value + "%";

      Dom.appendContent(this.progressBarEl, tagDom);

      return tagDom;
    }
  }]);

  return Progress;
}(_emitter2.default);

exports.default = Progress;
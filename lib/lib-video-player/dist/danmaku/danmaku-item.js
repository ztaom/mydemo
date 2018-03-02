'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('../utils/dom.js');

var Dom = _interopRequireWildcard(_dom);

var _emitter = require('../utils/emitter.js');

var _emitter2 = _interopRequireDefault(_emitter);

var _merge = require('../utils/merge.js');

var _merge2 = _interopRequireDefault(_merge);

var _log = require('../utils/log.js');

var _log2 = _interopRequireDefault(_log);

var _events = require('../utils/events.js');

var Events = _interopRequireWildcard(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DanmakuItem = function (_Emitter) {
  _inherits(DanmakuItem, _Emitter);

  function DanmakuItem(config, danmaku) {
    _classCallCheck(this, DanmakuItem);

    var _this = _possibleConstructorReturn(this, (DanmakuItem.__proto__ || Object.getPrototypeOf(DanmakuItem)).call(this));

    _this.options_ = (0, _merge2.default)(_this.setOption(), config);

    _this.el_ = _this.createItemEl();

    _this.danmaku = danmaku;

    _this.going = false;

    Dom.appendContent(danmaku.el_, _this.el_);
    return _this;
  }

  _createClass(DanmakuItem, [{
    key: 'setOption',
    value: function setOption() {

      return {
        'size': '14px',
        'color': '#000',
        'backgroundColor': 'rgba(255, 255, 255, 0.6)',
        'duration': '4292'
      };
    }
  }, {
    key: 'createItemEl',
    value: function createItemEl() {
      var that = this;

      if (!/rem|em|px/.test(that.options_.size)) {
        that.options_.size += 'px';
      }

      console.log(that.options_.size);

      return Dom.createEl('div', {
        className: 'vjs-danmaku-item vjs-hidden',
        innerHTML: '\n        <p style="display:inline-block;font-size:' + that.options_.size + ';color:' + that.options_.color + ';background-color:' + that.options_.backgroundColor + '">' + that.options_.text + '</p>\n      '
      });
    }
  }, {
    key: 'move',
    value: function move() {
      var _this2 = this;

      var myWidth = Dom.$('p', this.el_).offsetWidth;

      this.el_.style.transform = 'translate(-' + (myWidth + 20) + 'px, 0)';
      this.el_.style.webkitTransform = 'translate(-' + (myWidth + 20) + 'px, 0)';
      this.el_.addEventListener('webkitTransitionEnd', function (ev) {
        if (_this2.webkitTransitionEndTimer) {
          clearTimeout(_this2.webkitTransitionEndTimer);
        }
        Dom.addElClass(_this2.el_, 'vjs-hidden');
        _this2.going = false;
      });

      this.webkitTransitionEndTimer = setTimeout(function () {
        Dom.addElClass(_this2.el_, 'vjs-hidden');
        _this2.going = false;
      }, 10000);
    }
  }, {
    key: 'start',
    value: function start() {
      var _this3 = this;

      if (this.going) {
        return;
      }

      this.going = true;

      var myWidth = Dom.$('p', this.el_).offsetWidth;

      if (!/rem|em|px/.test(this.options_.top)) {
        this.options_.top += 'px';
      }

      this.el_.style.position = 'absolute';
      this.el_.style.transform = 'translate(' + this.danmaku.el_.offsetWidth + 'px, 0)';
      this.el_.style.webkitTransform = 'translate(' + this.danmaku.el_.offsetWidth + 'px, 0)';
      this.el_.style.transitionDuration = this.options_.duration;
      this.el_.style.webkitTransitionDuration = this.options_.duration;
      this.el_.style.top = this.options_.top || 0;
      this.el_.style.zIndex = '10';
      Dom.removeElClass(this.el_, 'vjs-hidden');
      var delayTime = this.options_.time - (this.options_.queue - 1) * this.danmaku.checkTime;

      setTimeout(function () {
        _this3.move();
      }, delayTime);
    }
  }]);

  return DanmakuItem;
}(_emitter2.default);

exports.default = DanmakuItem;
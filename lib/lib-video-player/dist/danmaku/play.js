'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('../utils/dom.js');

var Dom = _interopRequireWildcard(_dom);

var _emitter = require('../utils/emitter.js');

var _emitter2 = _interopRequireDefault(_emitter);

var _danmakuItem = require('./danmaku-item.js');

var _danmakuItem2 = _interopRequireDefault(_danmakuItem);

var _log = require('../utils/log.js');

var _log2 = _interopRequireDefault(_log);

var _merge = require('../utils/merge.js');

var _merge2 = _interopRequireDefault(_merge);

var _events = require('../utils/events.js');

var Events = _interopRequireWildcard(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Danmaku = function (_Emitter) {
  _inherits(Danmaku, _Emitter);

  function Danmaku(player) {
    _classCallCheck(this, Danmaku);

    var _this = _possibleConstructorReturn(this, (Danmaku.__proto__ || Object.getPrototypeOf(Danmaku)).call(this));

    _this.parent_ = player.el_;

    _this.el_ = _this.createEl();

    _this.options_ = (0, _merge2.default)(_this.options_, player.options_);

    _this.totalTime = 9000;

    _this.checkTime = 1000;

    _this.playCount = Math.ceil(_this.totalTime / _this.checkTime);

    //this.on('video:timeupdate', ev => {
    // play danmuku
    _this.init();
    //});

    return _this;
  }

  _createClass(Danmaku, [{
    key: 'createEl',
    value: function createEl() {

      var el = Dom.createEl('div', {
        className: 'vjs-danmaku-container'
      });

      Dom.appendContent(this.parent_, el);

      return el;
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      if (this.playing) {
        return;
      }

      this.playing = true;

      var playerList = this.options_.danmakuPlayerList;

      playerList.forEach(function (config) {
        var queue = Math.ceil(config.time / _this2.checkTime);
        config.queue = queue;

        var go = new _danmakuItem2.default(config, _this2);

        _this2.on(queue + 'start', function () {
          go.start();
        });
      });

      var currentQueue = 0;

      this.emit(currentQueue + 'start');

      setInterval(function () {
        _this2.emit(currentQueue + 'start');

        if (currentQueue === playerList.length - 1) {
          currentQueue = 0;
        } else {
          currentQueue++;
        }
      }, this.checkTime);
    }
  }]);

  return Danmaku;
}(_emitter2.default);

exports.default = Danmaku;
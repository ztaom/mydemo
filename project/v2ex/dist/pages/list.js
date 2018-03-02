'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var swiperIndex = function (_wepy$page) {
  _inherits(swiperIndex, _wepy$page);

  function swiperIndex() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, swiperIndex);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = swiperIndex.__proto__ || Object.getPrototypeOf(swiperIndex)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: 'github javascript'
    }, _this.components = {}, _this.data = {}, _this.computed = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(swiperIndex, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      _wepy2.default.getSystemInfo({
        success: function success(res) {
          that.winWidth = res.windowWidth, that.winHeight = res.windowHeight;
        }
      });

      (0, _api.getJavascript)({ q: 'language:javascript', sort: 'stars' }, function (res) {
        console.log(res.result);
      });
    }
  }]);

  return swiperIndex;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(swiperIndex , 'pages/list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuanMiXSwibmFtZXMiOlsic3dpcGVySW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0aGF0IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJ3aW5XaWR0aCIsIndpbmRvd1dpZHRoIiwid2luSGVpZ2h0Iiwid2luZG93SGVpZ2h0IiwicSIsInNvcnQiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFHYkMsSSxHQUFPLEUsUUFHUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVLEU7Ozs7OzZCQUdEO0FBQ1AsVUFBTUMsT0FBTyxJQUFiO0FBQ0EscUJBQUtDLGFBQUwsQ0FBb0I7QUFDbEJDLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJILGVBQUtJLFFBQUwsR0FBZ0JELElBQUlFLFdBQXBCLEVBQ0FMLEtBQUtNLFNBQUwsR0FBaUJILElBQUlJLFlBRHJCO0FBRUQ7QUFKaUIsT0FBcEI7O0FBT0EsOEJBQWMsRUFBQ0MsR0FBRSxxQkFBSCxFQUEwQkMsTUFBSyxPQUEvQixFQUFkLEVBQXVELFVBQUNOLEdBQUQsRUFBUztBQUM5RE8sZ0JBQVFDLEdBQVIsQ0FBWVIsSUFBSVMsTUFBaEI7QUFDRCxPQUZEO0FBR0Q7Ozs7RUE1QnNDLGVBQUtDLEk7O2tCQUF6QnBCLFciLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQge2dldEphdmFzY3JpcHR9IGZyb20gJ0AvYXBpLydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBzd2lwZXJJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ2dpdGh1YiBqYXZhc2NyaXB0J1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbygge1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICB0aGF0LndpbldpZHRoID0gcmVzLndpbmRvd1dpZHRoLFxuICAgICAgICAgIHRoYXQud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgXG4gICAgICBnZXRKYXZhc2NyaXB0KHtxOidsYW5ndWFnZTpqYXZhc2NyaXB0Jywgc29ydDonc3RhcnMnfSwgKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMucmVzdWx0KVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==
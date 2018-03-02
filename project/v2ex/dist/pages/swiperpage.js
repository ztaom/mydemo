'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

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
      navigationBarTitleText: 'test'
    }, _this.components = {}, _this.mixins = [_test2.default], _this.data = {
      winWidth: 0,
      winHeight: 0,
      currentTab: 0
    }, _this.computed = {}, _this.methods = {
      gottTo: function gottTo() {
        console.log('ss');
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        console.log(currPage);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(swiperIndex, [{
    key: 'bindChange',
    value: function bindChange(e) {
      var that = this;
      that.currentTab = e.detail.current;
    }

    /**
     * 点击tab切换
     */

  }, {
    key: 'swichNav',
    value: function swichNav(e) {
      var that = this;
      if (this.currentTab === e.target.dataset.current) {
        return false;
      } else {
        that.currentTab = e.target.dataset.current;
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      _wepy2.default.getSystemInfo({
        success: function success(res) {
          that.winWidth = res.windowWidth, that.winHeight = res.windowHeight;
        }
      });

      // getSearch({'q': 'zhangyimou'}, (res) => {
      //   console.log(res)
      // })

      (0, _api.getJavascript)({ q: 'language:javascript', sort: 'stars' }, function (res) {
        console.log(res.result);
      });
    }
  }]);

  return swiperIndex;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(swiperIndex , 'pages/swiperpage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlcnBhZ2UuanMiXSwibmFtZXMiOlsic3dpcGVySW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJ3aW5XaWR0aCIsIndpbkhlaWdodCIsImN1cnJlbnRUYWIiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb3R0VG8iLCJjb25zb2xlIiwibG9nIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJjdXJyUGFnZSIsImxlbmd0aCIsImUiLCJ0aGF0IiwiZGV0YWlsIiwiY3VycmVudCIsInRhcmdldCIsImRhdGFzZXQiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd1dpZHRoIiwid2luZG93SGVpZ2h0IiwicSIsInNvcnQiLCJyZXN1bHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBR2JDLE0sR0FBUyxnQixRQUVUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxpQkFBVyxDQUZOO0FBR0xDLGtCQUFZO0FBSFAsSyxRQXVCUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVO0FBQ1JDLFlBRFEsb0JBQ0M7QUFDUEMsZ0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsWUFBSUMsUUFBUUMsaUJBQVo7QUFDQSxZQUFJQyxXQUFXRixNQUFNQSxNQUFNRyxNQUFOLEdBQWUsQ0FBckIsQ0FBZjtBQUNBTCxnQkFBUUMsR0FBUixDQUFZRyxRQUFaO0FBQ0Q7QUFOTyxLOzs7OzsrQkFwQkNFLEMsRUFBRztBQUNaLFVBQUlDLE9BQU8sSUFBWDtBQUNBQSxXQUFLWCxVQUFMLEdBQWtCVSxFQUFFRSxNQUFGLENBQVNDLE9BQTNCO0FBQ0Q7O0FBRUQ7Ozs7Ozs2QkFHU0gsQyxFQUFHO0FBQ1YsVUFBSUMsT0FBTyxJQUFYO0FBQ0EsVUFBSSxLQUFLWCxVQUFMLEtBQW9CVSxFQUFFSSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJGLE9BQXpDLEVBQWtEO0FBQ2hELGVBQU8sS0FBUDtBQUNELE9BRkQsTUFFTztBQUNMRixhQUFLWCxVQUFMLEdBQWtCVSxFQUFFSSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJGLE9BQW5DO0FBQ0Q7QUFDRjs7OzZCQWNRO0FBQ1AsVUFBTUYsT0FBTyxJQUFiO0FBQ0EscUJBQUtLLGFBQUwsQ0FBb0I7QUFDbEJDLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJQLGVBQUtiLFFBQUwsR0FBZ0JvQixJQUFJQyxXQUFwQixFQUNBUixLQUFLWixTQUFMLEdBQWlCbUIsSUFBSUUsWUFEckI7QUFFRDtBQUppQixPQUFwQjs7QUFPQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQWMsRUFBQ0MsR0FBRSxxQkFBSCxFQUEwQkMsTUFBSyxPQUEvQixFQUFkLEVBQXVELFVBQUNKLEdBQUQsRUFBUztBQUM5RGQsZ0JBQVFDLEdBQVIsQ0FBWWEsSUFBSUssTUFBaEI7QUFDRCxPQUZEO0FBR0Q7Ozs7RUE1RHNDLGVBQUtDLEk7O2tCQUF6QmhDLFciLCJmaWxlIjoic3dpcGVycGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICBpbXBvcnQge2dldEphdmFzY3JpcHR9IGZyb20gJ0AvYXBpLydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBzd2lwZXJJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ3Rlc3QnXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgIGRhdGEgPSB7XG4gICAgICB3aW5XaWR0aDogMCxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGN1cnJlbnRUYWI6IDBcbiAgICB9XG5cbiAgICBiaW5kQ2hhbmdlKGUpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3VycmVudFRhYiA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngrnlh7t0YWLliIfmjaJcbiAgICAgKi9cbiAgICBzd2ljaE5hdihlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAodGhpcy5jdXJyZW50VGFiID09PSBlLnRhcmdldC5kYXRhc2V0LmN1cnJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5jdXJyZW50VGFiID0gZS50YXJnZXQuZGF0YXNldC5jdXJyZW50XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvdHRUbygpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NzJylcbiAgICAgICAgdmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XG4gICAgICAgIHZhciBjdXJyUGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyUGFnZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbygge1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICB0aGF0LndpbldpZHRoID0gcmVzLndpbmRvd1dpZHRoLFxuICAgICAgICAgIHRoYXQud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBnZXRTZWFyY2goeydxJzogJ3poYW5neWltb3UnfSwgKHJlcykgPT4ge1xuICAgICAgLy8gICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAvLyB9KVxuXG4gICAgICBnZXRKYXZhc2NyaXB0KHtxOidsYW5ndWFnZTpqYXZhc2NyaXB0Jywgc29ydDonc3RhcnMnfSwgKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMucmVzdWx0KVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * h5活动使用
 * 全局定义活动id参数，*.setActId('demo')
 * 每一个行为位置处参数，*.goldlog('clickbtn')
 *
 * 输出 actId=demo&posId=clickbtn2&param={"canyu":1}
 *
 */

var _logStr = '/yt/ykh5.ykh5.ykh5';
var _checkStr = 'H46956154';
var actId = null;
var pageId = null;

function sendImgLog(src, errorcallback) {
    var id = 'youku-uniplayer-stat';
    if (src.indexOf('http:') < 0 && src.indexOf('https:') < 0) {
        src = 'https:' + src;
    }
    var fr = document.createElement('img');
    if (errorcallback) {
        fr.addEventListener('error', errorcallback, false);
    }
    fr.src = src + '&r_=' + Math.floor(Math.random() * 10000);
    fr.id = id;
}
/**
 * 黄金令箭埋点统计方法 setActId('actid'), goldlog('posid', {'canyu':1})
 * @param  {[type]} actId      所在页面标识码
 * @param  {[type]} posId      所在位置标识码
 * @param  {[type]}       具体操作 CLK EXP SLD OTHER  默认用CLK
 * @return {[type]}            [description]
 */
var logh5 = {
    setLogName: function setLogName(logName, logCheck) {
        _logStr = logName;
        _checkStr = logCheck;
    },
    setActId: function setActId(id) {
        actId = id;
    },
    setPageId: function setPageId(id) {
        pageId = id;
    },
    goldlog: function goldlog(action, posId, param) {
        var _str = 'actId=' + actId + '&pageId=' + pageId + '&posId=' + posId;
        var setAction = action || 'CLK';

        //业务扩展参数
        var exparam = {};
        if (JSON.stringify(exparam) !== '{}') {
            _str += '&exparam=' + JSON.stringify(exparam);
        }
        //常用订阅参数{'canyu':1}
        if (param) {
            _str += '&param=' + JSON.stringify(param);
        }
        try {
            setTimeout(function () {
                window.goldlog.record(_logStr, setAction, _str, _checkStr);
            }, 500);
        } catch (e) {
            var _logUrl = '//gm.mmstat.com' + _logStr + '?' + _str;
            sendImgLog(_logUrl);
        }
    }
};

module.exports = logh5;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _logh = __webpack_require__(3);

var _logh2 = _interopRequireDefault(_logh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(0);
__webpack_require__(1);


//设置全局的
// sendlog.setLogName('/yt/ykh5.ykh5.ykh55', 'H469561542');
_logh2.default.setActId('logh5');
_logh2.default.setPageId('logh5page');
var params = {
    'canyu': 1
};

_logh2.default.goldlog('EXP', 'exposure');

//页面曝光pv/uv
// window.WindVane.call('WVPopLayer', 'display', {}, function(s){
//  sendlog.goldlog('EXP', 'exposure')
// }, function(e) {

// });

// window.WindVane.call('DJH5Player', 'videoinfo', {}, function(e) {
//   // alert('videoinfo success: ' + JSON.stringify(e.param));


//   if (e && e.param) {
//       const videoInfo = e.param['videoinfo'];

//       try {
//           const eid = videoInfo['video']['encodeid'];
//           alert(JSON.stringify(videoInfo['video']))
//       } catch (ew) {
//           console.error('data error!');
//       }
//   }

// }, function(e) {
//   alert('videoinfo failure: ' + JSON.stringify(e));
// });

//点击发送埋点
document.querySelector('.btn1').addEventListener('click', function () {
    _logh2.default.goldlog('CLK', 'clickbtn1');
});

//业务参与率
document.querySelector('.btn2').addEventListener('click', function () {
    _logh2.default.goldlog('CLK', 'clickbtn2', params);
});

/***/ })
/******/ ]);
//# sourceMappingURL=logh5.js.map?45b93c9b9d13c32764b5
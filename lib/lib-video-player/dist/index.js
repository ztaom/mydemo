'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Part of the source reference : https://github.com/videojs/video.js
                                                                                                                                                                                                                                                                               */

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _log = require('./utils/log');

var _log2 = _interopRequireDefault(_log);

var _dom = require('./utils/dom.js');

var Dom = _interopRequireWildcard(_dom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ```js
 *     var myvideo = video('my_video_id');
 * ```
 *
 * @param  {String|Element} id      video element or video element ID
 * @param  {Object=} options        Optional options object for config/settings
 * @return {Player}                 A player instance
 * @mixes video
 * @method video
 */

function video(id, options) {

  var tag = void 0; // Element of ID

  if (typeof id === 'string') {

    if (id.indexOf('#') === 0) {
      id = id.slice(1);
    }

    tag = Dom.getEl(id);
  } else {
    tag = id;
  }

  // Check for a useable element
  if (!tag || !tag.nodeName) {
    throw new TypeError('The element or ID supplied is not valid. (video)');
  }

  return new _player2.default(tag, options);
};

// Custom Universal Module Definition (UMD)
if (typeof define === 'function' && define['amd']) {
  define('video', [], function () {
    return video;
  });

  // checking that module is an object too because of umdjs/umd#35
} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') {
  module['exports'] = video;
}

window.lib || (window.lib = {});
lib.videoPlayer = video;

exports.default = video;
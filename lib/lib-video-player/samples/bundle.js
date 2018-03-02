this["@ali/lib-video-player"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Part of the source reference : https://github.com/videojs/video.js
	                                                                                                                                                                                                                                                                               */

	var _player = __webpack_require__(2);

	var _player2 = _interopRequireDefault(_player);

	var _log = __webpack_require__(6);

	var _log2 = _interopRequireDefault(_log);

	var _dom = __webpack_require__(4);

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
	if ("function" === 'function' && __webpack_require__(63)['amd']) {
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return video;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // checking that module is an object too because of umdjs/umd#35
	} else if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') {
	  module['exports'] = video;
	}

	window.lib || (window.lib = {});
	lib.videoPlayer = video;

	exports.default = video;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _controlBar = __webpack_require__(3);

	var _controlBar2 = _interopRequireDefault(_controlBar);

	var _play = __webpack_require__(58);

	var _play2 = _interopRequireDefault(_play);

	var _merge = __webpack_require__(7);

	var _merge2 = _interopRequireDefault(_merge);

	var _html = __webpack_require__(60);

	var _html2 = _interopRequireDefault(_html);

	var _emitter = __webpack_require__(44);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _log = __webpack_require__(6);

	var _log2 = _interopRequireDefault(_log);

	var _brower = __webpack_require__(62);

	var _brower2 = _interopRequireDefault(_brower);

	var _dom = __webpack_require__(4);

	var Dom = _interopRequireWildcard(_dom);

	var _guid = __webpack_require__(5);

	var Guid = _interopRequireWildcard(_guid);

	var _events = __webpack_require__(53);

	var Events = _interopRequireWildcard(_events);

	var _libWindvane = __webpack_require__(57);

	var WindVane = _interopRequireWildcard(_libWindvane);

	var _amfeEnv = __webpack_require__(46);

	var Env = _interopRequireWildcard(_amfeEnv);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//import videoStyle from "./cssrem/video.css";
	//import videoStyle from "./css/video.css";

	var Hls = window.Hls;

	var Player = function (_Emitter) {
	  _inherits(Player, _Emitter);

	  /**
	   * player's constructor function
	   *
	   * @constructs
	   * @param {Element} tag        The original video tag used for configuring options
	   * @param {Object=} options    Player options
	   */
	  function Player(tag, options) {
	    _classCallCheck(this, Player);

	    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this));

	    tag.id = _this.id_ = tag.id || 'v_video_' + Guid.newGUID();

	    _this.tag = tag || Dom.$('.lib-video');

	    _this.tagAttributes = tag && Dom.getElAttributes(tag);

	    _this.options_ = (0, _merge2.default)(_this.options_, options, Player.getTagSettings(tag), _this.tagAttributes);

	    if (_this.options_.live !== undefined) {
	      _this.options_.live = true;
	    }

	    _this.parentEl_ = _this.tag.parentNode;

	    _this.el_ = _this.createEl();

	    _this.startPlayEl = Dom.$('.vjs-center-start', _this.el_);

	    Dom.removeElClass(_this.el_, 'vjs-hidden');

	    _this.init();
	    return _this;
	  }

	  _createClass(Player, [{
	    key: 'init',
	    value: function init(isReload) {
	      // flash live not support Event/API
	      if (this.playerType == 'flash') return;

	      this.bindEvent();

	      // play danmaku
	      if (this.options_.danmakuPlayerList) {
	        this.danmakuPlay = new _play2.default(this);
	      }

	      if (this.options_['custom-controls'] !== 'false') {
	        // new ControlBar
	        !isReload && (this.controlBar = this.getControlBar());
	        // new HTML5
	        this.videoPlayer = this.getVideoPlayer();

	        this.controlBar.setPlayer(this.videoPlayer);
	      } else {
	        // new HTML5
	        this.videoPlayer = this.getVideoPlayer();
	      }

	      this.autoPlay();
	    }
	  }, {
	    key: 'autoPlay',
	    value: function autoPlay() {
	      var that = this;

	      that.videoPlayer.load();

	      if (that.options_.autoplay && !Env.os.isAndroid && !Env.browser.isSafari && Env.os.version.gte('10.0')) {
	        that.play();
	      }

	      // if(WindVane.isAvailable){
	      //   window.WindVane.call('TBBase', 'getNetworkStatus', {}, function(e) {
	      //     if(e.network === 'wifi' && !Env.os.isAndroid && that.options_.autoplay){
	      //       that.play();
	      //     }
	      //   });
	      // }
	      // else if(that.options_.autoplay){
	      //   that.play();
	      // }
	    }
	  }, {
	    key: 'bindEvent',
	    value: function bindEvent(isReload) {
	      var _this2 = this;

	      var videoDomParent = Dom.$('video', this.el_).parentNode;
	      var that = this;

	      videoDomParent.addEventListener('touchend', function (ev) {
	        return _this2.triggerPlayerClick_(ev);
	      }, true);
	      videoDomParent.addEventListener('click', function (ev) {
	        return _this2.triggerPlayerClick_(ev);
	      }, true);
	      videoDomParent.addEventListener('touchmove', function (ev) {
	        return _this2.preventTouch_(ev);
	      }, true);

	      !isReload && this.startPlayEl.addEventListener('click', function (ev) {
	        return _this2.triggerStartPlayerClick_(ev);
	      });

	      !isReload && this.on('video:error', this.error);
	      // timeupdate is ready play
	      !isReload && this.on('video:timeupdate', this.startPlay);
	      !isReload && this.on('video:pause', this.triggerPausePlay);
	    }
	  }, {
	    key: 'getVideoPlayer',
	    value: function getVideoPlayer() {
	      if (this.playerType === 'flash') {
	        // flash not support global API
	        return {};
	      } else if (this.playerType === 'html5') {
	        return new _html2.default(this);
	      }
	    }
	  }, {
	    key: 'getControlBar',
	    value: function getControlBar() {
	      return new _controlBar2.default(this);
	    }
	  }, {
	    key: 'createEl',
	    value: function createEl() {
	      var formats = this.options_.sources;
	      var currentSource = void 0;
	      var attrSrc = this.options_.src;

	      // pc terminal && not safari
	      if (!Env.os.isIOS && !Env.os.isAndroid && (0, _brower2.default)() !== 'Safari') {
	        this.playerType = 'flash';
	        currentSource = formats['rtmp/flv'] || formats['application/x-mpegURL'];

	        if (!currentSource && (currentSource = formats['video/mp4'])) {
	          this.playerType = 'html5';

	          this.currentSrc = currentSource.src;

	          return this.html5El(this.currentSrc);
	        } else if (!currentSource) {
	          this.playerType = 'html5';
	          console.error('Live video need to set up application/x-mpegURL properties');
	          return this.html5El();
	        }

	        this.currentSrc = currentSource.src;
	        // flash live use flv
	        return this.flashEl(this.currentSrc);
	      }
	      // mobile terminal && support Hls
	      else if (!currentSource && Hls && Hls.isSupported() && formats['application/x-mpegURL'] && !Env.os.isIOS && !Env.os.isAndroid && (0, _brower2.default)() !== 'Safari') {
	          this.playerType = 'html5';
	          this.currentSrc = formats['application/x-mpegURL'].src;
	          this.isDecodeHls = true;
	          return this.html5El(this.currentSrc);
	        }
	        // mobile terminal && live
	        else if (this.options_.live) {
	            this.playerType = 'html5';

	            if (!formats['application/x-mpegURL']) {
	              console.error('Live video need to set up application/x-mpegURL properties');
	              return this.html5El();
	            } else {
	              this.currentSrc = formats['application/x-mpegURL'].src;
	              return this.html5El(this.currentSrc);
	            }
	          }
	          // mobile terminal && video
	          else {
	              this.playerType = 'html5';

	              if (!(currentSource = formats['video/mp4'] || formats['application/x-mpegURL'])) {
	                if (attrSrc) {
	                  return this.html5El(attrSrc);
	                } else {
	                  console.error('video need to set up src properties');
	                  return this.html5El();
	                }
	              } else {
	                this.currentSrc = currentSource.src;
	              }

	              return this.html5El(currentSource.src);
	            }
	    }
	  }, {
	    key: 'flashEl',
	    value: function flashEl(src, removeEl) {

	      var playerSkin = '1';
	      var isLive = '0';
	      var isAutoPlay = '0';

	      if (this.options_['custom-controls'] == 'false') {
	        playerSkin = '0';
	      }

	      if (this.options_.live) {
	        isLive = '1';
	      }

	      if (this.options_.autoplay || this.options_.live) {
	        isAutoPlay = '1';
	      }

	      var tag = this.tag;
	      var el = Dom.createEl('div', {
	        className: 'vjs-flash-container',
	        innerHTML: '\n        <object width="100%" height="100%" type="application/x-shockwave-flash" data="https://g.alicdn.com/de/prismplayer-flash/1.2.7/PrismPlayer.swf?from=ataLive&autoPlay=' + isAutoPlay + '&playerSkin=' + playerSkin + '&isLive=' + isLive + '&vurl=' + src + '">\n         <param name="wmode" value="transparent">\n         <param name="allowScriptAccess" value="always">\n         <param name="allowFullScreen" value="true">\n         <param name="allowNetworking" value="all">\n         <param name="wmode" value="opaque">\n         <param name="menu" value="false">\n         <param name="flashvars" value="image=' + this.options_.poster + '" />\n         <param name="bgcolor" value="#000000">\n        </object>\n      '
	        // innerHTML : `
	        //   <object codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="100%" height="100%">
	        //    <param name="wmode" value="transparent">
	        //    <param name="FlashVars" value="from=prism_aliyun&autoPlay=${isAutoPlay}&playerSkin=${playerSkin}&isLive=${isLive}&vurl=${src}">
	        //    <param name="allowScriptAccess" value="always">
	        //    <param name="allowFullScreen" value="true">
	        //    <param name="allowNetworking" value="all">
	        //    <param name="wmode" value="opaque">
	        //    <param name="menu" value="false">
	        //    <param name="bgcolor" value="#000000">
	        //    <embed src="//g.alicdn.com/de/prismplayer-flash/1.2.7/PrismPlayer.swf" quality="high" pluginspage="//www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true" allowfullscreeninteractive="true" wmode="opaque" flashvars="autoPlay=1&from=prism_aliyun&isInner=0&actRequest=1&vid=undefined&domain=//tv.taobao.com&statisticService=//videocloud.cn-hangzhou.log.aliyuncs.com/logstores/player/track&videoInfoService=/player/json/getBaseVideoInfo.do&disablePing=0&namespace=prism-player-FE094E36-F915-4F14-AFB1-2636F2FE0E61&barMode=1&isLive=1&waterMark=&vurl=http%3A%2F%2Ftbflive.alicdn.com%2Fmediaplatform%2Fb7b6683a-d1d7-4526-938e-19e1fac6f98a.flv%3Fauth_key%3D1481268866-0-0-b18ecbcf5d2ac2ba7dbb3a7cca60c9d3&plugins=&snapShotShow=0&accessId=&accessKey=&stsToken=&domainRegion=&authInfo=&formats=&notShowTips=0&showBarTime=0&encryp=&secret="/>
	        //   </object>
	        // `
	      });

	      this.copyElAttr(el);
	      this.parentEl_.removeChild(removeEl || tag);
	      Dom.appendContent(this.parentEl_, el);
	      Dom.removeElClass(el, 'vjs-hidden');
	      return el;
	    }
	  }, {
	    key: 'html5El',
	    value: function html5El(src) {
	      var el = this.el_ = Dom.createEl('div');
	      var videoEL = Dom.createEl('video');
	      var tag = this.tag;
	      var width = tag.style.width;
	      var height = tag.style.height;
	      var poster = tag.poster;
	      var centerBtnEl = Dom.createEl('div', {
	        className: 'vjs-center-container',
	        innerHTML: '\n        <button class="vjs-center-load vjs-button" role="button" type="button">\n          <span class="vjs-control-text">Load</span>\n        </button>\n        <button class="vjs-center-start vjs-button" role="button" type="button">\n          <span class="vjs-control-text">start</span>\n        </button>\n      '
	      });

	      var mockMaskEl = Dom.createEl('div', {
	        className: 'vjs-mock-mask'
	      });

	      var mockUCPoster = Dom.createEl('div', {
	        className: 'vjs-center-poster'
	      });

	      mockUCPoster.style.backgroundImage = 'url(' + poster + ')';

	      this.copyElAttr(el);
	      this.copyVideoElAttr(videoEL, tag);

	      videoEL.playerId = tag.id;
	      videoEL.id += '_html5_api';
	      videoEL.className = 'v-tech';
	      videoEL.player = el.player = this;

	      if (src) {
	        videoEL.src = src;
	      }
	      videoEL.poster = '';
	      videoEL.setAttribute('playsinline', 'playsinline');
	      videoEL.setAttribute('webkit-playsinline', 'webkit-playsinline');

	      Dom.appendContent(el, centerBtnEl);
	      Dom.appendContent(el, mockMaskEl);

	      //if(this.checkUC()){
	      // UC mock poster
	      Dom.appendContent(el, mockUCPoster);
	      //}

	      if (tag.parentNode) {
	        tag.parentNode.replaceChild(videoEL, tag);
	        videoEL.parentNode.insertBefore(el, videoEL);
	      }

	      Dom.insertElFirst(videoEL, el);

	      this.tag = videoEL;

	      return el;
	    }
	  }, {
	    key: 'copyElAttr',
	    value: function copyElAttr(el) {
	      var attrs = Dom.getElAttributes(this.tag);
	      Object.getOwnPropertyNames(attrs).forEach(function (attr) {
	        if (attr === 'class') {
	          el.className += ' ' + attrs[attr];
	        }
	      });
	    }
	  }, {
	    key: 'copyVideoElAttr',
	    value: function copyVideoElAttr(newel, oldel) {
	      var attrs = Dom.getElAttributes(oldel);
	      Dom.setElAttributes(newel, attrs);
	    }
	  }, {
	    key: 'startPlay',
	    value: function startPlay(e) {
	      var _this3 = this;

	      if (this.startPlayed) {
	        return;
	      }

	      var posterNode = Dom.$('.vjs-center-poster', this.el_);
	      var exe = function exe() {

	        (0, _log2.default)('Player::startPlay()');
	        Dom.addElClass(_this3.el_, 'vjs-has-started');
	        Dom.removeElClass(_this3.el_, 'vjs-has-paused');
	        posterNode && Dom.addElClass(posterNode, 'vjs-hidden');
	        _this3.controlBar && _this3.controlBar.emit('video:realPlay');
	        _this3.startPlayed = true;
	        _this3.videoLoading = false;
	      };

	      exe();

	      // this.emit('video:play');
	    }
	  }, {
	    key: 'triggerPlayerClick_',
	    value: function triggerPlayerClick_(e) {
	      // this.touchend = false;
	      if (e.target.nodeName.toUpperCase() !== 'VIDEO' && e.target.className !== 'vjs-danmaku-container') {
	        return;
	      }

	      if (e.type == 'touchend') {
	        this.touchend = true;
	      }

	      // support pc && hack uc fullscreen
	      if (e.type == 'click' && this.touchend) {
	        return;
	      }

	      if (!this.checkUC()) {
	        //e && e.preventDefault();
	      }

	      (0, _log2.default)('Player::triggerPlayerClick_()');

	      this.controlBar && this.controlBar.triggerShowHideBar();
	    }
	  }, {
	    key: 'triggerStartPlayerClick_',
	    value: function triggerStartPlayerClick_(e) {
	      e && e.preventDefault();
	      (0, _log2.default)('Player::triggerStartPlayerClick_()');

	      var targetDom = e && e.target || this.startPlayEl;

	      Dom.addElClass(targetDom.parentNode, 'loading');

	      this.videoLoading = true;

	      this.videoPlayer.play();
	    }
	  }, {
	    key: 'triggerPausePlay',
	    value: function triggerPausePlay() {
	      var _this4 = this;

	      var parentNode = this.startPlayEl.parentNode;
	      Dom.removeElClass(this.startPlayEl.parentNode, 'loading');
	      this.videoLoading = false;

	      Dom.removeElClass(this.el_, 'vjs-has-started');
	      Dom.addElClass(this.el_, 'vjs-has-paused');
	      setTimeout(function () {
	        _this4.startPlayed = false;
	      }, 100);
	    }
	  }, {
	    key: 'checkUC',
	    value: function checkUC() {
	      var uc = navigator.userAgent.match(/UCBrowser/);

	      if (Env.aliapp && uc) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'preventTouch_',
	    value: function preventTouch_(e) {
	      //e.preventDefault();
	    }
	  }, {
	    key: 'error',
	    value: function error() {
	      Dom.addElClass(this.el_, 'vjs-error');

	      Dom.removeElClass(this.startPlayEl.parentNode, 'loading');

	      this.videoLoading = false;
	    }

	    /**
	     * Gets tag settings
	     *
	     * @param {Element} tag The player tag
	     * @return {Array} An array of sources and track objects
	     * @static
	     * @method getTagSettings
	     */

	  }, {
	    key: 'enterFullscreen',
	    value: function enterFullscreen() {
	      this.fullscreen = true;
	      this.controlBar && this.controlBar.fullscreenButton();
	    }
	  }, {
	    key: 'exitFullscreen',
	    value: function exitFullscreen() {
	      if (this.fullscreen) {
	        return;
	      }
	      this.fullscreen = false;
	      this.controlBar && this.controlBar.fullscreenButton();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.videoPlayer.pause();
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      if (this.playerType === 'flash') {
	        this.reloadFlash_();
	      } else if (this.playerType === 'html5') {
	        this.triggerStartPlayerClick_();
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.playerType === 'html5') {
	        this.videoPlayer.stop();
	      }
	    }
	  }, {
	    key: 'getVideoEl',
	    value: function getVideoEl() {
	      return this.tag;
	    }
	  }, {
	    key: 'removeVideoEl',
	    value: function removeVideoEl() {
	      // return this.el_.remove(); 
	      this.videoPlayer.pause();
	      this.el_.remove();
	    }
	  }, {
	    key: 'setTimelineTag',
	    value: function setTimelineTag(time) {
	      return this.controlBar.controlProgress.setTimeline(time);
	    }
	  }, {
	    key: 'reload',
	    value: function reload(src) {
	      if (this.playerType === 'flash') {
	        this.reloadFlash_(src);
	      } else if (this.playerType === 'html5') {
	        this.reloadHtml5_(src);
	      }
	    }
	  }, {
	    key: 'reloadFlash_',
	    value: function reloadFlash_(src) {
	      this.flashEl(src || this.currentSrc, Dom.$('.vjs-flash-container', this.el_.parentEl_));
	    }
	  }, {
	    key: 'reloadHtml5_',
	    value: function reloadHtml5_(src) {
	      if (!this.videoPlayer.el_) {
	        console.error('Unable to find a video element');
	        return;
	      }

	      if (src) {
	        this.currentSrc = src;
	      }

	      if (this.currentSrc) {
	        this.videoPlayer.setSrc(this.currentSrc);
	      }

	      this.videoPlayer.load();
	      this.videoPlayer.currentTime = 0;

	      if (this.startPlayed) {
	        this.triggerStartPlayerClick_();
	      } else if (!Env.os.isAndroid && this.options_.autoplay) {
	        this.triggerStartPlayerClick_();
	      }
	    }
	  }], [{
	    key: 'getTagSettings',
	    value: function getTagSettings(tag) {
	      var baseOptions = {
	        'sources': {}
	      };

	      var tagOptions = Dom.getElAttributes(tag);

	      // Get tag children settings
	      if (tag.hasChildNodes()) {
	        var children = tag.childNodes;

	        for (var i = 0, j = children.length; i < j; i++) {
	          var child = children[i];
	          var childName = child.nodeName.toLowerCase();
	          if (childName === 'source') {
	            baseOptions.sources[child.type] = child;
	          }
	        }
	      }

	      return baseOptions;
	    }
	  }]);

	  return Player;
	}(_emitter2.default);

	exports.default = Player;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dom = __webpack_require__(4);

	var Dom = _interopRequireWildcard(_dom);

	var _merge = __webpack_require__(7);

	var _merge2 = _interopRequireDefault(_merge);

	var _emitter = __webpack_require__(44);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _log = __webpack_require__(6);

	var _log2 = _interopRequireDefault(_log);

	var _progress = __webpack_require__(45);

	var _progress2 = _interopRequireDefault(_progress);

	var _events = __webpack_require__(53);

	var Events = _interopRequireWildcard(_events);

	var _amfeEnv = __webpack_require__(46);

	var Env = _interopRequireWildcard(_amfeEnv);

	var _libWindvane = __webpack_require__(57);

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$$ = exports.$ = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.getEl = getEl;
	exports.createEl = createEl;
	exports.textContent = textContent;
	exports.insertElFirst = insertElFirst;
	exports.getElData = getElData;
	exports.hasElData = hasElData;
	exports.removeElData = removeElData;
	exports.hasElClass = hasElClass;
	exports.addElClass = addElClass;
	exports.removeElClass = removeElClass;
	exports.toggleElClass = toggleElClass;
	exports.setElAttributes = setElAttributes;
	exports.getElAttributes = getElAttributes;
	exports.blockTextSelection = blockTextSelection;
	exports.unblockTextSelection = unblockTextSelection;
	exports.findElPosition = findElPosition;
	exports.getPointerPosition = getPointerPosition;
	exports.isEl = isEl;
	exports.isTextNode = isTextNode;
	exports.emptyEl = emptyEl;
	exports.normalizeContent = normalizeContent;
	exports.appendContent = appendContent;
	exports.insertContent = insertContent;

	var _guid = __webpack_require__(5);

	var Guid = _interopRequireWildcard(_guid);

	var _log = __webpack_require__(6);

	var _log2 = _interopRequireDefault(_log);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/**
	 * Detect if a value is a string with any non-whitespace characters.
	 *
	 * @param  {String} str
	 * @return {Boolean}
	 */
	function isNonBlankString(str) {
	  return typeof str === 'string' && /\S/.test(str);
	}

	/**
	 * Throws an error if the passed string has whitespace. This is used by
	 * class methods to be relatively consistent with the classList API.
	 *
	 * @param  {String} str
	 * @return {Boolean}
	 */
	function throwIfWhitespace(str) {
	  if (/\s/.test(str)) {
	    throw new Error('class has illegal whitespace characters');
	  }
	}

	/**
	 * Produce a regular expression for matching a class name.
	 *
	 * @param  {String} className
	 * @return {RegExp}
	 */
	function classRegExp(className) {
	  return new RegExp('(^|\\s)' + className + '($|\\s)');
	}

	/**
	 * Creates functions to query the DOM using a given method.
	 *
	 * @function createQuerier
	 * @private
	 * @param  {String} method
	 * @return {Function}
	 */
	function createQuerier(method) {
	  return function (selector, context) {
	    if (!isNonBlankString(selector)) {
	      return document[method](null);
	    }
	    if (isNonBlankString(context)) {
	      context = document.querySelector(context);
	    }
	    return (isEl(context) ? context : document)[method](selector);
	  };
	}

	/**
	 * Shorthand for document.getElementById()
	 * Also allows for CSS (jQuery) ID syntax. But nothing other than IDs.
	 *
	 * @param  {String} id  Element ID
	 * @return {Element}    Element with supplied ID
	 * @function getEl
	 */
	function getEl(id) {
	  if (id.indexOf('#') === 0) {
	    id = id.slice(1);
	  }

	  return document.getElementById(id);
	}

	/**
	 * Creates an element and applies properties.
	 *
	 * @param  {String} [tagName='div'] Name of tag to be created.
	 * @param  {Object} [properties={}] Element properties to be applied.
	 * @param  {Object} [attributes={}] Element attributes to be applied.
	 * @return {Element}
	 * @function createEl
	 */
	function createEl() {
	  var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
	  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  var el = document.createElement(tagName);

	  Object.getOwnPropertyNames(properties).forEach(function (propName) {
	    var val = properties[propName];

	    // See #2176
	    // We originally were accepting both properties and attributes in the
	    // same object, but that doesn't work so well.
	    if (propName.indexOf('aria-') !== -1 || propName === 'role' || propName === 'type') {
	      // log.warn(tsml`Setting attributes in the second argument of createEl()
	      //           has been deprecated. Use the third argument instead.
	      //           createEl(type, properties, attributes). Attempting to set ${propName} to ${val}.`);
	      el.setAttribute(propName, val);
	    } else {
	      el[propName] = val;
	    }
	  });

	  Object.getOwnPropertyNames(attributes).forEach(function (attrName) {
	    var val = attributes[attrName];
	    el.setAttribute(attrName, attributes[attrName]);
	  });

	  return el;
	}

	/**
	 * Injects text into an element, replacing any existing contents entirely.
	 *
	 * @param  {Element} el
	 * @param  {String} text
	 * @return {Element}
	 * @function textContent
	 */
	function textContent(el, text) {
	  if (typeof el.textContent === 'undefined') {
	    el.innerText = text;
	  } else {
	    el.textContent = text;
	  }
	}

	/**
	 * Insert an element as the first child node of another
	 *
	 * @param  {Element} child   Element to insert
	 * @param  {Element} parent Element to insert child into
	 * @private
	 * @function insertElFirst
	 */
	function insertElFirst(child, parent) {
	  if (parent.firstChild) {
	    parent.insertBefore(child, parent.firstChild);
	  } else {
	    parent.appendChild(child);
	  }
	}

	/**
	 * Element Data Store. Allows for binding data to an element without putting it directly on the element.
	 * Ex. Event listeners are stored here.
	 * (also from jsninja.com, slightly modified and updated for closure compiler)
	 *
	 * @type {Object}
	 * @private
	 */
	var elData = {};

	/*
	 * Unique attribute name to store an element's guid in
	 *
	 * @type {String}
	 * @constant
	 * @private
	 */
	var elIdAttr = 'vdata' + new Date().getTime();

	/**
	 * Returns the cache object where data for an element is stored
	 *
	 * @param  {Element} el Element to store data for.
	 * @return {Object}
	 * @function getElData
	 */
	function getElData(el) {
	  var id = el[elIdAttr];

	  if (!id) {
	    id = el[elIdAttr] = Guid.newGUID();
	  }

	  if (!elData[id]) {
	    elData[id] = {};
	  }

	  return elData[id];
	}

	/**
	 * Returns whether or not an element has cached data
	 *
	 * @param  {Element} el A dom element
	 * @return {Boolean}
	 * @private
	 * @function hasElData
	 */
	function hasElData(el) {
	  var id = el[elIdAttr];

	  if (!id) {
	    return false;
	  }

	  return !!Object.getOwnPropertyNames(elData[id]).length;
	}

	/**
	 * Delete data for the element from the cache and the guid attr from getElementById
	 *
	 * @param  {Element} el Remove data for an element
	 * @private
	 * @function removeElData
	 */
	function removeElData(el) {
	  var id = el[elIdAttr];

	  if (!id) {
	    return;
	  }

	  // Remove all stored data
	  delete elData[id];

	  // Remove the elIdAttr property from the DOM node
	  try {
	    delete el[elIdAttr];
	  } catch (e) {
	    if (el.removeAttribute) {
	      el.removeAttribute(elIdAttr);
	    } else {
	      // IE doesn't appear to support removeAttribute on the document element
	      el[elIdAttr] = null;
	    }
	  }
	}

	/**
	 * Check if an element has a CSS class
	 *
	 * @function hasElClass
	 * @param {Element} element Element to check
	 * @param {String} classToCheck Classname to check
	 */
	function hasElClass(element, classToCheck) {
	  if (element.classList) {
	    return element.classList.contains(classToCheck);
	  } else {
	    throwIfWhitespace(classToCheck);
	    return classRegExp(classToCheck).test(element.className);
	  }
	}

	/**
	 * Add a CSS class name to an element
	 *
	 * @function addElClass
	 * @param {Element} element    Element to add class name to
	 * @param {String} classToAdd Classname to add
	 */
	function addElClass(element, classToAdd) {
	  if (element.classList) {
	    element.classList.add(classToAdd);

	    // Don't need to `throwIfWhitespace` here because `hasElClass` will do it
	    // in the case of classList not being supported.
	  } else if (!hasElClass(element, classToAdd)) {
	    element.className = (element.className + ' ' + classToAdd).trim();
	  }

	  return element;
	}

	/**
	 * Remove a CSS class name from an element
	 *
	 * @function removeElClass
	 * @param {Element} element    Element to remove from class name
	 * @param {String} classToRemove Classname to remove
	 */
	function removeElClass(element, classToRemove) {
	  if (element.classList) {
	    element.classList.remove(classToRemove);
	  } else {
	    throwIfWhitespace(classToRemove);
	    element.className = element.className.split(/\s+/).filter(function (c) {
	      return c !== classToRemove;
	    }).join(' ');
	  }

	  return element;
	}

	/**
	 * Adds or removes a CSS class name on an element depending on an optional
	 * condition or the presence/absence of the class name.
	 *
	 * @function toggleElClass
	 * @param    {Element} element
	 * @param    {String} classToToggle
	 * @param    {Boolean|Function} [predicate]
	 *           Can be a function that returns a Boolean. If `true`, the class
	 *           will be added; if `false`, the class will be removed. If not
	 *           given, the class will be added if not present and vice versa.
	 */
	function toggleElClass(element, classToToggle, predicate) {

	  // This CANNOT use `classList` internally because IE does not support the
	  // second parameter to the `classList.toggle()` method! Which is fine because
	  // `classList` will be used by the add/remove functions.
	  var has = hasElClass(element, classToToggle);

	  if (typeof predicate === 'function') {
	    predicate = predicate(element, classToToggle);
	  }

	  if (typeof predicate !== 'boolean') {
	    predicate = !has;
	  }

	  // If the necessary class operation matches the current state of the
	  // element, no action is required.
	  if (predicate === has) {
	    return;
	  }

	  if (predicate) {
	    addElClass(element, classToToggle);
	  } else {
	    removeElClass(element, classToToggle);
	  }

	  return element;
	}

	/**
	 * Apply attributes to an HTML element.
	 *
	 * @param  {Element} el         Target element.
	 * @param  {Object=} attributes Element attributes to be applied.
	 * @private
	 * @function setElAttributes
	 */
	function setElAttributes(el, attributes) {
	  Object.getOwnPropertyNames(attributes).forEach(function (attrName) {
	    var attrValue = attributes[attrName];

	    if (attrValue === null || typeof attrValue === 'undefined' || attrValue === false) {
	      el.removeAttribute(attrName);
	    } else {
	      el.setAttribute(attrName, attrValue === true ? '' : attrValue);
	    }
	  });
	}

	/**
	 * Get an element's attribute values, as defined on the HTML tag
	 * Attributes are not the same as properties. They're defined on the tag
	 * or with setAttribute (which shouldn't be used with HTML)
	 * This will return true or false for boolean attributes.
	 *
	 * @param  {Element} tag Element from which to get tag attributes
	 * @return {Object}
	 * @private
	 * @function getElAttributes
	 */
	function getElAttributes(tag) {
	  var obj, knownBooleans, attrs, attrName, attrVal;

	  obj = {};

	  // known boolean attributes
	  // we can check for matching boolean properties, but older browsers
	  // won't know about HTML5 boolean attributes that we still read from
	  knownBooleans = ',' + 'autoplay,controls,loop,muted,default' + ',';

	  if (tag && tag.attributes && tag.attributes.length > 0) {
	    attrs = tag.attributes;

	    for (var i = attrs.length - 1; i >= 0; i--) {
	      attrName = attrs[i].name;
	      attrVal = attrs[i].value;

	      // check for known booleans
	      // the matching element property will return a value for typeof
	      if (typeof tag[attrName] === 'boolean' || knownBooleans.indexOf(',' + attrName + ',') !== -1) {
	        // the value of an included boolean attribute is typically an empty
	        // string ('') which would equal false if we just check for a false value.
	        // we also don't want support bad code like autoplay='false'
	        attrVal = attrVal !== null ? true : false;
	      }

	      obj[attrName] = attrVal;
	    }
	  }

	  return obj;
	}

	/**
	 * Attempt to block the ability to select text while dragging controls
	 *
	 * @return {Boolean}
	 * @function blockTextSelection
	 */
	function blockTextSelection() {
	  document.body.focus();
	  document.onselectstart = function () {
	    return false;
	  };
	}

	/**
	 * Turn off text selection blocking
	 *
	 * @return {Boolean}
	 * @function unblockTextSelection
	 */
	function unblockTextSelection() {
	  document.onselectstart = function () {
	    return true;
	  };
	}

	/**
	 * Offset Left
	 * getBoundingClientRect technique from
	 * John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
	 *
	 * @function findElPosition
	 * @param {Element} el Element from which to get offset
	 * @return {Object}
	 */
	function findElPosition(el) {
	  var box = void 0;

	  if (el.getBoundingClientRect && el.parentNode) {
	    box = el.getBoundingClientRect();
	  }

	  if (!box) {
	    return {
	      left: 0,
	      top: 0
	    };
	  }

	  var docEl = document.documentElement;
	  var body = document.body;

	  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
	  var scrollLeft = window.pageXOffset || body.scrollLeft;
	  var left = box.left + scrollLeft - clientLeft;

	  var clientTop = docEl.clientTop || body.clientTop || 0;
	  var scrollTop = window.pageYOffset || body.scrollTop;
	  var top = box.top + scrollTop - clientTop;

	  // Android sometimes returns slightly off decimal values, so need to round
	  return {
	    left: Math.round(left),
	    top: Math.round(top)
	  };
	}

	/**
	 * Get pointer position in element
	 * Returns an object with x and y coordinates.
	 * The base on the coordinates are the bottom left of the element.
	 *
	 * @function getPointerPosition
	 * @param {Element} el Element on which to get the pointer position on
	 * @param {Event} event Event object
	 * @return {Object} This object will have x and y coordinates corresponding to the mouse position
	 */
	function getPointerPosition(el, event) {
	  var position = {};
	  var box = findElPosition(el);
	  var boxW = el.offsetWidth;
	  var boxH = el.offsetHeight;

	  var boxY = box.top;
	  var boxX = box.left;
	  var pageY = event.pageY;
	  var pageX = event.pageX;

	  if (event.changedTouches) {
	    pageX = event.changedTouches[0].pageX;
	    pageY = event.changedTouches[0].pageY;
	  }

	  position.y = Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH));
	  position.x = Math.max(0, Math.min(1, (pageX - boxX) / boxW));

	  return position;
	}

	/**
	 * Determines, via duck typing, whether or not a value is a DOM element.
	 *
	 * @function isEl
	 * @param    {Mixed} value
	 * @return   {Boolean}
	 */
	function isEl(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.nodeType === 1;
	}

	/**
	 * Determines, via duck typing, whether or not a value is a text node.
	 *
	 * @param  {Mixed} value
	 * @return {Boolean}
	 */
	function isTextNode(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.nodeType === 3;
	}

	/**
	 * Empties the contents of an element.
	 *
	 * @function emptyEl
	 * @param    {Element} el
	 * @return   {Element}
	 */
	function emptyEl(el) {
	  while (el.firstChild) {
	    el.removeChild(el.firstChild);
	  }
	  return el;
	}

	/**
	 * Normalizes content for eventual insertion into the DOM.
	 *
	 * This allows a wide range of content definition methods, but protects
	 * from falling into the trap of simply writing to `innerHTML`, which is
	 * an XSS concern.
	 *
	 * The content for an element can be passed in multiple types and
	 * combinations, whose behavior is as follows:
	 *
	 * - String
	 *   Normalized into a text node.
	 *
	 * - Element, TextNode
	 *   Passed through.
	 *
	 * - Array
	 *   A one-dimensional array of strings, elements, nodes, or functions (which
	 *   return single strings, elements, or nodes).
	 *
	 * - Function
	 *   If the sole argument, is expected to produce a string, element,
	 *   node, or array.
	 *
	 * @function normalizeContent
	 * @param    {String|Element|TextNode|Array|Function} content
	 * @return   {Array}
	 */
	function normalizeContent(content) {

	  // First, invoke content if it is a function. If it produces an array,
	  // that needs to happen before normalization.
	  if (typeof content === 'function') {
	    content = content();
	  }

	  // Next up, normalize to an array, so one or many items can be normalized,
	  // filtered, and returned.
	  return (Array.isArray(content) ? content : [content]).map(function (value) {

	    // First, invoke value if it is a function to produce a new value,
	    // which will be subsequently normalized to a Node of some kind.
	    if (typeof value === 'function') {
	      value = value();
	    }

	    if (isEl(value) || isTextNode(value)) {
	      return value;
	    }

	    if (typeof value === 'string' && /\S/.test(value)) {
	      return document.createTextNode(value);
	    }
	  }).filter(function (value) {
	    return value;
	  });
	}

	/**
	 * Normalizes and appends content to an element.
	 *
	 * @function appendContent
	 * @param    {Element} el
	 * @param    {String|Element|TextNode|Array|Function} content
	 *           See: `normalizeContent`
	 * @return   {Element}
	 */
	function appendContent(el, content) {
	  normalizeContent(content).forEach(function (node) {
	    return el.appendChild(node);
	  });
	  return el;
	}

	/**
	 * Normalizes and inserts content into an element; this is identical to
	 * `appendContent()`, except it empties the element first.
	 *
	 * @function insertContent
	 * @param    {Element} el
	 * @param    {String|Element|TextNode|Array|Function} content
	 *           See: `normalizeContent`
	 * @return   {Element}
	 */
	function insertContent(el, content) {
	  return appendContent(emptyEl(el), content);
	}

	/**
	 * Finds a single DOM element matching `selector` within the optional
	 * `context` of another DOM element (defaulting to `document`).
	 *
	 * @function $
	 * @param    {String} selector
	 *           A valid CSS selector, which will be passed to `querySelector`.
	 *
	 * @param    {Element|String} [context=document]
	 *           A DOM element within which to query. Can also be a selector
	 *           string in which case the first matching element will be used
	 *           as context. If missing (or no element matches selector), falls
	 *           back to `document`.
	 *
	 * @return   {Element|null}
	 */
	var $ = exports.$ = createQuerier('querySelector');

	/**
	 * Finds a all DOM elements matching `selector` within the optional
	 * `context` of another DOM element (defaulting to `document`).
	 *
	 * @function $$
	 * @param    {String} selector
	 *           A valid CSS selector, which will be passed to `querySelectorAll`.
	 *
	 * @param    {Element|String} [context=document]
	 *           A DOM element within which to query. Can also be a selector
	 *           string in which case the first matching element will be used
	 *           as context. If missing (or no element matches selector), falls
	 *           back to `document`.
	 *
	 * @return   {NodeList}
	 */
	var $$ = exports.$$ = createQuerier('querySelectorAll');

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newGUID = newGUID;
	/**
	 * Unique ID for an element or function
	 * @type {Number}
	 * @private
	 */
	var _guid = 1;

	/**
	 * Get the next unique ID
	 *
	 * @return {String} 
	 * @function newGUID
	 */
	function newGUID() {
	  return _guid++;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Log plain debug messages
	 */
	var log = function log() {
	  if (!window.libVideoPlayerDebug) {
	    return;
	  }
	  _logType(null, arguments);
	};

	/**
	 * Keep a history of log messages
	 * @type {Array}
	 */
	log.history = [];

	/**
	 * Log error messages
	 */
	log.error = function () {
	  _logType('error', arguments);
	};

	/**
	 * Log warning messages
	 */
	log.warn = function () {
	  _logType('warn', arguments);
	};

	/**
	 * Log messages to the console and history based on the type of message
	 *
	 * @param  {String} type The type of message, or `null` for `log`
	 * @param  {Object} args The args to be passed to the log
	 * @private
	 * @method _logType
	 */
	function _logType(type, args) {
	  // convert args to an array to get array functions
	  var argsArray = Array.prototype.slice.call(args);
	  // if there's no console then don't try to output messages
	  // they will still be stored in log.history
	  // Was setting these once outside of this function, but containing them
	  // in the function makes it easier to test cases where console doesn't exist
	  var noop = function noop() {};

	  var console = window['console'] || {
	    'log': noop,
	    'warn': noop,
	    'error': noop
	  };

	  if (type) {
	    // add the type to the front of the message
	    argsArray.unshift(type.toUpperCase() + ':');
	  } else {
	    // default to log with no prefix
	    type = 'log';
	  }

	  // add to history
	  log.history.push(argsArray);

	  // add console prefix after adding to history
	  argsArray.unshift('LIB-PLAYER-VIDEO:');

	  // call appropriate log function
	  if (console[type].apply) {
	    console[type].apply(console, argsArray);
	  } else {
	    // ie8 doesn't allow error.apply, but it will just join() the array anyway
	    console[type](argsArray.join(' '));
	  }
	}

	exports.default = log;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = mergeOptions;

	var _merge = __webpack_require__(8);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isPlain(obj) {
	  return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.toString() === '[object Object]' && obj.constructor === Object;
	}

	/**
	 * Merge customizer. video.js simply overwrites non-simple objects
	 * (like arrays) instead of attempting to overlay them.
	 * @see https://lodash.com/docs#merge
	 */
	var customizer = function customizer(destination, source) {
	  // If we're not working with a plain object, copy the value as is
	  // If source is an array, for instance, it will replace destination
	  if (!isPlain(source)) {
	    return source;
	  }

	  // If the new value is a plain object but the first object value is not
	  // we need to create a new object for the first object to merge with.
	  // This makes it consistent with how merge() works by default
	  // and also protects from later changes the to first object affecting
	  // the second object's values.
	  if (!isPlain(destination)) {
	    return mergeOptions(source);
	  }
	};

	/**
	 * Merge one or more options objects, recursively merging **only**
	 * plain object properties.  Previously `deepMerge`.
	 *
	 * @param  {...Object} source One or more objects to merge
	 * @returns {Object}          a new object that is the union of all
	 * provided objects
	 * @function mergeOptions
	 */
	function mergeOptions() {
	  // contruct the call dynamically to handle the variable number of
	  // objects to merge
	  var args = Array.prototype.slice.call(arguments);

	  // unshift an empty object into the front of the call as the target
	  // of the merge
	  args.unshift({});

	  // customize conflict resolution to match our historical merge behavior
	  args.push(customizer);

	  _merge2.default.apply(null, args);

	  // return the mutated result object
	  return args[0];
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseMerge = __webpack_require__(9),
	    createAssigner = __webpack_require__(39);

	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);

	module.exports = merge;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(10),
	    baseMergeDeep = __webpack_require__(11),
	    isArray = __webpack_require__(23),
	    isArrayLike = __webpack_require__(14),
	    isObject = __webpack_require__(18),
	    isObjectLike = __webpack_require__(20),
	    isTypedArray = __webpack_require__(34),
	    keys = __webpack_require__(37);

	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);

	  arrayEach(props || source, function (srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    } else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || isSrcArr && !(key in object)) && (isCommon || (result === result ? result !== value : value === value))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}

	module.exports = baseMerge;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayCopy = __webpack_require__(12),
	    isArguments = __webpack_require__(13),
	    isArray = __webpack_require__(23),
	    isArrayLike = __webpack_require__(14),
	    isPlainObject = __webpack_require__(28),
	    isTypedArray = __webpack_require__(34),
	    toPlainObject = __webpack_require__(35);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];

	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;

	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value) ? value : isArrayLike(value) ? arrayCopy(value) : [];
	    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value) ? toPlainObject(value) : isPlainObject(value) ? value : {};
	    } else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? result !== value : value === value) {
	    object[key] = result;
	  }
	}

	module.exports = baseMergeDeep;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(14),
	    isObjectLike = __webpack_require__(20);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	    return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(15),
	    isLength = __webpack_require__(22);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(16);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toObject = __webpack_require__(17);

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : toObject(object)[key];
	  };
	}

	module.exports = baseProperty;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(18),
	    isString = __webpack_require__(19),
	    support = __webpack_require__(21);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  if (support.unindexedChars && isString(value)) {
	    var index = -1,
	        length = value.length,
	        result = Object(value);

	    while (++index < length) {
	      result[index] = value.charAt(index);
	    }
	    return result;
	  }
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObjectLike = __webpack_require__(20);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || isObjectLike(value) && objToString.call(value) == stringTag;
	}

	module.exports = isString;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	module.exports = isObjectLike;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	/** Used for native method references. */
	var arrayProto = Array.prototype,
	    errorProto = Error.prototype,
	    objectProto = Object.prototype;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;

	/**
	 * An object environment feature flags.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var support = {};

	(function (x) {
	  var Ctor = function Ctor() {
	    this.x = x;
	  },
	      object = { '0': x, 'length': x },
	      props = [];

	  Ctor.prototype = { 'valueOf': x, 'y': x };
	  for (var key in new Ctor()) {
	    props.push(key);
	  }

	  /**
	   * Detect if `name` or `message` properties of `Error.prototype` are
	   * enumerable by default (IE < 9, Safari < 5.1).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');

	  /**
	   * Detect if `prototype` properties are enumerable by default.
	   *
	   * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
	   * (if the prototype or a property on the prototype has been set)
	   * incorrectly set the `[[Enumerable]]` value of a function's `prototype`
	   * property to `true`.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');

	  /**
	   * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
	   *
	   * In IE < 9 an object's own properties, shadowing non-enumerable ones,
	   * are made non-enumerable as well (a.k.a the JScript `[[DontEnum]]` bug).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.nonEnumShadows = !/valueOf/.test(props);

	  /**
	   * Detect if own properties are iterated after inherited properties (IE < 9).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.ownLast = props[0] != 'x';

	  /**
	   * Detect if `Array#shift` and `Array#splice` augment array-like objects
	   * correctly.
	   *
	   * Firefox < 10, compatibility modes of IE 8, and IE < 9 have buggy Array
	   * `shift()` and `splice()` functions that fail to remove the last element,
	   * `value[0]`, of array-like objects even though the "length" property is
	   * set to `0`. The `shift()` method is buggy in compatibility modes of IE 8,
	   * while `splice()` is buggy regardless of mode in IE < 9.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.spliceObjects = (splice.call(object, 0, 1), !object[0]);

	  /**
	   * Detect lack of support for accessing string characters by index.
	   *
	   * IE < 8 can't access characters by index. IE 8 can only access characters
	   * by index on string literals, not string objects.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.unindexedChars = 'x'[0] + Object('x')[0] != 'xx';
	})(1, 0);

	module.exports = support;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(24),
	    isLength = __webpack_require__(22),
	    isObjectLike = __webpack_require__(20);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function (value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isNative = __webpack_require__(25);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(26),
	    isHostObject = __webpack_require__(27),
	    isObjectLike = __webpack_require__(20);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	module.exports = isNative;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(18);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	var isHostObject = function () {
	  try {
	    Object({ 'toString': 0 } + '');
	  } catch (e) {
	    return function () {
	      return false;
	    };
	  }
	  return function (value) {
	    // IE < 9 presents many host objects as `Object` objects that can coerce
	    // to strings despite having improperly defined `toString` methods.
	    return typeof value.toString != 'function' && typeof (value + '') == 'string';
	  };
	}();

	module.exports = isHostObject;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForIn = __webpack_require__(29),
	    isArguments = __webpack_require__(13),
	    isHostObject = __webpack_require__(27),
	    isObjectLike = __webpack_require__(20),
	    support = __webpack_require__(21);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  var Ctor;

	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isHostObject(value) && !isArguments(value)) || !hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  if (support.ownLast) {
	    baseForIn(value, function (subValue, key, object) {
	      result = hasOwnProperty.call(object, key);
	      return false;
	    });
	    return result !== false;
	  }
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function (subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}

	module.exports = isPlainObject;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFor = __webpack_require__(30),
	    keysIn = __webpack_require__(32);

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	module.exports = baseForIn;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createBaseFor = __webpack_require__(31);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toObject = __webpack_require__(17);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while (fromRight ? index-- : ++index < length) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(10),
	    isArguments = __webpack_require__(13),
	    isArray = __webpack_require__(23),
	    isFunction = __webpack_require__(26),
	    isIndex = __webpack_require__(33),
	    isLength = __webpack_require__(22),
	    isObject = __webpack_require__(18),
	    isString = __webpack_require__(19),
	    support = __webpack_require__(21);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/** Used to fix the JScript `[[DontEnum]]` bug. */
	var shadowProps = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	/** Used for native method references. */
	var errorProto = Error.prototype,
	    objectProto = Object.prototype,
	    stringProto = String.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to avoid iterating over non-enumerable properties in IE < 9. */
	var nonEnumProps = {};
	nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
	nonEnumProps[boolTag] = nonEnumProps[stringTag] = { 'constructor': true, 'toString': true, 'valueOf': true };
	nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = { 'constructor': true, 'toString': true };
	nonEnumProps[objectTag] = { 'constructor': true };

	arrayEach(shadowProps, function (key) {
	  for (var tag in nonEnumProps) {
	    if (hasOwnProperty.call(nonEnumProps, tag)) {
	      var props = nonEnumProps[tag];
	      props[key] = hasOwnProperty.call(props, key);
	    }
	  }
	});

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;

	  length = length && isLength(length) && (isArray(object) || isArguments(object) || isString(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      proto = isFunction(Ctor) && Ctor.prototype || objectProto,
	      isProto = proto === object,
	      result = Array(length),
	      skipIndexes = length > 0,
	      skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
	      skipProto = support.enumPrototypes && isFunction(object);

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  // lodash skips the `constructor` property when it infers it's iterating
	  // over a `prototype` object because IE < 9 can't set the `[[Enumerable]]`
	  // attribute of an existing property and the `constructor` property of a
	  // prototype defaults to non-enumerable.
	  for (var key in object) {
	    if (!(skipProto && key == 'prototype') && !(skipErrorProps && (key == 'message' || key == 'name')) && !(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  if (support.nonEnumShadows && object !== objectProto) {
	    var tag = object === stringProto ? stringTag : object === errorProto ? errorTag : objToString.call(object),
	        nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];

	    if (tag == objectTag) {
	      proto = objectProto;
	    }
	    length = shadowProps.length;
	    while (length--) {
	      key = shadowProps[length];
	      var nonEnum = nonEnums[key];
	      if (!(isProto && nonEnum) && (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
	        result.push(key);
	      }
	    }
	  }
	  return result;
	}

	module.exports = keysIn;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isLength = __webpack_require__(22),
	    isObjectLike = __webpack_require__(20);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCopy = __webpack_require__(36),
	    keysIn = __webpack_require__(32);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}

	module.exports = toPlainObject;

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(24),
	    isArrayLike = __webpack_require__(14),
	    isObject = __webpack_require__(18),
	    shimKeys = __webpack_require__(38),
	    support = __webpack_require__(21);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || (typeof object == 'function' ? support.enumPrototypes : isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(13),
	    isArray = __webpack_require__(23),
	    isIndex = __webpack_require__(33),
	    isLength = __webpack_require__(22),
	    isString = __webpack_require__(19),
	    keysIn = __webpack_require__(32);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object) || isString(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindCallback = __webpack_require__(40),
	    isIterateeCall = __webpack_require__(42),
	    restParam = __webpack_require__(43);

	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function (object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= customizer ? 1 : 0;
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var identity = __webpack_require__(41);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1:
	      return function (value) {
	        return func.call(thisArg, value);
	      };
	    case 3:
	      return function (value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	    case 4:
	      return function (accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	    case 5:
	      return function (value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	  }
	  return function () {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var isArrayLike = __webpack_require__(14),
	    isIndex = __webpack_require__(33),
	    isObject = __webpack_require__(18);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    var other = object[index];
	    return value === value ? value === other : other !== other;
	  }
	  return false;
	}

	module.exports = isIterateeCall;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? func.length - 1 : +start || 0, 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0:
	        return func.call(this, rest);
	      case 1:
	        return func.call(this, args[0], rest);
	      case 2:
	        return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Creates a new instance of Emitter.
	 * @class
	 * @returns {Object} Returns a new instance of Emitter.
	 * @example
	 * // Creates a new instance of Emitter.
	 * var Emitter = require('emitter');
	 *
	 * var emitter = new Emitter();
	 */
	var Emitter = function () {
	  function Emitter() {
	    _classCallCheck(this, Emitter);
	  }

	  _createClass(Emitter, [{
	    key: "on",


	    /**
	     * Adds a listener to the collection for the specified event.
	     * @memberof! Emitter.prototype
	     * @function
	     * @param {String} event - The event name.
	     * @param {Function} listener - A listener function to add.
	     * @returns {Object} Returns an instance of Emitter.
	     * @example
	     * // Add an event listener to "foo" event.
	     * emitter.on('foo', listener);
	     */
	    value: function on(event, listener) {
	      // Use the current collection or create it.
	      this._eventCollection = this._eventCollection || {};

	      // Use the current collection of an event or create it.
	      this._eventCollection[event] = this._eventCollection[event] || [];

	      // Appends the listener into the collection of the given event
	      this._eventCollection[event].push(listener);

	      return this;
	    }

	    /**
	     * Adds a listener to the collection for the specified event that will be called only once.
	     * @memberof! Emitter.prototype
	     * @function
	     * @param {String} event - The event name.
	     * @param {Function} listener - A listener function to add.
	     * @returns {Object} Returns an instance of Emitter.
	     * @example
	     * // Will add an event handler to "foo" event once.
	     * emitter.once('foo', listener);
	     */

	  }, {
	    key: "once",
	    value: function once(event, listener) {
	      var self = this;

	      function fn() {
	        self.off(event, fn);
	        listener.apply(this, arguments);
	      }

	      fn.listener = listener;

	      this.on(event, fn);

	      return this;
	    }

	    /**
	     * Removes a listener from the collection for the specified event.
	     * @memberof! Emitter.prototype
	     * @function
	     * @param {String} event - The event name.
	     * @param {Function} listener - A listener function to remove.
	     * @returns {Object} Returns an instance of Emitter.
	     * @example
	     * // Remove a given listener.
	     * emitter.off('foo', listener);
	     */

	  }, {
	    key: "off",
	    value: function off(event, listener) {

	      var listeners = void 0;

	      // Defines listeners value.
	      if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
	        return this;
	      }

	      listeners.forEach(function (fn, i) {
	        if (fn === listener || fn.listener === listener) {
	          // Removes the given listener.
	          listeners.splice(i, 1);
	        }
	      });

	      // Removes an empty event collection.
	      if (listeners.length === 0) {
	        delete this._eventCollection[event];
	      }

	      return this;
	    }

	    /**
	     * Execute each item in the listener collection in order with the specified data.
	     * @memberof! Emitter.prototype
	     * @function
	     * @param {String} event - The name of the event you want to emit.
	     * @param {...Object} data - Data to pass to the listeners.
	     * @returns {Object} Returns an instance of Emitter.
	     * @example
	     * // Emits the "foo" event with 'param1' and 'param2' as arguments.
	     * emitter.emit('foo', 'param1', 'param2');
	     */

	  }, {
	    key: "emit",
	    value: function emit(event) {
	      var _this = this;

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var listeners = void 0;

	      // Defines listeners value.
	      if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
	        return this;
	      }

	      // Clone listeners
	      listeners = listeners.slice(0);

	      listeners.forEach(function (fn) {
	        return fn.apply(_this, args);
	      });

	      return this;
	    }
	  }]);

	  return Emitter;
	}();

	/**
	 * Exports Emitter
	 */


	exports.default = Emitter;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dom = __webpack_require__(4);

	var Dom = _interopRequireWildcard(_dom);

	var _merge = __webpack_require__(7);

	var _merge2 = _interopRequireDefault(_merge);

	var _emitter = __webpack_require__(44);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _log = __webpack_require__(6);

	var _log2 = _interopRequireDefault(_log);

	var _amfeEnv = __webpack_require__(46);

	var Env = _interopRequireWildcard(_amfeEnv);

	var _events = __webpack_require__(53);

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
	      if (Env.aliapp && Env.aliapp.appname == 'TB' && Env.os.isAndroid) {
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

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Version = exports.params = exports.thirdapp = exports.aliapp = exports.os = exports.browser = undefined;

	var _aliapp = __webpack_require__(47);

	var _aliapp2 = _interopRequireDefault(_aliapp);

	var _browser = __webpack_require__(50);

	var _browser2 = _interopRequireDefault(_browser);

	var _os = __webpack_require__(49);

	var _os2 = _interopRequireDefault(_os);

	var _thirdapp = __webpack_require__(51);

	var _thirdapp2 = _interopRequireDefault(_thirdapp);

	var _params = __webpack_require__(52);

	var _params2 = _interopRequireDefault(_params);

	var _version = __webpack_require__(48);

	var _version2 = _interopRequireDefault(_version);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.browser = _browser2.default;
	exports.os = _os2.default;
	exports.aliapp = _aliapp2.default;
	exports.thirdapp = _thirdapp2.default;
	exports.params = _params2.default;
	exports.Version = _version2.default;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _version = __webpack_require__(48);

	var _version2 = _interopRequireDefault(_version);

	var _os = __webpack_require__(49);

	var _os2 = _interopRequireDefault(_os);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	var ua = window.navigator.userAgent;
	var aliapp = false;

	var windvane;
	var matched;
	var appname = '';
	var platform = '';
	var version = '';

	if (matched = ua.match(/WindVane[\/\s]([\d\.\_]+)/i)) {
	    windvane = matched[1];
	}

	if (matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i)) {
	    aliapp = true;
	    appname = matched[1];
	    version = matched[2];
	    /* istanbul ignore next */
	    if (appname.indexOf('-PD') > 0) {
	        /* istanbul ignore if */
	        if (_os2.default.isIOS) {
	            platform = 'iPad';
	        } else if (_os2.default.isAndroid) {
	            platform = 'AndroidPad';
	        } else {
	            platform = _os2.default.name;
	        }
	    } else {
	        platform = _os2.default.name;
	    }
	}

	// 兼容手淘的一个bug，在webview初始化异常时，在ua中只包含TBIOS字样，也认为是手淘webview。
	/* istanbul ignore if */
	if (!appname && ua.indexOf('TBIOS') > 0) {
	    appname = 'TB';
	}

	// 判断poplayer
	// poplayer相关信息，在poplayer会有该字段，形如 window._ua_popLayer = 'PopLayer/1.3.4'
	// poplayer信息不在ua中是因为在IOS下，修改poplayer层的ua会导致所有webview的ua改变，所以只能写在全局变量中
	var poplayerInfo = window._ua_popLayer || '';
	var poplayer = false;
	var poplayerVersion = '';
	if (poplayerInfo && (matched = poplayerInfo.match(/PopLayer\/([\d\.]+)/i))) {
	    poplayer = true;
	    poplayerVersion = matched[1];
	}

	if (aliapp) {
	    aliapp = {
	        windvane: new _version2.default(windvane || '0.0.0'),
	        appname: appname || 'unkown',
	        version: new _version2.default(version || '0.0.0'),
	        platform: platform || _os2.default.name,
	        poplayer: poplayer || false,
	        poplayerVersion: new _version2.default(poplayerVersion || '0.0.0')
	    };
	}

	exports.default = aliapp;

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var Version = function () {
	    _createClass(Version, null, [{
	        key: 'compare',
	        value: function compare(v1, v2) {
	            v1 = v1.toString().split('.');
	            v2 = v2.toString().split('.');

	            for (var i = 0; i < v1.length || i < v2.length; i++) {
	                var n1 = parseInt(v1[i], 10);
	                var n2 = parseInt(v2[i], 10);

	                /* istanbul ignore if */
	                if (isNaN(n1)) {
	                    n1 = 0;
	                }

	                /* istanbul ignore if */
	                if (isNaN(n2)) {
	                    n2 = 0;
	                }
	                if (n1 < n2) {
	                    return -1;
	                } else if (n1 > n2) {
	                    return 1;
	                }
	            }
	            return 0;
	        }
	    }]);

	    function Version(v) {
	        _classCallCheck(this, Version);

	        if (v) {
	            this.val = v.toString();
	        } else {
	            this.val = '';
	        }
	    }

	    _createClass(Version, [{
	        key: 'gt',
	        value: function gt(v) {
	            return Version.compare(this, v) > 0;
	        }
	    }, {
	        key: 'gte',
	        value: function gte(v) {
	            return Version.compare(this, v) >= 0;
	        }
	    }, {
	        key: 'lt',
	        value: function lt(v) {
	            return Version.compare(this, v) < 0;
	        }
	    }, {
	        key: 'lte',
	        value: function lte(v) {
	            return Version.compare(this, v) <= 0;
	        }
	    }, {
	        key: 'eq',
	        value: function eq(v) {
	            return Version.compare(this, v) === 0;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.val.toString();
	        }
	    }]);

	    return Version;
	}();

	exports.default = Version;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _version = __webpack_require__(48);

	var _version2 = _interopRequireDefault(_version);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	var ua = window.navigator.userAgent;
	var os;
	var matched;

	if (matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/)) {
	    os = {
	        name: 'Windows Phone',
	        isWindowsPhone: true,
	        version: new _version2.default(matched[1])
	    };
	} else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
	    os = {
	        version: new _version2.default(matched[1])
	    };

	    if (ua.match(/Mobile\s+Safari/)) {
	        os.name = 'Android';
	        os.isAndroid = true;
	    } else {
	        os.name = 'AndroidPad';
	        os.isAndroidPad = true;
	    }
	} else if (matched = ua.match(/(iPhone|iPad|iPod)/)) {
	    var name = matched[1];

	    if (matched = ua.match(/OS ([\d_\.]+) like Mac OS X/)) {
	        os = {
	            name: name,
	            isIPhone: name === 'iPhone' || name === 'iPod',
	            isIPad: name === 'iPad',
	            isIOS: true,
	            version: new _version2.default(matched[1].split('_').join('.'))
	        };
	    }
	}

	if (!os) {
	    os = {
	        name: 'unknown',
	        version: new _version2.default('0.0.0')
	    };
	}

	exports.default = os;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _version = __webpack_require__(48);

	var _version2 = _interopRequireDefault(_version);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	var ua = window.navigator.userAgent;
	var browser;
	var matched;

	if (matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) {
	    browser = {
	        name: 'UC',
	        isUC: true,
	        version: new _version2.default(matched[1])
	    };
	} else if (matched = ua.match(/MQQBrowser\/([\d\.]+)/)) {
	    browser = {
	        name: 'QQ',
	        isQQ: true,
	        version: new _version2.default(matched[1])
	    };
	} else if (matched = ua.match(/(?:Firefox|FxiOS)\/([\d\.]+)/)) {
	    browser = {
	        name: 'Firefox',
	        isFirefox: true,
	        version: new _version2.default(matched[1])
	    };
	} else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) || (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

	    browser = {
	        version: new _version2.default(matched[1])
	    };

	    if (ua.match(/IEMobile/)) {
	        browser.name = 'IEMobile';
	        browser.isIEMobile = true;
	    } else {
	        browser.name = 'IE';
	        browser.isIE = true;
	    }

	    if (ua.match(/Android|iPhone/)) {
	        browser.isIELikeWebkit = true;
	    }
	} else if (matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/)) {
	    browser = {
	        name: 'Chrome',
	        isChrome: true,
	        version: new _version2.default(matched[1])
	    };

	    if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
	        browser.name = 'Chrome Webview';
	        browser.isWebview = true;
	    }
	} else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
	    browser = {
	        name: 'Android',
	        isAndroid: true,
	        version: new _version2.default(matched[1])
	    };
	} else if (ua.match(/iPhone|iPad|iPod/)) {
	    if (ua.match(/Safari/) && (matched = ua.match(/Version\/([\d\.]+)/))) {
	        browser = {
	            name: 'Safari',
	            isSafari: true,
	            version: new _version2.default(matched[1])
	        };
	    } else if (matched = ua.match(/OS ([\d_\.]+) like Mac OS X/)) {
	        browser = {
	            name: 'iOS Webview',
	            isWebview: true,
	            version: new _version2.default(matched[1].replace(/\_/g, '.'))
	        };
	    }
	}

	/* istanbul ignore if */
	if (!browser) {
	    browser = {
	        name: 'unknown',
	        version: new _version2.default('0.0.0')
	    };
	}

	exports.default = browser;

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ua = window.navigator.userAgent;

	var thirdapp;

	if (ua.match(/Weibo/i)) {
	    /**
	     * @type {Object}
	     * @memberof lib.env
	     * @property {String} appname - 操作系统名称，比如Weibo/Weixin/unknown等
	     * @property {Boolean} isWeibo - 是否是微博
	     * @property {Boolean} isWeixin - 是否是微信
	     */
	    thirdapp = {
	        appname: 'Weibo',
	        isWeibo: true
	    };
	} else if (ua.match(/MicroMessenger/i)) {
	    thirdapp = {
	        appname: 'Weixin',
	        isWeixin: true
	    };
	    /* istanbul ignore next */
	} else {
	    /* istanbul ignore next */
	    thirdapp = false;
	}

	exports.default = thirdapp;

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var params = {};
	var search = window.location.search.replace(/^\?/, '');

	if (search) {
	    var splits = search.split('&');
	    for (var i = 0; i < splits.length; i++) {
	        splits[i] = splits[i].split('=');
	        try {
	            params[splits[i][0]] = decodeURIComponent(splits[i][1]);
	            /* istanbul ignore next */
	        } catch (e) {
	            /* istanbul ignore next */
	            params[splits[i][0]] = splits[i][1];
	        }
	    }
	}

	exports.default = params;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.on = on;
	exports.off = off;
	exports.trigger = trigger;
	exports.one = one;
	exports.fixEvent = fixEvent;

	var _dom = __webpack_require__(4);

	var Dom = _interopRequireWildcard(_dom);

	var _guid = __webpack_require__(5);

	var Guid = _interopRequireWildcard(_guid);

	var _window = __webpack_require__(54);

	var _window2 = _interopRequireDefault(_window);

	var _document = __webpack_require__(55);

	var _document2 = _interopRequireDefault(_document);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/**
	 * Add an event listener to element
	 * It stores the handler function in a separate cache object
	 * and adds a generic handler to the element's event,
	 * along with a unique id (guid) to the element.
	 *
	 * @param  {Element|Object}   elem Element or object to bind listeners to
	 * @param  {String|Array}   type Type of event to bind to.
	 * @param  {Function} fn   Event listener.
	 * @method on
	 */
	/**
	 * @file events.js
	 *
	 * Event System (John Resig - Secrets of a JS Ninja http://jsninja.com/)
	 * (Original book version wasn't completely usable, so fixed some things and made Closure Compiler compatible)
	 * This should work very similarly to jQuery's events, however it's based off the book version which isn't as
	 * robust as jquery's, so there's probably some differences.
	 */

	function on(elem, type, fn) {
	  if (Array.isArray(type)) {
	    return _handleMultipleEvents(on, elem, type, fn);
	  }

	  var data = Dom.getElData(elem);

	  // We need a place to store all our handler data
	  if (!data.handlers) data.handlers = {};

	  if (!data.handlers[type]) data.handlers[type] = [];

	  if (!fn.guid) fn.guid = Guid.newGUID();

	  data.handlers[type].push(fn);

	  if (!data.dispatcher) {
	    data.disabled = false;

	    data.dispatcher = function (event, hash) {

	      if (data.disabled) return;
	      event = fixEvent(event);

	      var handlers = data.handlers[event.type];

	      if (handlers) {
	        // Copy handlers so if handlers are added/removed during the process it doesn't throw everything off.
	        var handlersCopy = handlers.slice(0);

	        for (var m = 0, n = handlersCopy.length; m < n; m++) {
	          if (event.isImmediatePropagationStopped()) {
	            break;
	          } else {
	            handlersCopy[m].call(elem, event, hash);
	          }
	        }
	      }
	    };
	  }

	  if (data.handlers[type].length === 1) {
	    if (elem.addEventListener) {
	      elem.addEventListener(type, data.dispatcher, false);
	    } else if (elem.attachEvent) {
	      elem.attachEvent('on' + type, data.dispatcher);
	    }
	  }
	}

	/**
	 * Removes event listeners from an element
	 *
	 * @param  {Element|Object}   elem Object to remove listeners from
	 * @param  {String|Array=}   type Type of listener to remove. Don't include to remove all events from element.
	 * @param  {Function} fn   Specific listener to remove. Don't include to remove listeners for an event type.
	 * @method off
	 */
	function off(elem, type, fn) {
	  // Don't want to add a cache object through getElData if not needed
	  if (!Dom.hasElData(elem)) return;

	  var data = Dom.getElData(elem);

	  // If no events exist, nothing to unbind
	  if (!data.handlers) {
	    return;
	  }

	  if (Array.isArray(type)) {
	    return _handleMultipleEvents(off, elem, type, fn);
	  }

	  // Utility function
	  var removeType = function removeType(t) {
	    data.handlers[t] = [];
	    _cleanUpEvents(elem, t);
	  };

	  // Are we removing all bound events?
	  if (!type) {
	    for (var t in data.handlers) {
	      removeType(t);
	    }return;
	  }

	  var handlers = data.handlers[type];

	  // If no handlers exist, nothing to unbind
	  if (!handlers) return;

	  // If no listener was provided, remove all listeners for type
	  if (!fn) {
	    removeType(type);
	    return;
	  }

	  // We're only removing a single handler
	  if (fn.guid) {
	    for (var n = 0; n < handlers.length; n++) {
	      if (handlers[n].guid === fn.guid) {
	        handlers.splice(n--, 1);
	      }
	    }
	  }

	  _cleanUpEvents(elem, type);
	}

	/**
	 * Trigger an event for an element
	 *
	 * @param  {Element|Object}      elem  Element to trigger an event on
	 * @param  {Event|Object|String} event A string (the type) or an event object with a type attribute
	 * @param  {Object} [hash] data hash to pass along with the event
	 * @return {Boolean=} Returned only if default was prevented
	 * @method trigger
	 */
	function trigger(elem, event, hash) {
	  // Fetches element data and a reference to the parent (for bubbling).
	  // Don't want to add a data object to cache for every parent,
	  // so checking hasElData first.
	  var elemData = Dom.hasElData(elem) ? Dom.getElData(elem) : {};
	  var parent = elem.parentNode || elem.ownerDocument;
	  // type = event.type || event,
	  // handler;

	  // If an event name was passed as a string, creates an event out of it
	  if (typeof event === 'string') {
	    event = { type: event, target: elem };
	  }
	  // Normalizes the event properties.
	  event = fixEvent(event);

	  // If the passed element has a dispatcher, executes the established handlers.
	  if (elemData.dispatcher) {
	    elemData.dispatcher.call(elem, event, hash);
	  }

	  // Unless explicitly stopped or the event does not bubble (e.g. media events)
	  // recursively calls this function to bubble the event up the DOM.
	  if (parent && !event.isPropagationStopped() && event.bubbles === true) {
	    trigger.call(null, parent, event, hash);

	    // If at the top of the DOM, triggers the default action unless disabled.
	  } else if (!parent && !event.defaultPrevented) {
	    var targetData = Dom.getElData(event.target);

	    // Checks if the target has a default action for this event.
	    if (event.target[event.type]) {
	      // Temporarily disables event dispatching on the target as we have already executed the handler.
	      targetData.disabled = true;
	      // Executes the default action.
	      if (typeof event.target[event.type] === 'function') {
	        event.target[event.type]();
	      }
	      // Re-enables event dispatching.
	      targetData.disabled = false;
	    }
	  }

	  // Inform the triggerer if the default was prevented by returning false
	  return !event.defaultPrevented;
	}

	/**
	 * Trigger a listener only once for an event
	 *
	 * @param  {Element|Object}   elem Element or object to
	 * @param  {String|Array}   type Name/type of event
	 * @param  {Function} fn Event handler function
	 * @method one
	 */
	function one(elem, type, fn) {
	  if (Array.isArray(type)) {
	    return _handleMultipleEvents(one, elem, type, fn);
	  }
	  var func = function func() {
	    off(elem, type, func);
	    fn.apply(this, arguments);
	  };
	  // copy the guid to the new function so it can removed using the original function's ID
	  func.guid = fn.guid = fn.guid || Guid.newGUID();
	  on(elem, type, func);
	}

	/**
	 * Fix a native event to have standard property values
	 *
	 * @param  {Object} event Event object to fix
	 * @return {Object}
	 * @private
	 * @method fixEvent
	 */
	function fixEvent(event) {

	  function returnTrue() {
	    return true;
	  }
	  function returnFalse() {
	    return false;
	  }

	  // Test if fixing up is needed
	  // Used to check if !event.stopPropagation instead of isPropagationStopped
	  // But native events return true for stopPropagation, but don't have
	  // other expected methods like isPropagationStopped. Seems to be a problem
	  // with the Javascript Ninja code. So we're just overriding all events now.
	  if (!event || !event.isPropagationStopped) {
	    var old = event || _window2.default.event;

	    event = {};
	    // Clone the old object so that we can modify the values event = {};
	    // IE8 Doesn't like when you mess with native event properties
	    // Firefox returns false for event.hasOwnProperty('type') and other props
	    //  which makes copying more difficult.
	    // TODO: Probably best to create a whitelist of event props
	    for (var key in old) {
	      // Safari 6.0.3 warns you if you try to copy deprecated layerX/Y
	      // Chrome warns you if you try to copy deprecated keyboardEvent.keyLocation
	      // and webkitMovementX/Y
	      if (key !== 'layerX' && key !== 'layerY' && key !== 'keyLocation' && key !== 'webkitMovementX' && key !== 'webkitMovementY') {
	        // Chrome 32+ warns if you try to copy deprecated returnValue, but
	        // we still want to if preventDefault isn't supported (IE8).
	        if (!(key === 'returnValue' && old.preventDefault)) {
	          event[key] = old[key];
	        }
	      }
	    }

	    // The event occurred on this element
	    if (!event.target) {
	      event.target = event.srcElement || _document2.default;
	    }

	    // Handle which other element the event is related to
	    if (!event.relatedTarget) {
	      event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
	    }

	    // Stop the default browser action
	    event.preventDefault = function () {
	      if (old.preventDefault) {
	        old.preventDefault();
	      }
	      event.returnValue = false;
	      old.returnValue = false;
	      event.defaultPrevented = true;
	    };

	    event.defaultPrevented = false;

	    // Stop the event from bubbling
	    event.stopPropagation = function () {
	      if (old.stopPropagation) {
	        old.stopPropagation();
	      }
	      event.cancelBubble = true;
	      old.cancelBubble = true;
	      event.isPropagationStopped = returnTrue;
	    };

	    event.isPropagationStopped = returnFalse;

	    // Stop the event from bubbling and executing other handlers
	    event.stopImmediatePropagation = function () {
	      if (old.stopImmediatePropagation) {
	        old.stopImmediatePropagation();
	      }
	      event.isImmediatePropagationStopped = returnTrue;
	      event.stopPropagation();
	    };

	    event.isImmediatePropagationStopped = returnFalse;

	    // Handle mouse position
	    if (event.clientX != null) {
	      var doc = _document2.default.documentElement,
	          body = _document2.default.body;

	      event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	      event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
	    }

	    // Handle key presses
	    event.which = event.charCode || event.keyCode;

	    // Fix button for mouse clicks:
	    // 0 == left; 1 == middle; 2 == right
	    if (event.button != null) {
	      event.button = event.button & 1 ? 0 : event.button & 4 ? 1 : event.button & 2 ? 2 : 0;
	    }
	  }

	  // Returns fixed-up instance
	  return event;
	}

	/**
	 * Clean up the listener cache and dispatchers
	*
	 * @param  {Element|Object} elem Element to clean up
	 * @param  {String} type Type of event to clean up
	 * @private
	 * @method _cleanUpEvents
	 */
	function _cleanUpEvents(elem, type) {
	  var data = Dom.getElData(elem);

	  // Remove the events of a particular type if there are none left
	  if (data.handlers[type].length === 0) {
	    delete data.handlers[type];
	    // data.handlers[type] = null;
	    // Setting to null was causing an error with data.handlers

	    // Remove the meta-handler from the element
	    if (elem.removeEventListener) {
	      elem.removeEventListener(type, data.dispatcher, false);
	    } else if (elem.detachEvent) {
	      elem.detachEvent('on' + type, data.dispatcher);
	    }
	  }

	  // Remove the events object if there are no types left
	  if (Object.getOwnPropertyNames(data.handlers).length <= 0) {
	    delete data.handlers;
	    delete data.dispatcher;
	    delete data.disabled;
	  }

	  // Finally remove the element data if there is no data left
	  if (Object.getOwnPropertyNames(data).length === 0) {
	    Dom.removeElData(elem);
	  }
	}

	/**
	 * Loops through an array of event types and calls the requested method for each type.
	 *
	 * @param  {Function} fn   The event method we want to use.
	 * @param  {Element|Object} elem Element or object to bind listeners to
	 * @param  {String}   type Type of event to bind to.
	 * @param  {Function} callback   Event listener.
	 * @private
	 * @function _handleMultipleEvents
	 */
	function _handleMultipleEvents(fn, elem, types, callback) {
	  types.forEach(function (type) {
	    //Call the event method for each one of the types
	    fn(elem, type, callback);
	  });
	}

/***/ },
/* 54 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var win;

	if (typeof window !== "undefined") {
	    win = window;
	} else if (typeof global !== "undefined") {
	    win = global;
	} else if (typeof self !== "undefined") {
	    win = self;
	} else {
	    win = {};
	}

	module.exports = win;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
	var minDoc = __webpack_require__(56);

	var doccy;

	if (typeof document !== 'undefined') {
	    doccy = document;
	} else {
	    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }
	}

	module.exports = doccy;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 56 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	typeof window === 'undefined' && (window = { ctrl: {}, lib: {} });!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function (a, b) {
	  function c(a, b) {
	    a = a.toString().split("."), b = b.toString().split(".");for (var c = 0; c < a.length || c < b.length; c++) {
	      var d = parseInt(a[c], 10),
	          e = parseInt(b[c], 10);if (window.isNaN(d) && (d = 0), window.isNaN(e) && (e = 0), d < e) return -1;if (d > e) return 1;
	    }return 0;
	  }var d = a.Promise,
	      e = a.document,
	      f = a.navigator.userAgent,
	      g = /Windows\sPhone\s(?:OS\s)?[\d\.]+/i.test(f) || /Windows\sNT\s[\d\.]+/i.test(f),
	      h = g && a.WindVane_Win_Private && a.WindVane_Win_Private.call,
	      i = /iPhone|iPad|iPod/i.test(f),
	      j = /Android/i.test(f),
	      k = f.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/),
	      l = Object.prototype.hasOwnProperty,
	      m = b.windvane = a.WindVane || (a.WindVane = {}),
	      n = (a.WindVane_Native, Math.floor(65536 * Math.random())),
	      o = 1,
	      p = [],
	      q = 3,
	      r = "hybrid",
	      s = "wv_hybrid",
	      t = "iframe_",
	      u = "param_",
	      v = "chunk_",
	      w = 6e5,
	      x = 6e5,
	      y = 6e4;k = k ? (k[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0";var z = { isAvailable: 1 === c(k, "0"), call: function call(a, b, c, e, f, g) {
	      var h, i;"number" == typeof arguments[arguments.length - 1] && (g = arguments[arguments.length - 1]), "function" != typeof e && (e = null), "function" != typeof f && (f = null), d && (i = {}, i.promise = new d(function (a, b) {
	        i.resolve = a, i.reject = b;
	      })), h = A.getSid();var j = { success: e, failure: f, deferred: i };if (g > 0 && (j.timeout = setTimeout(function () {
	        z.onFailure(h, { ret: "HY_TIMEOUT" });
	      }, g)), A.registerCall(h, j), A.registerGC(h, g), z.isAvailable ? A.callMethod(a, b, c, h) : z.onFailure(h, { ret: "HY_NOT_IN_WINDVANE" }), i) return i.promise;
	    }, fireEvent: function fireEvent(a, b, c) {
	      var d = e.createEvent("HTMLEvents");d.initEvent(a, !1, !0), d.param = A.parseData(b || A.getData(c)), e.dispatchEvent(d);
	    }, getParam: function getParam(a) {
	      return A.getParam(a);
	    }, setData: function setData(a, b) {
	      A.setData(a, b);
	    }, onSuccess: function onSuccess(a, b) {
	      A.onComplete(a, b, "success");
	    }, onFailure: function onFailure(a, b) {
	      A.onComplete(a, b, "failure");
	    } },
	      A = { params: {}, chunks: {}, calls: {}, getSid: function getSid() {
	      return (n + o++) % 65536 + "";
	    }, buildParam: function buildParam(a) {
	      return a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? JSON.stringify(a) : a || "";
	    }, getParam: function getParam(a) {
	      return this.params[u + a] || "";
	    }, setParam: function setParam(a, b) {
	      this.params[u + a] = b;
	    }, parseData: function parseData(a) {
	      var b;if (a && "string" == typeof a) try {
	        b = JSON.parse(a);
	      } catch (a) {
	        b = { ret: ["WV_ERR::PARAM_PARSE_ERROR"] };
	      } else b = a || {};return b;
	    }, setData: function setData() {
	      this.chunks[v + sid] = this.chunks[v + sid] || [], this.chunks[v + sid].push(chunk);
	    }, getData: function getData(a) {
	      return this.chunks[v + a] ? this.chunks[v + a].join("") : "";
	    }, registerCall: function registerCall(a, b) {
	      this.calls[a] = b;
	    }, unregisterCall: function unregisterCall(a) {
	      var b = {};return this.calls[a] && (b = this.calls[a], delete this.calls[a]), b;
	    }, useIframe: function useIframe(a, b) {
	      var c = t + a,
	          d = p.pop();d || (d = e.createElement("iframe"), d.setAttribute("frameborder", "0"), d.style.cssText = "width:0;height:0;border:0;display:none;"), d.setAttribute("id", c), d.setAttribute("src", b), d.parentNode || setTimeout(function () {
	        e.body.appendChild(d);
	      }, 5);
	    }, retrieveIframe: function retrieveIframe(a) {
	      var b = t + a,
	          c = e.querySelector("#" + b);p.length >= q ? e.body.removeChild(c) : p.indexOf(c) < 0 && p.push(c);
	    }, callMethod: function callMethod(b, c, d, e) {
	      if (d = A.buildParam(d), g) h ? a.WindVane_Win_Private.call(b, c, e, d) : this.onComplete(e, { ret: "HY_NO_HANDLER_ON_WP" }, "failure");else {
	        var f = r + "://" + b + ":" + e + "/" + c + "?" + d;if (i) this.setParam(e, d), this.useIframe(e, f);else if (j) {
	          var k = s + ":";window.prompt(f, k);
	        } else this.onComplete(e, { ret: "HY_NOT_SUPPORT_DEVICE" }, "failure");
	      }
	    }, registerGC: function registerGC(a, b) {
	      var c = this,
	          d = Math.max(b || 0, w),
	          e = Math.max(b || 0, y),
	          f = Math.max(b || 0, x);setTimeout(function () {
	        c.unregisterCall(a);
	      }, d), i ? setTimeout(function () {
	        c.params[u + a] && delete c.params[u + a];
	      }, e) : j && setTimeout(function () {
	        c.chunks[v + a] && delete c.chunks[v + a];
	      }, f);
	    }, onComplete: function onComplete(a, b, c) {
	      var d = this.unregisterCall(a),
	          e = d.success,
	          f = d.failure,
	          g = d.deferred,
	          h = d.timeout;h && clearTimeout(h), b = b ? b : this.getData(a), b = this.parseData(b);var k = b.ret;"string" == typeof k && (b = b.value || b, b.ret || (b.ret = [k])), "success" === c ? (e && e(b), g && g.resolve(b)) : "failure" === c && (f && f(b), g && g.reject(b)), i ? (this.retrieveIframe(a), this.params[u + a] && delete this.params[u + a]) : j && this.chunks[v + a] && delete this.chunks[v + a];
	    } };for (var B in z) {
	    l.call(m, B) || (m[B] = z[B]);
	  }
	}(window, window.lib || (window.lib = {}));;module.exports = window.lib['windvane'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dom = __webpack_require__(4);

	var Dom = _interopRequireWildcard(_dom);

	var _emitter = __webpack_require__(44);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _danmakuItem = __webpack_require__(59);

	var _danmakuItem2 = _interopRequireDefault(_danmakuItem);

	var _log = __webpack_require__(6);

	var _log2 = _interopRequireDefault(_log);

	var _merge = __webpack_require__(7);

	var _merge2 = _interopRequireDefault(_merge);

	var _events = __webpack_require__(53);

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

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dom = __webpack_require__(4);

	var Dom = _interopRequireWildcard(_dom);

	var _emitter = __webpack_require__(44);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _merge = __webpack_require__(7);

	var _merge2 = _interopRequireDefault(_merge);

	var _log = __webpack_require__(6);

	var _log2 = _interopRequireDefault(_log);

	var _events = __webpack_require__(53);

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

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _log = __webpack_require__(6);

	var _log2 = _interopRequireDefault(_log);

	var _events = __webpack_require__(53);

	var Events = _interopRequireWildcard(_events);

	var _fn = __webpack_require__(61);

	var Fn = _interopRequireWildcard(_fn);

	var _amfeEnv = __webpack_require__(46);

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

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bind = undefined;

	var _guid = __webpack_require__(5);

	/**
	 * Bind (a.k.a proxy or Context). A simple method for changing the context of a function
	 * It also stores a unique id on the function so it can be easily removed from events
	 *
	 * @param  {*}   context The object to bind as scope
	 * @param  {Function} fn      The function to be bound to a scope
	 * @param  {Number=}   uid     An optional unique ID for the function to be set
	 * @return {Function}
	 * @private
	 * @method bind
	 */
	var bind = exports.bind = function bind(context, fn, uid) {
	  // Make sure the function has a unique ID
	  if (!fn.guid) {
	    fn.guid = (0, _guid.newGUID)();
	  }

	  // Create the new function that changes the context
	  var ret = function ret() {
	    return fn.apply(context, arguments);
	  };

	  // Allow for the ability to individualize this function
	  // Needed in the case where multiple objects might share the same prototype
	  // IF both items add an event listener with the same function, then you try to remove just one
	  // it will remove both because they both have the same guid.
	  // when using this, you need to use the bind method when you remove the listener as well.
	  // currently used in text tracks
	  ret.guid = uid ? uid + '_' + fn.guid : fn.guid;

	  return ret;
	}; /**
	    * @file fn.js
	    */

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = userBrowser;
	function userBrowser() {
	  var browserName = navigator.userAgent.toLowerCase();

	  if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
	    return 'IE';
	  } else if (/firefox/i.test(browserName)) {
	    return 'Firefox';
	  } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
	    return 'Chrome';
	  } else if (/opera/i.test(browserName)) {
	    return 'Opera';
	  } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
	    return 'Safari';
	  } else {
	    return 'unKnow';
	  }
	}

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }
/******/ ]);
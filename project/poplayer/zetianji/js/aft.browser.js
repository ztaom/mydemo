(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AFT"] = factory();
	else
		root["AFT"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';

	var _map = __webpack_require__(1);

	var _map2 = _interopRequireDefault(_map);

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _slicedToArray2 = __webpack_require__(88);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _keys = __webpack_require__(95);

	var _keys2 = _interopRequireDefault(_keys);

	var _toConsumableArray2 = __webpack_require__(99);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Event2 = __webpack_require__(122);

	var _Event3 = _interopRequireDefault(_Event2);

	var _Render = __webpack_require__(138);

	var _Render2 = _interopRequireDefault(_Render);

	var _CSS2D = __webpack_require__(192);

	var _CSS2D2 = _interopRequireDefault(_CSS2D);

	var _Scene = __webpack_require__(200);

	var _Scene2 = _interopRequireDefault(_Scene);

	var _Effect = __webpack_require__(204);

	var _Effect2 = _interopRequireDefault(_Effect);

	var _Animation = __webpack_require__(221);

	var _Animation2 = _interopRequireDefault(_Animation);

	var _Timeline = __webpack_require__(222);

	var _Timeline2 = _interopRequireDefault(_Timeline);

	var _Group = __webpack_require__(223);

	var _Group2 = _interopRequireDefault(_Group);

	var _Rectangle = __webpack_require__(224);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	var _Circle = __webpack_require__(225);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _Ellipse = __webpack_require__(226);

	var _Ellipse2 = _interopRequireDefault(_Ellipse);

	var _Triangle = __webpack_require__(227);

	var _Triangle2 = _interopRequireDefault(_Triangle);

	var _Font = __webpack_require__(228);

	var _Font2 = _interopRequireDefault(_Font);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var elements = {
	    'group': _Group2.default,
	    'circle': _Circle2.default,
	    'rectangle': _Rectangle2.default,
	    'triangle': _Triangle2.default,
	    'ellipse': _Ellipse2.default,
	    'font': _Font2.default
	};

	/**
	 * @class Animation Flow Tools
	 * @extends {Event}
	 */

	var AFT = function (_Event) {
	    (0, _inherits3.default)(AFT, _Event);

	    /**
	     * create a AFT context
	     * @param  {HTMLElement} canvasElement
	     * @param  {String} engineType support 2d/3d
	     * @throws {Error} If engineType is invalid
	     * @return {AFT}
	     */
	    function AFT(canvasElement, engineType) {
	        (0, _classCallCheck3.default)(this, AFT);

	        /**
	         * if is playing
	         * @type {Boolean}
	         */
	        var _this = (0, _possibleConstructorReturn3.default)(this, (AFT.__proto__ || (0, _getPrototypeOf2.default)(AFT)).call(this));

	        _this.isPlaying = false;
	        /**
	         * if is paused
	         * @type {Boolean}
	         */
	        _this.isPaused = false;
	        /**
	         * if is finished
	         * @type {Boolean}
	         */
	        _this.isFinished = false;
	        /**
	         * the frame to skip
	         * @type {Number}
	         */
	        _this.skipFrames = 0;
	        /**
	         * a render
	         * @type {Render}
	         */
	        _this.render = new _Render2.default();
	        if (engineType === '2d') {
	            /**
	             * a engine
	             * @type {AbstractEngine}
	             */
	            _this.engine = new _CSS2D2.default();
	            _this.engine.attachElement(canvasElement);
	        } else {
	            throw new Error(engineType + ' is not a valid type of engine');
	        }
	        return _this;
	    }

	    /**
	     * set size for engine
	     * @param {Number} size
	     * @return {AFT} current context
	     */


	    (0, _createClass3.default)(AFT, [{
	        key: 'setSize',
	        value: function setSize(size) {
	            this.engine.setSize(size);
	            return this;
	        }

	        /**
	         * resize the engine
	         * @return {AFT} current context
	         */

	    }, {
	        key: 'resize',
	        value: function resize() {
	            this.engine.resize();
	            return this;
	        }

	        /**
	         * set clear color for engine
	         * @param {String} rgba
	         * @return {AFT} current context
	         */

	    }, {
	        key: 'setClearColor',
	        value: function setClearColor(rgba) {
	            this.engine.setClearColor(rgba);
	            return this;
	        }

	        /**
	         * get the viewport width from engine
	         * @return {Number}
	         */

	    }, {
	        key: 'createScene',


	        /**
	         * create a scene
	         * @return {Scene}
	         */
	        value: function createScene() {
	            return new _Scene2.default();
	        }

	        /**
	         * create a element
	         * @example
	         * aft.createElement('rectangle', 100, 100, {
	         *     position: [10, 10], // an array
	         *     style: { // an object
	         *         opacity: 1
	         *     },
	         *     transform: [ // a map entry
	         *         ['translateX', 100]
	         *     ]
	         * });
	         * @param  {String} elementType rectangle/circle/triangle/group etc.
	         * @param  {...*} initialArguments initial arguments for element, the last argument can be an option that include position & style & map
	         * @return {AbstractElement}
	         * @throws {Error} If elementType is invalid
	         */

	    }, {
	        key: 'createElement',
	        value: function createElement(elementType) {
	            var _arguments = arguments;

	            var ElementConstructor = elements[elementType];

	            if (ElementConstructor) {
	                var _len, initialArguments, _key;

	                var _ret = function () {
	                    var options = void 0;

	                    for (_len = _arguments.length, initialArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                        initialArguments[_key - 1] = _arguments[_key];
	                    }

	                    if (initialArguments.length === ElementConstructor.length + 1) {
	                        options = initialArguments.splice(initialArguments.length - 1, 1);
	                    }

	                    var element = new (Function.prototype.bind.apply(ElementConstructor, [null].concat((0, _toConsumableArray3.default)(initialArguments))))();
	                    if (options) {
	                        options.forEach(function (opt) {
	                            if (opt.position) {
	                                var _element$position;

	                                (_element$position = element.position).set.apply(_element$position, (0, _toConsumableArray3.default)(opt.position));
	                            }

	                            if (opt.style) {
	                                (0, _keys2.default)(opt.style).forEach(function (key) {
	                                    element.style.set(key, opt.style[key]);
	                                });
	                            }

	                            if (opt.transform) {
	                                opt.transform.forEach(function (_ref) {
	                                    var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

	                                    var key = _ref2[0];
	                                    var value = _ref2[1];

	                                    element.transform.set(key, value);
	                                });
	                            }
	                        });
	                    }

	                    return {
	                        v: element
	                    };
	                }();

	                if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
	            } else {
	                throw new Error(elementType + ' is not a valid type of element.');
	            }
	        }

	        /**
	         * create a effect
	         * @return {Effect}
	         */

	    }, {
	        key: 'createEffect',
	        value: function createEffect() {
	            return new _Effect2.default();
	        }

	        /**
	         * create a animation
	         * @example
	         * aft.createAnimation(element, effect);
	         * @example
	         * aft.createAnimation(element, effect => {
	         *     effect.loop(2);
	         * });
	         * @param  {AbastrctElement} element
	         * @param  {Effect|function(effect: Effect)} sth
	         * @return {Animation}
	         */

	    }, {
	        key: 'createAnimation',
	        value: function createAnimation(element, sth) {
	            var effect = sth;
	            if (sth instanceof Function) {
	                effect = new _Effect2.default();
	                sth(effect);
	            }
	            return new _Animation2.default(element, effect);
	        }

	        /**
	         * create animations
	         * @example
	         * aft.createAnimations(element, effect1, effect2 => {
	         *     return effect2.loop(2);
	         * });
	         * @param  {AbastrctElement} element
	         * @param  {Array<Effect|function(effect: Effect)>} sths
	         * @return {Animation}
	         */

	    }, {
	        key: 'createAnimations',
	        value: function createAnimations(element) {
	            var _this2 = this;

	            for (var _len2 = arguments.length, sths = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                sths[_key2 - 1] = arguments[_key2];
	            }

	            return sths.map(function (sth) {
	                return _this2.createAnimation(element, sth);
	            });
	        }

	        /**
	         * create a timeline
	         * @param {Array<Animation>} [animations]
	         * @return {Timeline}
	         */

	    }, {
	        key: 'createTimeline',
	        value: function createTimeline(animations) {
	            var timeline = new _Timeline2.default();
	            if (animations) {
	                animations.forEach(function (animation) {
	                    return timeline.add(animation);
	                });
	            }
	            return timeline;
	        }

	        /**
	         * start to play timelines in a certain scene
	         * @example
	         * aft.play(scene, [animation1, animation2]);
	         * @example
	         * aft.play(scene, [timeline1, timeline2]);
	         * @event start & play & drawn
	         * @param  {Scene} scene
	         * @param  {Array<Animation|Timeline>} sth
	         * @return {AFT} current context
	         */

	    }, {
	        key: 'play',
	        value: function play(scene, sth) {
	            var _this3 = this;

	            if (!this.isPlaying && !this.isPaused) {
	                (function () {
	                    var timelines = [];

	                    if (sth instanceof Array) {
	                        (function () {
	                            var timeline = void 0;
	                            sth.forEach(function (s) {
	                                if (s instanceof _Animation2.default) {
	                                    if (!timeline) {
	                                        timeline = new _Timeline2.default();
	                                        timelines.push(timeline);
	                                    }
	                                    timeline.add(s);
	                                } else if (s instanceof _Timeline2.default) {
	                                    timeline = undefined;
	                                    timelines.push(s);
	                                }
	                            });
	                        })();
	                    }

	                    _this3.isPlaying = true;
	                    _this3.emit('start');

	                    _this3.render.runLoop(function (clock) {
	                        _this3.emit('play', clock);
	                        timelines.forEach(function (tl) {
	                            return tl.play(clock);
	                        });
	                        _this3.engine.drawBuffer(scene.children);
	                        _this3.engine.flush();
	                        _this3.emit('drawn');
	                    }, {
	                        skipFrames: _this3.skipFrames
	                    });
	                })();
	            }
	            return this;
	        }

	        /**
	         * pause
	         * @event pause
	         * @return {AFT} current context
	         */

	    }, {
	        key: 'pause',
	        value: function pause() {
	            if (this.isPlaying && !this.isPaused) {
	                this.isPlaying = false;
	                this.isPaused = true;
	                this.emit('pause');
	                this.render.pauseLoop();
	            }
	            return this;
	        }

	        /**
	         * cancel
	         * @event cancel
	         * @return {AFT} current context
	         */

	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            if (this.isPlaying || this.isPaused) {
	                this.isPlaying = false;
	                this.isPaused = false;
	                this.isFinished = true;
	                this.emit('cancel');
	                this.render.stopLoop();
	            }
	            return this;
	        }

	        /**
	         * resume
	         * @event resume
	         * @return {AFT} current context
	         */

	    }, {
	        key: 'resume',
	        value: function resume() {
	            if (!this.isPlaying && this.isPaused) {
	                this.isPlaying = true;
	                this.isPaused = false;
	                this.emit('resume');
	                this.render.resumeLoop();
	            }
	            return this;
	        }
	        /**
	        * generateCustomCoords
	        *
	        * @example
	        * AFT.generateCustomCoords('left top');
	        *
	        * @param  {string} coordsPosition like `center center`
	        * @return {array} current like `[1, 2]`or`[1,2,3]``
	        */

	    }, {
	        key: 'generateCustomCoords',
	        value: function generateCustomCoords(coordsPosition) {
	            var me = this;
	            var engine = me.engine;
	            var viewportWidth = engine.viewportWidth;
	            var viewportHeight = engine.viewportHeight;

	            coordsPosition = coordsPosition || 'center center';

	            /**
	             * const - description
	             *
	             * @param  {map} originDot origin dot
	             * @return {map}           target dot
	             */
	            var getValue = function getValue(originDot) {
	                var targetCoords = new _map2.default();
	                var targetDot = new _map2.default();
	                var targetX = void 0;
	                var targetY = void 0;

	                switch (coordsPosition) {
	                    case 'left top':
	                        {
	                            targetX = -viewportWidth / 2;
	                            targetY = viewportHeight / 2;
	                            break;
	                        }
	                    case 'left center':
	                        {
	                            targetX = -viewportWidth / 2;
	                            targetY = 0;
	                            break;
	                        }
	                    case 'left bottom':
	                        {
	                            targetX = -viewportWidth / 2;
	                            targetY = -viewportHeight / 2;
	                            break;
	                        }
	                    case 'center top':
	                        {
	                            targetX = 0;
	                            targetY = viewportHeight / 2;
	                            break;
	                        }
	                    case 'center center':
	                        {
	                            targetX = 0;
	                            targetY = 0;
	                            break;
	                        }
	                    case 'center bottom':
	                        {
	                            targetX = 0;
	                            targetY = -viewportHeight / 2;
	                            break;
	                        }
	                    case 'right top':
	                        {
	                            targetX = viewportWidth / 2;
	                            targetY = viewportHeight / 2;
	                            break;
	                        }
	                    case 'right center':
	                        {
	                            targetX = viewportWidth / 2;
	                            targetY = 0;
	                            break;
	                        }
	                    case 'right bottom':
	                        {
	                            '';
	                            targetX = viewportWidth / 2;
	                            targetY = -viewportHeight / 2;
	                            break;
	                        }
	                    // eslint-disable-next-line
	                    default:
	                        {}
	                }
	                targetCoords.set('x', targetX);
	                targetCoords.set('y', targetY);
	                if (originDot.get('x') !== undefined) {
	                    targetDot.set('x', targetCoords.get('x') + originDot.get('x'));
	                }
	                if (originDot.get('y') !== undefined) {
	                    targetDot.set('y', targetCoords.get('y') + originDot.get('y'));
	                }
	                return targetDot;
	            };

	            /**
	             * getResult
	             *
	             * @example
	             * let pos = AFT.generateCustomCoords('left top');
	             * pos(1,2,3);
	             *
	             * @param  {number} x origin
	             * @param  {number} y origin
	             * @param  {number} z origin
	             * @return {arr}   target
	             */
	            function getResult(x, y, z) {
	                var targetArr = [];
	                targetArr.push(getValue(new _map2.default().set('x', x)).get('x'));
	                targetArr.push(getValue(new _map2.default().set('y', y)).get('y'));
	                if (z) {
	                    targetArr.push(z);
	                }
	                return targetArr;
	            }

	            /**
	             * @example
	             * let pos = AFT.generateCustomCoords('left top');
	             * pos.x(1);
	             *
	             * @param  {number} x origin
	             * @return {number}   target
	             */
	            getResult.x = function (x) {
	                var resultNum = getValue(new _map2.default().set('x', x)).get('x');
	                return resultNum;
	            };
	            /**
	             * @example
	             * let pos = AFT.generateCustomCoords('left top');
	             * pos.y(1);
	             *
	             * @param  {number} y origin
	             * @return {number}   target
	             */
	            getResult.y = function (y) {
	                var resultNum = getValue(new _map2.default().set('y', y)).get('y');
	                return resultNum;
	            };
	            /**
	             * @example
	             * let pos = AFT.generateCustomCoords('left top');
	             * pos.z(1);
	             * @param  {number} z origin
	             * @return {number}   target
	             */
	            getResult.z = function (z) {
	                var resultNum = z;
	                return resultNum;
	            };

	            return getResult;
	        }
	    }, {
	        key: 'viewportWidth',
	        get: function get() {
	            return this.engine.viewportWidth;
	        }

	        /**
	         * get the viewport height from engine
	         * @return {Number}
	         */

	    }, {
	        key: 'viewportHeight',
	        get: function get() {
	            return this.engine.viewportHeight;
	        }

	        /**
	         * get the scaling from engine
	         * @return {Number}
	         */

	    }, {
	        key: 'scaling',
	        get: function get() {
	            return this.engine.scaling;
	        }
	    }]);
	    return AFT;
	}(_Event3.default);

	/**
	 * the Effect class
	 * @type {Effect}
	 */


	AFT.Effect = _Effect2.default;
	/**
	 * the Animation Class
	 * @type {Animation}
	 */
	AFT.Animation = _Animation2.default;
	/**
	 * the Timeline Class
	 * @type {Timeline}
	 */
	AFT.Timeline = _Timeline2.default;
	/**
	 * the Rectangle Class
	 * @type {Rectangle}
	 */
	AFT.Rectangle = _Rectangle2.default;
	/**
	 * the Circle Class
	 * @type {Circle}
	 */
	AFT.Circle = _Circle2.default;
	/**
	 * the Triangle Class
	 * @type {Triangle}
	 */
	AFT.Triangle = _Triangle2.default;
	/**
	 * the Group Class
	 * @type {Group}
	 */
	AFT.Group = _Group2.default;
	/**
	 * the Font Class
	 * @type {Font}
	 */
	AFT.Font = _Font2.default;

	module.exports = AFT;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(48);
	__webpack_require__(52);
	__webpack_require__(68);
	module.exports = __webpack_require__(12).Map;

/***/ },
/* 3 */
/***/ function(module, exports) {

	

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(5)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(8)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(6)
	  , defined   = __webpack_require__(7);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(9)
	  , $export        = __webpack_require__(10)
	  , redefine       = __webpack_require__(25)
	  , hide           = __webpack_require__(15)
	  , has            = __webpack_require__(26)
	  , Iterators      = __webpack_require__(27)
	  , $iterCreate    = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(44)
	  , getPrototypeOf = __webpack_require__(46)
	  , ITERATOR       = __webpack_require__(45)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , core      = __webpack_require__(12)
	  , ctx       = __webpack_require__(13)
	  , hide      = __webpack_require__(15)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 11 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(14);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(16)
	  , createDesc = __webpack_require__(24);
	module.exports = __webpack_require__(20) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(17)
	  , IE8_DOM_DEFINE = __webpack_require__(19)
	  , toPrimitive    = __webpack_require__(23)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(20) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(20) && !__webpack_require__(21)(function(){
	  return Object.defineProperty(__webpack_require__(22)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(21)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18)
	  , document = __webpack_require__(11).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(18);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);

/***/ },
/* 26 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(29)
	  , descriptor     = __webpack_require__(24)
	  , setToStringTag = __webpack_require__(44)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(15)(IteratorPrototype, __webpack_require__(45)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(17)
	  , dPs         = __webpack_require__(30)
	  , enumBugKeys = __webpack_require__(42)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(22)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(43).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(16)
	  , anObject = __webpack_require__(17)
	  , getKeys  = __webpack_require__(31);

	module.exports = __webpack_require__(20) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(32)
	  , enumBugKeys = __webpack_require__(42);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(26)
	  , toIObject    = __webpack_require__(33)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(39)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(34)
	  , defined = __webpack_require__(7);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(35);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(33)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(38);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(6)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(6)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(40)('keys')
	  , uid    = __webpack_require__(41);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).document && document.documentElement;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(16).f
	  , has = __webpack_require__(26)
	  , TAG = __webpack_require__(45)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(40)('wks')
	  , uid        = __webpack_require__(41)
	  , Symbol     = __webpack_require__(11).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(26)
	  , toObject    = __webpack_require__(47)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	var global        = __webpack_require__(11)
	  , hide          = __webpack_require__(15)
	  , Iterators     = __webpack_require__(27)
	  , TO_STRING_TAG = __webpack_require__(45)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(50)
	  , step             = __webpack_require__(51)
	  , Iterators        = __webpack_require__(27)
	  , toIObject        = __webpack_require__(33);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(8)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(53);

	// 23.1 Map Objects
	module.exports = __webpack_require__(63)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(16).f
	  , create      = __webpack_require__(29)
	  , redefineAll = __webpack_require__(54)
	  , ctx         = __webpack_require__(13)
	  , anInstance  = __webpack_require__(55)
	  , defined     = __webpack_require__(7)
	  , forOf       = __webpack_require__(56)
	  , $iterDefine = __webpack_require__(8)
	  , step        = __webpack_require__(51)
	  , setSpecies  = __webpack_require__(61)
	  , DESCRIPTORS = __webpack_require__(20)
	  , fastKey     = __webpack_require__(62).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(15);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(13)
	  , call        = __webpack_require__(57)
	  , isArrayIter = __webpack_require__(58)
	  , anObject    = __webpack_require__(17)
	  , toLength    = __webpack_require__(37)
	  , getIterFn   = __webpack_require__(59)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(17);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(27)
	  , ITERATOR   = __webpack_require__(45)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(60)
	  , ITERATOR  = __webpack_require__(45)('iterator')
	  , Iterators = __webpack_require__(27);
	module.exports = __webpack_require__(12).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(35)
	  , TAG = __webpack_require__(45)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(11)
	  , core        = __webpack_require__(12)
	  , dP          = __webpack_require__(16)
	  , DESCRIPTORS = __webpack_require__(20)
	  , SPECIES     = __webpack_require__(45)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(41)('meta')
	  , isObject = __webpack_require__(18)
	  , has      = __webpack_require__(26)
	  , setDesc  = __webpack_require__(16).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(21)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(11)
	  , $export        = __webpack_require__(10)
	  , meta           = __webpack_require__(62)
	  , fails          = __webpack_require__(21)
	  , hide           = __webpack_require__(15)
	  , redefineAll    = __webpack_require__(54)
	  , forOf          = __webpack_require__(56)
	  , anInstance     = __webpack_require__(55)
	  , isObject       = __webpack_require__(18)
	  , setToStringTag = __webpack_require__(44)
	  , dP             = __webpack_require__(16).f
	  , each           = __webpack_require__(64)(0)
	  , DESCRIPTORS    = __webpack_require__(20);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(13)
	  , IObject  = __webpack_require__(34)
	  , toObject = __webpack_require__(47)
	  , toLength = __webpack_require__(37)
	  , asc      = __webpack_require__(65);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(66);

	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18)
	  , isArray  = __webpack_require__(67)
	  , SPECIES  = __webpack_require__(45)('species');

	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(35);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(10);

	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(69)('Map')});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(60)
	  , from    = __webpack_require__(70);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(56);

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(72);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(75);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(48);
	module.exports = __webpack_require__(74).f('iterator');

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(45);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	__webpack_require__(3);
	__webpack_require__(86);
	__webpack_require__(87);
	module.exports = __webpack_require__(12).Symbol;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(11)
	  , has            = __webpack_require__(26)
	  , DESCRIPTORS    = __webpack_require__(20)
	  , $export        = __webpack_require__(10)
	  , redefine       = __webpack_require__(25)
	  , META           = __webpack_require__(62).KEY
	  , $fails         = __webpack_require__(21)
	  , shared         = __webpack_require__(40)
	  , setToStringTag = __webpack_require__(44)
	  , uid            = __webpack_require__(41)
	  , wks            = __webpack_require__(45)
	  , wksExt         = __webpack_require__(74)
	  , wksDefine      = __webpack_require__(78)
	  , keyOf          = __webpack_require__(79)
	  , enumKeys       = __webpack_require__(80)
	  , isArray        = __webpack_require__(67)
	  , anObject       = __webpack_require__(17)
	  , toIObject      = __webpack_require__(33)
	  , toPrimitive    = __webpack_require__(23)
	  , createDesc     = __webpack_require__(24)
	  , _create        = __webpack_require__(29)
	  , gOPNExt        = __webpack_require__(83)
	  , $GOPD          = __webpack_require__(85)
	  , $DP            = __webpack_require__(16)
	  , $keys          = __webpack_require__(31)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(84).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(82).f  = $propertyIsEnumerable;
	  __webpack_require__(81).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(9)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(11)
	  , core           = __webpack_require__(12)
	  , LIBRARY        = __webpack_require__(9)
	  , wksExt         = __webpack_require__(74)
	  , defineProperty = __webpack_require__(16).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(31)
	  , toIObject = __webpack_require__(33);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(31)
	  , gOPS    = __webpack_require__(81)
	  , pIE     = __webpack_require__(82);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 82 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(33)
	  , gOPN      = __webpack_require__(84).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(32)
	  , hiddenKeys = __webpack_require__(42).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(82)
	  , createDesc     = __webpack_require__(24)
	  , toIObject      = __webpack_require__(33)
	  , toPrimitive    = __webpack_require__(23)
	  , has            = __webpack_require__(26)
	  , IE8_DOM_DEFINE = __webpack_require__(19)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(20) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(78)('asyncIterator');

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(78)('observable');

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(89);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	__webpack_require__(4);
	module.exports = __webpack_require__(91);

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(60)
	  , ITERATOR  = __webpack_require__(45)('iterator')
	  , Iterators = __webpack_require__(27);
	module.exports = __webpack_require__(12).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	__webpack_require__(4);
	module.exports = __webpack_require__(94);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(17)
	  , get      = __webpack_require__(59);
	module.exports = __webpack_require__(12).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(97);
	module.exports = __webpack_require__(12).Object.keys;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(47)
	  , $keys    = __webpack_require__(31);

	__webpack_require__(98)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(10)
	  , core    = __webpack_require__(12)
	  , fails   = __webpack_require__(21);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(100);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(102);
	module.exports = __webpack_require__(12).Array.from;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(13)
	  , $export        = __webpack_require__(10)
	  , toObject       = __webpack_require__(47)
	  , call           = __webpack_require__(57)
	  , isArrayIter    = __webpack_require__(58)
	  , toLength       = __webpack_require__(37)
	  , createProperty = __webpack_require__(103)
	  , getIterFn      = __webpack_require__(59);

	$export($export.S + $export.F * !__webpack_require__(104)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(16)
	  , createDesc      = __webpack_require__(24);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(45)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(107);
	module.exports = __webpack_require__(12).Object.getPrototypeOf;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(47)
	  , $getPrototypeOf = __webpack_require__(46);

	__webpack_require__(98)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(110);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(112);
	var $Object = __webpack_require__(12).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(10);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(20), 'Object', {defineProperty: __webpack_require__(16).f});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(115);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(119);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(117);
	module.exports = __webpack_require__(12).Object.setPrototypeOf;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(10);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(118).set});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(18)
	  , anObject = __webpack_require__(17);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(13)(Function.call, __webpack_require__(85).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(121);
	var $Object = __webpack_require__(12).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(10)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(29)});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _eventEmitter = __webpack_require__(123);

	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Event
	 * @implements {EventEmitter}
	 */
	var Event = function Event() {
	  (0, _classCallCheck3.default)(this, Event);
	};

	exports.default = Event;

	(0, _eventEmitter2.default)(Event.prototype);

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d        = __webpack_require__(124)
	  , callable = __webpack_require__(137)

	  , apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }

	  , on, once, off, emit, methods, descriptors, base;

	on = function (type, listener) {
		var data;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		callable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d(on),
		once: d(once),
		off: d(off),
		emit: d(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign        = __webpack_require__(125)
	  , normalizeOpts = __webpack_require__(132)
	  , isCallable    = __webpack_require__(133)
	  , contains      = __webpack_require__(134)

	  , d;

	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(126)()
		? Object.assign
		: __webpack_require__(127);


/***/ },
/* 126 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
	};


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys  = __webpack_require__(128)
	  , value = __webpack_require__(131)

	  , max = Math.max;

	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, l = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try { dest[key] = src[key]; } catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(129)()
		? Object.keys
		: __webpack_require__(130);


/***/ },
/* 129 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) { return false; }
	};


/***/ },
/* 130 */
/***/ function(module, exports) {

	'use strict';

	var keys = Object.keys;

	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};


/***/ },
/* 131 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },
/* 132 */
/***/ function(module, exports) {

	'use strict';

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	module.exports = function (options/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },
/* 133 */
/***/ function(module, exports) {

	// Deprecated

	'use strict';

	module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(135)()
		? String.prototype.contains
		: __webpack_require__(136);


/***/ },
/* 135 */
/***/ function(module, exports) {

	'use strict';

	var str = 'razdwatrzy';

	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return ((str.contains('dwa') === true) && (str.contains('foo') === false));
	};


/***/ },
/* 136 */
/***/ function(module, exports) {

	'use strict';

	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },
/* 137 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Clock = __webpack_require__(139);

	var _Clock2 = _interopRequireDefault(_Clock);

	var _util = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Render
	 */
	var Render = function () {
	    /**
	     * create a render
	     * @return {Render}
	     */
	    function Render() {
	        (0, _classCallCheck3.default)(this, Render);

	        /**
	         * @type {Boolean} loop pause flag
	         */
	        this.paused = true;

	        /**
	         * @private {Null|Number} loop request id
	         */
	        this._requestId = null;
	    }
	    /**
	     * running a function in loop
	     * @param  {Function} fn
	     * @param  {Object}   options
	     */


	    (0, _createClass3.default)(Render, [{
	        key: 'runLoop',
	        value: function runLoop(fn) {
	            var _this = this;

	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            /**
	             * @private {Number} skip frames number
	             */
	            this._skipFrames = options.skipFrames || 0;

	            /**
	             * @private {Number} skip frames count flag
	             */
	            this._skipCount = 0;

	            /**
	             * @private {Clock} a clock
	             */
	            this._clock = new _Clock2.default();
	            /**
	             * @private {Function} frame function
	             */
	            this._fn = fn;

	            /**
	             * @type {Boolean} loop pause flag
	             */
	            this.paused = false;

	            // 第一次总是要执行的
	            fn(this._clock);

	            // 进入 _loop
	            // this._loop(fn);
	            this._requestId = (0, _util.raf)(function () {
	                return _this._loop();
	            });
	        }
	        /**
	         * pause the loop
	         */

	    }, {
	        key: 'pauseLoop',
	        value: function pauseLoop() {
	            // 非暂停状态，且有 requestId 才可以被暂停
	            if (!this.paused && this._requestId) {
	                this.paused = true;
	                this._clock.pause();
	            }
	        }
	        /**
	         * resume the loop
	         */

	    }, {
	        key: 'resumeLoop',
	        value: function resumeLoop() {
	            // 处于暂停状态，且有 requestId 才可以被重启
	            if (this.paused && this._requestId) {
	                this.paused = false;
	            }
	        }
	        /**
	         * stop the loop
	         */

	    }, {
	        key: 'stopLoop',
	        value: function stopLoop() {
	            if (this._requestId) {
	                this.paused = true;
	                (0, _util.caf)(this._requestId);
	                this._requestId = null;
	            }
	        }
	        /**
	         * the loop function
	         * @param {Function} fn callback function
	         */

	    }, {
	        key: '_loop',
	        value: function _loop() {
	            var _this2 = this;

	            // 如果在执行函数时 stopLoop，则在此判断是否还需要再 _loop
	            if (this._requestId !== null) {
	                this._requestId = (0, _util.raf)(function () {
	                    return _this2._loop();
	                });
	            }

	            var _skipFrames = this._skipFrames;
	            var _skipCount = this._skipCount;

	            // 暂停状态直接跳过

	            if (!this.paused) {
	                if (!_skipFrames) {
	                    this._clock.tick();
	                    this._fn(this._clock);
	                } else {
	                    // 跳过 _skipCount 步后再执行 fn
	                    if (_skipCount === _skipFrames) {
	                        this._clock.tick();
	                        this._fn(this._clock);
	                        this._skipCount = 0;
	                    } else {
	                        this._skipCount++;
	                    }
	                }
	            }
	        }
	    }]);
	    return Render;
	}();

	exports.default = Render;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class a clock
	 */
	var Clock = function () {
	    /**
	     * create a clock, and start immediately
	     * @return {Clock}
	     */
	    function Clock() {
	        (0, _classCallCheck3.default)(this, Clock);

	        this._start = Date.now();
	        this._elapsed = 0;
	        this._delta = 0;
	        this._pausedStart = 0;
	        this._paused = 0;
	    }

	    /**
	     * the elaspsed time
	     * @return {Number}
	     */


	    (0, _createClass3.default)(Clock, [{
	        key: "tick",


	        /**
	         * tick clock
	         */
	        value: function tick() {
	            var now = Date.now();

	            if (this._pausedStart !== 0) {
	                this._paused += now - this._pausedStart;
	                this._pausedStart = 0;
	            }
	            var elapsed = this._elapsed;
	            this._elapsed = now - this._start - this._paused;
	            this._delta = this._elapsed - elapsed;
	        }

	        /**
	         * pause clock
	         */

	    }, {
	        key: "pause",
	        value: function pause() {
	            if (this._pausedStart === 0) {
	                this._pausedStart = Date.now();
	            }
	        }
	    }, {
	        key: "elapsed",
	        get: function get() {
	            return this._elapsed;
	        }

	        /**
	         * the delta time
	         * @return {Number}
	         */

	    }, {
	        key: "delta",
	        get: function get() {
	            return this._delta;
	        }
	    }]);
	    return Clock;
	}();

	exports.default = Clock;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.caf = exports.raf = exports.polyfillTriangleStyle = exports.polyfillEllipseStyle = exports.polyfillCircleStyle = exports.optimizeBackgroundImage = exports.createImplementedClass = exports.mix = exports.generateTimingFunction = exports.m3d2m2d = exports.getTransformMatrix = exports.convertAxis = exports.deg2rad = exports.performLinearTransform = exports.scalingStyleValue = exports.convertStyleMap = exports.convertHexColor = exports.isRGBAColor = exports.isHexColor = undefined;

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _defineProperty = __webpack_require__(110);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	var _getOwnPropertyDescriptor = __webpack_require__(141);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	var _keys = __webpack_require__(95);

	var _keys2 = _interopRequireDefault(_keys);

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _slicedToArray2 = __webpack_require__(88);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _map = __webpack_require__(1);

	var _map2 = _interopRequireDefault(_map);

	var _toConsumableArray2 = __webpack_require__(99);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _cssTransformToMat = __webpack_require__(144);

	var _cssTransformToMat2 = _interopRequireDefault(_cssTransformToMat);

	var _camelCase = __webpack_require__(152);

	var _camelCase2 = _interopRequireDefault(_camelCase);

	var _parse = __webpack_require__(178);

	var _parse2 = _interopRequireDefault(_parse);

	var _rgb2hsl = __webpack_require__(185);

	var _rgb2hsl2 = _interopRequireDefault(_rgb2hsl);

	var _hsl2rgb = __webpack_require__(184);

	var _hsl2rgb2 = _interopRequireDefault(_hsl2rgb);

	var _Vec = __webpack_require__(186);

	var _Vec2 = _interopRequireDefault(_Vec);

	var _cubicbezier = __webpack_require__(191);

	var cubicbezier = _interopRequireWildcard(_cubicbezier);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hexColor4RegEx = /^\#([0-9A-F])([0-9A-F])([0-9A-F])([0-9A-F])?$/i;
	var hexColor8RegEx = /^\#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?$/i;

	var rgbaColorRegEx = /^rgba\(\s*(\s*[\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)$/;

	var numberUnitRegEx = /^[\-\d\.]+[a-z%]*$/;
	/**
	 * if is a hex color value
	 * @param  {String}  hex
	 * @return {Boolean}
	 */
	function isHexColor(hex) {
	    return !!hex.match(hexColor4RegEx) || !!hex.match(hexColor8RegEx);
	}

	/**
	 * if is a rgba color value
	 * @param  {String} rgba
	 * @return {Boolean}
	 */
	function isRGBAColor(rgba) {
	    return !!rgba.match(rgbaColorRegEx);
	}

	/**
	 * convert #rrggbbaa to (rr, gg, bb, aa)
	 * @param {String} hex
	 * @param {String} [type=css] css/webgl
	 * @return {Array<Number>} (rr, gg, bb, aa)
	 */
	function convertHexColor(hex) {
	    var type = arguments.length <= 1 || arguments[1] === undefined ? 'css' : arguments[1];

	    var rgb = void 0;
	    var a = void 0;

	    if (hex.length === 4 || hex.length === 5) {
	        rgb = _parse2.default.hex(hex.substring(0, 4));
	        var char = hex.charAt(4) || 'F';
	        a = parseInt('' + char + char, 16);
	    } else if (hex.length === 7 || hex.length === 9) {
	        rgb = _parse2.default.hex(hex.substring(0, 7));
	        a = parseInt(hex.substring(7, 9) || 'FF', 16);
	    }

	    var rgba = void 0;
	    if (type === 'webgl') {
	        rgba = [].concat((0, _toConsumableArray3.default)(rgb.map(function (i) {
	            return i / 255;
	        })), [a / 255]);
	    } else {
	        rgba = [].concat((0, _toConsumableArray3.default)(rgb), [a / 255]);
	    }
	    return rgba;
	}

	/**
	 * convert style map to css text
	 * @param  {Map} map
	 * @return {String} css text
	 */
	function convertStyleMap(map) {
	    var cssText = new _map2.default();
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = (0, _getIterator3.default)(map.keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var name = _step.value;

	            var value = map.get(name);
	            if (value !== null && value !== undefined) {
	                cssText.set(name, value);
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return [].concat((0, _toConsumableArray3.default)(cssText)).map(function (_ref) {
	        var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

	        var name = _ref2[0];
	        var value = _ref2[1];
	        return name + ':' + value;
	    }).join(';');
	}

	var PxValueRegEx = /[-\d\.]+px/g;
	/**
	 * scaling the value of style
	 * @param  {Map} map
	 * @param {Number} scale
	 * @return {Map}
	 */
	function scalingStyleValue(map, scale) {
	    map.forEach(function (value, name) {
	        var matched = value.match(PxValueRegEx);
	        if (matched) {
	            matched.forEach(function (n) {
	                var v = parseFloat(n) * scale;
	                value = value.replace(n, v + 'px');
	            });
	            map.set(name, value);
	        }
	    });
	}

	/**
	 * perform a linear transform between start value and end value
	 * @param  {String} name a style name
	 * @param  {Number|String} sVal a start style value
	 * @param  {Number|String} eVal a end style value
	 * @param  {Number} percent the percent of duration
	 * @return {Number|String} current value
	 */
	function performLinearTransform(name, sVal, eVal, percent) {
	    var val = void 0;
	    if (isRGBAColor(sVal) && isRGBAColor(eVal)) {
	        (function () {
	            sVal = _parse2.default.rgb(sVal);
	            eVal = _parse2.default.rgb(eVal);

	            var sHSL = (0, _rgb2hsl2.default)(sVal);
	            var eHSL = (0, _rgb2hsl2.default)(eVal);
	            var hsl = sHSL.map(function (v, i) {
	                return v + (eHSL[i] - v) * percent;
	            });
	            var rgba = [].concat((0, _toConsumableArray3.default)((0, _hsl2rgb2.default)(hsl))).map(function (i) {
	                return parseInt(Math.round(i));
	            });
	            rgba.push(sVal[3] + (eVal[3] - sVal[3]) * percent);

	            val = 'rgba(' + rgba.join(',') + ')';
	        })();
	    } else {
	        if (sVal !== undefined && eVal !== undefined && sVal.toString().match(numberUnitRegEx) && eVal.toString().match(numberUnitRegEx)) {
	            val = parseFloat(sVal) + (parseFloat(eVal) - parseFloat(sVal)) * percent;
	        } else {
	            val = percent < 1 ? sVal : eVal;
	        }
	    }
	    return val;
	}

	/**
	 * convert degree to radian
	 * @param  {Number} degree
	 * @return {Number} radian
	 */
	function deg2rad(degree) {
	    return degree / 180 * Math.PI;
	}

	/**
	 * convert axis
	 * @param  {Vec3} position
	 * @param  {{width: Nunber, height: Number}} viewport the viewport size
	 * @return {Vec3}
	 */
	function convertAxis(position, viewport) {
	    var x = viewport.width / 2;
	    var y = viewport.height / 2;
	    var vec3 = new _Vec2.default(x, y, position.z);
	    vec3.add([position.x, -position.y, 0]);
	    return vec3;
	}

	/**
	 * get transform matrix
	 * @param {Set} transform
	 * @param {function(item:Array)} [filter]
	 * @return {Mat4} a grade 4 matrix of transform
	 */
	function getTransformMatrix(transform, filter) {
	    var cssTransform = [].concat((0, _toConsumableArray3.default)(transform)).map(function (item) {
	        if (filter) {
	            item = filter(item);
	        }
	        var _item = item;

	        var _item2 = (0, _slicedToArray3.default)(_item, 2);

	        var name = _item2[0];
	        var value = _item2[1];

	        return name + '(' + value + ')';
	    }).join(' ');
	    return (0, _cssTransformToMat2.default)(cssTransform).map(function (i) {
	        return parseFloat(i.toFixed(6));
	    });
	}

	/**
	 * convert a Mat4 matrix to 2d(css) matrix
	 * @param  {Mat4} m3d
	 * @return {Array}
	 */
	function m3d2m2d(m3d) {
	    var m2d = new Array(6);
	    m2d[0] = m3d[0];
	    m2d[1] = m3d[1];
	    m2d[2] = m3d[4];
	    m2d[3] = m3d[5];
	    m2d[4] = m3d[12];
	    m2d[5] = m3d[13];
	    return m2d;
	}

	var CubicBezierRegEx = /^\s*cubic-bezier\(\s*([\-\d\.]+)\s*,\s*([\-\d\.]+)\s*,\s*([\-\d\.]+)\s*,\s*([\-\d\.]+)\s*\)\s*$/;

	/**
	 * generate a timing function with ease keyword
	 * @param  {String} ease a keyword like `ease-in` etc.
	 * @return {Function} a timing function
	 */
	function generateTimingFunction(ease) {
	    var timingFunction = void 0;
	    var matched = ease.match(CubicBezierRegEx);
	    if (matched) {
	        timingFunction = cubicbezier.cubicBezier.apply(cubicbezier, (0, _toConsumableArray3.default)(matched.slice(1).map(function (i) {
	            return parseFloat(i);
	        })));
	    } else {
	        timingFunction = cubicbezier[(0, _camelCase2.default)(ease)];
	    }
	    return timingFunction;
	}

	/**
	 * mix properties from source to target
	 * @param {Object} target
	 * @param  {Object} source
	 */
	function mix(target, source) {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(source)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var key = _step2.value;

	            if (key !== "constructor" && key !== "prototype" && key !== "name") {
	                var desc = (0, _getOwnPropertyDescriptor2.default)(source, key);
	                (0, _defineProperty2.default)(target, key, desc);
	            }
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }
	}

	/**
	 * create a implmented class from interfaces.
	 * @param  {...Object} interfaces
	 * @return {Class}
	 */
	function createImplementedClass() {
	    var Implemented = function Implemented() {
	        (0, _classCallCheck3.default)(this, Implemented);
	    };

	    for (var _len = arguments.length, interfaces = Array(_len), _key = 0; _key < _len; _key++) {
	        interfaces[_key] = arguments[_key];
	    }

	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;

	    try {
	        for (var _iterator3 = (0, _getIterator3.default)(interfaces), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var i = _step3.value;

	            mix(Implemented.prototype, i);
	        }
	    } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	            }
	        } finally {
	            if (_didIteratorError3) {
	                throw _iteratorError3;
	            }
	        }
	    }

	    return Implemented;
	}

	function appendStyle(id, content) {
	    if (!document.getElementById('for-' + id)) {
	        var parent = document.querySelector('head') || document.body || document.documentElement;
	        var style = document.createElement('style');
	        style.textContent = content;
	        style.id = 'for-' + id;
	        parent.appendChild(style);
	    }
	}

	/**
	 * optimize background-image
	 * @param  {HTMLElement} domElement
	 * @param  {Map} styleMap
	 */
	function optimizeBackgroundImage(domElement, styleMap) {
	    if (styleMap.has('background-image')) {
	        var image = styleMap.get('background-image');
	        var matched = image.match(/url\(["']?([^()]+)["']?\)/);
	        if (matched) {
	            styleMap.delete('background-image');
	            var key = 'img-' + encodeURIComponent(matched[1]);
	            if (domElement.getAttribute('img-hash') !== key) {
	                domElement.setAttribute('img-hash', key);
	                appendStyle(key, '\n                    [img-hash="' + key + '"] {\n                        background-image: ' + image + ';\n                    }\n                ');
	            }
	        }
	    }
	    return styleMap;
	}

	var clipPathCircleRegEx = /circle\(([\d\.]+)px\)/;
	/**
	 * polyfill clip-path for circle
	 * @param  {Map<String, String>} styleMap the map of circle style
	 * @return {Map<String, String>}
	 */
	function polyfillCircleStyle(styleMap) {
	    if (styleMap.has('clip-path')) {
	        var _styleMap$get$match = styleMap.get('clip-path').match(clipPathCircleRegEx);

	        var _styleMap$get$match2 = (0, _slicedToArray3.default)(_styleMap$get$match, 2);

	        var radius = _styleMap$get$match2[1];

	        styleMap.delete('clip-path');
	        styleMap.set('border-radius', radius + 'px');
	    }
	    return styleMap;
	}

	var clipPathEllipseRegEx = /ellipse\(([\d\.]+)px ([\d\.]+)px\)/;
	/**
	 * polyfill clip-path for ellipse
	 * @param  {Map<String, String>} styleMap the map of ellipse style
	 * @return {Map<String, String>}
	 */
	function polyfillEllipseStyle(styleMap) {
	    if (styleMap.has('clip-path')) {
	        var _styleMap$get$match3 = styleMap.get('clip-path').match(clipPathEllipseRegEx);

	        var _styleMap$get$match4 = (0, _slicedToArray3.default)(_styleMap$get$match3, 3);

	        var hRadius = _styleMap$get$match4[1];
	        var vRadius = _styleMap$get$match4[2];

	        styleMap.delete('clip-path');
	        styleMap.set('border-radius', hRadius + 'px/' + vRadius + 'px');
	    }
	    return styleMap;
	}

	var clipPathTriangleRegEx = /polygon\([\d\.]+px [\d\.]+px, ([\d\.]+)px ([\d\.]+)px, ([\d\.]+)px [\d\.]+px\)/;
	/**
	 * polyfill clip-path for triangle
	 * @param  {Map<String, String>} styleMap the map of triangle style
	 * @return {Map<String, String>}
	 */
	function polyfillTriangleStyle(styleMap) {
	    if (styleMap.has('clip-path')) {
	        var _styleMap$get$match5 = styleMap.get('clip-path').match(clipPathTriangleRegEx);

	        var _styleMap$get$match6 = (0, _slicedToArray3.default)(_styleMap$get$match5, 4);

	        var width = _styleMap$get$match6[1];
	        var bottomBorderWidth = _styleMap$get$match6[2];
	        var leftBorderWidth = _styleMap$get$match6[3];

	        var backgroundColor = styleMap.get('background-color');
	        styleMap.delete('clip-path');
	        styleMap.set('background-color', 'transparent');
	        styleMap.set('border-bottom', parseFloat(Number(bottomBorderWidth).toFixed(6)) + 'px solid ' + backgroundColor);
	        styleMap.set('border-left', parseFloat(Number(leftBorderWidth).toFixed(6)) + 'px solid transparent');
	        styleMap.set('border-right', parseFloat((Number(width) - Number(leftBorderWidth)).toFixed(6)) + 'px solid transparent');
	        styleMap.set('border-top', '0px');
	    }
	    return styleMap;
	}

	var rafInterval = 1000 / 60;

	/**
	 * Provides requestAnimationFrame in a cross browser way.
	 * @param  {Function} fn callback
	 * @return {Number} request id
	 */
	var raf = global.requestAnimationFrame || global.webkitRequestAnimationFrame || function (fn) {
	    return setTimeout(fn, rafInterval);
	};

	/**
	 * Provides cancelAnimationFrame in a cross browser way.
	 * @param {Number} requestId timer request id
	 */
	var caf = global.cancelAnimationFrame || global.webkitCancelAnimationFrame || global.webkitCancelRequestAnimationFrame || function (requestId) {
	    return clearTimeout(requestId);
	};

	exports.isHexColor = isHexColor;
	exports.isRGBAColor = isRGBAColor;
	exports.convertHexColor = convertHexColor;
	exports.convertStyleMap = convertStyleMap;
	exports.scalingStyleValue = scalingStyleValue;
	exports.performLinearTransform = performLinearTransform;
	exports.deg2rad = deg2rad;
	exports.convertAxis = convertAxis;
	exports.getTransformMatrix = getTransformMatrix;
	exports.m3d2m2d = m3d2m2d;
	exports.generateTimingFunction = generateTimingFunction;
	exports.mix = mix;
	exports.createImplementedClass = createImplementedClass;
	exports.optimizeBackgroundImage = optimizeBackgroundImage;
	exports.polyfillCircleStyle = polyfillCircleStyle;
	exports.polyfillEllipseStyle = polyfillEllipseStyle;
	exports.polyfillTriangleStyle = polyfillTriangleStyle;
	exports.raf = raf;
	exports.caf = caf;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(142), __esModule: true };

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(143);
	var $Object = __webpack_require__(12).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(33)
	  , $getOwnPropertyDescriptor = __webpack_require__(85).f;

	__webpack_require__(98)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var mat4RotateX = __webpack_require__(145);
	var mat4RotateY = __webpack_require__(146);
	var mat4RotateZ = __webpack_require__(147);
	var mat4Rotate = __webpack_require__(148);
	var mat4Scale = __webpack_require__(149);
	var mat4Translate = __webpack_require__(150);
	var mat4Multiply = __webpack_require__(151);

	// Spec was used for reference http://www.w3.org/TR/2009/WD-css3-3d-transforms-20090320/
	module.exports = function cssTransformToMatrix(value) {

	  var functions = value.match(/[A-z3]+\([^\)]+/g) || [];
	  var outMatrix = createMatrix();
	  var matrices = [];

	  functions.forEach( function(func) {

	    var split = func.split('('); 
	    var name = split[ 0 ]
	    var value = split[ 1 ];
	    var matrix;

	    switch(name) {

	      /////// 2D FUNCTIONS ///////
	      case 'matrix':
	        // matrix(
	        //   a,b,c,
	        //   d,e,f
	        // ) is equivalent to 

	        // matrix3d(
	        //   a, b, 0, 0, 
	        //   c, d, 0, 0, 
	        //   0, 0, 1, 0, 
	        //   e, f, 0, 1)


	        value = value.split(',').map(parseFloat);
	        matrix = [
	          value[ 0 ], value[ 1 ], 0, 0,
	          value[ 2 ], value[ 3 ], 0, 0,
	          0,          0,          1, 0,
	          value[ 4 ], value[ 5 ], 0, 1
	        ];
	      break;

	      case 'matrix3d':
	        matrix = value.split(',').map(parseFloat);
	      break;

	      case 'translate':
	      case 'translate3d':
	        matrix = createMatrix();
	        value = value.split(',').map(parseFloat);

	        if(value.length === 2) {
	          value.push(0);
	        }

	        mat4Translate(matrix, matrix, value);
	      break;

	      case 'translateX':
	        matrix = createMatrix();
	        value = [ parseFloat(value), 0, 0 ];
	        mat4Translate(matrix, matrix, value);
	      break;

	      case 'translateY':
	        matrix = createMatrix();
	        value = [ 0, parseFloat(value), 0 ];
	        mat4Translate(matrix, matrix, value);
	      break;

	      case 'translateZ':
	        matrix = createMatrix();
	        value = [ 0, 0, parseFloat(value) ];
	        mat4Translate(matrix, matrix, value);
	      break;

	      case 'rotate':
	      case 'rotateZ':
	        matrix = createMatrix();
	        value = getRadian(value);
	        mat4RotateZ(matrix, matrix, value);
	      break;

	      case 'scale':
	      case 'scale3d':
	        matrix = createMatrix();
	        value = value.split(',').map(parseFloat);

	        if(value.length === 2) {
	          value.push(1);  
	        }
	        
	        mat4Scale(matrix, matrix, value);
	      break;

	      case 'scaleX':
	        matrix = createMatrix();
	        mat4Scale(matrix, matrix, [parseFloat(value), 1, 1]);
	      break;

	      case 'scaleY':
	        matrix = createMatrix();
	        mat4Scale(matrix, matrix, [1, parseFloat(value), 1]);
	      break;

	      case 'scaleZ':
	        matrix = createMatrix();
	        mat4Scale(matrix, matrix, [1, 1, parseFloat(value)]);
	      break;

	      case 'rotateX':
	        matrix = createMatrix();
	        value = getRadian(value);
	        mat4RotateX(matrix, matrix, value);
	      break;

	      case 'rotateY':
	        matrix = createMatrix();
	        value = getRadian(value);
	        mat4RotateY(matrix, matrix, value);
	      break;

	      case 'rotate3d':
	        matrix = createMatrix();
	        value = value.split(',');
	        mat4Rotate(matrix, matrix, getRadian(value[3]), value.slice(0, 3).map(parseFloat));
	      break;

	      case 'perspective':
	        // The matrix is computed by starting with an identity matrix and replacing the value at row 3, 
	        // column 4 with the value -1/depth. The value for depth must be greater than zero, otherwise 
	        // the function is invalid.
	        value = parseFloat(value);

	        matrix = [
	          1, 0, 0, 0,
	          0, 1, 0, 0,
	          0, 0, 1, -1 / value,
	          0, 0, 0, 1
	        ];
	      break;

	      case 'skew':
	        matrix = createMatrix();
	        value = value.split(',').map(getRadian);
	        matrix = [
	          1,                    Math.tan(value[ 0 ]), 0, 0,
	          Math.tan(value[ 1 ]), 1,                    0, 0,
	          0,                    0,                    1, 0,
	          0,                    0,                    0, 1
	        ];
	      break;

	      case 'skewX':
	        matrix = createMatrix();
	        value = getRadian(value);
	        matrix = [
	          1,               0, 0, 0,
	          Math.tan(value), 1, 0, 0,
	          0,               0, 1, 0,
	          0,               0, 0, 1
	        ];
	      break;

	      case 'skewY':
	        matrix = createMatrix();
	        value = getRadian(value);
	        matrix = [
	          1, Math.tan(value), 0, 0,
	          0, 1,               0, 0,
	          0, 0,               1, 0,
	          0, 0,               0, 1
	        ];
	      break;

	      case 'none':
	      case 'initial':
	      break;

	      default:
	        throw new Error('unsupported transform function: ' + name);
	      break;
	    };

	    if(matrix) {
	      mat4Multiply(outMatrix, outMatrix, matrix);
	    }
	  });

	  return outMatrix;
	};

	function getRadian(value) {
	  if(value.indexOf("deg") != -1) {
	    return parseFloat(value,10) * (Math.PI * 2 / 360);
	  } else if (value.indexOf("grad") != -1) {
	    return parseFloat(value,10) * (Math.PI/200);
	  } else {
	    return parseFloat(value,10);
	  }
	}

	function createMatrix() {
	  return [
	    1, 0, 0, 0,
	    0, 1, 0, 0,
	    0, 0, 1, 0,
	    0, 0, 0, 1
	  ];
	}



	// computeMatrix: function(ruleValue) {
	  
	//     //Split the webkit functions and loop through them
	//     var functions = ruleValue.match(/[A-z]+\([^\)]+/g) || [];
	//     var matrices = [];
	    
	//     for (var k=0; k < functions.length; k++) {
	    
	//       //Prepare the function name and its value
	//       var func = functions[k].split('(')[0],
	//         value = functions[k].split('(')[1];
	    
	//       //Now we rotate through the functions and add it to our matrix
	//       switch(func) {
	//         case 'matrix': //Attention: Matrix in IE doesn't support e,f = tx,ty = translation
	//           var values = value.split(',');
	//           matrices.push($M([
	//             [values[0], values[2],  0],
	//             [values[1], values[3],  0],
	//             [0,         0,  1]
	//           ]));
	//           break;
	//         case 'rotate':
	//           var a = Transformie.toRadian(value);
	//           matrices.push($M([
	//             [Math.cos(a), -Math.sin(a), 0],
	//             [Math.sin(a), Math.cos(a),  0],
	//             [0,       0,        1]
	//           ]));
	//           break;
	//         case 'scale':
	//           matrices.push($M([
	//             [value, 0,    0],
	//             [0,   value,  0],
	//             [0,   0,    1]
	//           ]));
	//           break;
	//         case 'scaleX':
	//           matrices.push($M([
	//             [value, 0,    0],
	//             [0,   1,    0],
	//             [0,   0,    1]
	//           ]));
	//           break;
	//         case 'scaleY':
	//           matrices.push($M([
	//             [1,   0,    0],
	//             [0,   value,  0],
	//             [0,   0,    1]
	//           ]));
	//           break;
	//         case 'skew':
	//           var a = Transformie.toRadian(value);
	//           matrices.push($M([
	//             [1,       0,  0],
	//             [Math.tan(a), 1,  0],
	//             [0,       0,  1]
	//           ]));
	//         case 'skewX':
	//           var a = Transformie.toRadian(value);
	//           matrices.push($M([
	//             [1,   Math.tan(a),0],
	//             [0,   1,      0],
	//             [0,   0,      1]
	//           ]));
	//           break;
	//         case 'skewY':
	//           var a = Transformie.toRadian(value);
	//           matrices.push($M([
	//             [1,       0,  0],
	//             [Math.tan(a), 1,  0],
	//             [0,       0,  1]
	//           ]));
	//           break;
	//       };
	      
	//     };
	    
	//     if(!matrices.length)
	//       return;
	    
	//     //Calculate the resulting matrix
	//     var matrix = matrices[0];
	//     for (var k=0; k < matrices.length; k++) {
	//       if(matrices[k+1]) matrix = matrix.x(matrices[k+1]);
	//     };

	//     return matrix;
	    
	//   }

/***/ },
/* 145 */
/***/ function(module, exports) {

	module.exports = rotateX;

	/**
	 * Rotates a matrix by the given angle around the X axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	function rotateX(out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[0]  = a[0];
	        out[1]  = a[1];
	        out[2]  = a[2];
	        out[3]  = a[3];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[4] = a10 * c + a20 * s;
	    out[5] = a11 * c + a21 * s;
	    out[6] = a12 * c + a22 * s;
	    out[7] = a13 * c + a23 * s;
	    out[8] = a20 * c - a10 * s;
	    out[9] = a21 * c - a11 * s;
	    out[10] = a22 * c - a12 * s;
	    out[11] = a23 * c - a13 * s;
	    return out;
	};

/***/ },
/* 146 */
/***/ function(module, exports) {

	module.exports = rotateY;

	/**
	 * Rotates a matrix by the given angle around the Y axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	function rotateY(out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[4]  = a[4];
	        out[5]  = a[5];
	        out[6]  = a[6];
	        out[7]  = a[7];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c - a20 * s;
	    out[1] = a01 * c - a21 * s;
	    out[2] = a02 * c - a22 * s;
	    out[3] = a03 * c - a23 * s;
	    out[8] = a00 * s + a20 * c;
	    out[9] = a01 * s + a21 * c;
	    out[10] = a02 * s + a22 * c;
	    out[11] = a03 * s + a23 * c;
	    return out;
	};

/***/ },
/* 147 */
/***/ function(module, exports) {

	module.exports = rotateZ;

	/**
	 * Rotates a matrix by the given angle around the Z axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	function rotateZ(out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7];

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[8]  = a[8];
	        out[9]  = a[9];
	        out[10] = a[10];
	        out[11] = a[11];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c + a10 * s;
	    out[1] = a01 * c + a11 * s;
	    out[2] = a02 * c + a12 * s;
	    out[3] = a03 * c + a13 * s;
	    out[4] = a10 * c - a00 * s;
	    out[5] = a11 * c - a01 * s;
	    out[6] = a12 * c - a02 * s;
	    out[7] = a13 * c - a03 * s;
	    return out;
	};

/***/ },
/* 148 */
/***/ function(module, exports) {

	module.exports = rotate;

	/**
	 * Rotates a mat4 by the given angle
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	function rotate(out, a, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t,
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23,
	        b00, b01, b02,
	        b10, b11, b12,
	        b20, b21, b22;

	    if (Math.abs(len) < 0.000001) { return null; }
	    
	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;

	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;

	    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	    // Construct the elements of the rotation matrix
	    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
	    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
	    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

	    // Perform rotation-specific matrix multiplication
	    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }
	    return out;
	};

/***/ },
/* 149 */
/***/ function(module, exports) {

	module.exports = scale;

	/**
	 * Scales the mat4 by the dimensions in the given vec3
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/
	function scale(out, a, v) {
	    var x = v[0], y = v[1], z = v[2];

	    out[0] = a[0] * x;
	    out[1] = a[1] * x;
	    out[2] = a[2] * x;
	    out[3] = a[3] * x;
	    out[4] = a[4] * y;
	    out[5] = a[5] * y;
	    out[6] = a[6] * y;
	    out[7] = a[7] * y;
	    out[8] = a[8] * z;
	    out[9] = a[9] * z;
	    out[10] = a[10] * z;
	    out[11] = a[11] * z;
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

/***/ },
/* 150 */
/***/ function(module, exports) {

	module.exports = translate;

	/**
	 * Translate a mat4 by the given vector
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	function translate(out, a, v) {
	    var x = v[0], y = v[1], z = v[2],
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23;

	    if (a === out) {
	        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	    } else {
	        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
	        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
	        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

	        out[12] = a00 * x + a10 * y + a20 * z + a[12];
	        out[13] = a01 * x + a11 * y + a21 * z + a[13];
	        out[14] = a02 * x + a12 * y + a22 * z + a[14];
	        out[15] = a03 * x + a13 * y + a23 * z + a[15];
	    }

	    return out;
	};

/***/ },
/* 151 */
/***/ function(module, exports) {

	module.exports = multiply;

	/**
	 * Multiplies two mat4's
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	function multiply(out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    // Cache only the current line of the second matrix
	    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
	    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
	    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
	    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
	    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
	    return out;
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var capitalize = __webpack_require__(153),
	    createCompounder = __webpack_require__(169);

	/**
	 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the camel cased string.
	 * @example
	 *
	 * _.camelCase('Foo Bar');
	 * // => 'fooBar'
	 *
	 * _.camelCase('--foo-bar--');
	 * // => 'fooBar'
	 *
	 * _.camelCase('__FOO_BAR__');
	 * // => 'fooBar'
	 */
	var camelCase = createCompounder(function(result, word, index) {
	  word = word.toLowerCase();
	  return result + (index ? capitalize(word) : word);
	});

	module.exports = camelCase;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(154),
	    upperFirst = __webpack_require__(161);

	/**
	 * Converts the first character of `string` to upper case and the remaining
	 * to lower case.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to capitalize.
	 * @returns {string} Returns the capitalized string.
	 * @example
	 *
	 * _.capitalize('FRED');
	 * // => 'Fred'
	 */
	function capitalize(string) {
	  return upperFirst(toString(string).toLowerCase());
	}

	module.exports = capitalize;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(155);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(156),
	    isSymbol = __webpack_require__(159);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(157);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(158);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 158 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(160);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 160 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var createCaseFirst = __webpack_require__(162);

	/**
	 * Converts the first character of `string` to upper case.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.upperFirst('fred');
	 * // => 'Fred'
	 *
	 * _.upperFirst('FRED');
	 * // => 'FRED'
	 */
	var upperFirst = createCaseFirst('toUpperCase');

	module.exports = upperFirst;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var castSlice = __webpack_require__(163),
	    hasUnicode = __webpack_require__(165),
	    stringToArray = __webpack_require__(166),
	    toString = __webpack_require__(154);

	/**
	 * Creates a function like `_.lowerFirst`.
	 *
	 * @private
	 * @param {string} methodName The name of the `String` case method to use.
	 * @returns {Function} Returns the new case function.
	 */
	function createCaseFirst(methodName) {
	  return function(string) {
	    string = toString(string);

	    var strSymbols = hasUnicode(string)
	      ? stringToArray(string)
	      : undefined;

	    var chr = strSymbols
	      ? strSymbols[0]
	      : string.charAt(0);

	    var trailing = strSymbols
	      ? castSlice(strSymbols, 1).join('')
	      : string.slice(1);

	    return chr[methodName]() + trailing;
	  };
	}

	module.exports = createCaseFirst;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(164);

	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : baseSlice(array, start, end);
	}

	module.exports = castSlice;


/***/ },
/* 164 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 165 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsZWJ = '\\u200d';

	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */
	function hasUnicode(string) {
	  return reHasUnicode.test(string);
	}

	module.exports = hasUnicode;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var asciiToArray = __webpack_require__(167),
	    hasUnicode = __webpack_require__(165),
	    unicodeToArray = __webpack_require__(168);

	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return hasUnicode(string)
	    ? unicodeToArray(string)
	    : asciiToArray(string);
	}

	module.exports = stringToArray;


/***/ },
/* 167 */
/***/ function(module, exports) {

	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function asciiToArray(string) {
	  return string.split('');
	}

	module.exports = asciiToArray;


/***/ },
/* 168 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function unicodeToArray(string) {
	  return string.match(reUnicode) || [];
	}

	module.exports = unicodeToArray;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(170),
	    deburr = __webpack_require__(171),
	    words = __webpack_require__(174);

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]";

	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos, 'g');

	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
	  };
	}

	module.exports = createCompounder;


/***/ },
/* 170 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var deburrLetter = __webpack_require__(172),
	    toString = __webpack_require__(154);

	/** Used to match Latin Unicode letters (excluding mathematical operators). */
	var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0';

	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';

	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');

	/**
	 * Deburrs `string` by converting
	 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	 * letters to basic Latin letters and removing
	 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
	}

	module.exports = deburr;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var basePropertyOf = __webpack_require__(173);

	/** Used to map Latin Unicode letters to basic Latin letters. */
	var deburredLetters = {
	  // Latin-1 Supplement block.
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss',
	  // Latin Extended-A block.
	  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
	  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
	  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
	  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
	  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
	  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
	  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
	  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
	  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
	  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
	  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
	  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
	  '\u0134': 'J',  '\u0135': 'j',
	  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
	  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
	  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
	  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
	  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
	  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
	  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
	  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
	  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
	  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
	  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
	  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
	  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
	  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
	  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
	  '\u0174': 'W',  '\u0175': 'w',
	  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
	  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
	  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
	  '\u0132': 'IJ', '\u0133': 'ij',
	  '\u0152': 'Oe', '\u0153': 'oe',
	  '\u0149': "'n", '\u017f': 's'
	};

	/**
	 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	 * letters to basic Latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	var deburrLetter = basePropertyOf(deburredLetters);

	module.exports = deburrLetter;


/***/ },
/* 173 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function(key) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = basePropertyOf;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var asciiWords = __webpack_require__(175),
	    hasUnicodeWord = __webpack_require__(176),
	    toString = __webpack_require__(154),
	    unicodeWords = __webpack_require__(177);

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;

	  if (pattern === undefined) {
	    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
	  }
	  return string.match(pattern) || [];
	}

	module.exports = words;


/***/ },
/* 175 */
/***/ function(module, exports) {

	/** Used to match words composed of alphanumeric characters. */
	var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

	/**
	 * Splits an ASCII `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function asciiWords(string) {
	  return string.match(reAsciiWord) || [];
	}

	module.exports = asciiWords;


/***/ },
/* 176 */
/***/ function(module, exports) {

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	/**
	 * Checks if `string` contains a word composed of Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a word is found, else `false`.
	 */
	function hasUnicodeWord(string) {
	  return reHasUnicodeWord.test(string);
	}

	module.exports = hasUnicodeWord;


/***/ },
/* 177 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsPunctuationRange = '\\u2000-\\u206f',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]",
	    rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
	    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

	/** Used to match complex or compound words. */
	var reUnicodeWord = RegExp([
	  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
	  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
	  rsUpper + '+' + rsOptUpperContr,
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');

	/**
	 * Splits a Unicode `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function unicodeWords(string) {
	  return string.match(reUnicodeWord) || [];
	}

	module.exports = unicodeWords;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var hsl = __webpack_require__(179);
	var hex = __webpack_require__(182);
	var rgb = __webpack_require__(183);
	var hsl2rgb = __webpack_require__(184);

	function hsl2rgbParse(color) {
	  var h = hsl(color);
	  var r = hsl2rgb(h);

	  // handle alpha since hsl2rgb doesn't know (or care!) about it
	  if(h.length === 4) {
	    r.push(h[3]);
	  }

	  return r;
	}

	var space2parser = {
	  "#" : hex,
	  "hsl" : hsl2rgbParse,
	  "rgb" : rgb
	};

	function parse(color) {
	  for(var scheme in space2parser) {
	    if(color.indexOf(scheme) === 0) {
	      return space2parser[scheme](color);
	    }
	  }
	}

	parse.rgb = rgb;
	parse.hsl = hsl;
	parse.hex = hex;

	module.exports = parse;

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var extractComponents = __webpack_require__(180);
	var clamp = __webpack_require__(181);

	function parseHslComponent(component, i) {
	  component = parseFloat(component);

	  switch(i) {
	    case 0:
	      return clamp(component, 0, 360);
	    case 1:
	    case 2:
	      return clamp(component, 0, 100);
	    case 3:
	      return clamp(component, 0, 1);
	  }
	}

	function hsl(color) {
	  return extractComponents(color).map(parseHslComponent);
	}

	module.exports = hsl;

/***/ },
/* 180 */
/***/ function(module, exports) {

	var component = /-?\d+(\.\d+)?%?/g;
	function extractComponents(color) {
	  return color.match(component);
	}

	module.exports = extractComponents;

/***/ },
/* 181 */
/***/ function(module, exports) {

	function clamp(val, min, max) {
	  return Math.min(Math.max(val, min), max);
	}

	module.exports = clamp;

/***/ },
/* 182 */
/***/ function(module, exports) {

	function hex(hex) {
	  if (hex.length === 4) {
	    hex = '#' + hex.charAt(1) + hex.charAt(1) +
	      hex.charAt(2) + hex.charAt(2) + 
	      hex.charAt(3) + hex.charAt(3);
	  }
	  return [
	    parseInt(hex.substring(1,3), 16),
	    parseInt(hex.substring(3,5), 16),
	    parseInt(hex.substring(5,7), 16)
	  ];
	}

	module.exports = hex;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var extractComponents = __webpack_require__(180);
	var clamp = __webpack_require__(181);

	function parseRgbComponent(component, i) {
	  if (i < 3) {
	    if (component.indexOf('%') != -1) {
	      return Math.round(255 * clamp(parseInt(component, 10), 0, 100)/100);
	    } else {
	      return clamp(parseInt(component, 10), 0, 255);
	    }
	  } else {
	    return clamp(parseFloat(component), 0, 1);
	  } 
	}

	function rgb(color) {
	  return extractComponents(color).map(parseRgbComponent);
	}

	module.exports = rgb;

/***/ },
/* 184 */
/***/ function(module, exports) {

	function hsl2rgb(hsl) {
	  var h = hsl[0] / 360,
	      s = hsl[1] / 100,
	      l = hsl[2] / 100,
	      t1, t2, t3, rgb, val;

	  if (s == 0) {
	    val = l * 255;
	    return [val, val, val];
	  }

	  if (l < 0.5)
	    t2 = l * (1 + s);
	  else
	    t2 = l + s - l * s;
	  t1 = 2 * l - t2;

	  rgb = [0, 0, 0];
	  for (var i = 0; i < 3; i++) {
	    t3 = h + 1 / 3 * - (i - 1);
	    t3 < 0 && t3++;
	    t3 > 1 && t3--;

	    if (6 * t3 < 1)
	      val = t1 + (t2 - t1) * 6 * t3;
	    else if (2 * t3 < 1)
	      val = t2;
	    else if (3 * t3 < 2)
	      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
	    else
	      val = t1;

	    rgb[i] = val * 255;
	  }

	  return rgb;
	}

	module.exports = hsl2rgb;

/***/ },
/* 185 */
/***/ function(module, exports) {

	function rgb2hsl(rgb) {
	  var r = rgb[0]/255,
	      g = rgb[1]/255,
	      b = rgb[2]/255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      delta = max - min,
	      h, s, l;

	  if (max == min)
	    h = 0;
	  else if (r == max)
	    h = (g - b) / delta;
	  else if (g == max)
	    h = 2 + (b - r) / delta;
	  else if (b == max)
	    h = 4 + (r - g)/ delta;

	  h = Math.min(h * 60, 360);

	  if (h < 0)
	    h += 360;

	  l = (min + max) / 2;

	  if (max == min)
	    s = 0;
	  else if (l <= 0.5)
	    s = delta / (max + min);
	  else
	    s = delta / (2 - max - min);

	  return [h, s * 100, l * 100];
	}

	module.exports = rgb2hsl;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _create = __webpack_require__(187);

	var _create2 = _interopRequireDefault(_create);

	var _add2 = __webpack_require__(188);

	var _add3 = _interopRequireDefault(_add2);

	var _copy = __webpack_require__(189);

	var _copy2 = _interopRequireDefault(_copy);

	var _set2 = __webpack_require__(190);

	var _set3 = _interopRequireDefault(_set2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function normalizeArgument() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	    return [x, y, z];
	}

	/**
	 * @class Vec3
	 */

	var Vec3 = function () {
	    /**
	     * create a vec3
	     * @param {Number} [x=0]
	     * @param {Number} [y=0]
	     * @param {Number} [z=0]
	     * @return {Vec3}
	     */
	    function Vec3() {
	        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        (0, _classCallCheck3.default)(this, Vec3);

	        /**
	         * if modified
	         * @type {Boolean}
	         */
	        this.modified = false;

	        (0, _copy2.default)(this, (0, _create2.default)());
	        this.set(x, y, z);
	    }

	    /**
	     * get x of position
	     * @return {Number}
	     */


	    (0, _createClass3.default)(Vec3, [{
	        key: 'add',


	        /**
	         * add a vec3
	         * @param {Vec3|Float32Array<Number>} vec3
	         * @return {Vec3} the current context
	         */
	        value: function add(vec3) {
	            vec3 = normalizeArgument(vec3[0], vec3[1], vec3[2]);
	            this.modified = true;
	            return (0, _add3.default)(this, this, vec3);
	        }

	        /**
	         * set x, y, z
	         * @param {...Number} xyz
	         * @return {Vec3} current context
	         */

	    }, {
	        key: 'set',
	        value: function set() {
	            for (var _len = arguments.length, xyz = Array(_len), _key = 0; _key < _len; _key++) {
	                xyz[_key] = arguments[_key];
	            }

	            for (var i = 0; i < 3; i++) {
	                if (xyz[i] === undefined) {
	                    xyz[i] = this[i];
	                }
	            }

	            this.modified = true;
	            return _set3.default.apply(undefined, [this].concat(xyz));
	        }
	    }, {
	        key: 'x',
	        get: function get() {
	            return this[0];
	        }

	        /**
	         * set x of position
	         * @param  {Number} v
	         */
	        ,
	        set: function set(v) {
	            this.set(v);
	        }

	        /**
	         * get y of position
	         * @return {Number}
	         */

	    }, {
	        key: 'y',
	        get: function get() {
	            return this[1];
	        }

	        /**
	         * set y of position
	         * @param  {Number} v
	         */
	        ,
	        set: function set(v) {
	            this.set(undefined, v);
	        }

	        /**
	         * get z of position
	         * @return {Number}
	         */

	    }, {
	        key: 'z',
	        get: function get() {
	            return this[2];
	        }

	        /**
	         * set z of position
	         * @param  {Number} v
	         */
	        ,
	        set: function set(v) {
	            this.set(undefined, undefined, v);
	        }
	    }]);
	    return Vec3;
	}();

	exports.default = Vec3;

/***/ },
/* 187 */
/***/ function(module, exports) {

	module.exports = create;

	/**
	 * Creates a new, empty vec3
	 *
	 * @returns {vec3} a new 3D vector
	 */
	function create() {
	    var out = new Float32Array(3)
	    out[0] = 0
	    out[1] = 0
	    out[2] = 0
	    return out
	}

/***/ },
/* 188 */
/***/ function(module, exports) {

	module.exports = add;

	/**
	 * Adds two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	function add(out, a, b) {
	    out[0] = a[0] + b[0]
	    out[1] = a[1] + b[1]
	    out[2] = a[2] + b[2]
	    return out
	}

/***/ },
/* 189 */
/***/ function(module, exports) {

	module.exports = copy;

	/**
	 * Copy the values from one vec3 to another
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the source vector
	 * @returns {vec3} out
	 */
	function copy(out, a) {
	    out[0] = a[0]
	    out[1] = a[1]
	    out[2] = a[2]
	    return out
	}

/***/ },
/* 190 */
/***/ function(module, exports) {

	module.exports = set;

	/**
	 * Set the components of a vec3 to the given values
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} out
	 */
	function set(out, x, y, z) {
	    out[0] = x
	    out[1] = y
	    out[2] = z
	    return out
	}

/***/ },
/* 191 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * generate a cubic bezier function
	 * @param  {Number} p1x the x coord of first control point
	 * @param  {Number} p1y the y coord of first control point
	 * @param  {Number} p2x the x coord of second control point
	 * @param  {Number} p2y the y coord of second control point
	 * @return {function(a: Number):Number}
	 */
	function cubicBezier(p1x, p1y, p2x, p2y) {
	    var ZERO_LIMIT = 1e-6;
	    // Calculate the polynomial coefficients,
	    // implicit first and last control points are (0,0) and (1,1).
	    var ax = 3 * p1x - 3 * p2x + 1,
	        bx = 3 * p2x - 6 * p1x,
	        cx = 3 * p1x;

	    var ay = 3 * p1y - 3 * p2y + 1,
	        by = 3 * p2y - 6 * p1y,
	        cy = 3 * p1y;

	    function sampleCurveDerivativeX(t) {
	        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
	        return (3 * ax * t + 2 * bx) * t + cx;
	    }

	    function sampleCurveX(t) {
	        return ((ax * t + bx) * t + cx) * t;
	    }

	    function sampleCurveY(t) {
	        return ((ay * t + by) * t + cy) * t;
	    }

	    // Given an x value, find a parametric value it came from.
	    function solveCurveX(x) {
	        var t2 = x,
	            derivative,
	            x2;

	        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
	        // First try a few iterations of Newton's method -- normally very fast.
	        // http://en.wikipedia.org/wiki/Newton's_method
	        for (var i = 0; i < 8; i++) {
	            // f(t)-x=0
	            x2 = sampleCurveX(t2) - x;
	            /* istanbul ignore if */
	            if (Math.abs(x2) < ZERO_LIMIT) {
	                return t2;
	            }
	            derivative = sampleCurveDerivativeX(t2);
	            // == 0, failure
	            /* istanbul ignore if */
	            if (Math.abs(derivative) < ZERO_LIMIT) {
	                break;
	            }
	            t2 -= x2 / derivative;
	        }

	        // Fall back to the bisection method for reliability.
	        // bisection
	        // http://en.wikipedia.org/wiki/Bisection_method
	        var t1 = 1,
	            t0 = 0;
	        t2 = x;
	        while (t1 > t0) {
	            x2 = sampleCurveX(t2) - x;
	            /* istanbul ignore next */
	            if (Math.abs(x2) < ZERO_LIMIT) {
	                return t2;
	            }
	            /* istanbul ignore next */
	            if (x2 > 0) {
	                t1 = t2;
	                /* istanbul ignore next */
	            } else {
	                t0 = t2;
	            }
	            t2 = (t1 + t0) / 2;
	        }

	        // Failure
	        /* istanbul ignore next */
	        return t2;
	    }

	    function solve(x) {
	        return sampleCurveY(solveCurveX(x));
	    }

	    return solve;
	}

	/**
	 * linear cubic-beizer
	 * @type {function(a:Number):Number}
	 */
	var linear = cubicBezier(0, 0, 1, 1);
	/**
	 * ease cubic-beizer
	 * @type {function(a:Number):Number}
	 */
	var ease = cubicBezier(.25, .1, .25, 1);
	/**
	 * ease-in cubic-beizer
	 * @type {function(a:Number):Number}
	 */
	var easeIn = cubicBezier(.42, 0, 1, 1);
	/**
	 * ease-out cubic-beizer
	 * @type {function(a:Number):Number}
	 */
	var easeOut = cubicBezier(0, 0, .58, 1);
	/**
	 * ease-in-out cubic-beizer
	 * @type {function(a:Number):Number}
	 */
	var easeInOut = cubicBezier(.42, 0, .58, 1);

	exports.cubicBezier = cubicBezier;
	exports.linear = linear;
	exports.ease = ease;
	exports.easeIn = easeIn;
	exports.easeOut = easeOut;
	exports.easeInOut = easeInOut;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _set = __webpack_require__(193);

	var _set2 = _interopRequireDefault(_set);

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(197);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _AbstractEngine2 = __webpack_require__(198);

	var _AbstractEngine3 = _interopRequireDefault(_AbstractEngine2);

	var _util = __webpack_require__(140);

	var _generator = __webpack_require__(199);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class CSS2D
	 * @extends {AbstractEngine}
	 */
	var CSS2D = function (_AbstractEngine) {
	    (0, _inherits3.default)(CSS2D, _AbstractEngine);

	    /**
	     * create a engine of css2d
	     * @override
	     * @return {AbstractEngine}
	     */
	    function CSS2D() {
	        (0, _classCallCheck3.default)(this, CSS2D);

	        /**
	         * a fragment of elements
	         * @private
	         * @type {DocumentFragment}
	         */
	        var _this = (0, _possibleConstructorReturn3.default)(this, (CSS2D.__proto__ || (0, _getPrototypeOf2.default)(CSS2D)).call(this));

	        _this._bufferFragment = void 0;

	        /**
	         * a container for keep dom alive
	         * @type {Array<HTMLElement>}
	         */
	        _this._recycleContainer = [];

	        /**
	         * a container of elements
	         * @private
	         * @type {Set<HTMLElement>}
	         */
	        _this._elementsContainer = new _set2.default();

	        /**
	         * if use gpu accelerate
	         * @type {Boolean}
	         */
	        _this.useGPUAccelerated = true;
	        return _this;
	    }

	    /**
	     * clear the canvas
	     * @override
	     * @throws {Error} If not attach a element
	     */


	    (0, _createClass3.default)(CSS2D, [{
	        key: 'clear',
	        value: function clear() {
	            (0, _get3.default)(CSS2D.prototype.__proto__ || (0, _getPrototypeOf2.default)(CSS2D.prototype), 'clear', this).call(this);
	            this.canvas.innerHTML = '';
	        }
	    }, {
	        key: '_computingStyle',
	        value: function _computingStyle(element, parent) {
	            var viewport = void 0;
	            if (parent && parent.getBoundingRect) {
	                var parentBox = parent.getBoundingRect();
	                viewport = {
	                    width: parentBox.width,
	                    height: parentBox.height
	                };
	            } else {
	                viewport = {
	                    width: this.viewportWidth,
	                    height: this.viewportHeight
	                };
	            }

	            element.computedStyle = (0, _generator.generateStyle)(element, viewport, this.scaling);
	        }
	    }, {
	        key: '_renderDOMElement',
	        value: function _renderDOMElement(element, parent) {
	            var computedStyle = element.computedStyle;
	            var className = element.className;
	            var domElement = element.domElement;


	            if (!domElement) {
	                if (this._recycleContainer.length > 0) {
	                    domElement = this._recycleContainer.shift();
	                } else {
	                    domElement = document.createElement('div');
	                }
	                element.domElement = domElement;
	            }

	            if (className === 'Font') {
	                if (domElement.textContent !== element.textContent) {
	                    domElement.textContent = element.textContent;
	                }
	            }

	            if (className === 'Circle') {
	                (0, _util.polyfillCircleStyle)(computedStyle);
	            } else if (className === 'Ellipse') {
	                (0, _util.polyfillEllipseStyle)(computedStyle);
	            } else if (className === 'Triangle') {
	                (0, _util.polyfillTriangleStyle)(computedStyle);
	            }

	            (0, _util.optimizeBackgroundImage)(domElement, computedStyle);

	            var cssText = (0, _util.convertStyleMap)(computedStyle);
	            domElement.style.cssText = cssText;

	            if (domElement.parentNode !== parent.domElement) {
	                parent.domElement.appendChild(domElement);
	            }
	        }
	    }, {
	        key: '_render',
	        value: function _render(element, parent) {
	            if (!this._elementsContainer.has(element)) {
	                this._elementsContainer.add(element);
	            }

	            if (element.cached === false) {
	                element.cached = true;

	                this._computingStyle(element, parent);
	                this._renderDOMElement(element, parent);
	            }

	            if (element.className === 'Group') {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = (0, _getIterator3.default)(element.children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var child = _step.value;

	                        this._render(child, element);
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }
	        }

	        /**
	         * draw a element on canvas
	         * @override
	         * @throws {Error} If not attach a element
	         * @param {AbstractElement} element
	         */

	    }, {
	        key: 'draw',
	        value: function draw(element) {
	            (0, _get3.default)(CSS2D.prototype.__proto__ || (0, _getPrototypeOf2.default)(CSS2D.prototype), 'draw', this).call(this, element);

	            this._render(element, {
	                domElement: this.canvas
	            });
	        }

	        /**
	         * draw a buffer of elements on canvas
	         * @override
	         * @throws {Error} If not attach a element
	         * @param {Array<AbstractElement>} buffer
	         */

	    }, {
	        key: 'drawBuffer',
	        value: function drawBuffer(buffer) {
	            (0, _get3.default)(CSS2D.prototype.__proto__ || (0, _getPrototypeOf2.default)(CSS2D.prototype), 'drawBuffer', this).call(this, buffer);

	            if (!this._bufferFragment) {
	                this._bufferFragment = document.createDocumentFragment();
	            }

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = (0, _getIterator3.default)(buffer), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var element = _step2.value;

	                    this._render(element, {
	                        domElement: this._bufferFragment
	                    });
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }

	        /**
	         * flush drawing
	         * @override
	         * @throws {Error} If not attach a element
	         */

	    }, {
	        key: 'flush',
	        value: function flush() {
	            var _this2 = this;

	            (0, _get3.default)(CSS2D.prototype.__proto__ || (0, _getPrototypeOf2.default)(CSS2D.prototype), 'flush', this).call(this);

	            // append buffer fragmlent
	            if (this._bufferFragment && this._bufferFragment.childNodes.length) {
	                this.canvas.appendChild(this._bufferFragment);
	            }
	            this._bufferFragment = void 0;

	            // remove dettached elements
	            var dettachedElements = [];
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = (0, _getIterator3.default)(this._elementsContainer), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var element = _step3.value;

	                    if (element.life === 'dettached') {
	                        dettachedElements.push(element);

	                        var domElement = element.domElement;


	                        if (domElement.parentNode) {
	                            domElement.parentNode.removeChild(domElement);
	                        }

	                        if (element.recycle === true) {
	                            domElement.innerHTML = '';
	                            for (var attr in domElement.attributes) {
	                                domElement.removeAttribute(attr.nodeName);
	                            }
	                            this._recycleContainer.push(domElement);
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            dettachedElements.forEach(function (element) {
	                return _this2._elementsContainer.delete(element);
	            });
	        }
	    }]);
	    return CSS2D;
	}(_AbstractEngine3.default); /**
	                              * @external {DocumentFragment} https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
	                              */


	exports.default = CSS2D;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(194), __esModule: true };

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(48);
	__webpack_require__(195);
	__webpack_require__(196);
	module.exports = __webpack_require__(12).Set;

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(53);

	// 23.2 Set Objects
	module.exports = __webpack_require__(63)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(10);

	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(69)('Set')});

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _getOwnPropertyDescriptor = __webpack_require__(141);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

	  if (desc === undefined) {
	    var parent = (0, _getPrototypeOf2.default)(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _util = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AttachFirstError = new Error('attach element first');
	/**
	 * @class AbstractEngine
	 */
	/**
	 * @external {HTMLElement} https://developer.mozilla.org/en/docs/Web/API/HTMLElement
	 */

	var AbstractEngine = function () {
	    /**
	     * create a engine
	     * @abstract
	     * @return {AbstractEngine}
	     */
	    function AbstractEngine() {
	        (0, _classCallCheck3.default)(this, AbstractEngine);

	        /**
	         * if flushed
	         * @type {Boolean}
	         */
	        this.flushed = false;
	    }
	    /**
	     * attach an element to the engine
	     * @abstract
	     * @param {HTMLElement} htmlElement
	     */


	    (0, _createClass3.default)(AbstractEngine, [{
	        key: 'attachElement',
	        value: function attachElement(htmlElement) {
	            /**
	             * @type {HTMLElement}
	             */
	            this.canvas = htmlElement;
	            this.canvas.style.overflow = 'hidden';
	            this.canvas.style.position = 'relative';
	            this.resize();
	        }
	        /**
	         * set the size of canvas
	         * @abstract
	         * @throws {Error} If not attach a element
	         * @param {Number} size
	         */

	    }, {
	        key: 'setSize',
	        value: function setSize(size) {
	            /* istanbul ignore if */
	            if (!this.canvas) {
	                throw AttachFirstError;
	            }

	            this._size = size;
	        }

	        /**
	         * the width of viewport
	         * @return {Number}
	         */

	    }, {
	        key: 'resize',

	        /**
	         * recalculate the size of canvas
	         * @return {[type]} [description]
	         */
	        value: function resize() {
	            /* istanbul ignore if */
	            if (!this.canvas) {
	                throw AttachFirstError;
	            }
	            var rect = this.canvas.getBoundingClientRect();
	            /**
	             * the width of canvas
	             * @type {Number}
	             */
	            this.canvasWidth = rect.width;
	            /**
	             * the height of canvas
	             * @type {Number}
	             */
	            this.canvasHeight = rect.height;
	        }
	        /**
	         * Set the background color for canvas.
	         * The color string supports `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`
	         * @abstract
	         * @throws {Error} If not attach a element
	         * @param {String} rgba
	         */

	    }, {
	        key: 'setClearColor',
	        value: function setClearColor(rgba) {
	            /* istanbul ignore if */
	            if (!this.canvas) {
	                throw AttachFirstError;
	            }

	            this.canvas.style.backgroundColor = 'rgba(' + (0, _util.convertHexColor)(rgba).join(',') + ')';
	        }

	        /**
	         * clear the canvas
	         * @abstract
	         * @throws {Error} If not attach a element
	         */

	    }, {
	        key: 'clear',
	        value: function clear() {
	            /* istanbul ignore if */
	            if (!this.canvas) {
	                throw AttachFirstError;
	            }
	        }
	        /* eslint-disable no-unused-vars */
	        /**
	         * draw a element
	         * @abstract
	         * @throws {Error} If not attach a element
	         * @param  {AbstractElement} element
	         */

	    }, {
	        key: 'draw',
	        value: function draw(element) {
	            /* istanbul ignore if */
	            if (!this.canvas) {
	                throw AttachFirstError;
	            }

	            /* istanbul ignore if */
	            if (this.flushed === true) {
	                this.flushed = false;
	            }
	        }
	        /**
	         * draw a buffer of elements
	         * @abstract
	         * @throws {Error} If not attach a element
	         * @param  {Array<AbstractElement>} buffer
	         */

	    }, {
	        key: 'drawBuffer',
	        value: function drawBuffer(buffer) {
	            /* istanbul ignore if */
	            if (!this.canvas) {
	                throw AttachFirstError;
	            }

	            /* istanbul ignore if */
	            if (this.flushed === true) {
	                this.flushed = false;
	            }
	        }

	        /**
	         * flush drawing
	         * @abstract
	         * @throws {Error} If not attach a element
	         */

	    }, {
	        key: 'flush',
	        value: function flush() {
	            /* istanbul ignore if */
	            if (!this.canvas) {
	                throw AttachFirstError;
	            }

	            /* istanbul ignore if */
	            if (this.flushed === false) {
	                this.flushed = true;
	            }
	        }
	        /* eslint-enable no-unused-vars */

	    }, {
	        key: 'viewportWidth',
	        get: function get() {
	            return this._size || this.canvasWidth;
	        }

	        /**
	         * the height of viewport
	         * @return {Number}
	         */

	    }, {
	        key: 'viewportHeight',
	        get: function get() {
	            return this.canvasHeight * this.scaling;
	        }

	        /**
	         * the scale ratio of viewport to canvas
	         * @return {[type]} [description]
	         */

	    }, {
	        key: 'scaling',
	        get: function get() {
	            return this.viewportWidth / this.canvasWidth;
	        }
	    }]);
	    return AbstractEngine;
	}();

	exports.default = AbstractEngine;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.generateStyle = undefined;

	var _toConsumableArray2 = __webpack_require__(99);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _slicedToArray2 = __webpack_require__(88);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _map = __webpack_require__(1);

	var _map2 = _interopRequireDefault(_map);

	var _Vec = __webpack_require__(186);

	var _Vec2 = _interopRequireDefault(_Vec);

	var _util = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateRectangleStyle(element, viewport) {
	    var _element$getBoundingR = element.getBoundingRect();

	    var width = _element$getBoundingR.width;
	    var height = _element$getBoundingR.height;
	    var left = _element$getBoundingR.left;
	    var top = _element$getBoundingR.top;

	    var _convertAxis = (0, _util.convertAxis)(new _Vec2.default(left, top), { width: viewport.width, height: viewport.height });

	    var x = _convertAxis.x;
	    var y = _convertAxis.y;


	    var map = new _map2.default([['overflow', 'hidden'], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px']]);
	    if (element.position.z) {
	        map.set('z-index', '' + element.position.z);
	    }
	    return map;
	}

	function generateCircleStyle(element, viewport) {
	    var radius = element.radius;

	    var _element$getBoundingR2 = element.getBoundingRect();

	    var width = _element$getBoundingR2.width;
	    var height = _element$getBoundingR2.height;
	    var left = _element$getBoundingR2.left;
	    var top = _element$getBoundingR2.top;

	    var _convertAxis2 = (0, _util.convertAxis)(new _Vec2.default(left, top), { width: viewport.width, height: viewport.height });

	    var x = _convertAxis2.x;
	    var y = _convertAxis2.y;


	    var map = new _map2.default([['overflow', 'hidden'], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px'], ['clip-path', 'circle(' + radius + 'px)']]);
	    if (element.position.z) {
	        map.set('z-index', '' + element.position.z);
	    }
	    return map;
	}

	function generateEllipseStyle(element, viewport) {
	    var hRadius = element.hRadius;
	    var vRadius = element.vRadius;

	    var _element$getBoundingR3 = element.getBoundingRect();

	    var width = _element$getBoundingR3.width;
	    var height = _element$getBoundingR3.height;
	    var left = _element$getBoundingR3.left;
	    var top = _element$getBoundingR3.top;

	    var _convertAxis3 = (0, _util.convertAxis)(new _Vec2.default(left, top), { width: viewport.width, height: viewport.height });

	    var x = _convertAxis3.x;
	    var y = _convertAxis3.y;


	    var map = new _map2.default([['overflow', 'hidden'], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px'], ['clip-path', 'ellipse(' + hRadius + 'px ' + vRadius + 'px)']]);
	    if (element.position.z) {
	        map.set('z-index', '' + element.position.z);
	    }
	    return map;
	}

	function generateTriangleStyle(element, viewport) {
	    var theta = element.theta;

	    var _element$getBoundingR4 = element.getBoundingRect();

	    var width = _element$getBoundingR4.width;
	    var height = _element$getBoundingR4.height;
	    var left = _element$getBoundingR4.left;
	    var top = _element$getBoundingR4.top;

	    var _convertAxis4 = (0, _util.convertAxis)(new _Vec2.default(left, top), { width: viewport.width, height: viewport.height });

	    var x = _convertAxis4.x;
	    var y = _convertAxis4.y;


	    var map = new _map2.default([['overflow', 'hidden'], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px'], ['clip-path', 'polygon(0px ' + height + 'px, ' + width + 'px ' + height + 'px, ' + height / Math.tan((0, _util.deg2rad)(theta)) + 'px 0px)']]);
	    if (element.position.z) {
	        map.set('z-index', '' + element.position.z);
	    }
	    return map;
	}

	function generateGroupStyle(element, viewport) {
	    var _element$getBoundingR5 = element.getBoundingRect();

	    var width = _element$getBoundingR5.width;
	    var height = _element$getBoundingR5.height;
	    var left = _element$getBoundingR5.left;
	    var top = _element$getBoundingR5.top;

	    var _convertAxis5 = (0, _util.convertAxis)(new _Vec2.default(left, top), { width: viewport.width, height: viewport.height });

	    var x = _convertAxis5.x;
	    var y = _convertAxis5.y;


	    var overflow = 'visible';
	    if (width && height) {
	        overflow = 'hidden';
	    }

	    var map = new _map2.default([['overflow', overflow], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px']]);
	    if (element.position.z) {
	        map.set('z-index', '' + element.position.z);
	    }
	    return map;
	}

	function generateFontStyle(element, viewport) {
	    var _element$getBoundingR6 = element.getBoundingRect();

	    var width = _element$getBoundingR6.width;
	    var height = _element$getBoundingR6.height;
	    var left = _element$getBoundingR6.left;
	    var top = _element$getBoundingR6.top;

	    var _convertAxis6 = (0, _util.convertAxis)(new _Vec2.default(left, top), { width: viewport.width, height: viewport.height });

	    var x = _convertAxis6.x;
	    var y = _convertAxis6.y;

	    var _element$textAlign$sp = element.textAlign.split(' ');

	    var _element$textAlign$sp2 = (0, _slicedToArray3.default)(_element$textAlign$sp, 2);

	    var hAlign = _element$textAlign$sp2[0];
	    var vAlign = _element$textAlign$sp2[1];

	    var lineHeight = void 0;

	    if (!element.style.has('line-height')) {
	        var fontSize = parseInt(element.style.get('font-size'));

	        switch (vAlign) {
	            case 'center':
	                lineHeight = height + 'px';
	                break;
	            case 'bottom':
	                lineHeight = height * 2 - fontSize + 'px';
	                break;
	            case 'top':
	            default:
	                lineHeight = fontSize + 'px';
	                break;
	        }
	    } else {
	        lineHeight = element.style.get('line-height');
	    }
	    var map = new _map2.default([['overflow', 'visible'], ['text-align', hAlign], ['line-height', lineHeight], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px']]);
	    if (element.position.z) {
	        map.set('z-index', '' + element.position.z);
	    }
	    return map;
	}

	function generateStyle(element, viewport) {
	    var scale = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	    var matrix = element.getTransformMatrix(function (item) {
	        if (['translateY', 'rotateZ', 'skewY'].indexOf(item[0]) > -1) {
	            var unit = String(item[1]).match(/^([\d\.\-]+)([a-z%]+)?$/);
	            item[1] = -parseFloat(unit[1]) + (unit[2] || '');
	        }

	        return item;
	    });

	    if (scale !== 1) {
	        matrix[12] /= scale;
	        matrix[13] /= scale;
	    }

	    var matrixText = 'matrix3d(' + matrix.join(',') + ')';
	    var commonStyle = new _map2.default([['box-sizing', 'border-box'], ['position', 'absolute'], ['-webkit-transform', matrixText], ['-ms-transform', matrixText], ['-moz-transform', matrixText], ['transform', matrixText], ['-webkit-transform-origin', '50% 50% 0'], ['-ms-transform-origin', '50% 50% 0'], ['-moz-transform-origin', '50% 50% 0'], ['transform-origin', '50% 50% 0'], ['will-change', 'auto']]);

	    var customStyle = element.style;

	    var shapeStyle = void 0;

	    switch (element.className) {
	        case 'Rectangle':
	            shapeStyle = generateRectangleStyle(element, viewport);
	            break;
	        case 'Circle':
	            shapeStyle = generateCircleStyle(element, viewport);
	            break;
	        case 'Ellipse':
	            shapeStyle = generateEllipseStyle(element, viewport);
	            break;
	        case 'Triangle':
	            shapeStyle = generateTriangleStyle(element, viewport);
	            break;
	        case 'Group':
	            shapeStyle = generateGroupStyle(element, viewport);
	            break;
	        case 'Font':
	            shapeStyle = generateFontStyle(element, viewport);
	            break;
	        default:
	            /* istanbul ignore next */
	            shapeStyle = new _map2.default();
	            /* istanbul ignore next */
	            break;
	    }

	    var styleMap = new _map2.default([].concat((0, _toConsumableArray3.default)(commonStyle), (0, _toConsumableArray3.default)(customStyle), (0, _toConsumableArray3.default)(shapeStyle)));

	    if (scale !== 1) {
	        (0, _util.scalingStyleValue)(styleMap, 1 / scale);
	    }

	    return styleMap;
	}

	exports.generateStyle = generateStyle;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _set = __webpack_require__(193);

	var _set2 = _interopRequireDefault(_set);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _AbstractElement = __webpack_require__(201);

	var _AbstractElement2 = _interopRequireDefault(_AbstractElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Scene
	 */
	var Scene = function () {
	    /**
	     * create a scene
	     * @return {Scene}
	     */
	    function Scene() {
	        (0, _classCallCheck3.default)(this, Scene);

	        /**
	         * @type {Set} elements set
	         */
	        this.children = new _set2.default();
	    }

	    /**
	     * Add an element(s) into the scene
	     * @param  {...AbstractElement} elements
	     * @throws {Error} If not a element
	     */


	    (0, _createClass3.default)(Scene, [{
	        key: 'add',
	        value: function add() {
	            for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
	                elements[_key] = arguments[_key];
	            }

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (0, _getIterator3.default)(elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var element = _step.value;

	                    if (element instanceof _AbstractElement2.default) {
	                        if (!this.children.has(element)) {
	                            this.children.add(element);
	                            element.life = 'attached';
	                        }
	                    } else {
	                        throw new Error('not a element');
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	        /**
	         * Remove the element(s) from the scene
	         * @param  {...AbstractElement} elements
	         * @throws {Error} If not a element
	         */

	    }, {
	        key: 'remove',
	        value: function remove() {
	            for (var _len2 = arguments.length, elements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                elements[_key2] = arguments[_key2];
	            }

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = (0, _getIterator3.default)(elements), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var element = _step2.value;

	                    if (element instanceof _AbstractElement2.default) {
	                        if (this.children.has(element)) {
	                            this.children.delete(element);
	                            element.life = 'dettached';
	                        }
	                    } else {
	                        throw new Error('not a element');
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }]);
	    return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Vec = __webpack_require__(186);

	var _Vec2 = _interopRequireDefault(_Vec);

	var _CSSMap = __webpack_require__(202);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class AbstractElement
	 */
	var AbstractElement = function () {
	  /**
	   * create a element
	   * @abstract
	   * @return {AbstractElement}
	   */
	  function AbstractElement(className) {
	    (0, _classCallCheck3.default)(this, AbstractElement);

	    /**
	     * the classname of Element
	     * @type {String}
	     */
	    this.className = className;
	    /**
	     * if recycle when remove from the scene
	     * @beta it's a beta feature, if You set it with true, please DO NOT ANYTING on it's domElement
	     * @type {Boolean}
	     */
	    this.recycle = false;

	    /**
	      * a position identified two dimension vectors
	      * @type {Vec3}
	      */
	    this.position = new _Vec2.default(0, 0, 0);
	    /**
	     * a map of style
	     * @example
	     * background-color
	     * background-image
	     * background-position
	     * background-size
	     * backgorund-repeat
	     * opacity
	     * @type {StyleMap}
	     */
	    this.style = new _CSSMap.StyleMap();

	    /**
	     * a map of transform
	     * @type {TransformMap}
	     */
	    this.transform = new _CSSMap.TransformMap();

	    this._cached = false;

	    this._life = 'created';
	  }

	  /**
	   * get life of element
	   * @type {String}
	   */


	  (0, _createClass3.default)(AbstractElement, [{
	    key: 'life',
	    get: function get() {
	      return this._life;
	    }

	    /**
	     * set life of element
	     * @param  {String} v created/attached/dettached
	     */
	    ,
	    set: function set(v) {
	      this._life = v;
	    }

	    /**
	     * if use cache when rendering
	     * @type {Boolean}
	     */

	  }, {
	    key: 'cached',
	    get: function get() {
	      return this._cached && !this.position.modified && !this.style.modified && !this.transform.modified;
	    }

	    /**
	     * reset cached
	     * @param  {Boolean} cache
	     * @return {AbstractElement} current context
	     */
	    ,
	    set: function set(cache) {
	      this._cached = cache;

	      if (cache === true) {
	        this.position.modified = false;
	        this.style.modified = false;
	        this.transform.modified = false;
	      }
	    }
	  }]);
	  return AbstractElement;
	}();

	exports.default = AbstractElement;

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TransformMap = exports.StyleMap = undefined;

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get3 = __webpack_require__(197);

	var _get4 = _interopRequireDefault(_get3);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _slicedToArray2 = __webpack_require__(88);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _toConsumableArray2 = __webpack_require__(99);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _map = __webpack_require__(1);

	var _map2 = _interopRequireDefault(_map);

	var _kebabCase = __webpack_require__(203);

	var _kebabCase2 = _interopRequireDefault(_kebabCase);

	var _util = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// transform keys
	var TRANSLATE = new _map2.default([['translateX', '0px'], ['translateY', '0px'], ['translateZ', '0px']]);

	var ROTATE = new _map2.default([['rotateX', '0deg'], ['rotateY', '0deg'], ['rotateZ', '0deg']]);

	var SKEW = new _map2.default([['skewX', '0deg'], ['skewY', '0deg']]);

	var SCALE = new _map2.default([['scaleX', '1'], ['scaleY', '1'], ['scaleZ', '1']]);

	var TRANSFORM = new _map2.default([].concat((0, _toConsumableArray3.default)(TRANSLATE), (0, _toConsumableArray3.default)(ROTATE), (0, _toConsumableArray3.default)(SKEW), (0, _toConsumableArray3.default)(SCALE)));

	// other styles
	var COLOR_UNIT = new _map2.default([['color', 'rgba(0,0,0,1)'], ['background-color', 'rgba(0,0,0,0)'], ['border-left-color', 'rgba(0,0,0,0)'], ['border-top-color', 'rgba(0,0,0,0)'], ['border-right-color', 'rgba(0,0,0,0)'], ['border-bottom-color', 'rgba(0,0,0,0)']]);

	var NUMBER_UNIT = new _map2.default([['font-size', '16px'], ['line-height', '16px'], ['border-radius', '0px'], ['border-top-left-radius', '0px'], ['border-top-right-radius', '0px'], ['border-bottom-right-radius', '0px'], ['border-bottom-left-radius', '0px'], ['border-left-width', '0px'], ['border-top-width', '0px'], ['border-right-width', '0px'], ['border-bottom-width', '0px'], ['background-position-x', '0'], ['background-position-y', '0']]);

	var NO_UNIT = new _map2.default([['opacity', '1']]);

	var OTHER = new _map2.default([['background-image', ''], ['background-position', '0 0'], ['background-size', 'contain'], ['background-repeat', 'repeat'], ['-webkit-transform-origin', '50% 50% 0'], ['transform-origin', '50% 50% 0'], ['border-left-style', 'none'], ['border-top-style', 'none'], ['border-right-style', 'none'], ['border-bottom-style', 'none'], ['font-weight', 'normal']]);

	var STYLE = new _map2.default([].concat((0, _toConsumableArray3.default)(COLOR_UNIT), (0, _toConsumableArray3.default)(NUMBER_UNIT), (0, _toConsumableArray3.default)(NO_UNIT), (0, _toConsumableArray3.default)(OTHER)));

	function setAccuracy(value) {
	    return parseFloat(parseFloat(value).toFixed(6));
	}

	function normlizeStyle(_ref) {
	    var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

	    var name = _ref2[0];
	    var value = _ref2[1];

	    name = (0, _kebabCase2.default)(name);

	    if (!STYLE.has(name)) {
	        throw new Error(name + ' is not a valid style name');
	    }

	    if (value !== null && value !== undefined) {
	        if (COLOR_UNIT.has(name) && (0, _util.isHexColor)(value)) {
	            value = 'rgba(' + (0, _util.convertHexColor)(value).join(',') + ')';
	        } else if (NUMBER_UNIT.has(name)) {
	            value = setAccuracy(value).toString() + 'px';
	        } else if (NO_UNIT.has(name)) {
	            value = setAccuracy(value).toString();
	        } else {
	            value = value.toString();
	        }
	    }

	    return [name, value];
	}

	function normlizeTransform(_ref3) {
	    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2);

	    var name = _ref4[0];
	    var value = _ref4[1];

	    if (!TRANSFORM.has(name)) {
	        throw new Error(name + ' is not a valid transform key');
	    }

	    if (value !== null && value !== undefined) {
	        if (TRANSLATE.has(name)) {
	            value = setAccuracy(value) + 'px';
	        } else if (ROTATE.has(name) || SKEW.has(name)) {
	            value = setAccuracy(value) + 'deg';
	        } else if (SCALE.has(name)) {
	            value = setAccuracy(value).toString();
	        } else {
	            value = value.toString();
	        }
	    }

	    return [name, value];
	}

	/**
	 * @class map for css style
	 * @extends {Map}
	 * @private
	 */

	var CSSMap = function (_Map2) {
	    (0, _inherits3.default)(CSSMap, _Map2);

	    /**
	     * create a css map
	     * @param  {Array} entries
	     * @param  {Function} normalizer
	     * @param  {Map} defaultMap
	     * @return {CSSMap}
	     */
	    function CSSMap(entries, normalizer, defaultMap) {
	        (0, _classCallCheck3.default)(this, CSSMap);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (CSSMap.__proto__ || (0, _getPrototypeOf2.default)(CSSMap)).call(this));

	        _this._normalizer = normalizer;
	        _this._defaultMap = defaultMap;

	        /**
	         * if modified
	         * @type {Boolean}
	         */
	        _this.modified = false;

	        if (entries) {
	            entries.forEach(function (entry) {
	                return _this.set.apply(_this, (0, _toConsumableArray3.default)(entry));
	            });
	        }
	        return _this;
	    }

	    /**
	     * get the normlized value by name
	     * @override
	     * @param  {String} name
	     * @return {String|Number}
	     */


	    (0, _createClass3.default)(CSSMap, [{
	        key: 'get',
	        value: function get(name) {
	            var _normalizer = this._normalizer([name]);

	            var _normalizer2 = (0, _slicedToArray3.default)(_normalizer, 1);

	            var normlizedName = _normalizer2[0];

	            var value = (0, _get4.default)(CSSMap.prototype.__proto__ || (0, _getPrototypeOf2.default)(CSSMap.prototype), 'get', this).call(this, normlizedName);
	            if (value === undefined) {
	                value = this._defaultMap.get(normlizedName);
	            }
	            return value;
	        }

	        /**
	         * set the value by name
	         * @override
	         * @param {String} name
	         * @param {String|Number} value
	         * @return {CSSMap} current context
	         */

	    }, {
	        key: 'set',
	        value: function set(name, value) {
	            var _get2;

	            var normlized = this._normalizer([name, value]);
	            this.modified = true;
	            return (_get2 = (0, _get4.default)(CSSMap.prototype.__proto__ || (0, _getPrototypeOf2.default)(CSSMap.prototype), 'set', this)).call.apply(_get2, [this].concat((0, _toConsumableArray3.default)(normlized)));
	        }

	        /**
	         * if has a name which will be normlized
	         * @override
	         * @param  {String} name
	         * @return {Boolean}
	         */

	    }, {
	        key: 'has',
	        value: function has(name) {
	            var _normalizer3 = this._normalizer([name]);

	            var _normalizer4 = (0, _slicedToArray3.default)(_normalizer3, 1);

	            var normlizedName = _normalizer4[0];

	            return (0, _get4.default)(CSSMap.prototype.__proto__ || (0, _getPrototypeOf2.default)(CSSMap.prototype), 'has', this).call(this, normlizedName);
	        }

	        /**
	         * delete the value by name
	         * @param  {String} name
	         * @return {CSSMap} current context
	         */

	    }, {
	        key: 'delete',
	        value: function _delete(name) {
	            var _normalizer5 = this._normalizer([name]);

	            var _normalizer6 = (0, _slicedToArray3.default)(_normalizer5, 1);

	            var normlizedName = _normalizer6[0];

	            this.modified = true;
	            return (0, _get4.default)(CSSMap.prototype.__proto__ || (0, _getPrototypeOf2.default)(CSSMap.prototype), 'delete', this).call(this, normlizedName);
	        }
	    }]);
	    return CSSMap;
	}(_map2.default);

	/**
	 * @class a style map
	 * @extends {CSSMap}
	 */


	var StyleMap = exports.StyleMap = function (_CSSMap) {
	    (0, _inherits3.default)(StyleMap, _CSSMap);

	    /**
	     * @override
	     * @param  {Array} entries
	     * @return {StyleMap}
	     */
	    function StyleMap(entries) {
	        (0, _classCallCheck3.default)(this, StyleMap);
	        return (0, _possibleConstructorReturn3.default)(this, (StyleMap.__proto__ || (0, _getPrototypeOf2.default)(StyleMap)).call(this, entries, normlizeStyle, STYLE));
	    }

	    return StyleMap;
	}(CSSMap);

	/**
	 * @class a transform map
	 * @extends {CSSMap}
	 */


	var TransformMap = exports.TransformMap = function (_CSSMap2) {
	    (0, _inherits3.default)(TransformMap, _CSSMap2);

	    /**
	     * @override
	     * @param  {Array} entries
	     * @return {TransformMap}
	     */
	    function TransformMap(entries) {
	        (0, _classCallCheck3.default)(this, TransformMap);
	        return (0, _possibleConstructorReturn3.default)(this, (TransformMap.__proto__ || (0, _getPrototypeOf2.default)(TransformMap)).call(this, entries, normlizeTransform, TRANSFORM));
	    }

	    return TransformMap;
	}(CSSMap);

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var createCompounder = __webpack_require__(169);

	/**
	 * Converts `string` to
	 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the kebab cased string.
	 * @example
	 *
	 * _.kebabCase('Foo Bar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('fooBar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('__FOO_BAR__');
	 * // => 'foo-bar'
	 */
	var kebabCase = createCompounder(function(result, word, index) {
	  return result + (index ? '-' : '') + word.toLowerCase();
	});

	module.exports = kebabCase;


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _defineProperty = __webpack_require__(110);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	var _getOwnPropertyDescriptor = __webpack_require__(141);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	var _keys = __webpack_require__(95);

	var _keys2 = _interopRequireDefault(_keys);

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _clone = __webpack_require__(205);

	var _clone2 = _interopRequireDefault(_clone);

	var _CSSMap = __webpack_require__(202);

	var _css = __webpack_require__(206);

	var _css2 = _interopRequireDefault(_css);

	var _direction = __webpack_require__(207);

	var _direction2 = _interopRequireDefault(_direction);

	var _duration = __webpack_require__(208);

	var _duration2 = _interopRequireDefault(_duration);

	var _ease = __webpack_require__(209);

	var _ease2 = _interopRequireDefault(_ease);

	var _end = __webpack_require__(210);

	var _end2 = _interopRequireDefault(_end);

	var _loop = __webpack_require__(211);

	var _loop2 = _interopRequireDefault(_loop);

	var _loopAll = __webpack_require__(212);

	var _loopAll2 = _interopRequireDefault(_loopAll);

	var _mode = __webpack_require__(213);

	var _mode2 = _interopRequireDefault(_mode);

	var _move = __webpack_require__(214);

	var _rotate = __webpack_require__(215);

	var _scale = __webpack_require__(216);

	var _skew = __webpack_require__(217);

	var _delay = __webpack_require__(218);

	var _delay2 = _interopRequireDefault(_delay);

	var _then = __webpack_require__(219);

	var _then2 = _interopRequireDefault(_then);

	var _update = __webpack_require__(220);

	var _update2 = _interopRequireDefault(_update);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mix() {
	    var Mix = function Mix() {
	        (0, _classCallCheck3.default)(this, Mix);
	    };

	    for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
	        mixins[_key] = arguments[_key];
	    }

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = (0, _getIterator3.default)(mixins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var mixin = _step.value;

	            copyProperties(Mix.prototype, mixin);
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return Mix;
	}

	function copyProperties(target, source) {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(source)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var key = _step2.value;

	            if (key !== "constructor" && key !== "prototype" && key !== "name") {
	                var desc = (0, _getOwnPropertyDescriptor2.default)(source, key);
	                (0, _defineProperty2.default)(target, key, desc);
	            }
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }
	}

	var _Mix = mix({ clone: _clone2.default, css: _css2.default, direction: _direction2.default, duration: _duration2.default, ease: _ease2.default, end: _end2.default, loop: _loop2.default, loopAll: _loopAll2.default, mode: _mode2.default, move: _move.move, moveX: _move.moveX, moveY: _move.moveY, moveZ: _move.moveZ, move3d: _move.move3d, rotate: _rotate.rotate, rotateX: _rotate.rotateX, rotateY: _rotate.rotateY, rotateZ: _rotate.rotateZ, rotate3d: _rotate.rotate3d, scale: _scale.scale, scaleX: _scale.scaleX, scaleY: _scale.scaleY, scaleZ: _scale.scaleZ, scale3d: _scale.scale3d, skew: _skew.skew, skewX: _skew.skewX, skewY: _skew.skewY, delay: _delay2.default, then: _then2.default, update: _update2.default });

	/**
	 * @typedef {Object} EffectObject
	 * @property {StyleMap} style
	 * @property {TransformMap} transform
	 * @property {Number} duration ms
	 * @property {Number} delay ms
	 * @property {String} ease ease/ease-in/ease-out/ease-in-out/cubic-bezer()
	 * @property {String} mode fill-mode(forward/backward) after animation finish
	 * @property {{count: Number, type: String}} repeat if set count to `Infinity`, then the animation will repeat permanently. Otherwise if set type to `alternative`, then the animation will reverse the order per time.
	 */

	/**
	 * @implements {move}
	 */

	var Effect = function (_Mix2) {
	    (0, _inherits3.default)(Effect, _Mix2);

	    /**
	     * create a effect
	     * @return {Effect}
	     */
	    function Effect() {
	        (0, _classCallCheck3.default)(this, Effect);

	        /**
	         * a animation sequence
	         * @type {Array<EffectObject>}
	         */
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Effect.__proto__ || (0, _getPrototypeOf2.default)(Effect)).call(this));

	        _this.animation = [{
	            style: new _CSSMap.StyleMap(),
	            duration: 0,
	            ease: 'ease',
	            mode: 'forwards',
	            transform: new _CSSMap.TransformMap(),
	            repeat: {
	                count: 1,
	                type: 'normal'
	            },
	            repeatAll: {
	                count: 1,
	                type: 'normal'
	            },
	            delay: 0
	        }];
	        /**
	         * config for repeat the animation sequence
	         * @type {{count: Number, type: String}}
	         */
	        _this.repeatAll = {
	            count: 1,
	            type: 'normal'
	        };
	        // this.isStart = false;
	        // this.isPause = false;
	        // this.isCancel = false;
	        // this.isFinish = false;
	        return _this;
	    }

	    return Effect;
	}(_Mix);

	exports.default = Effect;

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _map = __webpack_require__(1);

	var _map2 = _interopRequireDefault(_map);

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	exports.default = clone;

	var _Effect = __webpack_require__(204);

	var _Effect2 = _interopRequireDefault(_Effect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @desc clone
	 *
	 * @example
	 * const effect = new Effect();
	 * const baseEffect = effect.animate().css({...});
	 * const childEffect1 = baseEffect.clone()
	 *                                .moveX(100);
	 * const childEffect2 = baseEffect.clone()
	 *                                .moveY(100);
	 *
	 * @return {object}  effect
	 */
	function clone() {
	    // eslint-disable-next-line
	    var effect = this;

	    var childEffect = new _Effect2.default();
	    var baseEffect = deepCopy(effect);
	    for (var attr in baseEffect) {
	        childEffect[attr] = baseEffect[attr];
	    }
	    function deepCopy(oldObj) {
	        var newObj = oldObj;
	        if (oldObj && (typeof oldObj === 'undefined' ? 'undefined' : (0, _typeof3.default)(oldObj)) === 'object') {
	            if (Object.prototype.toString.call(oldObj) === "[object Array]") {
	                newObj = [];
	                for (var i in oldObj) {
	                    newObj[i] = deepCopy(oldObj[i]);
	                }
	            } else if (oldObj instanceof _map2.default) {
	                newObj = new _map2.default();
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = (0, _getIterator3.default)(oldObj.keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var key = _step.value;

	                        newObj.set(key, oldObj.get(key));
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            } else {
	                newObj = {};
	                for (var _i in oldObj) {
	                    newObj[_i] = deepCopy(oldObj[_i]);
	                }
	            }
	        }
	        return newObj;
	    }
	    return childEffect;
	}

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	exports.default = css;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @desc css
	 *
	 * @example
	 * .css('background-color', 'red');
	 * @example
	 * .css({
	 *     'background-color': 'red',
	 *     'opacity': '0'
	 * });
	 *
	 * @param  {string} param1 two types: 1. string:key 2. object:{key: value}
	 * @param  {string} param2 two types: 1. string:value 2. undefined
	 * @return {object}        effect
	 */
	function css(param1, param2) {
	    // eslint-disable-next-line
	    var effect = this;

	    var type = typeof param1 === 'undefined' ? 'undefined' : (0, _typeof3.default)(param1);
	    switch (type) {
	        case 'object':
	            {
	                setObject(param1);
	                break;
	            }
	        case 'string':
	            {
	                setStyle(param1, param2);
	                break;
	            }
	        // eslint-disable-next-line
	        default:
	            {}
	    }

	    /**
	     * @desc setObject
	     *
	     * @param  {object} object object
	     */
	    function setObject(object) {
	        for (var key in object) {
	            setStyle(key, object[key]);
	        }
	    }

	    /**
	     * @desc setStyle - insert style into json
	     *
	     * @param  {string} key   css key
	     * @param  {string} value css value
	     */
	    function setStyle(key, value) {
	        var animation = effect.animation;
	        var aniItem = animation.slice(-1)[0];
	        aniItem.style.set(key, value);
	    }

	    return effect;
	}

/***/ },
/* 207 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = direction;
	/**
	 * @desc direction
	 *
	 * @example
	 * .direction('normal')
	 *
	 * @example
	 * .direction('alternate')
	 *
	 *s
	 * @param  {number} direction  normal or alternate
	 * @return {effect}       effect
	 */
	function direction(direction) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    if (!direction) {
	        direction = 'normal';
	    }
	    animation.slice(-1)[0].repeat.type = direction;

	    return effect;
	}

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	exports.default = duration;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @desc duration
	 *
	 * @example
	 * .duration(1000)
	 *
	 * @example
	 * .duration('1000')
	 *
	 * @param  {number} duration duration time(ms)
	 * @return {effect}       effect
	 */
	function duration(duration) {
	    // eslint-disable-next-line
	    var effect = this;
	    var type = typeof duration === 'undefined' ? 'undefined' : (0, _typeof3.default)(duration);
	    switch (type) {
	        case 'string':
	            {
	                duration = parseInt(duration, 10) || 0;
	                break;
	            }
	        case 'number':
	            {
	                break;
	            }
	        default:
	            {
	                duration = 0;
	            }
	    }
	    if (!duration || duration < 0) {
	        duration = 0;
	    }
	    effect.animation.slice(-1)[0].duration = duration;
	    return effect;
	}

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	exports.default = ease;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @desc ease
	 *
	 * @example
	 * .ease('ease')
	 *
	 * @param  {string} timingFunc timing-function
	 * @return {object}       effect
	 */
	function ease(timingFunc) {
	    // eslint-disable-next-line
	    var effect = this;
	    var type = typeof timingFunc === 'undefined' ? 'undefined' : (0, _typeof3.default)(timingFunc);
	    switch (type) {
	        case 'string':
	            {
	                timingFunc = timingFunc.toString();
	                break;
	            }
	        default:
	            {
	                timingFunc = 'ease';
	            }
	    }
	    effect.animation.slice(-1)[0].ease = timingFunc;
	    return effect;
	}

/***/ },
/* 210 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = end;

	/**
	 * @desc end
	 *
	 * @example
	 * .end()
	 *
	 * @return {object}  effect
	 */
	function end() {
	  // eslint-disable-next-line
	  var effect = this;
	  return effect;
	}

/***/ },
/* 211 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = loop;

	/**
	 * @desc loop
	 *
	 * @example
	 * .loop(Infinity)
	 *
	 * @example
	 * .loop(1)
	 *
	 *
	 * @param  {number} loop  times
	 * @return {effect}       effect
	 */
	function loop(loop) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    if (!loop || loop < 0) {
	        loop = 1;
	    }
	    animation.slice(-1)[0].repeat.count = loop;
	    return effect;
	}

/***/ },
/* 212 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = loop;

	/**
	 * @desc loopAll
	 *
	 * @example
	 * .loopAll(Infinity)
	 *
	 * @example
	 * .loopAll(1)
	 *
	 *
	 * @param  {number} loopTimes  times
	 * @return {effect}            effect
	 */
	function loop(loopTimes) {
	    // eslint-disable-next-line
	    var effect = this;
	    if (!loopTimes || loopTimes < 0) {
	        loopTimes = 1;
	    }
	    effect.repeatAll.count = loopTimes;
	    return effect;
	}

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	exports.default = mode;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @desc mode
	 *
	 * @example
	 * .mode('both')
	 *
	 * @param  {string} fillMode anmation-fill-mode
	 * @return {object}          effec
	 */
	function mode(fillMode) {
	    // eslint-disable-next-line
	    var effect = this;
	    var type = typeof fillMode === 'undefined' ? 'undefined' : (0, _typeof3.default)(fillMode);
	    switch (type) {
	        case 'string':
	            {
	                fillMode = fillMode.toString();
	                break;
	            }
	        default:
	            {
	                fillMode = 'forwards';
	            }
	    }
	    effect.animation.slice(-1)[0].mode = fillMode;
	    return effect;
	}

/***/ },
/* 214 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.move = move;
	exports.moveX = moveX;
	exports.moveY = moveY;
	exports.moveZ = moveZ;
	exports.move3d = move3d;
	/**
	 * @desc move
	 *
	 * @example
	 * move(10, 10);
	 *
	 * @param  {number} x px
	 * @param  {number} y px
	 * @return {object}   effect
	 *
	 */
	function move(x, y) {
	  // eslint-disable-next-line
	  var effect = this;
	  var animation = effect.animation;
	  var aniItem = animation.slice(-1)[0];
	  aniItem.transform.set('translateX', x);
	  aniItem.transform.set('translateY', y);
	  return effect;
	}

	/**
	 * @desc moveX
	 *
	 * @example
	 * moveX(10)
	 *
	 * @param  {number} x px
	 * @return {object}   effect
	 */
	function moveX(x) {
	  // eslint-disable-next-line
	  var effect = this;
	  var animation = effect.animation;
	  var aniItem = animation.slice(-1)[0];
	  aniItem.transform.set('translateX', x);
	  return effect;
	}

	/**
	 * @desc moveY
	 *
	 * @example
	 * moveY(10)
	 *
	 * @param  {number} y px
	 * @return {object}   effect
	 */
	function moveY(y) {
	  // eslint-disable-next-line
	  var effect = this;
	  var animation = effect.animation;
	  var aniItem = animation.slice(-1)[0];
	  aniItem.transform.set('translateY', y);
	  return effect;
	}

	/**
	 * @desc moveZ
	 *
	 * @example
	 * moveZ(10)
	 *
	 * @param  {number} z px
	 * @return {object}   effect
	 */
	function moveZ(z) {
	  // eslint-disable-next-line
	  var effect = this;
	  var animation = effect.animation;
	  var aniItem = animation.slice(-1)[0];
	  aniItem.transform.set('translateZ', z);
	  return effect;
	}

	/**
	 * @desc move3d
	 *
	 * @example
	 * move3d(x, y, z);
	 *
	 * @param  {number} x px
	 * @param  {number} y px
	 * @param  {number} z px
	 * @return {object}   effect
	 */
	function move3d(x, y, z) {
	  // eslint-disable-next-line
	  var effect = this;
	  var animation = effect.animation;
	  var aniItem = animation.slice(-1)[0];

	  aniItem.transform.set('translateX', x);
	  aniItem.transform.set('translateY', y);
	  aniItem.transform.set('translateZ', z);
	  return effect;
	}

/***/ },
/* 215 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.rotate = rotate;
	exports.rotateX = rotateX;
	exports.rotateY = rotateY;
	exports.rotateZ = rotateZ;
	exports.rotate3d = rotate3d;
	/**
	 * @desc rotate
	 *
	 * @example
	 * rotate(10, 10);
	 *
	 * @param  {number} x deg
	 * @param  {number} y deg
	 * @return {object}   effect
	 *
	 */
	function rotate(x, y) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    var aniItem = animation.slice(-1)[0];
	    aniItem.transform.set('rotateX', x);
	    aniItem.transform.set('rotateY', y);
	    return effect;
	}

	/**
	* @desc rotateX
	*
	* @example
	* rotateX(10)
	*
	* @param  {number} x deg
	* @return {object}   effect
	*/
	function rotateX(x) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    var aniItem = animation.slice(-1)[0];
	    aniItem.transform.set('rotateX', x);
	    return effect;
	}

	/**
	* @desc rotateY
	*
	* @example
	* rotateY(10)
	*
	* @param  {number} y deg
	* @return {object}   effect
	*/
	function rotateY(y) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    var aniItem = animation.slice(-1)[0];
	    aniItem.transform.set('rotateY', y);
	    return effect;
	}

	/**
	* @desc rotateZ
	*
	* @example
	* rotateZ(10)
	*
	* @param  {number} z deg
	* @return {object}   effect
	*/
	function rotateZ(z) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    var aniItem = animation.slice(-1)[0];
	    aniItem.transform.set('rotateZ', z);
	    return effect;
	}

	/**
	* @desc rotate3d
	*
	* @example
	* rotate3d(x, y, z);
	*
	* @param  {number} x deg
	* @param  {number} y deg
	* @param  {number} z deg
	* @return {object}   effect
	*/
	function rotate3d(x, y, z) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    var aniItem = animation.slice(-1)[0];

	    aniItem.transform.set('rotateX', x);
	    aniItem.transform.set('rotateY', y);
	    aniItem.transform.set('rotateZ', z);
	    return effect;
	}

/***/ },
/* 216 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.scale = scale;
	exports.scaleX = scaleX;
	exports.scaleY = scaleY;
	exports.scaleZ = scaleZ;
	exports.scale3d = scale3d;
	/**
	 * @desc scale
	 *
	 * @example
	 * scale(10, 10);
	 *
	 * @param  {number} x
	 * @param  {number} y
	 * @return {object}   effect
	 *
	 */
	function scale(x, y) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    var aniItem = animation.slice(-1)[0];
	    aniItem.transform.set('scaleX', x);
	    aniItem.transform.set('scaleY', y);
	    return effect;
	}

	/**
	* @desc scaleX
	*
	* @example
	* scaleX(10)
	*
	* @param  {number} x
	* @return {object}   effect
	*/
	function scaleX(x) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    var aniItem = animation.slice(-1)[0];
	    aniItem.transform.set('scaleX', x);
	    return effect;
	}

	/**
	* @desc scaleY
	*
	* @example
	* scaleY(10)
	*
	* @param  {number} y
	* @return {object}   effect
	*/
	function scaleY(y) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    var aniItem = animation.slice(-1)[0];
	    aniItem.transform.set('scaleY', y);
	    return effect;
	}

	/**
	* @desc scaleZ
	*
	* @example
	* scaleZ(10)
	*
	* @param  {number} z
	* @return {object}   effect
	*/
	function scaleZ(z) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    var aniItem = animation.slice(-1)[0];
	    aniItem.transform.set('scaleZ', z);
	    return effect;
	}

	/**
	* @desc scale3d
	*
	* @example
	* scale3d(x, y, z);
	*
	* @param  {number} x
	* @param  {number} y
	* @param  {number} z
	* @return {object}   effect
	*/
	function scale3d(x, y, z) {
	    // eslint-disable-next-line
	    var effect = this;
	    var animation = effect.animation;
	    var aniItem = animation.slice(-1)[0];

	    aniItem.transform.set('scaleX', x);
	    aniItem.transform.set('scaleY', y);
	    aniItem.transform.set('scaleZ', z);
	    return effect;
	}

/***/ },
/* 217 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.skew = skew;
	exports.skewX = skewX;
	exports.skewY = skewY;

	/**
	 * @desc skew
	 *
	 * @example
	 * .skew(30, 30)
	 *
	 * @param  {type} x deg
	 * @param  {type} y deg
	 * @return {object}   effect
	 */
	function skew(x, y) {
	  // eslint-disable-next-line
	  var effect = this;
	  var animation = effect.animation;
	  var aniItem = animation.slice(-1)[0];
	  aniItem.transform.set('skewX', x);
	  aniItem.transform.set('skewY', y);
	  return effect;
	}

	/**
	 * @desc skewX
	 *
	 * @example
	 * .skewX(30)
	 *
	 * @param  {type} x deg
	 * @return {object}   effect
	 */
	function skewX(x) {
	  // eslint-disable-next-line
	  var effect = this;
	  var animation = effect.animation;
	  var aniItem = animation.slice(-1)[0];
	  aniItem.transform.set('skewX', x);
	  return effect;
	}

	/**
	 * @desc skewY
	 *
	 * @example
	 * .skewY(30)
	 *
	 * @param  {type} y deg
	 * @return {object}   effect
	 */
	function skewY(y) {
	  // eslint-disable-next-line
	  var effect = this;
	  var animation = effect.animation;
	  var aniItem = animation.slice(-1)[0];
	  aniItem.transform.set('skewY', y);
	  return effect;
	}

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	exports.default = delay;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @desc delay
	 *
	 * @example
	 * .delay(1000)
	 *
	 * @example
	 * .delay('1000')
	 *
	 * @param  {number} delay delay time(ms)
	 * @return {effect}       effect
	 */
	function delay(delay) {
	    // eslint-disable-next-line
	    var effect = this;
	    var type = typeof delay === 'undefined' ? 'undefined' : (0, _typeof3.default)(delay);
	    switch (type) {
	        case 'string':
	            {
	                delay = parseInt(delay, 10) || 0;
	                break;
	            }
	        case 'number':
	            {
	                break;
	            }
	        default:
	            {
	                delay = 0;
	            }
	    }
	    if (!delay || delay < 0) {
	        delay = 0;
	    }
	    effect.animation.slice(-1)[0].delay = delay;
	    return effect;
	}

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = then;

	var _CSSMap = __webpack_require__(202);

	/**
	 * @desc then
	 *
	 * @example
	 * .then()
	 *
	 * @return {object}  then
	 */
	function then() {
	    // eslint-disable-next-line
	    var effect = this;

	    effect.animation.push({
	        style: new _CSSMap.StyleMap(),
	        duration: 0,
	        ease: 'ease',
	        mode: 'forwards',
	        transform: new _CSSMap.TransformMap(),
	        repeat: {
	            count: 1,
	            type: 'normal'
	        },
	        delay: 0
	    });
	    effect.repeatAll = {
	        count: 1,
	        type: 'normal'
	    };

	    return effect;
	}

/***/ },
/* 220 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = update;

	/**
	 * @desc update
	 *
	 * @example
	 * .update((currentMap, startMap, endMap, percent) => {
	 *     //TODO
	 * })
	 *
	 * @param  {function} updateFunc
	 * @return {object}       effect
	 */
	function update(updateFunc) {
	  // eslint-disable-next-line
	  var effect = this;
	  effect.animation.slice(-1)[0].update = updateFunc;
	  return effect;
	}

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _map = __webpack_require__(1);

	var _map2 = _interopRequireDefault(_map);

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Event2 = __webpack_require__(122);

	var _Event3 = _interopRequireDefault(_Event2);

	var _util = __webpack_require__(140);

	var _CSSMap = __webpack_require__(202);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Animation
	 * @extends {Event}
	 */
	var Animation = function (_Event) {
	    (0, _inherits3.default)(Animation, _Event);

	    /**
	     * create a animation
	     * @param  {AbastractElement} element
	     * @param  {Effect} effect
	     * @return {Animation}
	     */
	    function Animation(element, effect) {
	        (0, _classCallCheck3.default)(this, Animation);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Animation.__proto__ || (0, _getPrototypeOf2.default)(Animation)).call(this));

	        _this._element = element;
	        _this._effect = effect;
	        _this._animateIndex = 0;
	        _this._animation = null;
	        _this._started = false;
	        _this._finished = false;
	        _this._repeatAllCount = 0;
	        _this._additional = null;
	        _this._initial = {
	            style: new _map2.default(),
	            transform: new _map2.default()
	        };
	        return _this;
	    }

	    (0, _createClass3.default)(Animation, [{
	        key: '_initAnimation',
	        value: function _initAnimation(animation) {
	            var _this2 = this;

	            var start = {
	                style: new _map2.default(),
	                transform: new _map2.default()
	            };

	            var end = {
	                style: new _map2.default(),
	                transform: new _map2.default()
	            };

	            animation.style.forEach(function (endValue, name) {
	                var startValue = _this2._element.style.get(name);
	                start.style.set(name, startValue);
	                end.style.set(name, endValue);
	            });

	            animation.transform.forEach(function (endValue, name) {
	                var startValue = _this2._element.transform.get(name);
	                start.transform.set(name, startValue);
	                end.transform.set(name, endValue);
	            });

	            this._justifyTransformOrder(animation.transform.keys());

	            var delay = animation.delay;
	            var ease = animation.ease;
	            var duration = animation.duration;
	            var repeat = animation.repeat;
	            var mode = animation.mode;
	            var update = animation.update;

	            var elapsed = 0;
	            var timingFunction = (0, _util.generateTimingFunction)(ease);

	            return {
	                start: start,
	                end: end,
	                delay: delay,
	                duration: duration,
	                mode: mode,
	                update: update,
	                repeat: {
	                    count: repeat.count,
	                    type: repeat.type
	                },
	                timingFunction: timingFunction,
	                elapsed: elapsed
	            };
	        }
	    }, {
	        key: '_initialElement',
	        value: function _initialElement() {
	            // just for test!
	            if (!this._effect) {
	                return;
	            }

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (0, _getIterator3.default)(this._effect.animation), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var animation = _step.value;
	                    var _iteratorNormalCompletion2 = true;
	                    var _didIteratorError2 = false;
	                    var _iteratorError2 = undefined;

	                    try {
	                        for (var _iterator2 = (0, _getIterator3.default)(animation.style.keys()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                            var name = _step2.value;

	                            this._initial.style.set(name, this._element.style.get(name));
	                        }
	                    } catch (err) {
	                        _didIteratorError2 = true;
	                        _iteratorError2 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                                _iterator2.return();
	                            }
	                        } finally {
	                            if (_didIteratorError2) {
	                                throw _iteratorError2;
	                            }
	                        }
	                    }

	                    var _iteratorNormalCompletion3 = true;
	                    var _didIteratorError3 = false;
	                    var _iteratorError3 = undefined;

	                    try {
	                        for (var _iterator3 = (0, _getIterator3.default)(animation.transform.keys()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                            var _name = _step3.value;

	                            this._initial.transform.set(_name, this._element.transform.get(_name));
	                        }
	                    } catch (err) {
	                        _didIteratorError3 = true;
	                        _iteratorError3 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                                _iterator3.return();
	                            }
	                        } finally {
	                            if (_didIteratorError3) {
	                                throw _iteratorError3;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_justifyTransformOrder',
	        value: function _justifyTransformOrder(keys) {
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = (0, _getIterator3.default)(keys), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var key = _step4.value;

	                    var value = this._element.transform.get(key);
	                    this._element.transform.delete(key);
	                    this._element.transform.set(key, value);
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_setElement',
	        value: function _setElement(key, map) {
	            var _this3 = this;

	            map.forEach(function (value, name) {
	                return _this3._element[key].set(name, value);
	            });
	        }

	        /**
	         * get the element
	         * @return {AbstractElement}
	         */

	    }, {
	        key: 'start',


	        /**
	         * change the status to started
	         * @event emit start
	         * @return {Animation} current context
	         */
	        value: function start() {
	            this._started = true;
	            this.emit('start');
	            this._initialElement();
	            return this;
	        }

	        /**
	         * change the status to started
	         * @event emit restart
	         * @return {Animation} current context
	         */

	    }, {
	        key: 'restart',
	        value: function restart() {
	            this.reset();
	            this._started = true;
	            this.emit('restart');
	            return this;
	        }

	        /**
	         * get the status if finished
	         * @return {Boolean}
	         */

	    }, {
	        key: 'finish',


	        /**
	         * change the status to finish
	         * @event emit finish
	         * @return {Animation} current context
	         */
	        value: function finish() {
	            this._finished = true;
	            this.emit('finish');
	            return this;
	        }

	        /**
	         * reset the animation
	         * @return {Animation} current context
	         */

	    }, {
	        key: 'reset',
	        value: function reset() {
	            var _this4 = this;

	            this._animateIndex = 0;
	            this._animation = null;
	            this._started = false;
	            this._finished = false;
	            this._initial.style.forEach(function (value, name) {
	                _this4._element.style.set(name, value);
	            });
	            this._initial.transform.forEach(function (value, name) {
	                _this4._element.transform.set(name, value);
	            });
	            return this;
	        }
	    }, {
	        key: '_play',
	        value: function _play(clock) {
	            var _this5 = this;

	            this.emit('play');

	            if (!this._animation) {
	                var animation = this._effect.animation[this._animateIndex];
	                this._animation = this._initAnimation(animation);
	            }

	            this._animation.elapsed += clock.delta;

	            var _animation = this._animation;
	            var start = _animation.start;
	            var end = _animation.end;
	            var delay = _animation.delay;
	            var duration = _animation.duration;
	            var elapsed = _animation.elapsed;
	            var mode = _animation.mode;
	            var update = _animation.update;
	            var repeat = _animation.repeat;
	            var timingFunction = _animation.timingFunction;


	            var time = Math.min(elapsed - delay, duration);

	            if (time >= 0) {
	                (function () {
	                    var percent = 1;

	                    if (duration !== 0) {
	                        percent = timingFunction(time / duration).toFixed(6);
	                    }

	                    var current = {
	                        style: new _CSSMap.StyleMap(),
	                        transform: new _CSSMap.TransformMap()
	                    };

	                    end.style.forEach(function (eVal, name) {
	                        var sVal = start.style.get(name) || 0;
	                        var val = (0, _util.performLinearTransform)(name, sVal, eVal, percent);
	                        current.style.set(name, val);
	                    });

	                    end.transform.forEach(function (eVal, name) {
	                        var sVal = start.transform.get(name) || 0;
	                        var val = (0, _util.performLinearTransform)(name, sVal, eVal, percent);
	                        current.transform.set(name, val);
	                    });

	                    if (update) {
	                        update(current, start, end, percent);
	                    }

	                    _this5._setElement('style', current.style);
	                    _this5._setElement('transform', current.transform);

	                    if (time === duration) {
	                        if (repeat && repeat.count > 1) {
	                            repeat.count--;
	                            _this5._animation.elapsed = 0;
	                            if (repeat.type === 'normal') {
	                                _this5._animation.start = start;
	                                _this5._animation.end = end;
	                            } else if (repeat.type === 'alternate') {
	                                _this5._animation.start = end;
	                                _this5._animation.end = start;
	                            }
	                        } else {
	                            if (mode === 'backward') {
	                                _this5._additional = function () {
	                                    _this5._setElement('style', start.style);
	                                    _this5._setElement('transform', start.transform);
	                                    _this5._animation = null;
	                                    _this5._animateIndex++;
	                                    return false;
	                                };
	                            } else {
	                                _this5._animation = null;
	                                _this5._animateIndex++;
	                            }
	                        }
	                    }
	                })();
	            }
	        }

	        /**
	         * request one frame of animation with a certain clock
	         * @param  {Clock} clock a clock from render
	         * @return {Animation} current context
	         */

	    }, {
	        key: 'requestFrame',
	        value: function requestFrame(clock) {
	            var _this6 = this;

	            if (!this._started || this._finished || this._effect.animation.length === 0) {
	                return this;
	            }

	            var isCountinuePlay = true;
	            if (this._additional) {
	                isCountinuePlay = this._additional();
	                this._additional = null;
	            }

	            if (isCountinuePlay) {
	                this._play(clock);
	            }

	            if (this._animateIndex === this._effect.animation.length) {
	                if (this._repeatAllCount < this._effect.repeatAll.count - 1) {
	                    this._repeatAllCount++;
	                    this._additional = function () {
	                        _this6.restart();
	                        return true;
	                    };
	                    return this;
	                }

	                this.finish();
	            }

	            return this;
	        }
	    }, {
	        key: 'element',
	        get: function get() {
	            return this._element;
	        }

	        /**
	         * get the effect
	         * @return {Effect}
	         */

	    }, {
	        key: 'effect',
	        get: function get() {
	            return this._effect;
	        }

	        /**
	         * get the status if started
	         * @return {Boolean}
	         */

	    }, {
	        key: 'started',
	        get: function get() {
	            return this._started;
	        }
	    }, {
	        key: 'finished',
	        get: function get() {
	            return this._finished;
	        }
	    }]);
	    return Animation;
	}(_Event3.default);

	exports.default = Animation;

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _map = __webpack_require__(1);

	var _map2 = _interopRequireDefault(_map);

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Event2 = __webpack_require__(122);

	var _Event3 = _interopRequireDefault(_Event2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Timeline
	 */
	var Timeline = function (_Event) {
	    (0, _inherits3.default)(Timeline, _Event);

	    /**
	     * create a timeline
	     * @return {Timeline}
	     */
	    function Timeline() {
	        (0, _classCallCheck3.default)(this, Timeline);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Timeline.__proto__ || (0, _getPrototypeOf2.default)(Timeline)).call(this));

	        _this._animations = new _map2.default();
	        /**
	         * if started
	         * @type {Boolean}
	         */
	        _this.started = false;
	        /**
	         * if finished
	         * @type {Boolean}
	         */
	        _this.finished = false;
	        return _this;
	    }

	    /**
	     * add a animation with some options
	     * @param {Animation|Array<Animation>} animations
	     * @param {{playAt:Number|Function, stopAt:Number|Function}|function} options
	     */


	    (0, _createClass3.default)(Timeline, [{
	        key: 'add',
	        value: function add(animations, options) {
	            if (!(animations instanceof Array)) {
	                animations = [animations];
	            }

	            for (var i = 0; i < animations.length; i++) {
	                var animation = animations[i];
	                var option = options instanceof Function ? options(i) : options;
	                this._animations.set(animation, option);
	            }
	            return this;
	        }

	        /**
	         * get options by a certain animation
	         * @param  {Animation} animation
	         * @return {Object} the options of animaiton
	         */

	    }, {
	        key: 'get',
	        value: function get(animation) {
	            return this._animations.get(animation);
	        }

	        /**
	         * remove a animation
	         * @param  {Animation|Array<Animation>} animations
	         * @return {Animation} current context
	         */

	    }, {
	        key: 'remove',
	        value: function remove(animations) {
	            if (!(animations instanceof Array)) {
	                animations = [animations];
	            }
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (0, _getIterator3.default)(animations), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var animation = _step.value;

	                    this._animations.delete(animation);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return this;
	        }

	        /**
	         * reset all animation
	         * @return {Animation} current context
	         */

	    }, {
	        key: 'replay',
	        value: function replay() {
	            this.started = false;
	            this.finished = false;
	            this._animations.forEach(function (options, animation) {
	                animation.reset();
	            });
	            return this;
	        }

	        /**
	         * play the perframe of timeline
	         * @event emit `finish` when all animation finished or emit `play`
	         * @param  {Clock} clock a clock from render
	         * @return {Animation} current context
	         */

	    }, {
	        key: 'play',
	        value: function play(clock) {
	            if (this.finished) {
	                return this;
	            }

	            if (!this.started) {
	                this.started = true;
	                this.emit('start');
	            }

	            this.emit('play');

	            var isAllFinished = true;

	            this._animations.forEach(function () {
	                var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	                var animation = arguments[1];

	                if (animation.finished) {
	                    return;
	                }

	                var playAt = options.playAt;
	                var stopAt = options.stopAt;

	                var startTime = typeof playAt === 'function' ? playAt() : playAt || true;
	                var endTime = typeof stopAt === 'function' ? stopAt() : stopAt;

	                if (!animation.started && (typeof startTime === 'boolean' && startTime || typeof startTime === 'number' && clock.elapsed >= startTime)) {
	                    animation.start();
	                }

	                if (animation.started) {
	                    animation.requestFrame(clock);
	                }

	                if (typeof endTime === 'boolean' && endTime || typeof endTime === 'number' && clock.elapsed >= endTime) {
	                    animation.finish();
	                }

	                isAllFinished &= animation.finished;
	            });

	            if (isAllFinished) {
	                this.started = false;
	                this.finished = true;
	                this.emit('finish');
	            }

	            return this;
	        }
	    }]);
	    return Timeline;
	}(_Event3.default);

	exports.default = Timeline;

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _set = __webpack_require__(193);

	var _set2 = _interopRequireDefault(_set);

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _AbstractElement2 = __webpack_require__(201);

	var _AbstractElement3 = _interopRequireDefault(_AbstractElement2);

	var _util = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Group
	 * @extends {AbstractElement}
	 * @implements {Geometry}
	 */
	var Group = function (_AbstractElement) {
	    (0, _inherits3.default)(Group, _AbstractElement);

	    /**
	     * create a group element
	     * @override
	     * @param {Number} [width]
	     * @param {Number} [height]
	     * @return {AbstractElement}
	     */
	    function Group(width, height) {
	        (0, _classCallCheck3.default)(this, Group);

	        /**
	         * the width of rectangle
	         * @type {Number}
	         */
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Group.__proto__ || (0, _getPrototypeOf2.default)(Group)).call(this, 'Group'));

	        _this.width = width;
	        /**
	         * the height of rectangle
	         * @type {Number}
	         */
	        _this.height = height;
	        /**
	         * the set of elements
	         * @type {Set}
	         */
	        _this.children = new _set2.default();
	        return _this;
	    }

	    /**
	     * get life of group
	     * @type {String}
	     */


	    (0, _createClass3.default)(Group, [{
	        key: 'add',


	        /**
	         * add element(s) to group
	         * @param {...AbstractElement} elements
	         * @throws {Error} If not a element
	         */
	        value: function add() {
	            for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
	                elements[_key] = arguments[_key];
	            }

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (0, _getIterator3.default)(elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var element = _step.value;

	                    if (element instanceof _AbstractElement3.default) {
	                        if (!this.children.has(element)) {
	                            this.children.add(element);
	                            if (this.life === 'attached') {
	                                element.life = 'attached';
	                            }
	                        }
	                    } else {
	                        throw new Error('not a element');
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }

	        /**
	         * remove element(s) from group
	         * @param {...AbstractElement} elements
	         */

	    }, {
	        key: 'remove',
	        value: function remove() {
	            for (var _len2 = arguments.length, elements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                elements[_key2] = arguments[_key2];
	            }

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = (0, _getIterator3.default)(elements), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var element = _step2.value;

	                    if (element instanceof _AbstractElement3.default) {
	                        if (this.children.has(element)) {
	                            this.children.delete(element);
	                            element.life = 'dettached';
	                        }
	                    } else {
	                        throw new Error('not a element');
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	        /**
	         * get bounding box for geometry
	         * @return {BoundingRect}
	         */

	    }, {
	        key: 'getBoundingRect',
	        value: function getBoundingRect() {
	            var width = this.width || 0;
	            var height = this.height || 0;

	            return {
	                width: width || 0,
	                height: height || 0,
	                left: this.position.x - width / 2,
	                top: this.position.y + height / 2,
	                right: this.position.x + width / 2,
	                bottom: this.position.y - height / 2
	            };
	        }
	        /**
	         * get transform matrix for geometry
	         * @override
	         * @param {Function} [filter]
	         * @return {Mat4} a grade 4 matrix of transform
	         */

	    }, {
	        key: 'getTransformMatrix',
	        value: function getTransformMatrix(filter) {
	            return (0, _util.getTransformMatrix)(this.transform, filter);
	        }
	    }, {
	        key: 'life',
	        get: function get() {
	            return this._life;
	        }

	        /**
	         * set life of group
	         * @param  {String} v created/attached/dettached
	         */
	        ,
	        set: function set(v) {
	            this._life = v;
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = (0, _getIterator3.default)(this.children), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var child = _step3.value;

	                    child.life = v;
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        }
	    }]);
	    return Group;
	}(_AbstractElement3.default);

	exports.default = Group;

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _AbstractElement2 = __webpack_require__(201);

	var _AbstractElement3 = _interopRequireDefault(_AbstractElement2);

	var _util = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Rectangle
	 * @extends {AbstractElement}
	 * @implements {Geometry}
	 */
	var Rectangle = function (_AbstractElement) {
	  (0, _inherits3.default)(Rectangle, _AbstractElement);

	  /**
	   * create a rectangle element
	   * @override
	   * @param {Number} width
	   * @param {Number} height
	   * @return {AbstractElement}
	   */
	  function Rectangle(width, height) {
	    (0, _classCallCheck3.default)(this, Rectangle);

	    /**
	     * the width of rectangle
	     * @type {Number}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Rectangle.__proto__ || (0, _getPrototypeOf2.default)(Rectangle)).call(this, 'Rectangle'));

	    _this.width = width;
	    /**
	     * the height of rectangle
	     * @type {Number}
	     */
	    _this.height = height;
	    /**
	     * the length of vectors
	     * @type {Number}
	     */
	    _this.length = 4;
	    return _this;
	  }
	  /**
	   * get bounding box for geometry
	   * @return {BoundingRect}
	   */


	  (0, _createClass3.default)(Rectangle, [{
	    key: 'getBoundingRect',
	    value: function getBoundingRect() {
	      return {
	        width: this.width,
	        height: this.height,
	        left: this.position.x - this.width / 2,
	        top: this.position.y + this.height / 2,
	        right: this.position.x + this.width / 2,
	        bottom: this.position.y - this.height / 2
	      };
	    }
	    /**
	     * get transform matrix for geometry
	     * @override
	     * @param {Function} [filter]
	     * @return {Mat4} a grade 4 matrix of transform
	     */

	  }, {
	    key: 'getTransformMatrix',
	    value: function getTransformMatrix(filter) {
	      return (0, _util.getTransformMatrix)(this.transform, filter);
	    }
	  }]);
	  return Rectangle;
	}(_AbstractElement3.default);

	exports.default = Rectangle;

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _AbstractElement2 = __webpack_require__(201);

	var _AbstractElement3 = _interopRequireDefault(_AbstractElement2);

	var _util = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Circle
	 * @extends {AbstractElement}
	 * @implements {Geometry}
	 */
	var Circle = function (_AbstractElement) {
	  (0, _inherits3.default)(Circle, _AbstractElement);

	  /**
	   * create a circle element
	   * @override
	   * @param {Number} radius
	   * @return {AbstractElement}
	   */
	  function Circle(radius) {
	    (0, _classCallCheck3.default)(this, Circle);

	    /**
	     * the radius of circle
	     * @type {Number}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Circle.__proto__ || (0, _getPrototypeOf2.default)(Circle)).call(this, 'Circle'));

	    _this.radius = radius;
	    /**
	     * the length of vectors
	     * @type {Number}
	     */
	    _this.length = 32;
	    return _this;
	  }
	  /**
	   * get bounding box for geometry
	   * @return {BoundingRect}
	   */


	  (0, _createClass3.default)(Circle, [{
	    key: 'getBoundingRect',
	    value: function getBoundingRect() {
	      return {
	        width: this.radius * 2,
	        height: this.radius * 2,
	        left: this.position.x - this.radius,
	        top: this.position.y + this.radius,
	        right: this.position.x + this.radius,
	        bottom: this.position.y - this.radius
	      };
	    }
	    /**
	     * get transform matrix for geometry
	     * @override
	     * @param {Function} [filter]
	     * @return {Mat4} a grade 4 matrix of transform
	     */

	  }, {
	    key: 'getTransformMatrix',
	    value: function getTransformMatrix(filter) {
	      return (0, _util.getTransformMatrix)(this.transform, filter);
	    }
	  }]);
	  return Circle;
	}(_AbstractElement3.default);

	exports.default = Circle;

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _AbstractElement2 = __webpack_require__(201);

	var _AbstractElement3 = _interopRequireDefault(_AbstractElement2);

	var _util = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Circle
	 * @extends {AbstractElement}
	 * @implements {Geometry}
	 */
	var Ellipse = function (_AbstractElement) {
	  (0, _inherits3.default)(Ellipse, _AbstractElement);

	  /**
	   * create a ellipse element
	   * @override
	   * @param {Number} the radius of horizontal
	   * @param {Number} the radius of vertical
	   * @return {AbstractElement}
	   */
	  function Ellipse(hRadius, vRadius) {
	    (0, _classCallCheck3.default)(this, Ellipse);

	    /**
	     * the radius of horizontal
	     * @type {Number}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Ellipse.__proto__ || (0, _getPrototypeOf2.default)(Ellipse)).call(this, 'Ellipse'));

	    _this.hRadius = hRadius;
	    /**
	     * the radius of vertical
	     * @type {Number}
	     */
	    _this.vRadius = vRadius;
	    /**
	     * the length of vectors
	     * @type {Number}
	     */
	    _this.length = 32;
	    return _this;
	  }
	  /**
	   * get bounding box for geometry
	   * @return {BoundingRect}
	   */


	  (0, _createClass3.default)(Ellipse, [{
	    key: 'getBoundingRect',
	    value: function getBoundingRect() {
	      return {
	        width: this.hRadius * 2,
	        height: this.vRadius * 2,
	        left: this.position.x - this.hRadius,
	        top: this.position.y + this.vRadius,
	        right: this.position.x + this.hRadius,
	        bottom: this.position.y - this.vRadius
	      };
	    }
	    /**
	     * get transform matrix for geometry
	     * @override
	     * @param {Function} [filter]
	     * @return {Mat4} a grade 4 matrix of transform
	     */

	  }, {
	    key: 'getTransformMatrix',
	    value: function getTransformMatrix(filter) {
	      return (0, _util.getTransformMatrix)(this.transform, filter);
	    }
	  }]);
	  return Ellipse;
	}(_AbstractElement3.default);

	exports.default = Ellipse;

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _AbstractElement2 = __webpack_require__(201);

	var _AbstractElement3 = _interopRequireDefault(_AbstractElement2);

	var _util = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Triangle
	 * @extends {AbstractElement}
	 * @implements {Geometry}
	 */
	var Triangle = function (_AbstractElement) {
	  (0, _inherits3.default)(Triangle, _AbstractElement);

	  /**
	   * create a triangle element
	   * @override
	   * @param {Number} width the width of the triangle
	   * @param {Nunber} height the height of the triangle
	   * @param {Number} theta the degree of horizontal angle
	   * @return {AbstractElement}
	   */
	  function Triangle(width, height, theta) {
	    (0, _classCallCheck3.default)(this, Triangle);

	    /**
	     * the length of bottom side
	     * @type {Number}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Triangle.__proto__ || (0, _getPrototypeOf2.default)(Triangle)).call(this, 'Triangle'));

	    _this.width = width;
	    /**
	     * the height of the triangle
	     * @type {Number}
	     */
	    _this.height = height;
	    /**
	     * the degree of horizontal angle
	     * @type {Number}
	     */
	    _this.theta = theta;
	    /**
	     * the length of vectors
	     * @type {Number}
	     */
	    _this.length = 3;
	    return _this;
	  }
	  /**
	   * get bounding box for geometry
	   * @return {BoundingRect}
	   */


	  (0, _createClass3.default)(Triangle, [{
	    key: 'getBoundingRect',
	    value: function getBoundingRect() {
	      return {
	        width: this.width,
	        height: this.height,
	        left: this.position.x - this.width / 2,
	        top: this.position.y + this.height / 2,
	        right: this.position.x + this.width / 2,
	        bottom: this.position.y - this.height / 2
	      };
	    }
	    /**
	     * get transform matrix for geometry
	     * @override
	     * @param {Function} [filter]
	     * @return {Mat4} a grade 4 matrix of transform
	     */

	  }, {
	    key: 'getTransformMatrix',
	    value: function getTransformMatrix(filter) {
	      return (0, _util.getTransformMatrix)(this.transform, filter);
	    }
	  }]);
	  return Triangle;
	}(_AbstractElement3.default);

	exports.default = Triangle;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(105);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(108);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(109);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(113);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(114);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _AbstractElement2 = __webpack_require__(201);

	var _AbstractElement3 = _interopRequireDefault(_AbstractElement2);

	var _util = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @class Font
	 * @extends {AbstractElement}
	 * @implements {Geometry}
	 */
	var Font = function (_AbstractElement) {
	  (0, _inherits3.default)(Font, _AbstractElement);

	  /**
	   * create a font element
	   * @override
	   * @param {Number} width
	   * @param {Number} height
	   * @param {String} textContent
	   * @param {String} textAlign [horizontal-align(left/center/right) vertical-align(top/center/bottom)]
	   * @return {AbstractElement}
	   */
	  function Font(width, height, textContent, textAlign) {
	    (0, _classCallCheck3.default)(this, Font);

	    /**
	     * the width of element
	     * @type {Number}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Font.__proto__ || (0, _getPrototypeOf2.default)(Font)).call(this, 'Font'));

	    _this.width = width;
	    /**
	     * the height of element
	     * @type {Number}
	     */
	    _this.height = height;
	    /**
	     * the content of text
	     * @type {[type]}
	     */
	    _this.textContent = textContent;
	    /**
	     * the align of text
	     * @type {[type]}
	     */
	    _this.textAlign = textAlign;
	    /**
	     * the length of vectors
	     * @type {Number}
	     */
	    _this.length = 4;
	    return _this;
	  }
	  /**
	   * get bounding box for geometry
	   * @return {BoundingRect}
	   */


	  (0, _createClass3.default)(Font, [{
	    key: 'getBoundingRect',
	    value: function getBoundingRect() {
	      return {
	        width: this.width,
	        height: this.height,
	        left: this.position.x - this.width / 2,
	        top: this.position.y + this.height / 2,
	        right: this.position.x + this.width / 2,
	        bottom: this.position.y - this.height / 2
	      };
	    }
	    /**
	     * get transform matrix for geometry
	     * @override
	     * @param {Function} [filter]
	     * @return {Mat4} a grade 4 matrix of transform
	     */

	  }, {
	    key: 'getTransformMatrix',
	    value: function getTransformMatrix(filter) {
	      return (0, _util.getTransformMatrix)(this.transform, filter);
	    }
	  }]);
	  return Font;
	}(_AbstractElement3.default);

	exports.default = Font;

/***/ }
/******/ ])
});
;
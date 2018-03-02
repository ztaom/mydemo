(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-runtime/core-js/map"), require("babel-runtime/core-js/set"));
	else if(typeof define === 'function' && define.amd)
		define(["babel-runtime/core-js/map", "babel-runtime/core-js/set"], factory);
	else if(typeof exports === 'object')
		exports["AFT"] = factory(require("babel-runtime/core-js/map"), require("babel-runtime/core-js/set"));
	else
		root["AFT"] = factory(root["Map"], root["Set"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_21__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 227);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(22);

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(45)('wks')
  , uid        = __webpack_require__(29)
  , Symbol     = __webpack_require__(12).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(107);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(106);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(16);

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(16);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(104);

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(23)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(12)
  , core      = __webpack_require__(2)
  , ctx       = __webpack_require__(35)
  , hide      = __webpack_require__(19)
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

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(17)
  , IE8_DOM_DEFINE = __webpack_require__(70)
  , toPrimitive    = __webpack_require__(47)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(128)
  , defined = __webpack_require__(36);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(105);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(9);

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

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(109);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(108);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(24);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(13)
  , createDesc = __webpack_require__(26);
module.exports = __webpack_require__(10) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(76)
  , enumBugKeys = __webpack_require__(37);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(67);

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

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(36);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(139)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(71)(String, 'String', function(iterated){
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

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(186);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
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


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_event_emitter__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_event_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_event_emitter__);



/**
 * @implements {EventEmitter}
 */

var Event = function Event() {
  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Event);
};

/* harmony default export */ __webpack_exports__["a"] = (Event);

__WEBPACK_IMPORTED_MODULE_1_event_emitter___default()(Event.prototype);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = accuracy;
/* harmony export (immutable) */ __webpack_exports__["a"] = deg2rad;
/**
 * get accuracy value
 * @param  {number|string} value
 * @return {number}
 */
function accuracy(value) {
  return parseFloat(parseFloat(value).toFixed(6));
}

/**
 * convert degree to radian
 * @param  {number} degree
 * @return {number} radian
 */
function deg2rad(degree) {
  return degree / 180 * Math.PI;
}

/***/ }),
/* 34 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(122);
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

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(17)
  , dPs         = __webpack_require__(72)
  , enumBugKeys = __webpack_require__(37)
  , IE_PROTO    = __webpack_require__(44)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(69)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(127).appendChild(iframe);
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


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(41)
  , createDesc     = __webpack_require__(26)
  , toIObject      = __webpack_require__(14)
  , toPrimitive    = __webpack_require__(47)
  , has            = __webpack_require__(18)
  , IE8_DOM_DEFINE = __webpack_require__(70)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(11)
  , core    = __webpack_require__(2)
  , fails   = __webpack_require__(23);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(13).f
  , has = __webpack_require__(18)
  , TAG = __webpack_require__(5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(45)('keys')
  , uid    = __webpack_require__(29);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 46 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(24);
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

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(12)
  , core           = __webpack_require__(2)
  , LIBRARY        = __webpack_require__(38)
  , wksExt         = __webpack_require__(49)
  , defineProperty = __webpack_require__(13).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(144);
var global        = __webpack_require__(12)
  , hide          = __webpack_require__(19)
  , Iterators     = __webpack_require__(20)
  , TO_STRING_TAG = __webpack_require__(5)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(159)(); // Support ES3 engines

module.exports = function (val) {
 return (val !== _undefined) && (val !== null);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(196);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

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


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extendProxy;
/* harmony export (immutable) */ __webpack_exports__["d"] = extendEasing;
/* harmony export (immutable) */ __webpack_exports__["b"] = extendEffect;
/* harmony export (immutable) */ __webpack_exports__["e"] = createEffect;
/* harmony export (immutable) */ __webpack_exports__["f"] = createAnimation;
/* harmony export (immutable) */ __webpack_exports__["g"] = createAnimations;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return globalTicker; });
/* harmony export (immutable) */ __webpack_exports__["h"] = createTimeline;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runtime__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__proxies__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__easing__ = __webpack_require__(59);






/**
 * extends proxy
 * @param {(any): Map} proxy
 * @param {(any): boolean} detect
 */
function extendProxy(proxy, detect) {
    __WEBPACK_IMPORTED_MODULE_3__proxies__["a" /* proxies */].set(proxy, detect);
}

/**
 * extends easing
 * @param {Map} easingMap
 */
function extendEasing(easingMap) {
    easingMap.forEach(function (v, k) {
        return __WEBPACK_IMPORTED_MODULE_4__easing__["a" /* default */].set(k, v);
    });
}

/**
 * extends effect
 * @param {...Object} effects
 */
function extendEffect() {
    for (var _len = arguments.length, effects = Array(_len), _key = 0; _key < _len; _key++) {
        effects[_key] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(effects), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var effect = _step.value;

            __WEBPACK_IMPORTED_MODULE_2__runtime__["Effect"].use(effect);
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
 * create a effect
 * @return {Effect}
 */
function createEffect() {
    return new __WEBPACK_IMPORTED_MODULE_2__runtime__["Effect"]();
}

/**
 * create a animation
 * @example
 * createAnimation(map, effect, 1);
 * @example
 * createAnimation(map, (effect, initial) => {
 *     effect.duration(400);
 * }, Infinity);
 * @param  {Map} map
 * @param  {Effect|(effect: Effect, initial: Map): void} sth
 * @param  {number} iteration
 * @return {Animation}
 */
function createAnimation(map, sth, iteration) {
    if (!(map instanceof __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a)) {
        map = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__proxies__["b" /* from */])(map);
    }

    var effect = sth;
    if (sth instanceof Function) {
        effect = new __WEBPACK_IMPORTED_MODULE_2__runtime__["Effect"]();
        sth(effect, map);
    }
    return new __WEBPACK_IMPORTED_MODULE_2__runtime__["Animation"](map, effect, iteration);
}

/**
 * create animations
 * @example
 * createAnimations(map, effect1, (effect2, initial) => {
 *     return effect2.loop(2);
 * });
 * @param  {Map} map
 * @param  {Array<Effect|(effect: Effect, initial: Map): void>} sths
 * @return {Animation}
 */
function createAnimations(map) {
    for (var _len2 = arguments.length, sths = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        sths[_key2 - 1] = arguments[_key2];
    }

    return sths.map(function (sth) {
        return createAnimation(map, sth);
    });
}

/**
 * @type {Ticker}
 */
var globalTicker = new __WEBPACK_IMPORTED_MODULE_2__runtime__["Ticker"]();

/**
 * create a timeline
 * @param {Array<Animation>} [animations]
 * @param {object} [option]
 * @return {Timeline}
 */
function createTimeline(animations, option) {
    var timeline = new __WEBPACK_IMPORTED_MODULE_2__runtime__["Timeline"](globalTicker);
    if (animations) {
        animations.forEach(function (animation) {
            return timeline.add(animation, option);
        });
    }
    return timeline;
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isHex;
/* harmony export (immutable) */ __webpack_exports__["c"] = isRgba;
/* unused harmony export isHsla */
/* harmony export (immutable) */ __webpack_exports__["d"] = rgba;
/* harmony export (immutable) */ __webpack_exports__["b"] = hex;
/* harmony export (immutable) */ __webpack_exports__["g"] = hsla;
/* harmony export (immutable) */ __webpack_exports__["f"] = rgba2hsla;
/* harmony export (immutable) */ __webpack_exports__["e"] = hex2hsla;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pure_color_parse__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pure_color_parse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_pure_color_parse__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pure_color_convert_rgb2hsl__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pure_color_convert_rgb2hsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_pure_color_convert_rgb2hsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_pure_color_convert_hsl2rgb__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_pure_color_convert_hsl2rgb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_pure_color_convert_hsl2rgb__);






var hexColor4RegEx = /^\#[0-9A-F][0-9A-F][0-9A-F][0-9A-F]?$/i;
var hexColor8RegEx = /^\#[0-9A-F]{2}[0-9A-F]{2}[0-9A-F]{2}(?:[0-9A-F]{2})?$/i;
var rgbColorRegEx = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
var rgbaColorRegEx = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d\.]+\s*\)$/;
var hslColorRegEx = /^hsl\(\s*[\d\-\.]+\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%\s*\)$/;
var hslaColorRegEx = /^hsla\(\s*[\d\-\.]+\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+\s*\)$/;

/**
 * if is a hex color
 * @param  {string} hexColor #rrggbbaa or #rrggbb or #rgba or #rgb
 * @return {boolean}
 */
function isHex(hexColor) {
    return hexColor8RegEx.test(hexColor) || hexColor4RegEx.test(hexColor);
}

/**
 * if is a rgba color
 * @param {string} rgbaColor rgba(r, g, b, a) or rgb(r, g, b)
 * @return {boolean}
 */
function isRgba(rgbaColor) {
    return rgbaColorRegEx.test(rgbaColor) || rgbColorRegEx.test(rgbaColor);
}

/**
 * if is a hsla color
 * @param {string} hslaColor hsla(h, s, l, a) or hsl(h, s, l)
 * @return {boolean}
 */
function isHsla(hslaColor) {
    return hslaColorRegEx.test(hslaColor) || hslColorRegEx.test(hslaColor);
}

function normalizeRGBA(rgba, type) {
    var _rgba = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default()(rgba, 4),
        r = _rgba[0],
        g = _rgba[1],
        b = _rgba[2],
        _rgba$ = _rgba[3],
        a = _rgba$ === undefined ? 1 : _rgba$;

    var rgb = void 0;
    if (type === 'webgl') {
        rgb = [r, g, b].map(function (i) {
            return i / 255;
        });
    } else {
        rgb = [r, g, b].map(function (i) {
            return parseInt(i);
        });
    }

    return [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(rgb), [a]);
}

/**
 * convert rgba color to [r, g, b, a]
 * @param {string} rgbaColor rgba(r, g, b, a) or rgb(r, g, b)
 * @param {string} [type='css'] css/webgl
 * @return {Array<number>} [r, g, b, a]
 */
function rgba(rgbaColor) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'css';

    if (typeof rgbaColor === 'string') {
        rgbaColor = __WEBPACK_IMPORTED_MODULE_2_pure_color_parse___default.a.rgb(rgbaColor);
    }

    return normalizeRGBA(rgbaColor, type);
}

/**
 * convert hex color to [r, g, b, a]
 * @param {string} hexColor #rrggbbaa or #rrggbb or #rgba or #rgb
 * @param {string} [type='css'] css/webgl
 * @return {Array<number>} [r, g, b, a]
 */
function hex(hexColor) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'css';

    var rgb = void 0;
    var a = void 0;

    if (hexColor.length === 4 || hexColor.length === 5) {
        rgb = __WEBPACK_IMPORTED_MODULE_2_pure_color_parse___default.a.hex(hexColor.substring(0, 4));
        var char = hexColor.charAt(4) || 'F';
        a = parseInt('' + char + char, 16) / 255;
    } else if (hexColor.length === 7 || hexColor.length === 9) {
        rgb = __WEBPACK_IMPORTED_MODULE_2_pure_color_parse___default.a.hex(hexColor.substring(0, 7));
        a = parseInt(hexColor.substring(7, 9) || 'FF', 16) / 255;
    }

    return normalizeRGBA([].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(rgb), [a]), type);
}

/**
 * convert hsla color to [r, g, b, a];
 * @param {string} hslaColor hsla(h, s, l, a) or hsl(h, s, l)
 * @param {string} [type='css'] css/webgl
 * @return {Array} [r, g, b, a]
 */
function hsla(hslaColor) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'css';

    if (typeof hslaColor === 'string') {
        hslaColor = __WEBPACK_IMPORTED_MODULE_2_pure_color_parse___default.a.hsl(hslaColor);
    }

    var rgba = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(__WEBPACK_IMPORTED_MODULE_4_pure_color_convert_hsl2rgb___default()(hslaColor)), [hslaColor[3]]);
    return normalizeRGBA(rgba, type);
}

/**
 * convert rgba color to [h, s, l, a]
 * @param {string} rgbaColor rgba(r, g, b, a) or rgb(r, g, b)
 * @param {string} [type='css'] css/webgl
 * @return {Array} [h, s, l, a]
 */
function rgba2hsla(rgbaColor) {
    rgbaColor = rgba(rgbaColor);
    return [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(__WEBPACK_IMPORTED_MODULE_3_pure_color_convert_rgb2hsl___default()(rgbaColor)), [rgbaColor[3]]);
}

/**
 * convert hex color to [h, s, l, a]
 * @param {string} hexColor #rrggbbaa or #rrggbb or #rgba or #rgb
 * @param {string} [type='css'] css/webgl
 * @return {Array} [h, s, l, a]
 */
function hex2hsla(hexColor) {
    return rgba2hsla(hex(hexColor));
}

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basic__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__legacy__ = __webpack_require__(96);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__basic__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__element__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__legacy__["a"]; });






/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clock__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ticker__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__effect__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animation__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timeline__ = __webpack_require__(103);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Clock", function() { return __WEBPACK_IMPORTED_MODULE_0__clock__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ticker", function() { return __WEBPACK_IMPORTED_MODULE_1__ticker__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Effect", function() { return __WEBPACK_IMPORTED_MODULE_2__effect__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return __WEBPACK_IMPORTED_MODULE_3__animation__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return __WEBPACK_IMPORTED_MODULE_4__timeline__["a"]; });








/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_cubicbezier__ = __webpack_require__(62);



var easing = new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default.a();
easing.set('linear', function (x) {
  return x;
});

var ease = new __WEBPACK_IMPORTED_MODULE_1__libs_cubicbezier__["a" /* default */](.25, .1, .25, 1);
easing.set('ease', function (x) {
  return ease.y(x);
});

var easeIn = new __WEBPACK_IMPORTED_MODULE_1__libs_cubicbezier__["a" /* default */](.42, 0, 1, 1);
easing.set('ease-in', function (x) {
  return easeIn.y(x);
});

var easeOut = new __WEBPACK_IMPORTED_MODULE_1__libs_cubicbezier__["a" /* default */](0, 0, .58, 1);
easing.set('ease-out', function (x) {
  return easeOut.y(x);
});

var easeInOut = new __WEBPACK_IMPORTED_MODULE_1__libs_cubicbezier__["a" /* default */](.42, 0, .58, 1);
easing.set('ease-in-out', function (x) {
  return easeInOut.y(x);
});

var bounceIn = new __WEBPACK_IMPORTED_MODULE_1__libs_cubicbezier__["a" /* default */](.42, 0, .5, 1.5);
easing.set('bounce-in', function (x) {
  return bounceIn.y(x);
});

var bounceOut = new __WEBPACK_IMPORTED_MODULE_1__libs_cubicbezier__["a" /* default */](.5, -0.5, .58, 1);
easing.set('bounce-out', function (x) {
  return bounceOut.y(x);
});

var bounceInOut = new __WEBPACK_IMPORTED_MODULE_1__libs_cubicbezier__["a" /* default */](.5, -0.5, .5, 1.5);
easing.set('bounce-in-out', function (x) {
  return bounceInOut.y(x);
});

/* harmony default export */ __webpack_exports__["a"] = (easing);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_vec3__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_css__ = __webpack_require__(91);





/**
 * @class Element
 */

var Element = function () {
  /**
   * create a element
   * @param {string} className
   * @param {number} [width=0]
   * @param {number} [height=0]
   */
  function Element(className) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Element);

    /**
     * the classname of Element
     * @type {string}
     */
    this.className = className;

    /**
     * the width of rectangle
     * @type {number}
     */
    this.width = width;
    /**
     * the height of rectangle
     * @type {number}
     */
    this.height = height;

    /**
     * if recycle when remove from the scene
     * @beta it's a beta feature, if You set it with true, please DO NOT ANYTING on it's domElement
     * @type {boolean}
     */
    this.recycle = false;

    /**
     * a position identified three dimension vectors
     * @type {Vec3}
     */
    this.position = new __WEBPACK_IMPORTED_MODULE_2__libs_vec3__["a" /* default */](0, 0, 0);

    /**
     * a map of style
     * @type {StyleMap}
     */
    this.style = new __WEBPACK_IMPORTED_MODULE_3__libs_css__["a" /* StyleMap */]();

    /**
     * a map of transform
     * @type {TransformMap}
     */
    this.transform = new __WEBPACK_IMPORTED_MODULE_3__libs_css__["b" /* TransformMap */]();

    this._cached = false;

    this._life = 'created';
  }

  /**
   * the lifecycle of element
   * @type {string} created/attached/dettached
   */


  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Element, [{
    key: 'getBoundingRect',


    /**
     * get bounding box for geometry
     * @return {BoundingRect}
     */
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
  }, {
    key: 'life',
    get: function get() {
      return this._life;
    },
    set: function set(v) {
      this._life = v;
    }

    /**
     * if use cache when rendering
     * @type {boolean}
     */

  }, {
    key: 'cached',
    get: function get() {
      return this._cached && !this.position.modified && !this.style.modified && !this.transform.modified;
    }

    /**
     * reset cached
     * @type {boolean} cache
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

  return Element;
}();

/* harmony default export */ __webpack_exports__["a"] = (Element);

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = copy;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_set__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_set__);






/**
 * copy the source
 * @param {object} source
 * @param {boolean} deeply
 */
function copy(source, deeply) {
    if (source === undefined || source === null) {
        return source;
    }

    var copyValue = function copyValue(v) {
        if (deeply) {
            return copy(v, deeply);
        } else {
            return v;
        }
    };

    var target = void 0;
    if (source instanceof Array) {
        target = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(source)).map(copyValue);
    } else if (source instanceof __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map___default.a) {
        target = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map___default.a([].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(source)).map(function (_ref) {
            var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default()(_ref, 2),
                k = _ref2[0],
                v = _ref2[1];

            return [k, copyValue(v)];
        }));
    } else if (source instanceof __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_set___default.a) {
        target = new __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_set___default.a([].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(source)).map(function (v) {
            return copyValue(v);
        }));
    } else if (source instanceof Function || source instanceof RegExp || source instanceof Number || source instanceof String || (typeof source === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(source)) !== 'object') {
        target = source.valueOf();
    } else {
        target = {};
        for (var k in source) {
            if (Object.hasOwnProperty.call(source, k)) {
                target[k] = copyValue(source[k]);
            }
        }
    }

    return target;
}

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);


function generator(p1x, p1y, p2x, p2y) {
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

var CubicBezier = function () {
    /*
     * create a function of cubic-bezier
     * @param  {number} p1x the x coord of first control point
     * @param  {number} p1y the y coord of first control point
     * @param  {number} p2x the x coord of second control point
     * @param  {number} p2y the y coord of second control point
     */
    function CubicBezier(p1x, p1y, p2x, p2y) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, CubicBezier);

        this._curve = generator(p1x, p1y, p2x, p2y);
    }

    /**
     * get y with x
     * @param  {number} x
     * @return {number} y
     */


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(CubicBezier, [{
        key: "y",
        value: function y(x) {
            return this._curve(x);
        }
    }]);

    return CubicBezier;
}();

/* harmony default export */ __webpack_exports__["a"] = (CubicBezier);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return proxies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return from; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__object__ = __webpack_require__(64);





var proxies = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();

function from(sth) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(proxies), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_step.value, 2),
                proxy = _step$value[0],
                detect = _step$value[1];

            if (detect(sth)) {
                return proxy(sth);
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

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__object__["a" /* default */])(sth);
}



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromObject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_map__);








/**
 * @class
 * @extends Map
 */

var ObjectProxy = function (_Map) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(ObjectProxy, _Map);

    function ObjectProxy(obj) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, ObjectProxy);

        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ObjectProxy.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ObjectProxy)).call(this));

        _this._obj = obj;
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(ObjectProxy, [{
        key: 'has',
        value: function has(name) {
            return this._obj[name] !== undefined;
        }
    }, {
        key: 'get',
        value: function get(name) {
            return this._obj[name];
        }
    }, {
        key: 'set',
        value: function set(name, value) {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(ObjectProxy.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ObjectProxy.prototype), 'set', this).call(this, name, value);
            this._obj[name] = value;
            return this;
        }
    }]);

    return ObjectProxy;
}(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_map___default.a);

var cacheKey = '__object_proxy_to_map__';
/**
 * proxy an object to a map
 * @param {Object} object
 * @return {ObjectProxy}
 */
function fromObject(object) {
    if (!object.hasOwnProperty(cacheKey)) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(object, cacheKey, {
            value: new ObjectProxy(object),
            enumerable: false
        });
    }
    return object[cacheKey];
}

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_performance_now__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_performance_now___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_performance_now__);




/**
 * @class Clock
 */

var Clock = function () {
    /**
     * create a clock, and start immediately
     */
    function Clock() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Clock);

        /**
         * the elaspsed time
         * @readonly
         * @type {number}
         */
        this.elapsed = 0;

        /**
         * the delta time
         * @readonly
         * @type {number}
         */
        this.delta = 0;

        this._pasued = false;

        this._last = __WEBPACK_IMPORTED_MODULE_2_performance_now___default()() >>> 0;
    }

    /**
     * get elapsed time and delta duration
     * @readonly
     * @type {{elapsed: number, delta: number}}
     */


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Clock, [{
        key: 'time',
        get: function get() {
            var _now = __WEBPACK_IMPORTED_MODULE_2_performance_now___default()() >>> 0;

            if (this._pasued) {
                this._last = _now;
            }

            this.delta = _now - this._last;
            this.elapsed += this.delta;
            this._last = _now;

            return {
                delta: this.delta,
                elapsed: this.elapsed
            };
        }

        /**
         * pause status
         * @type {boolean}
         */

    }, {
        key: 'paused',
        get: function get() {
            return this._pasued;
        },
        set: function set(v) {
            if (v) {
                this._pasued = true;
                this._last = 0;
            } else {
                this._pasued = false;
                this._last = __WEBPACK_IMPORTED_MODULE_2_performance_now___default()() >>> 0;
            }
        }
    }]);

    return Clock;
}();

/* harmony default export */ __webpack_exports__["a"] = (Clock);

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__clock__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_copy__ = __webpack_require__(61);






var FPS = 60;
var frameTime = 1000 / FPS;

/* eslint-disable no-undef */
var raf = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : typeof webkitRequestAnimationFrame !== 'undefined' ? webkitRequestAnimationFrame : typeof mozRequestAnimationFrame !== 'undefined' ? mozRequestAnimationFrame : typeof msRequestAnimationFrame !== 'undefined' ? msRequestAnimationFrame : function (fn) {
    return setTimeout(fn, frameTime);
};

var caf = typeof cancelAnimationFrame !== 'undefined' ? cancelAnimationFrame : typeof webkitCancelAnimationFrame !== 'undefined' ? webkitCancelAnimationFrame : typeof webkitCancelRequestAnimationFrame !== 'undefined' ? webkitCancelRequestAnimationFrame : typeof mozCancelAnimationFrame !== 'undefined' ? mozCancelAnimationFrame : typeof msCancelAnimationFrame !== 'undefined' ? msCancelAnimationFrame : function (id) {
    return clearTimeout(id);
};
/* eslint-enable no-undef */

var incId = 0;
function generateId() {
    return ++incId;
}

/**
 * @class Ticker
 */

var Ticker = function () {
    /**
     * create a ticker
     * @return {Ticker}
     */
    function Ticker(rafFn, cafFn) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Ticker);

        this._paused = true;
        this._skipFrames = 0;
        this._skipCount = 0;
        this._clock = null;
        this._rid = null;
        this._rafFn = rafFn || function (f) {
            return raf(f);
        };
        this._cafFn = cafFn || function (n) {
            return caf(n);
        };
        this._updater = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();
        this._indices = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();
    }

    /**
     * @type {boolean} pause flag
     */


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Ticker, [{
        key: 'add',


        /**
         * add a update function
         * @param {Function} fn
         * @return {number} id a function id
         */
        value: function add(fn) {
            if (this._updater.has(fn)) {
                var _find2 = this._find(fn),
                    id = _find2.id;

                return id;
            } else {
                var _id = generateId();
                this._updater.set(fn, {
                    elapsed: 0,
                    delta: 0,
                    callCount: 0,
                    id: _id
                });
                this._indices.set(_id, fn);
                return _id;
            }
        }
    }, {
        key: '_find',
        value: function _find(fn) {
            if (typeof fn === 'number') {
                fn = this._indices.get(fn);
            }
            if (fn) {
                var _updater$get = this._updater.get(fn),
                    id = _updater$get.id;

                return {
                    fn: fn, id: id
                };
            } else {
                return {};
            }
        }

        /**
         * freeze a update function
         * @param {Function|number} any a function or a function id
         */

    }, {
        key: 'freeze',
        value: function freeze(any) {
            var _find3 = this._find(any),
                fn = _find3.fn;

            if (fn) {
                var options = this._updater.get(fn);
                options.freeze = true;
            }
        }

        /**
         * unfreeze a update function
         * @param {Function|number} any a function or a function id
         */

    }, {
        key: 'unfreeze',
        value: function unfreeze(any) {
            var _find4 = this._find(any),
                fn = _find4.fn;

            if (fn) {
                var options = this._updater.get(fn);
                options.freeze = false;
            }
        }
        /**
         * remove a update function
         * @param {Function|number} any a function or a function id
         */

    }, {
        key: 'remove',
        value: function remove(any) {
            var _find5 = this._find(any),
                fn = _find5.fn,
                id = _find5.id;

            if (fn) {
                this._updater.delete(fn);
                this._indices.delete(id);
            }
        }

        /**
         * running a function in loop
         */

    }, {
        key: 'run',
        value: function run() {
            var _this = this;

            if (this._paused) {
                this._paused = false;

                if (this._rid === null) {
                    // 初始运行
                    this._clock = new __WEBPACK_IMPORTED_MODULE_3__clock__["a" /* default */]();

                    // 第一次总是要执行的
                    this._call({
                        elapsed: this._clock.elapsed,
                        delta: this._clock.delta
                    });

                    // 进入 _loop
                    this._rid = this._rafFn(function () {
                        return _this._loop();
                    });
                } else {
                    this._clock.paused = false;
                }
            }
        }
        /**
         * pause the loop
         */

    }, {
        key: 'pause',
        value: function pause() {
            // 非暂停状态，且有 requestId 才可以被暂停
            if (!this._paused && this._rid) {
                this._paused = true;
                this._clock.paused = true;
            }
        }

        /**
         * resume the loop
         */

    }, {
        key: 'resume',
        value: function resume() {
            // 处于暂停状态，且有 requestId 才可以被重启
            if (this._paused && this._rid) {
                this._paused = false;
                this._clock.paused = false;
            }
        }

        /**
         * stop the loop
         */

    }, {
        key: 'stop',
        value: function stop() {
            if (this._rid) {
                this._paused = true;
                this._cafFn(this._rid);
                this._rid = null;
                this._clock = null;
                this._updater.forEach(function (clock) {
                    clock.elapsed = 0;
                    clock.delta = 0;
                });
            }
        }
    }, {
        key: '_call',
        value: function _call(_ref) {
            var delta = _ref.delta;

            this._updater.forEach(function (option, fn) {
                if (option.freeze !== true) {
                    if (option.callCount) {
                        option.delta = delta;
                        option.elapsed += delta;
                    }
                    option.callCount++;
                    fn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__libs_copy__["a" /* default */])(option));
                }
            });
        }

        /**
         * the loop function
         * @param {Function} fn callback function
         */

    }, {
        key: '_loop',
        value: function _loop() {
            var _this2 = this;

            // 如果在执行函数时 stop，则在此判断是否还需要再 _loop
            if (this._rid !== null) {
                this._rid = this._rafFn(function () {
                    return _this2._loop();
                });
            }

            // 暂停状态直接跳过
            if (!this._paused) {
                if (!this._skipFrames) {
                    this._call(this._clock.time);
                } else {
                    // 跳过 n 帧后再执行
                    if (this._skipCount >= this._skipFrames) {
                        this._call(this._clock.time);
                        this._skipCount = 0;
                    } else {
                        this._skipCount++;
                    }
                }
            }
        }
    }, {
        key: 'paused',
        get: function get() {
            return this._paused;
        }

        /**
         * @type {number} the frames count to skip
         */

    }, {
        key: 'skipFrames',
        get: function get() {
            return this._skipFrames;
        },
        set: function set(n) {
            this._skipFrames = n;
        }
    }]);

    return Ticker;
}();

/* harmony default export */ __webpack_exports__["a"] = (Ticker);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(34)
  , TAG = __webpack_require__(5)('toStringTag')
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

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(24)
  , document = __webpack_require__(12).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(23)(function(){
  return Object.defineProperty(__webpack_require__(69)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(38)
  , $export        = __webpack_require__(11)
  , redefine       = __webpack_require__(77)
  , hide           = __webpack_require__(19)
  , has            = __webpack_require__(18)
  , Iterators      = __webpack_require__(20)
  , $iterCreate    = __webpack_require__(132)
  , setToStringTag = __webpack_require__(43)
  , getPrototypeOf = __webpack_require__(75)
  , ITERATOR       = __webpack_require__(5)('iterator')
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

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(13)
  , anObject = __webpack_require__(17)
  , getKeys  = __webpack_require__(25);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(76)
  , hiddenKeys = __webpack_require__(37).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 74 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(18)
  , toObject    = __webpack_require__(28)
  , IE_PROTO    = __webpack_require__(44)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(18)
  , toIObject    = __webpack_require__(14)
  , arrayIndexOf = __webpack_require__(124)(false)
  , IE_PROTO     = __webpack_require__(44)('IE_PROTO');

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

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(46)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(68)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(20);
module.exports = __webpack_require__(2).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(52),
    getRawTag = __webpack_require__(192),
    objectToString = __webpack_require__(194);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__(181),
    deburr = __webpack_require__(200),
    words = __webpack_require__(205);

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


/***/ }),
/* 82 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

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


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var capitalize = __webpack_require__(90),
    createCompounder = __webpack_require__(81);

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


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(80),
    getPrototype = __webpack_require__(191),
    isObjectLike = __webpack_require__(53);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
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
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var createCompounder = __webpack_require__(81);

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


/***/ }),
/* 86 */
/***/ (function(module, exports) {

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

/***/ }),
/* 87 */
/***/ (function(module, exports) {

var component = /-?\d+(\.\d+)?%?/g;
function extractComponents(color) {
  return color.match(component);
}

module.exports = extractComponents;

/***/ }),
/* 88 */
/***/ (function(module, exports) {

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

module.exports = clamp;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(31),
    upperFirst = __webpack_require__(204);

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


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = numberify;
/* unused harmony export stringify */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StyleMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TransformMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_kebabCase__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_kebabCase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_lodash_kebabCase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash_camelCase__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash_camelCase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_lodash_camelCase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_css_transform_to_mat4__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_css_transform_to_mat4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_css_transform_to_mat4__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__color__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__math__ = __webpack_require__(33);
















var NumberRegExp = /^[\d\-\.]+$/;
/**
 * numberify a value
 * @param {*} value
 * @return {*}
 */
function numberify(value) {
    var val = void 0;

    if (value !== null && value !== undefined) {
        if (typeof value === 'string') {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__color__["a" /* isHex */])(value)) {
                val = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__color__["e" /* hex2hsla */])(value).map(function (v) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__math__["b" /* accuracy */])(v);
                });
            } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__color__["c" /* isRgba */])(value)) {
                val = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__color__["f" /* rgba2hsla */])(value).map(function (v) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__math__["b" /* accuracy */])(v);
                });
            } else if (NumberRegExp.test(value)) {
                val = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__math__["b" /* accuracy */])(value);
            } else if (value.indexOf(' ') > 0) {
                val = value.split(/\s+/g).map(function (v) {
                    return numberify(v);
                });
            } else {
                val = value.toString();
            }
        } else {
            val = value.valueOf();
        }
    }

    return val;
}

/**
 * stringify a value
 * @param {*} value
 * @param {string} [type] color|number|string
 * @param {string} [unit='px']
 */
function stringify(value, type) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'px';

    var val = void 0;

    if (value !== null && value !== undefined) {
        if (type === 'color') {
            val = 'rgba(' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__color__["g" /* hsla */])(value).join(',') + ')';
        } else if (type === 'number') {
            val = '' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__math__["b" /* accuracy */])(value) + unit;
        } else if (type === 'string') {
            val = value.toString();
        } else {
            val = value;
        }
    }

    return val;
}

// transform keys
var TRANSLATE = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a([['translateX', '0px'], ['translateY', '0px'], ['translateZ', '0px']]);

var ROTATE = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a([['rotateX', '0deg'], ['rotateY', '0deg'], ['rotateZ', '0deg']]);

var SKEW = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a([['skewX', '0deg'], ['skewY', '0deg']]);

var SCALE = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a([['scaleX', '1'], ['scaleY', '1'], ['scaleZ', '1']]);

var TRANSFORM = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a([].concat(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(TRANSLATE), __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(ROTATE), __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(SKEW), __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(SCALE)).map(function (_ref) {
    var _ref2 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default()(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return [key, numberify(value)];
}));

// other styles
var COLOR_UNIT = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a([['color', 'rgba(0,0,0,1)'], ['background-color', 'rgba(0,0,0,0)'], ['border-left-color', 'rgba(0,0,0,0)'], ['border-top-color', 'rgba(0,0,0,0)'], ['border-right-color', 'rgba(0,0,0,0)'], ['border-bottom-color', 'rgba(0,0,0,0)']]);

var NUMBER_UNIT = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a([['font-size', '16px'], ['line-height', '16px'], ['border-radius', '0px'], ['border-top-left-radius', '0px'], ['border-top-right-radius', '0px'], ['border-bottom-right-radius', '0px'], ['border-bottom-left-radius', '0px'], ['border-left-width', '0px'], ['border-top-width', '0px'], ['border-right-width', '0px'], ['border-bottom-width', '0px'], ['background-position-x', '0px'], ['background-position-y', '0px']]);

var NO_UNIT = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a([['opacity', '1']]);

var OTHER = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a([['background-image', 'none'], ['background-position', '0px 0px'], ['background-size', 'contain'], ['background-repeat', 'repeat'], ['-webkit-transform-origin', '50% 50% 0%'], ['transform-origin', '50% 50% 0%'], ['border-left-style', 'none'], ['border-top-style', 'none'], ['border-right-style', 'none'], ['border-bottom-style', 'none'], ['font-weight', 'normal']]);

var STYLE = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a([].concat(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(COLOR_UNIT), __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(NUMBER_UNIT), __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(NO_UNIT), __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(OTHER)).map(function (_ref3) {
    var _ref4 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default()(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return [key, numberify(value)];
}));

/**
 * map for css style
 * @extends {Map}
 */

var CSSMap = function (_Map) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(CSSMap, _Map);

    /**
     * create a css map
     * @param  {Array} entries
     * @return {CSSMap}
     */
    function CSSMap(entries) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, CSSMap);

        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CSSMap.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSSMap)).call(this));

        _this._normalizer = _this.constructor.normalizer;

        _this._defaultMap = _this.constructor.defaultMap;

        /**
         * if modified
         * @type {Boolean}
         */
        _this.modified = false;

        if (entries) {
            entries.forEach(function (entry) {
                return _this.set.apply(_this, __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(entry));
            });
        }
        return _this;
    }

    /**
     * get the normalized value by name
     * @override
     * @param  {String} name
     * @return {String|Number}
     */


    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(CSSMap, [{
        key: 'get',
        value: function get(name) {
            var _normalizer = this._normalizer([name]),
                _normalizer2 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default()(_normalizer, 1),
                normalizedName = _normalizer2[0];

            var value = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(CSSMap.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSSMap.prototype), 'get', this).call(this, normalizedName);
            if (value === undefined) {
                value = this._defaultMap.get(normalizedName);
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
            var _normalizer3 = this._normalizer([name]),
                _normalizer4 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default()(_normalizer3, 1),
                normalizedName = _normalizer4[0];

            this.modified = true;
            return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(CSSMap.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSSMap.prototype), 'set', this).call(this, normalizedName, numberify(value));
        }

        /**
         * get a normalized css map
         * @return {Map}
         */

    }, {
        key: 'normalize',
        value: function normalize() {
            var _this2 = this;

            var entries = [].concat(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(this.entries())).map(function (_ref5) {
                var _ref6 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default()(_ref5, 2),
                    name = _ref6[0],
                    value = _ref6[1];

                return _this2._normalizer([name, value]);
            });
            var normalizedMap = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a(entries);
            return normalizedMap;
        }

        /**
         * if has a name which will be normalized
         * @override
         * @param  {String} name
         * @return {Boolean}
         */

    }, {
        key: 'has',
        value: function has(name) {
            var _normalizer5 = this._normalizer([name]),
                _normalizer6 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default()(_normalizer5, 1),
                normalizedName = _normalizer6[0];

            return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(CSSMap.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSSMap.prototype), 'has', this).call(this, normalizedName);
        }

        /**
         * delete the value by name
         * @param  {String} name
         * @return {CSSMap} current context
         */

    }, {
        key: 'delete',
        value: function _delete(name) {
            var _normalizer7 = this._normalizer([name]),
                _normalizer8 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default()(_normalizer7, 1),
                normalizedName = _normalizer8[0];

            this.modified = true;
            return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(CSSMap.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSSMap.prototype), 'delete', this).call(this, normalizedName);
        }
    }]);

    return CSSMap;
}(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a);

/**
 * a style map
 * @extends {CSSMap}
 */


var StyleMap = function (_CSSMap) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(StyleMap, _CSSMap);

    function StyleMap() {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, StyleMap);

        return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (StyleMap.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(StyleMap)).apply(this, arguments));
    }

    return StyleMap;
}(CSSMap);

StyleMap.defaultMap = STYLE;
StyleMap.normalizer = function (_ref7) {
    var _ref8 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default()(_ref7, 2),
        name = _ref8[0],
        value = _ref8[1];

    name = __WEBPACK_IMPORTED_MODULE_10_lodash_kebabCase___default()(name);

    if (!STYLE.has(name)) {
        throw new Error(name + ' is not a valid style name');
    }

    if (value !== null && value !== undefined) {
        if (COLOR_UNIT.has(name)) {
            value = stringify(value, 'color');
        } else if (NUMBER_UNIT.has(name)) {
            value = stringify(value, typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(value));
        } else if (NO_UNIT.has(name)) {
            value = stringify(value, 'string');
        } else if (value instanceof Array) {
            value = value.map(function (v) {
                return stringify(v, 'string');
            }).join(' ');
        }
    }

    return [name, value];
};

/**
 * a transform map
 * @extends {CSSMap}
 */
var TransformMap = function (_CSSMap2) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(TransformMap, _CSSMap2);

    function TransformMap() {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, TransformMap);

        return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TransformMap.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(TransformMap)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(TransformMap, [{
        key: 'toMatrix',
        value: function toMatrix(filter) {
            var cssText = [].concat(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_toConsumableArray___default()(this.normalize())).map(function (item) {
                if (filter) {
                    item = filter(item);
                }

                var _item = item,
                    _item2 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default()(_item, 2),
                    name = _item2[0],
                    value = _item2[1];

                return name + '(' + value + ')';
            }).join(' ');

            return __WEBPACK_IMPORTED_MODULE_12_css_transform_to_mat4___default()(cssText).map(function (i) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__math__["b" /* accuracy */])(i);
            });
        }
    }]);

    return TransformMap;
}(CSSMap);

TransformMap.defaultMap = TRANSFORM;
TransformMap.normalizer = function (_ref9) {
    var _ref10 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_slicedToArray___default()(_ref9, 2),
        name = _ref10[0],
        value = _ref10[1];

    name = __WEBPACK_IMPORTED_MODULE_11_lodash_camelCase___default()(name);

    if (!TRANSFORM.has(name)) {
        throw new Error(name + ' is not a valid transform key');
    }

    if (value !== null && value !== undefined) {
        if (SCALE.has(name)) {
            value = stringify(value, 'string');
        } else if (ROTATE.has(name) || SKEW.has(name)) {
            value = stringify(value, 'number', 'deg');
        } else {
            value = stringify(value, 'number');
        }
    }

    return [name, value];
};

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = animate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_define_properties__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_define_properties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_define_properties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__libs_event__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__factory__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash_isPlainObject__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash_isPlainObject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash_isPlainObject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_isElement__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_isElement___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_lodash_isElement__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__proxies_object__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__proxies_htmlelement__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__proxies__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__effects__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__easing__ = __webpack_require__(59);

















__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__factory__["a" /* extendProxy */])(__WEBPACK_IMPORTED_MODULE_11__proxies_object__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9_lodash_isPlainObject___default.a);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__factory__["a" /* extendProxy */])(__WEBPACK_IMPORTED_MODULE_12__proxies_htmlelement__["a" /* default */], __WEBPACK_IMPORTED_MODULE_10_lodash_isElement___default.a);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__factory__["b" /* extendEffect */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__effects__["c" /* BasicEffects */])(__WEBPACK_IMPORTED_MODULE_15__easing__["a" /* default */]));

var passedAnimationEvent = ['start', 'beforeplay', 'play', 'afterplay', 'restart', 'finish'];
var passedTimelineEvent = ['loop', 'end'];

var Tween = function (_Event) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Tween, _Event);

    function Tween(initial) {
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, Tween);

        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Tween.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(Tween)).call(this));

        var timeline = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__factory__["h" /* createTimeline */])();
        var effect = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__factory__["e" /* createEffect */])();

        var _loop = function _loop(key) {
            if (key === 'end' || key === 'then' || key === 'next' || !(effect[key] instanceof Function)) {
                return 'continue';
            }

            __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(_this, key, {
                value: function value() {
                    var _effect;

                    // eslint-disable-line
                    (_effect = effect)[key].apply(_effect, arguments);
                    return this;
                }
            });
        };

        for (var key in effect) {
            var _ret = _loop(key);

            if (_ret === 'continue') continue;
        }

        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_define_properties___default()(_this, {
            next: {
                value: function value(next) {
                    effect.next();

                    if (next) {
                        effect.to(next).duration(0).next();
                    }

                    return this;
                }
            },

            play: {
                value: function value() {
                    var _this2 = this;

                    var iteration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

                    effect.end();
                    var animation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__factory__["f" /* createAnimation */])(initial, effect, iteration);

                    passedAnimationEvent.forEach(function (ev) {
                        return animation.on(ev, function () {
                            return _this2.emit(ev, animation.current);
                        });
                    });

                    passedTimelineEvent.forEach(function (ev) {
                        return timeline.on(ev, function () {
                            return _this2.emit(ev, animation.current);
                        });
                    });

                    timeline.add(animation);
                    timeline.play();

                    effect = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__factory__["e" /* createEffect */])();

                    return this;
                }
            },

            stop: {
                value: function value() {
                    timeline.stop();
                    return this;
                }
            }
        });
        return _this;
    }

    return Tween;
}(__WEBPACK_IMPORTED_MODULE_7__libs_event__["a" /* default */]);

/**
 * tween animation
 * @example
 * animate({
 *   a: 1,
 *   b: 2
 * })
 *   .to({
 *     a: 2,
 *     b: 3
 *   })
 *   .duration(1000)
 *   .play();
 * @example
 * animate(document.body)
 *   .to({
 *     backgroundColor: '#000',
 *     translateX: 100
 *   })
 *   .duration(1000)
 *   .play();
 * @param  {object|Map|HTMLElement} initial
 * @return {Tween}
 */


function animate(initial) {
    if (!(initial instanceof __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_map___default.a)) {
        initial = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__proxies__["b" /* from */])(initial);
    }
    var tween = new Tween(initial);
    return tween;
}

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_factory__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_animate__ = __webpack_require__(92);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "runtime", function() { return __WEBPACK_IMPORTED_MODULE_0__runtime__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "globalTicker", function() { return __WEBPACK_IMPORTED_MODULE_1__core_factory__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extendProxy", function() { return __WEBPACK_IMPORTED_MODULE_1__core_factory__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extendEasing", function() { return __WEBPACK_IMPORTED_MODULE_1__core_factory__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extendEffect", function() { return __WEBPACK_IMPORTED_MODULE_1__core_factory__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createEffect", function() { return __WEBPACK_IMPORTED_MODULE_1__core_factory__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAnimation", function() { return __WEBPACK_IMPORTED_MODULE_1__core_factory__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAnimations", function() { return __WEBPACK_IMPORTED_MODULE_1__core_factory__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createTimeline", function() { return __WEBPACK_IMPORTED_MODULE_1__core_factory__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return __WEBPACK_IMPORTED_MODULE_2__core_animate__["a"]; });






/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_typeof__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_cubicbezier__ = __webpack_require__(62);






var CubicBezierRegEx = /^\s*cubic-bezier\(\s*([\d\-\.]+)\s*,\s*([\d\-\.]+)\s*,\s*([\d\-\.]+)\s*,\s*([\d\-\.]+)\s*\)\s*$/;

/* harmony default export */ __webpack_exports__["a"] = (function (easingMap) {
    return {
        _initialBasicEffects: function _initialBasicEffects() {
            if (this._temp === undefined) {
                this._temp = {
                    map: new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map___default.a()
                };
            }
            return this._temp;
        },
        to: function to(key, value) {
            var temp = this._initialBasicEffects();

            if (typeof key === 'string') {
                temp.map.set(key, value);
            } else if (typeof key === 'function') {
                temp.update = key;
            } else if (key instanceof __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map___default.a) {
                key.forEach(function (value, key) {
                    temp.map.set(key, value);
                });
            } else if ((typeof key === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_typeof___default()(key)) === 'object') {
                for (var n in key) {
                    temp.map.set(n, key[n]);
                }
            }
        },
        update: function update(_update) {
            var temp = this._initialBasicEffects();
            temp.update = _update;
        },
        easing: function easing(n) {
            var temp = this._initialBasicEffects();
            var f = void 0;
            if (typeof n === 'string') {
                var matched = n.match(CubicBezierRegEx);
                if (matched) {
                    var cb = new (Function.prototype.bind.apply(__WEBPACK_IMPORTED_MODULE_4__libs_cubicbezier__["a" /* default */], [null].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(matched.slice(1).map(function (i) {
                        return parseFloat(i);
                    })))))();
                    f = function f(x) {
                        return cb.y(x);
                    };
                } else if (easingMap) {
                    f = easingMap.get(n);
                }
            } else if (typeof n === 'function') {
                f = n;
            }

            if (!f) {
                throw new Error('invalid easing function');
            }

            temp.easing = f;
        },
        duration: function duration(t) {
            var temp = this._initialBasicEffects();
            temp.duration = t;
        },
        delay: function delay(t) {
            var temp = this._initialBasicEffects();
            temp.delay = t;
        },
        iteration: function iteration(n) {
            var temp = this._initialBasicEffects();
            temp.iteration = n;
        },
        direction: function direction(d) {
            var temp = this._initialBasicEffects();
            temp.direction = d;
        },
        next: function next() {
            var temp = this._initialBasicEffects();
            if (temp.map.size > 0 || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(temp).length > 1) {
                this.add(temp);
                this._temp = undefined;
            }
        },
        then: function then() {
            // eslint-disable-next-line
            console.warn('"effect.then" is deprecated. Please use "effect.next" instead');
            this.next.apply(this, arguments);
        },
        end: function end() {
            this.next();
        }
    };
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_css__ = __webpack_require__(91);




/* harmony default export */ __webpack_exports__["a"] = (function () {
    return {
        css: function css(key, value) {
            var _this = this;

            if (typeof key === 'string') {
                this.to(key, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__libs_css__["c" /* numberify */])(value));
            } else if (key instanceof __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a) {
                key.forEach(function (value, key) {
                    _this.to(key, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__libs_css__["c" /* numberify */])(value));
                });
            } else if ((typeof key === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(key)) === 'object') {
                for (var n in key) {
                    this.to(n, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__libs_css__["c" /* numberify */])(key[n]));
                }
            }
        },
        move3d: function move3d(x, y, z) {
            if (typeof x === 'number') {
                this.css('translateX', x);
            }
            if (typeof y === 'number') {
                this.css('translateY', y);
            }
            if (typeof z === 'number') {
                this.css('translateZ', z);
            }
        },
        move: function move(x, y) {
            this.move3d(x, y);
        },
        moveX: function moveX(x) {
            this.move3d(x);
        },
        moveY: function moveY(y) {
            this.move3d(undefined, y);
        },
        moveZ: function moveZ(z) {
            this.move3d(undefined, undefined, z);
        },
        rotate3d: function rotate3d(x, y, z, d) {
            this.css('rotate3d', [x, y, z, d]);
        },
        rotateX: function rotateX(x) {
            this.css('rotateX', x);
        },
        rotateY: function rotateY(y) {
            this.css('rotateY', y);
        },
        rotateZ: function rotateZ(z) {
            this.css('rotateZ', z);
        },
        rotate: function rotate(z) {
            this.rotateZ(z);
        },
        scale3d: function scale3d(x, y, z) {
            if (typeof x === 'number') {
                this.css('scaleX', x);
            }
            if (typeof y === 'number') {
                this.css('scaleY', y);
            }
            if (typeof z === 'number') {
                this.css('scaleZ', z);
            }
        },
        scale: function scale(x, y) {
            this.scale3d(x, y);
        },
        scaleX: function scaleX(x) {
            this.scale3d(x);
        },
        scaleY: function scaleY(y) {
            this.scale3d(undefined, y);
        },
        scaleZ: function scaleZ(z) {
            this.scale3d(undefined, undefined, z);
        },
        skew: function skew(x, y) {
            if (typeof x === 'number') {
                this.css('skewX', x);
            }
            if (typeof y === 'number') {
                this.css('skewY', y);
            }
        },
        skewX: function skewX(x) {
            this.skew(x);
        },
        skewY: function skewY(y) {
            this.skew(undefined, y);
        }
    };
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable no-console */
/* harmony default export */ __webpack_exports__["a"] = (function () {
    return {
        ease: function ease() {
            console.warn('"effect.ease" is deprecated. Please use "effect.easing" instead');
            if (this.easing) {
                this.easing.apply(this, arguments);
            }
        },
        loop: function loop() {
            console.warn('"effect.loop" is deprecated. Please use "effect.iteration" instead');
            if (this.iteration) {
                this.iteration.apply(this, arguments);
            }
        },
        loopAll: function loopAll() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            console.warn('"effect.loopAll" is deprecated. Please use animation\'s iteration instead');
            if (!this.repeatAll) {
                this.repeatAll = {};
            }

            this.repeatAll.count = n;
        },
        mode: function mode() {
            console.warn('"effect.mode" is deprecated.');
        }
    };
});
/* eslint-enable no-console */

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_color__ = __webpack_require__(56);





var NoCanvasElementError = new Error('set canvas element first');
/**
 * @class Engine
 */

var Engine = function () {
    /**
     * create a engine
     */
    function Engine(className) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Engine);

        /**
         * the name of the class
         * @type {string}
         */
        this.className = className;

        this._flushed = false;

        this._clearColor = 'rgba(255, 255, 255, 1)';

        this._size = [];
    }

    /**
     * if flushed
     * @type {boolean}
     */


    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Engine, [{
        key: 'setCanvasElement',


        /**
         * set a canvas element to the engine
         * @param {*} canvasElement
         */
        value: function setCanvasElement(canvasElement) {
            /**
             * @type {*}
             */
            this.canvas = canvasElement;
        }

        /**
         * set the size of canvas
         * @throws {Error} If not attach a element
         * @param {number|object} width a number of width or an object of rect
         * @param {number} [height]
         */

    }, {
        key: 'setCanvasSize',
        value: function setCanvasSize(width, height) {
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }

            var w = void 0,
                h = void 0;
            if ((typeof width === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(width)) === 'object') {
                w = width.width;
                h = width.height;
            } else {
                w = width;
                h = height;
            }

            this._size = [w, h];
        }

        /**
         * set the size of style
         * @throws {Error} If not attach a element
         * @param {number|object} width a number of width or an object of rect
         * @param {number} [height]
         */

    }, {
        key: 'setStyleSize',
        value: function setStyleSize(width, height) {
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }

            var w = void 0,
                h = void 0;
            if ((typeof width === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(width)) === 'object') {
                w = width.width;
                h = width.height;
            } else {
                w = width;
                h = height;
            }
            /**
             * the width of style
             * @type {number}
             */
            this.styleWidth = w;
            /**
             * the height of style
             * @type {number}
             */
            this.styleHeight = h;
        }

        /**
         * calculate the size scale of canvas
         * @throws {Error} If not attach a element
         */

    }, {
        key: 'resize',
        value: function resize() {
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }
        }

        /**
         * the width of canvas
         * @return {number}
         */

    }, {
        key: 'clear',


        /**
         * clear the canvas
         * @throws {Error} If not attach a element
         */
        value: function clear() {
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }
        }

        /**
         * Set the clear color for canvas.
         * The color string supports `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`
         * @throws {Error} If not attach a element
         * @param {string} color
         */

    }, {
        key: 'setClearColor',
        value: function setClearColor(color) {
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__libs_color__["a" /* isHex */])(color)) {
                color = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__libs_color__["b" /* hex */])(color);
            } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__libs_color__["c" /* isRgba */])(color)) {
                color = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__libs_color__["d" /* rgba */])(color);
            }

            this._clearColor = 'rgba(' + color.join(',') + ')';
        }

        /**
         * draw a element
         * @throws {Error} If not attach a element
         * @param  {Element} element
         */

    }, {
        key: 'draw',
        value: function draw(element) {
            // eslint-disable-line
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }

            /* istanbul ignore if */
            if (this._flushed === true) {
                this._flushed = false;
            }
        }
        /**
         * draw a buffer of elements
         * @throws {Error} If not attach a element
         * @param  {Array<Element>} buffer
         */

    }, {
        key: 'drawBuffer',
        value: function drawBuffer(buffer) {
            // eslint-disable-line
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }

            /* istanbul ignore if */
            if (this._flushed === true) {
                this._flushed = false;
            }
        }

        /**
         * flush drawing
         * @throws {Error} If not attach a element
         */

    }, {
        key: 'flush',
        value: function flush() {
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }

            /* istanbul ignore if */
            if (this._flushed === false) {
                this._flushed = true;
            }
        }

        /**
         * attach an element to the engine
         * @deprecated use "setCanvasElement" instead
         * @param {*} canvasElement
         */

    }, {
        key: 'attachElement',
        value: function attachElement(canvasElement) {
            // eslint-disable-next-line
            console.warn('Deprecated. Please use "setCanvasElement" instead');
            this.setCanvasElement(canvasElement);
        }

        /**
         * set the size of canvas
         * @deprecated use "setCanvasSize" instead
         * @throws {Error} If not attach a element
         * @param {number} size
         */

    }, {
        key: 'setSize',
        value: function setSize(size) {
            // eslint-disable-next-line
            console.warn('Deprecated. Please use "setCanvasSize" instead');
            this.setCanvasSize(size);
        }

        /**
         * the scale ratio of viewport to canvas
         * @deprecated use "scaleWidth" instead
         * @return {number}
         */

    }, {
        key: 'flushed',
        get: function get() {
            return this._flushed;
        },
        set: function set(v) {
            this._flushed = v;
        }
    }, {
        key: 'canvasWidth',
        get: function get() {
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }

            return this._size[0] || this.styleWidth;
        }

        /**
         * the height of canvas
         * @return {number}
         */

    }, {
        key: 'canvasHeight',
        get: function get() {
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }

            return this._size[1] || this.styleHeight * this.scaleWidth;
        }

        /**
         * the scale ratio of width
         * @return {number}
         */

    }, {
        key: 'scaleWidth',
        get: function get() {
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }

            return this.canvasWidth / this.styleWidth;
        }

        /**
         * the scale ratio of height
         * @return {number}
         */

    }, {
        key: 'scaleHeight',
        get: function get() {
            /* istanbul ignore if */
            if (!this.canvas) {
                throw NoCanvasElementError;
            }

            return this.canvasHeight / this.styleHeight;
        }
    }, {
        key: 'scaling',
        get: function get() {
            // eslint-disable-next-line
            console.warn('Deprecated. Please use "scaleWidth" instead');
            return this.scaleWidth;
        }

        /**
         * the width of viewport
         * @deprecated use "canvasWidth" instead
         * @return {number}
         */

    }, {
        key: 'viewportWidth',
        get: function get() {
            // eslint-disable-next-line
            console.warn('Deprecated. Please use "canvasWidth" instead');
            return this.canvasWidth;
        }

        /**
         * the height of viewport
         * @deprecated use "canvasHeight" instead
         * @return {number}
         */

    }, {
        key: 'viewportHeight',
        get: function get() {
            // eslint-disable-next-line
            console.warn('Deprecated. Please use "canvasHeight" instead');
            return this.canvasHeight;
        }
    }]);

    return Engine;
}();

/* harmony default export */ __webpack_exports__["a"] = (Engine);

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export simple */
/* harmony export (immutable) */ __webpack_exports__["a"] = complex;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__math__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__color__ = __webpack_require__(56);







var UnitRegEx = /^([\d\-\.]+)([a-z%]*)$/;

function extractUnitValue(value) {
    var matched = value.match(UnitRegEx);

    if (matched) {
        return [parseFloat(matched[1]), matched[2]];
    }
}

function color(sVal, eVal, percent) {
    var val = void 0;
    var sColor = void 0;
    var eColor = void 0;

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__color__["a" /* isHex */])(sVal)) {
        sColor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__color__["e" /* hex2hsla */])(sVal);
    } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__color__["c" /* isRgba */])(sVal)) {
        sColor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__color__["f" /* rgba2hsla */])(sVal);
    }

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__color__["a" /* isHex */])(eVal)) {
        eColor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__color__["e" /* hex2hsla */])(eVal);
    } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__color__["c" /* isRgba */])(eVal)) {
        eColor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__color__["f" /* rgba2hsla */])(eVal);
    }

    if (sColor && eColor) {
        val = 'rgba(' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__color__["g" /* hsla */])(array(sColor, eColor, percent)).join(',') + ')';
    }

    return val;
}

function unit(sVal, eVal, percent) {
    var val = void 0;

    var sUnit = extractUnitValue(sVal);
    var eUnit = extractUnitValue(eVal);

    if (sUnit && eUnit && sUnit[1] === eUnit[1]) {
        val = '' + (sUnit[0] + (eUnit[0] - sUnit[0]) * percent) + eUnit[1];
    }

    return val;
}

function string(sVal, eVal, sType, eType, percent) {
    var val = void 0;

    if (sType === 'string' && eType === 'string') {
        val = unit(sVal, eVal, percent) || color(sVal, eVal, percent);
    }

    return val;
}

function number(sVal, eVal, sType, eType, percent) {
    var val = void 0;

    if (sType === 'number' && eType === 'number') {
        val = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__math__["b" /* accuracy */])(sVal + (eVal - sVal) * percent);
    }

    return val;
}

function hybrid(sVal, eVal, sType, eType, percent) {
    var val = void 0;
    var sUnit = void 0;
    var eUnit = void 0;

    if (sType !== eType && (sType === 'string' || sType === 'number') && (eType === 'string' || eType === 'number')) {

        sUnit = extractUnitValue(String(sVal));
        eUnit = extractUnitValue(String(eVal));

        if (sUnit && eUnit && (sUnit[1] === '' || eUnit[1] === '')) {
            val = '' + (sUnit[0] + (eUnit[0] - sUnit[0]) * percent) + (eUnit[1] || sUnit[1]);
        }
    }

    return val;
}

/**
 * do simple interpolation
 * @param  {number|string} sVal
 * @param  {number|string} eVal
 * @param  {number} percent
 * @return {number|string}
 */
function simple(sVal, eVal, percent) {
    var sType = typeof sVal === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(sVal);
    var eType = typeof eVal === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(eVal);
    var val = string(sVal, eVal, sType, eType, percent) || number(sVal, eVal, sType, eType, percent);

    if (val === null || val === undefined) {
        val = hybrid(sVal, eVal, sType, eType, percent) || (percent < 1 ? sVal : eVal);
    }

    return val;
}

function array(sVal, eVal, percent) {
    var deeply = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var val = void 0;

    if (sVal instanceof Array && eVal instanceof Array && sVal.length === eVal.length) {
        val = [];
        var len = eVal.length;

        for (var i = 0; i < len; i++) {
            var v = void 0;
            if (deeply) {
                v = complex(sVal[i], eVal[i], percent, deeply);
            } else {
                v = simple(sVal[i], eVal[i], percent);
            }
            val.push(v);
        }
    }

    return val;
}

function set(sVal, eVal, percent) {
    var deeply = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var val = void 0;

    if (sVal instanceof __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a && eVal instanceof __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a && sVal.size === eVal.size) {
        val = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a();
        var size = eVal.size;
        var sArr = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(sVal));
        var eArr = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(eVal));

        for (var i = 0; i < size; i++) {
            var v = void 0;
            if (deeply) {
                v = complex(sArr[i], eArr[i], percent, deeply);
            } else {
                v = simple(sArr[i], eArr[i], percent);
            }
            val.add(v);
        }
    }

    return val;
}

function map(sVal, eVal, percent) {
    var deeply = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var val = void 0;

    if (sVal instanceof __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a && eVal instanceof __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a) {
        val = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();

        eVal.forEach(function (value, key) {
            var v = void 0;
            if (sVal.has(key) && deeply) {
                v = complex(sVal.get(key), value, percent, deeply);
            } else {
                v = simple(sVal.get(key), value, percent);
            }
            val.set(key, v);
        });
    }

    return val;
}

/**
 * do complicated interpolation, set deeply true if want
 * @param  {number|string|Array|Set|Map} sVal
 * @param  {number|string|Array|Set|Map} eVal
 * @param  {number} percent
 * @param  {boolean} [deeply = false]
 * @return {number|string|Array|Set|Map}
 */
function complex(sVal, eVal, percent) {
    var deeply = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return array(sVal, eVal, percent, deeply) || set(sVal, eVal, percent, deeply) || map(sVal, eVal, percent, deeply) || simple(sVal, eVal, percent, deeply);
}

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mix;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_descriptor__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_descriptor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_descriptor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator__);




/**
 * mix source to target
 * @param {object} target
 * @param {object} source
 */
function mix(target, source) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(source)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
                (function () {

                    var desc = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_descriptor___default()(source, key);
                    var sourceValue = desc.value;

                    var targetValue = sourceValue;
                    if (sourceValue instanceof Function) {
                        targetValue = function targetValue() {
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                args[_key] = arguments[_key];
                            }

                            /* eslint-disable no-invalid-this */
                            var re = sourceValue && sourceValue.apply(this, args);
                            return typeof re !== 'undefined' && re !== this ? re : this;
                            /* eslint-enable no-invalid-this */
                        };
                    }

                    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(target, key, {
                        value: targetValue,
                        configurable: true,
                        enumerable: true
                    });
                })();
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

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromHTMLElement;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_set__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_kebabCase__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_kebabCase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_lodash_kebabCase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash_camelCase__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash_camelCase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_lodash_camelCase__);













var transformKeyWords = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_set___default.a(['translateX', 'translateY', 'translateZ', 'rotateX', 'rotateY', 'rotateZ', 'rotate', 'rotate3d', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY', 'skewZ']);

function appendStyle(id, content) {
    if (!document.getElementById('for-' + id)) {
        var parent = document.querySelector('head') || document.body || document.documentElement;
        var style = document.createElement('style');
        style.textContent = content;
        style.setAttribute('id', 'for-' + id);
        parent.appendChild(style);
    }
}

function fixBackgroundImage(domElement, backgroundImage) {
    var src = void 0;

    var matched = backgroundImage.match(/url\(["']?([^()]+)["']?\)/);
    if (matched) {
        src = matched[1];
    }

    if (src) {
        var key = 'img-' + encodeURIComponent(src);
        if (domElement.getAttribute('img-hash') !== key) {
            domElement.setAttribute('img-hash', key);
            appendStyle(key, '\n                [img-hash="' + key + '"] {\n                    background-image: url(' + src + ')!important;\n                }\n            ');
        }
    }
}

var HTMLElementProxy = function (_Map) {
    __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default()(HTMLElementProxy, _Map);

    function HTMLElementProxy(element) {
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, HTMLElementProxy);

        var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (HTMLElementProxy.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(HTMLElementProxy)).call(this));

        _this._element = element;
        _this._initialCssText = _this._element.style.cssText;
        _this._computedStyle = getComputedStyle(element);
        if (_this._computedStyle.transform !== 'none' && _this._computedStyle.transform !== undefined) {
            // eslint-disable-next-line
            console.warn('Do Not Support An Element With Inital Transform Value Yet!');
        }
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(HTMLElementProxy, [{
        key: 'get',
        value: function get(name) {
            name = __WEBPACK_IMPORTED_MODULE_11_lodash_camelCase___default()(name);
            if (__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(HTMLElementProxy.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(HTMLElementProxy.prototype), 'has', this).call(this, name)) {
                return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(HTMLElementProxy.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(HTMLElementProxy.prototype), 'get', this).call(this, name);
            } else {
                return this._computedStyle[name];
            }
        }
    }, {
        key: 'set',
        value: function set(name, value) {
            name = __WEBPACK_IMPORTED_MODULE_11_lodash_camelCase___default()(name);
            __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(HTMLElementProxy.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(HTMLElementProxy.prototype), 'set', this).call(this, name, value);
            return this;
        }
    }, {
        key: 'has',
        value: function has(name) {
            return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(HTMLElementProxy.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(HTMLElementProxy.prototype), 'has', this).call(this, name) || this._computedStyle[name] !== undefined;
        }
    }, {
        key: 'flush',
        value: function flush() {
            var _this2 = this;

            var transformText = [];
            var cssText = [];
            var keys = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(this.keys()));
            keys.filter(function (key) {
                if (transformKeyWords.has(key)) {
                    transformText.push(key + '(' + __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(HTMLElementProxy.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(HTMLElementProxy.prototype), 'get', _this2).call(_this2, key) + ')');
                    return false;
                }
                if (key === 'backgroundImage') {
                    fixBackgroundImage(_this2._element, __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(HTMLElementProxy.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(HTMLElementProxy.prototype), 'get', _this2).call(_this2, key));
                    return false;
                }
                return true;
            }).forEach(function (key) {
                cssText.push(__WEBPACK_IMPORTED_MODULE_10_lodash_kebabCase___default()(key) + ':' + __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(HTMLElementProxy.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(HTMLElementProxy.prototype), 'get', _this2).call(_this2, key));
            });
            if (this._initialCssText) {
                cssText.unshift(this._initialCssText);
            }
            if (transformText.length > 0) {
                cssText.push('-webkit-transform:' + transformText.join(' '));
                cssText.push('transform:' + transformText.join(' '));
            }
            this._element.style.cssText = cssText.join(';');
        }
    }]);

    return HTMLElementProxy;
}(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_map___default.a);

var cacheKey = '__html_element_proxy_to_map__';
function fromHTMLElement(element) {
    if (!element.hasOwnProperty(cacheKey)) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(element, cacheKey, {
            value: new HTMLElementProxy(element),
            enumerable: false
        });
    }
    return element[cacheKey];
}

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__libs_event__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__libs_math__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__libs_interpolation__ = __webpack_require__(98);













/**
 * @class Animation
 * @extends {Event}
 */

var Animation = function (_Event) {
    __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default()(Animation, _Event);

    /**
     * create a animation
     * @param  {Map} map a key-value map
     * @param  {Effect} effect a effect that includes all keyframes
     * @param  {number} [iteration=1] a iteration count for animation
     */
    function Animation(map, effect) {
        var iteration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, Animation);

        var _this = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Animation.__proto__ || __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default()(Animation)).call(this));

        _this._initial = new __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_map___default.a();
        _this._current = map;

        _this._keyframes = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(effect.end().keyframes));
        _this._frameIndex = 0;
        _this._keyframe = null;
        _this._frameDuration = [0];
        _this._duration = 0;

        _this._keyframes.forEach(function (keyframe) {
            var duration = (keyframe.delay + keyframe.duration) * keyframe.iteration;
            _this._duration += duration;
            _this._frameDuration.push(duration);
        });

        _this._started = false;
        _this._finished = false;

        _this._iteration = iteration;
        _this._repeated = 0;

        _this._beforePlay = null;
        _this._afterPlay = null;
        return _this;
    }

    /**
     * the status if started
     * @return {boolean}
     */


    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(Animation, [{
        key: '_initKeyframe',
        value: function _initKeyframe(keyframe) {
            var _this2 = this;

            var start = new __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_map___default.a();
            var end = new __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_map___default.a();

            var map = keyframe.map,
                update = keyframe.update,
                easing = keyframe.easing,
                delay = keyframe.delay,
                duration = keyframe.duration,
                fillMode = keyframe.fillMode,
                iteration = keyframe.iteration,
                direction = keyframe.direction;


            map.forEach(function (endValue, name) {
                var startValue = void 0;

                if (_this2._current.has(name)) {
                    startValue = _this2._current.get(name);
                }

                if (!_this2._initial.has(name)) {
                    _this2._initial.set(name, startValue);
                }

                start.set(name, startValue);
                end.set(name, endValue);
            });

            var elapsed = 0;
            var repeated = 0;

            return {
                start: start,
                end: end,
                delay: delay,
                duration: duration,
                fillMode: fillMode,
                update: update,
                iteration: iteration,
                repeated: repeated,
                direction: direction,
                easing: easing,
                elapsed: elapsed
            };
        }

        /**
         * change the status to started
         * @event emit start
         * @return {Animation} current context
         */

    }, {
        key: 'start',
        value: function start() {
            if (!this._started) {
                this._started = true;
                this.emit('start');
            }
            return this;
        }

        /**
         * reset the animation
         * @return {Animation} current context
         */

    }, {
        key: 'reset',
        value: function reset() {
            // this._current.clear();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(this._initial), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_step.value, 2),
                        key = _step$value[0],
                        value = _step$value[1];

                    this._current.set(key, value);
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

            this._frameIndex = 0;
            this._keyframe = null;
            this._started = false;
            this._finished = false;
            this._beforePlay = null;
            this._afterPlay = null;

            return this;
        }

        /**
         * reset and change the status to started
         * @event emit restart
         * @return {Animation} current context
         */

    }, {
        key: 'restart',
        value: function restart() {
            if (this._started) {
                this.reset();
                this._started = true;
                this.emit('restart');
            }
            return this;
        }

        /**
         * change the status to finish
         * @event emit finish
         * @return {Animation} current context
         */

    }, {
        key: 'finish',
        value: function finish() {
            if (!this._finished) {
                this._finished = true;
                this.emit('finish');
            }
            return this;
        }
    }, {
        key: '_play',
        value: function _play(clock) {
            var _this3 = this;

            if (!this._keyframe) {
                var keyframe = this._keyframes[this._frameIndex];
                this._keyframe = this._initKeyframe(keyframe);
            }

            this._keyframe.elapsed += clock.delta;

            var _keyframe = this._keyframe,
                start = _keyframe.start,
                end = _keyframe.end,
                delay = _keyframe.delay,
                duration = _keyframe.duration,
                fillMode = _keyframe.fillMode,
                update = _keyframe.update,
                iteration = _keyframe.iteration,
                direction = _keyframe.direction,
                easing = _keyframe.easing;


            var time = Math.min(this._keyframe.elapsed - delay, duration);

            if (time >= 0) {
                var percent = 1;

                if (duration !== 0) {
                    percent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__libs_math__["b" /* accuracy */])(easing(time / duration));
                }

                end.forEach(function (eVal, name) {
                    var sVal = start.get(name) || 0;
                    var val = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__libs_interpolation__["a" /* complex */])(sVal, eVal, percent);
                    _this3._current.set(name, val);
                });

                if (update) {
                    update(this._current, start, end, percent);
                }

                if (this._current.flush) {
                    this._current.flush();
                }

                if (time === duration) {
                    this._keyframe.repeated++;

                    if (this._keyframe.repeated < iteration) {
                        this._keyframe.elapsed = 0;
                        if (direction === 'normal') {
                            this._keyframe.start = start;
                            this._keyframe.end = end;
                        } else if (direction === 'alternate') {
                            this._keyframe.start = end;
                            this._keyframe.end = start;
                        }

                        this._beforePlay = function () {
                            return _this3._keyframe.start.forEach(function (val, name) {
                                return _this3._current.set(name, val);
                            });
                        };
                    } else {
                        if (fillMode === 'backward') {
                            throw new Error('not support "backward" fill-mode yet!');
                        } else {
                            this._keyframe = null;
                            this._frameIndex++;
                        }
                    }
                }
            }
        }

        /**
         * request one frame of animation with a certain clock
         * @event emit beforeplay/play/afterplay
         * @param  {Clock} clock a clock from render
         * @return {Animation} current context
         */

    }, {
        key: 'requestFrame',
        value: function requestFrame(clock) {
            var _this4 = this;

            if (!this._started || this._finished || !this._keyframes.length) {
                return this;
            }

            // for (let i = this._frameIndex; i < this._frameDuration.length; i++) {
            //     if (clock.elapsed <= this._frameDuration[i]) {
            //         break;
            //     } else {
            //         this._frameIndex = i;
            //     }
            // }

            this.emit('beforeplay');
            if (this._beforePlay) {
                this._beforePlay();
                this._beforePlay = null;
            }

            this.emit('play');
            this._play(clock);

            this.emit('afterplay');
            if (this._afterPlay) {
                this._afterPlay();
                this._afterPlay = null;
            }

            if (this._frameIndex === this._keyframes.length) {
                this._repeated++;

                if (this._repeated < this._iteration) {
                    this._beforePlay = function () {
                        return _this4.restart();
                    };
                    return this;
                }

                this.finish();
            }

            return this;
        }
    }, {
        key: 'started',
        get: function get() {
            return this._started;
        }

        /**
         * the status if finished
         * @return {boolean}
         */

    }, {
        key: 'finished',
        get: function get() {
            return this._finished;
        }

        /**
         * the repeat count of the animation
         * @return {number}
         */

    }, {
        key: 'repeated',
        get: function get() {
            return this._repeated;
        }

        /**
         * the current map
         * @return {Map}
         */

    }, {
        key: 'current',
        get: function get() {
            return this._current;
        }

        /**
         * the duration of whole animation
         * @return {number}
         */

    }, {
        key: 'duration',
        get: function get() {
            return this._duration;
        }

        /**
         * get the iteration of whole animation
         * @return {number}
         */

    }, {
        key: 'iteration',
        get: function get() {
            return this._iteration;
        }

        /**
         * set the iteration of whole animation
         * @param {number} n the number of iteration
         */
        ,
        set: function set(n) {
            this._iteration = n;
        }
    }]);

    return Animation;
}(__WEBPACK_IMPORTED_MODULE_9__libs_event__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Animation);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_copy__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libs_mix__ = __webpack_require__(99);







/**
 * @class Effect
 */

var Effect = function () {
    /**
     * create a effect
     * @return {Effect}
     */
    function Effect() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Effect);

        this.keyframes = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a();
    }

    /**
     * add key frames to effect
     * @param {object} options
     * @param {Map<string, any>} options.map
     * @param {Function} [options.update]
     * @param {Function} [options.easing]
     * @param {number} [options.delay = 0]
     * @param {number} [options.duration = 0]
     * @param {string} [options.fillMode = "forwards"]
     * @param {number} [options.iteration = 0]
     * @param {string} [options.direction = "normal"]
     * @return {Effect} self-context
     */


    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Effect, [{
        key: 'add',
        value: function add(_ref) {
            var map = _ref.map,
                update = _ref.update,
                _ref$easing = _ref.easing,
                easing = _ref$easing === undefined ? function (i) {
                return i;
            } : _ref$easing,
                _ref$delay = _ref.delay,
                delay = _ref$delay === undefined ? 0 : _ref$delay,
                _ref$duration = _ref.duration,
                duration = _ref$duration === undefined ? 0 : _ref$duration,
                _ref$fillMode = _ref.fillMode,
                fillMode = _ref$fillMode === undefined ? 'forwards' : _ref$fillMode,
                _ref$iteration = _ref.iteration,
                iteration = _ref$iteration === undefined ? 1 : _ref$iteration,
                _ref$direction = _ref.direction,
                direction = _ref$direction === undefined ? 'normal' : _ref$direction;

            if (typeof map === 'undefined') {
                throw new Error('"map" is required');
            }

            this.keyframes.add({
                map: map,
                update: update,
                easing: easing,
                delay: delay,
                duration: duration,
                fillMode: fillMode,
                iteration: iteration,
                direction: direction
            });

            return this;
        }

        /** clear the effect */

    }, {
        key: 'clear',
        value: function clear() {
            this.keyframes.clear();
            return this;
        }

        /**
         * clone the effect
         * @return {Effect} cloned effect object
         */

    }, {
        key: 'clone',
        value: function clone() {
            var target = new Effect();
            var source = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__libs_copy__["a" /* default */])(this, true);
            for (var attr in source) {
                target[attr] = source[attr];
            }
            return source;
        }

        /**
         * end the effect
         */

    }, {
        key: 'end',
        value: function end() {
            return this;
        }
    }]);

    return Effect;
}();

/* harmony default export */ __webpack_exports__["a"] = (Effect);


Effect.use = function () {
    for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(mixins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var mixin = _step.value;

            if (typeof mixin === 'function') {
                mixin = mixin();
            }
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__libs_mix__["a" /* default */])(Effect.prototype, mixin);
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

    return Effect;
};

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__libs_event__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ticker__ = __webpack_require__(66);









/**
 * @class Timeline
 */

var Timeline = function (_Event) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Timeline, _Event);

    /**
     * create a timeline
     * @param {Ticker} [ticker]
     * @return {Timeline}
     */
    function Timeline(ticker) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Timeline);

        var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Timeline.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Timeline)).call(this));

        _this._ticker = ticker || new __WEBPACK_IMPORTED_MODULE_7__ticker__["a" /* default */]();

        _this._ticker.run(); // always be runing

        _this._animations = new __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_map___default.a();

        _this._controls = false; // for debugger

        _this._currentTime = 0;

        _this._loop = false;

        _this._paused = true;

        _this._ended = false;

        _this._playbackRate = 1; // hold on

        _this._playbackId = 0; // initial the id
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Timeline, [{
        key: 'add',


        /**
         * add a animation with some option
         * @param {Animation|Array<Animation>} animations
         * @param {{playAt:number|Function, stopAt:number|Function}} [option]
         */
        value: function add(animations) {
            var _this2 = this;

            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (!(animations instanceof Array)) {
                animations = [animations];
            }

            this._paused = false;
            this._ended = false;

            animations.forEach(function (animation) {
                return _this2._animations.set(animation, option);
            });
            return this;
        }

        /**
         * get option by a certain animation
         * @param  {Animation} animation
         * @return {Object} the option of animaiton
         */

    }, {
        key: 'get',
        value: function get(animation) {
            return this._animations.get(animation);
        }

        /**
         * remove a animation
         * @param  {Animation|Array<Animation>} animations
         * @return {Timeline} current context
         */

    }, {
        key: 'remove',
        value: function remove(animations) {
            var _this3 = this;

            if (!(animations instanceof Array)) {
                animations = [animations];
            }

            animations.forEach(function (animation) {
                _this3._animations.delete(animation);
                animation.finish();
            });
            return this;
        }

        /**
         * clear all animations
         * @return {Timeline} current context
         */

    }, {
        key: 'clear',
        value: function clear() {
            this._animations.forEach(function (option, animation) {
                animation.finish();
            });
            this._animations.clear();
            return this;
        }

        /**
         * seek the timeline with a given time
         * @throws {Error} not available
         */

    }, {
        key: 'seek',
        value: function seek() {
            throw new Error('not available');
        }

        /**
         * play the timeline. if the timeline is paused, then countinue to play.
         * if the timeline is ended, nothing happend.
         * @return {Timeline} current context
         */

    }, {
        key: 'play',
        value: function play() {
            var _this4 = this;

            if (this._ended) {
                return this;
            }

            if (!this._playbackId) {
                this._playbackId = this._ticker.add(function (clock) {
                    return _this4._playback(clock);
                });
            } else if (this._paused) {
                this._ticker.unfreeze(this._playbackId);
            }

            this._paused = false;

            return this;
        }

        /**
         * pause the timeline when playing
         * @return {Timeline} current context
         */

    }, {
        key: 'pause',
        value: function pause() {
            if (this._paused || this._ended) {
                return this;
            }

            this._paused = true;
            this._ticker.freeze(this._playbackId);

            return this;
        }

        /**
         * stop the timeline.
         * @return {Timeline} current context
         */

    }, {
        key: 'stop',
        value: function stop() {
            this._ticker.remove(this._playbackId);
            this._playbackId = 0;

            this._animations.forEach(function (option, animation) {
                animation.finish();
            });
            this._paused = false;
            this._ended = true;
            return this;
        }

        /**
         * replay the timeline
         * @return {Timeline} current context
         */

    }, {
        key: 'replay',
        value: function replay() {
            var _this5 = this;

            this._ticker.remove(this._playbackId);

            this._animations.forEach(function (option, animation) {
                animation.finish();
                animation.reset();
            });
            this._paused = false;
            this._ended = false;
            this._playbackId = this._ticker.add(function (clock) {
                return _this5._playback(clock);
            });
            return this;
        }
    }, {
        key: '_playback',
        value: function _playback(_ref) {
            var _this6 = this;

            var elapsed = _ref.elapsed,
                delta = _ref.delta;

            this._currentTime = elapsed;

            this.emit('play');

            var isAllFinished = true;
            this._animations.forEach(function (option, animation) {
                if (animation.finished) {
                    return;
                }

                var playAt = option.playAt,
                    stopAt = option.stopAt;

                var startTime = typeof playAt === 'function' ? playAt(option) : playAt || true;
                var endTime = typeof stopAt === 'function' ? stopAt(option) : stopAt;

                if (!animation.started) {
                    if (typeof startTime === 'boolean' && startTime || typeof startTime === 'number' && elapsed >= startTime) {
                        option.delta = 0;
                        option.elapsed = 0;

                        animation.once('start', function () {
                            return option.startAt = _this6._currentTime;
                        });
                        animation.once('finish', function () {
                            return option.finishAt = _this6._currentTime;
                        });
                        animation.start();
                        animation.requestFrame(option);
                    }
                } else {
                    option.delta = delta;
                    option.elapsed += elapsed;
                    animation.requestFrame(option);
                }

                if (typeof endTime === 'boolean' && endTime || typeof endTime === 'number' && elapsed >= endTime) {
                    animation.finish();
                }

                isAllFinished &= animation.finished;
            });

            this.emit('afterplay');

            if (isAllFinished) {
                if (this._loop) {
                    this.replay();
                    this.emit('loop');
                } else {
                    this.stop();
                    this.emit('end');
                }
            }

            return this;
        }
    }, {
        key: 'currentTime',
        get: function get() {
            return this._currentTime;
        }
    }, {
        key: 'loop',
        get: function get() {
            return this._loop;
        },
        set: function set(v) {
            this._loop = Boolean(v);
        }
    }, {
        key: 'paused',
        get: function get() {
            return this._paused;
        }
    }, {
        key: 'ended',
        get: function get() {
            return this._ended;
        }
    }, {
        key: 'skipFrames',
        get: function get() {
            return this._ticker.skipFrames;
        },
        set: function set(n) {
            this._ticker.skipFrames = Number(n);
        }
    }]);

    return Timeline;
}(__WEBPACK_IMPORTED_MODULE_6__libs_event__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Timeline);

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(119), __esModule: true };

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30);
__webpack_require__(143);
module.exports = __webpack_require__(2).Array.from;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(30);
module.exports = __webpack_require__(141);

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(30);
module.exports = __webpack_require__(142);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(145);
var $Object = __webpack_require__(2).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(146);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperties(T, D){
  return $Object.defineProperties(T, D);
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(147);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
var $Object = __webpack_require__(2).Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
module.exports = __webpack_require__(2).Object.getPrototypeOf;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
module.exports = __webpack_require__(2).Object.keys;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(151);
module.exports = __webpack_require__(2).Object.setPrototypeOf;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(153);
__webpack_require__(152);
__webpack_require__(154);
__webpack_require__(155);
module.exports = __webpack_require__(2).Symbol;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30);
__webpack_require__(50);
module.exports = __webpack_require__(49).f('iterator');

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14)
  , toLength  = __webpack_require__(78)
  , toIndex   = __webpack_require__(140);
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

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(13)
  , createDesc      = __webpack_require__(26);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(25)
  , gOPS    = __webpack_require__(74)
  , pIE     = __webpack_require__(41);
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

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12).document && document.documentElement;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(34);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(20)
  , ITERATOR   = __webpack_require__(5)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(34);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(39)
  , descriptor     = __webpack_require__(26)
  , setToStringTag = __webpack_require__(43)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(19)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(5)('iterator')
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

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(25)
  , toIObject = __webpack_require__(14);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(29)('meta')
  , isObject = __webpack_require__(24)
  , has      = __webpack_require__(18)
  , setDesc  = __webpack_require__(13).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(23)(function(){
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

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(14)
  , gOPN      = __webpack_require__(73).f
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


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(24)
  , anObject = __webpack_require__(17);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(35)(Function.call, __webpack_require__(40).f(Object.prototype, '__proto__').set, 2);
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

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46)
  , defined   = __webpack_require__(36);
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

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(17)
  , get      = __webpack_require__(79);
module.exports = __webpack_require__(2).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(68)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(20);
module.exports = __webpack_require__(2).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(35)
  , $export        = __webpack_require__(11)
  , toObject       = __webpack_require__(28)
  , call           = __webpack_require__(131)
  , isArrayIter    = __webpack_require__(129)
  , toLength       = __webpack_require__(78)
  , createProperty = __webpack_require__(125)
  , getIterFn      = __webpack_require__(79);

$export($export.S + $export.F * !__webpack_require__(133)(function(iter){ Array.from(iter); }), 'Array', {
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


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(123)
  , step             = __webpack_require__(134)
  , Iterators        = __webpack_require__(20)
  , toIObject        = __webpack_require__(14);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(71)(Array, 'Array', function(iterated, kind){
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

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(11)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(39)});

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(11);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(10), 'Object', {defineProperties: __webpack_require__(72)});

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(11);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(10), 'Object', {defineProperty: __webpack_require__(13).f});

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(14)
  , $getOwnPropertyDescriptor = __webpack_require__(40).f;

__webpack_require__(42)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(28)
  , $getPrototypeOf = __webpack_require__(75);

__webpack_require__(42)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(28)
  , $keys    = __webpack_require__(25);

__webpack_require__(42)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(11);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(138).set});

/***/ }),
/* 152 */
/***/ (function(module, exports) {



/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(12)
  , has            = __webpack_require__(18)
  , DESCRIPTORS    = __webpack_require__(10)
  , $export        = __webpack_require__(11)
  , redefine       = __webpack_require__(77)
  , META           = __webpack_require__(136).KEY
  , $fails         = __webpack_require__(23)
  , shared         = __webpack_require__(45)
  , setToStringTag = __webpack_require__(43)
  , uid            = __webpack_require__(29)
  , wks            = __webpack_require__(5)
  , wksExt         = __webpack_require__(49)
  , wksDefine      = __webpack_require__(48)
  , keyOf          = __webpack_require__(135)
  , enumKeys       = __webpack_require__(126)
  , isArray        = __webpack_require__(130)
  , anObject       = __webpack_require__(17)
  , toIObject      = __webpack_require__(14)
  , toPrimitive    = __webpack_require__(47)
  , createDesc     = __webpack_require__(26)
  , _create        = __webpack_require__(39)
  , gOPNExt        = __webpack_require__(137)
  , $GOPD          = __webpack_require__(40)
  , $DP            = __webpack_require__(13)
  , $keys          = __webpack_require__(25)
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
  __webpack_require__(73).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(41).f  = $propertyIsEnumerable;
  __webpack_require__(74).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(38)){
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(19)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('asyncIterator');

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('observable');

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var mat4RotateX = __webpack_require__(175);
var mat4RotateY = __webpack_require__(176);
var mat4RotateZ = __webpack_require__(177);
var mat4Rotate = __webpack_require__(174);
var mat4Scale = __webpack_require__(178);
var mat4Translate = __webpack_require__(179);
var mat4Multiply = __webpack_require__(173);

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

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d        = __webpack_require__(158)
  , callable = __webpack_require__(168)

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


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(160)
  , normalizeOpts = __webpack_require__(167)
  , isCallable    = __webpack_require__(163)
  , contains      = __webpack_require__(170)

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


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(161)()
	? Object.assign
	: __webpack_require__(162);


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(164)
  , value = __webpack_require__(169)
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
 return typeof obj === "function";
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(165)()
	? Object.keys
	: __webpack_require__(166);


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
 return false;
}
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(51);

var keys = Object.keys;

module.exports = function (object) {
	return keys(isValue(object) ? Object(object) : object);
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(51);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(51);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(171)()
	? String.prototype.contains
	: __webpack_require__(172);


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return (str.contains("dwa") === true) && (str.contains("foo") === false);
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 173 */
/***/ (function(module, exports) {

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

/***/ }),
/* 174 */
/***/ (function(module, exports) {

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

/***/ }),
/* 175 */
/***/ (function(module, exports) {

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

/***/ }),
/* 176 */
/***/ (function(module, exports) {

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

/***/ }),
/* 177 */
/***/ (function(module, exports) {

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

/***/ }),
/* 178 */
/***/ (function(module, exports) {

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

/***/ }),
/* 179 */
/***/ (function(module, exports) {

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

/***/ }),
/* 180 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 181 */
/***/ (function(module, exports) {

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
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),
/* 182 */
/***/ (function(module, exports) {

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


/***/ }),
/* 183 */
/***/ (function(module, exports) {

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


/***/ }),
/* 184 */
/***/ (function(module, exports) {

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


/***/ }),
/* 185 */
/***/ (function(module, exports) {

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


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(52),
    arrayMap = __webpack_require__(180),
    isArray = __webpack_require__(201),
    isSymbol = __webpack_require__(203);

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
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(185);

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


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var castSlice = __webpack_require__(187),
    hasUnicode = __webpack_require__(82),
    stringToArray = __webpack_require__(197),
    toString = __webpack_require__(31);

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


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var basePropertyOf = __webpack_require__(184);

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


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(212)))

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(195);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(52);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 193 */
/***/ (function(module, exports) {

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


/***/ }),
/* 194 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 195 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(190);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var asciiToArray = __webpack_require__(182),
    hasUnicode = __webpack_require__(82),
    unicodeToArray = __webpack_require__(198);

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


/***/ }),
/* 198 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
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


/***/ }),
/* 199 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
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
    rsCombo = '[' + rsComboRange + ']',
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
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
    rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
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


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var deburrLetter = __webpack_require__(189),
    toString = __webpack_require__(31);

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

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


/***/ }),
/* 201 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var isObjectLike = __webpack_require__(53),
    isPlainObject = __webpack_require__(84);

/**
 * Checks if `value` is likely a DOM element.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

module.exports = isElement;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(80),
    isObjectLike = __webpack_require__(53);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

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
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var createCaseFirst = __webpack_require__(188);

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


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var asciiWords = __webpack_require__(183),
    hasUnicodeWord = __webpack_require__(193),
    toString = __webpack_require__(31),
    unicodeWords = __webpack_require__(199);

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


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(213)))

/***/ }),
/* 207 */
/***/ (function(module, exports) {

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

/***/ }),
/* 208 */
/***/ (function(module, exports) {

function expand(hex) {
  var result = "#";

  for (var i = 1; i < hex.length; i++) {
    var val = hex.charAt(i);
    result += val + val;
  }

  return result;
}

function hex(hex) {
  // #RGB or #RGBA
  if(hex.length === 4 || hex.length === 5) {
    hex = expand(hex);
  }

  var rgb = [
    parseInt(hex.substring(1,3), 16),
    parseInt(hex.substring(3,5), 16),
    parseInt(hex.substring(5,7), 16)
  ];

  // #RRGGBBAA
  if (hex.length === 9) {
    var alpha = parseFloat((parseInt(hex.substring(7,9), 16) / 255).toFixed(2));
    rgb.push(alpha);
  }

  return rgb;
}

module.exports = hex;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var extractComponents = __webpack_require__(87);
var clamp = __webpack_require__(88);

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

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var hsl = __webpack_require__(209);
var hex = __webpack_require__(208);
var rgb = __webpack_require__(211);
var hsl2rgb = __webpack_require__(86);

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

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var extractComponents = __webpack_require__(87);
var clamp = __webpack_require__(88);

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

/***/ }),
/* 212 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 213 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = generateStyle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_vec3__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_math__ = __webpack_require__(33);






function transformCoords(position, canvasSize) {
    var x = canvasSize.width / 2;
    var y = canvasSize.height / 2;
    var vec3 = new __WEBPACK_IMPORTED_MODULE_3__libs_vec3__["a" /* default */](x, y, position.z);
    vec3.add([position.x, -position.y, 0]);
    return vec3;
}

var PxValueRegEx = /[-\d\.]+px/g;

function scalingStyleValue(styleMap, scale) {
    styleMap.forEach(function (value, name) {
        if (typeof value === 'string') {
            var matched = value.match(PxValueRegEx);
            if (matched) {
                matched.forEach(function (n) {
                    var v = parseFloat(n) * scale;
                    value = value.replace(n, v + 'px');
                });
                styleMap.set(name, value);
            }
        }
    });
}

function generateRectangleStyle(element, canvasSize) {
    var _element$getBoundingR = element.getBoundingRect(),
        width = _element$getBoundingR.width,
        height = _element$getBoundingR.height,
        left = _element$getBoundingR.left,
        top = _element$getBoundingR.top;

    var _transformCoords = transformCoords(new __WEBPACK_IMPORTED_MODULE_3__libs_vec3__["a" /* default */](left, top), canvasSize),
        x = _transformCoords.x,
        y = _transformCoords.y;

    var map = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a([['overflow', 'hidden'], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px']]);
    if (element.position.z) {
        map.set('z-index', '' + element.position.z);
    }
    return map;
}

function generateCircleStyle(element, canvasSize) {
    var radius = element.radius;

    var _element$getBoundingR2 = element.getBoundingRect(),
        width = _element$getBoundingR2.width,
        height = _element$getBoundingR2.height,
        left = _element$getBoundingR2.left,
        top = _element$getBoundingR2.top;

    var _transformCoords2 = transformCoords(new __WEBPACK_IMPORTED_MODULE_3__libs_vec3__["a" /* default */](left, top), canvasSize),
        x = _transformCoords2.x,
        y = _transformCoords2.y;

    var map = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a([['overflow', 'hidden'], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px'], ['clip-path', 'circle(' + radius + 'px)']]);
    if (element.position.z) {
        map.set('z-index', '' + element.position.z);
    }
    return map;
}

function generateEllipseStyle(element, canvasSize) {
    var hRadius = element.hRadius,
        vRadius = element.vRadius;

    var _element$getBoundingR3 = element.getBoundingRect(),
        width = _element$getBoundingR3.width,
        height = _element$getBoundingR3.height,
        left = _element$getBoundingR3.left,
        top = _element$getBoundingR3.top;

    var _transformCoords3 = transformCoords(new __WEBPACK_IMPORTED_MODULE_3__libs_vec3__["a" /* default */](left, top), canvasSize),
        x = _transformCoords3.x,
        y = _transformCoords3.y;

    var map = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a([['overflow', 'hidden'], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px'], ['clip-path', 'ellipse(' + hRadius + 'px ' + vRadius + 'px)']]);
    if (element.position.z) {
        map.set('z-index', '' + element.position.z);
    }
    return map;
}

function generateTriangleStyle(element, canvasSize) {
    var theta = element.theta;

    var _element$getBoundingR4 = element.getBoundingRect(),
        width = _element$getBoundingR4.width,
        height = _element$getBoundingR4.height,
        left = _element$getBoundingR4.left,
        top = _element$getBoundingR4.top;

    var _transformCoords4 = transformCoords(new __WEBPACK_IMPORTED_MODULE_3__libs_vec3__["a" /* default */](left, top), canvasSize),
        x = _transformCoords4.x,
        y = _transformCoords4.y;

    var map = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a([['overflow', 'hidden'], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px'], ['clip-path', 'polygon(0px ' + height + 'px, ' + width + 'px ' + height + 'px, ' + height / Math.tan(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__libs_math__["a" /* deg2rad */])(theta)) + 'px 0px)']]);
    if (element.position.z) {
        map.set('z-index', '' + element.position.z);
    }
    return map;
}

function generateGroupStyle(element, canvasSize) {
    var _element$getBoundingR5 = element.getBoundingRect(),
        width = _element$getBoundingR5.width,
        height = _element$getBoundingR5.height,
        left = _element$getBoundingR5.left,
        top = _element$getBoundingR5.top;

    var _transformCoords5 = transformCoords(new __WEBPACK_IMPORTED_MODULE_3__libs_vec3__["a" /* default */](left, top), canvasSize),
        x = _transformCoords5.x,
        y = _transformCoords5.y;

    var overflow = 'visible';
    if (width && height) {
        overflow = 'hidden';
    }

    var map = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a([['overflow', overflow], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px']]);
    if (element.position.z) {
        map.set('z-index', '' + element.position.z);
    }
    return map;
}

function generateFontStyle(element, canvasSize) {
    var _element$getBoundingR6 = element.getBoundingRect(),
        width = _element$getBoundingR6.width,
        height = _element$getBoundingR6.height,
        left = _element$getBoundingR6.left,
        top = _element$getBoundingR6.top;

    var _transformCoords6 = transformCoords(new __WEBPACK_IMPORTED_MODULE_3__libs_vec3__["a" /* default */](left, top), canvasSize),
        x = _transformCoords6.x,
        y = _transformCoords6.y;

    var _element$textAlign$sp = element.textAlign.split(' '),
        _element$textAlign$sp2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default()(_element$textAlign$sp, 2),
        hAlign = _element$textAlign$sp2[0],
        vAlign = _element$textAlign$sp2[1];

    var lineHeight = void 0;

    if (!element.style.has('line-height')) {
        var fontSize = parseInt(element.style.get('font-size'));

        switch (vAlign) {
            case 'center':
                lineHeight = height;
                break;
            case 'bottom':
                lineHeight = height * 2 - fontSize;
                break;
            case 'top':
            default:
                lineHeight = fontSize;
                break;
        }
    } else {
        lineHeight = element.style.get('line-height');
    }

    var map = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a([['overflow', 'visible'], ['text-align', hAlign], ['line-height', lineHeight + 'px'], ['width', width + 'px'], ['height', height + 'px'], ['left', x + 'px'], ['top', y + 'px']]);
    if (element.position.z) {
        map.set('z-index', '' + element.position.z);
    }
    return map;
}

function generateStyle(element, canvasSize) {
    var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var matrix = element.transform.toMatrix(function (item) {
        if (['translateY', 'rotateZ', 'skewY'].indexOf(item[0]) > -1) {
            var unit = String(item[1]).match(/^([\d\.\-]+)([a-z%]+)?$/);
            if (unit) {
                item[1] = -parseFloat(unit[1]) + (unit[2] || '');
            }
        }

        return item;
    });

    if (scale !== 1) {
        matrix[12] /= scale;
        matrix[13] /= scale;
    }

    var matrixText = 'matrix3d(' + matrix.join(',') + ')';
    var commonStyle = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a([['box-sizing', 'border-box'], ['position', 'absolute'], ['-webkit-transform', matrixText], ['-ms-transform', matrixText], ['-moz-transform', matrixText], ['transform', matrixText], ['-webkit-transform-origin', '50% 50% 0'], ['-ms-transform-origin', '50% 50% 0'], ['-moz-transform-origin', '50% 50% 0'], ['transform-origin', '50% 50% 0'], ['will-change', 'auto']]);

    var customStyle = element.style.normalize();

    var shapeStyle = void 0;

    switch (element.className) {
        case 'Circle':
            shapeStyle = generateCircleStyle(element, canvasSize);
            break;
        case 'Ellipse':
            shapeStyle = generateEllipseStyle(element, canvasSize);
            break;
        case 'Triangle':
            shapeStyle = generateTriangleStyle(element, canvasSize);
            break;
        case 'Group':
            shapeStyle = generateGroupStyle(element, canvasSize);
            break;
        case 'Font':
            shapeStyle = generateFontStyle(element, canvasSize);
            break;
        case 'SmartImage':
        case 'Rectangle':
        default:
            shapeStyle = generateRectangleStyle(element, canvasSize);
            break;
    }

    var styleMap = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a([].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(commonStyle), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(customStyle), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(shapeStyle)));

    if (scale !== 1) {
        scalingStyleValue(styleMap, 1 / scale);
    }

    return styleMap;
}

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_gl_vec3_create__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_gl_vec3_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_gl_vec3_create__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_gl_vec3_add__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_gl_vec3_add___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_gl_vec3_add__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_gl_vec3_copy__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_gl_vec3_copy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_gl_vec3_copy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_gl_vec3_set__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_gl_vec3_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_gl_vec3_set__);







function normalizeArgument() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    return [x, y, z];
}

/**
 * a vector
 */

var Vec3 = function () {
    /**
     * create a vec3
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     */
    function Vec3() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Vec3);

        /**
         * if modified
         * @type {Boolean}
         */
        this.modified = false;

        __WEBPACK_IMPORTED_MODULE_4_gl_vec3_copy___default()(this, __WEBPACK_IMPORTED_MODULE_2_gl_vec3_create___default()());
        this.set(x, y, z);
    }

    /**
     * get x of position
     * @type {number}
     */


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Vec3, [{
        key: 'add',


        /**
         * add a vec3
         * @param {Vec3|Float32Array<number>} vec3
         * @return {Vec3} the current context
         */
        value: function add(vec3) {
            vec3 = normalizeArgument(vec3[0], vec3[1], vec3[2]);
            this.modified = true;
            return __WEBPACK_IMPORTED_MODULE_3_gl_vec3_add___default()(this, this, vec3);
        }

        /**
         * set x, y, z
         * @param {...number} xyz
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
            return __WEBPACK_IMPORTED_MODULE_5_gl_vec3_set___default.a.apply(undefined, [this].concat(xyz));
        }
    }, {
        key: 'x',
        get: function get() {
            return this[0];
        }

        /**
         * set x of position
         * @type {number}
         */
        ,
        set: function set(v) {
            this.set(v);
        }

        /**
         * get y of position
         * @type {number}
         */

    }, {
        key: 'y',
        get: function get() {
            return this[1];
        }

        /**
         * set y of position
         * @type {number}
         */
        ,
        set: function set(v) {
            this.set(undefined, v);
        }

        /**
         * get z of position
         * @type {number}
         */

    }, {
        key: 'z',
        get: function get() {
            return this[2];
        }

        /**
         * set z of position
         * @type {number}
         */
        ,
        set: function set(v) {
            this.set(undefined, undefined, v);
        }
    }]);

    return Vec3;
}();

/* harmony default export */ __webpack_exports__["a"] = (Vec3);

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elements__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engines__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_scene__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__proxies_element__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__effects__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_factory__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return __WEBPACK_IMPORTED_MODULE_0__elements__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Font", function() { return __WEBPACK_IMPORTED_MODULE_0__elements__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return __WEBPACK_IMPORTED_MODULE_0__elements__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return __WEBPACK_IMPORTED_MODULE_0__elements__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return __WEBPACK_IMPORTED_MODULE_0__elements__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return __WEBPACK_IMPORTED_MODULE_0__elements__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ellipse", function() { return __WEBPACK_IMPORTED_MODULE_0__elements__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Triangle", function() { return __WEBPACK_IMPORTED_MODULE_0__elements__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Engine", function() { return __WEBPACK_IMPORTED_MODULE_1__engines__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CSS2D", function() { return __WEBPACK_IMPORTED_MODULE_1__engines__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas2D", function() { return __WEBPACK_IMPORTED_MODULE_1__engines__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return __WEBPACK_IMPORTED_MODULE_2__core_scene__["a"]; });







__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__core_factory__["a" /* extendProxy */])(__WEBPACK_IMPORTED_MODULE_3__proxies_element__["a" /* default */], function (sth) {
    return sth instanceof __WEBPACK_IMPORTED_MODULE_0__elements__["a" /* Element */];
});
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__core_factory__["b" /* extendEffect */])(__WEBPACK_IMPORTED_MODULE_4__effects__["b" /* ElementEffects */]);



/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__);




/**
 * @class Scene
 */

var Scene = function () {
    /**
     * create a scene
     */
    function Scene() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Scene);

        /**
         * @type {Set} elements set
         */
        this.children = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a();
    }

    /**
     * Add an element(s) into the scene
     * @param  {...Element} elements
     */


    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Scene, [{
        key: 'add',
        value: function add() {
            for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
                elements[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var element = _step.value;

                    if (!this.children.has(element)) {
                        this.children.add(element);
                        element.life = 'attached';
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
         * @param  {...Element} elements
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
                for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(elements), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var element = _step2.value;

                    if (this.children.has(element)) {
                        this.children.delete(element);
                        element.life = 'dettached';
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

/* harmony default export */ __webpack_exports__["a"] = (Scene);

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__element__ = __webpack_require__(60);






/**
 * @class Font
 * @extends {Element}
 */

var Font = function (_Element) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Font, _Element);

  /**
   * create a font element
   * @override
   * @param {number} width
   * @param {number} height
   * @param {string} textContent
   * @param {string} textAlign [horizontal-align(left/center/right) vertical-align(top/center/bottom)]
   * @return {Font}
   */
  function Font(width, height, textContent, textAlign) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Font);

    /**
     * the content of text
     * @type {String}
     */
    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Font.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Font)).call(this, 'Font', width, height));

    _this.textContent = textContent;
    /**
     * the align of text
     * @type {String}
     */
    _this.textAlign = textAlign;
    return _this;
  }

  return Font;
}(__WEBPACK_IMPORTED_MODULE_4__element__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Font);

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_set__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__element__ = __webpack_require__(60);









/**
 * @class Group
 * @extends {Element}
 */

var Group = function (_Element) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Group, _Element);

    /**
     * create a group element
     * @param {number} [width]
     * @param {number} [height]
     */
    function Group(width, height) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Group);

        /**
         * the set of elements
         * @type {Set}
         */
        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Group.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Group)).call(this, 'Group', width, height));

        _this.children = new __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_set___default.a();
        return _this;
    }

    /**
     * the lifecycle of group
     * @type {string}
     */


    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Group, [{
        key: 'add',


        /**
         * add element(s) to group
         * @param {...Element} elements
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
                for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var element = _step.value;

                    if (element instanceof __WEBPACK_IMPORTED_MODULE_7__element__["a" /* default */]) {
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
         * @param {...Element} elements
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
                for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(elements), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var element = _step2.value;

                    if (element instanceof __WEBPACK_IMPORTED_MODULE_7__element__["a" /* default */]) {
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
    }, {
        key: 'life',
        get: function get() {
            return this._life;
        },
        set: function set(v) {
            this._life = v;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(this.children), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
}(__WEBPACK_IMPORTED_MODULE_7__element__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Group);

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__element__ = __webpack_require__(60);








/**
 * @class SmartImage
 * @extends {Element}
 */

var SmartImage = function (_Element) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(SmartImage, _Element);

    /**
     * create a font element
     * @param {number} width
     * @param {number} height
     * @param {Image|HTMLImageElement|HTMLCanvasElement} texture
     */
    function SmartImage(width, height, texture) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, SmartImage);

        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SmartImage.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(SmartImage)).call(this, 'SmartImage', width, height));

        if (!(texture instanceof Image) && !(texture instanceof HTMLImageElement) && !(texture instanceof HTMLCanvasElement)) {
            throw new Error('the type of texture should be Image or HTMLImageElement or HTMLCanvasElement');
        }

        /**
         * the texture of image
         * @type {Image|HTMLImageElement|Canvas}
         */
        _this.texture = texture;

        _this.style.set('background-size', 'contain');
        _this.style.set('background-repeat', 'no-repeat');
        _this.style.set('background-position-x', 0);
        _this.style.set('background-position-y', 0);
        return _this;
    }

    /**
     * image size
     * @type {string}
     */


    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(SmartImage, [{
        key: 'size',
        get: function get() {
            return this.style.get('background-size');
        },
        set: function set(v) {
            return this.style.set('background-size', v);
        }

        /**
         * repeat count of x coords
         * @type {number}
         */

    }, {
        key: 'repeatX',
        get: function get() {
            var repeat = this.style.get('background-repeat');
            if (repeat === 'no-repeat' || repeat === 'repeat-y') {
                return 1;
            } else if (repeat === 'repeat-x' || repeat === 'repeat') {
                return Infinity;
            }
        },
        set: function set(n) {
            if (n !== 1 && n !== Infinity) {
                throw new Error('"' + n + '" is not a valid repeat value');
            }

            var repeat = this.style.get('background-repeat');
            if (repeat === 'no-repeat' && n === Infinity) {
                this.style.set('background-repeat', 'repeat-x');
            } else if (repeat === 'repeat-x' && n === 1) {
                this.style.set('background-repeat', 'no-repeat');
            } else if (repeat === 'repeat-y' && n === Infinity) {
                this.style.set('background-repeat', 'repeat');
            } else if (repeat === 'repeat' && n === 1) {
                this.style.set('background-repeat', 'repeat-y');
            }
        }

        /**
         * repeat count of y coords
         * @type {number}
         */

    }, {
        key: 'repeatY',
        get: function get() {
            var repeat = this.style.get('background-repeat');
            if (repeat === 'no-repeat' || repeat === 'repeat-x') {
                return 1;
            } else if (repeat === 'repeat-y' || repeat === 'repeat') {
                return Infinity;
            }
        },
        set: function set(n) {
            if (n !== 1 && n !== Infinity) {
                throw new Error('"' + n + '" is not a valid repeat value');
            }

            var repeat = this.style.get('background-repeat');
            if (repeat === 'no-repeat' && n === Infinity) {
                this.style.set('background-repeat', 'repeat-y');
            } else if (repeat === 'repeat-y' && n === 1) {
                this.style.set('background-repeat', 'no-repeat');
            } else if (repeat === 'repeat-x' && n === Infinity) {
                this.style.set('background-repeat', 'repeat');
            } else if (repeat === 'repeat' && n === 1) {
                this.style.set('background-repeat', 'repeat-x');
            }
        }

        /**
         * repeat count of x, y coords
         * @type {number[]}
         */

    }, {
        key: 'repeat',
        get: function get() {
            return [this.repeatX, this.repeatY];
        },
        set: function set(_ref) {
            var _ref2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_ref, 2),
                x = _ref2[0],
                y = _ref2[1];

            this.repeatX = x;
            this.repeatY = y || x;
        }

        /**
         * offset of x coords
         * @type {number}
         */

    }, {
        key: 'offsetX',
        get: function get() {
            return parseFloat(this.style.get('background-position-x'));
        },
        set: function set(x) {
            if (typeof x !== 'number') {
                throw new Error(x + ' is not a valid offset value');
            }

            this.style.set('background-position-x', x);
        }

        /**
         * offset of y coords
         * @type {number}
         */

    }, {
        key: 'offsetY',
        get: function get() {
            return parseFloat(this.style.get('background-position-y'));
        },
        set: function set(y) {
            if (typeof y !== 'number') {
                throw new Error(y + ' is not a valid offset value');
            }

            this.style.set('background-position-y', y);
        }

        /**
         * offset of x, y coords
         * @return {number[] | string[]}
         */

    }, {
        key: 'offset',
        get: function get() {
            return [this.offsetX, this.offsetY];
        },
        set: function set(_ref3) {
            var _ref4 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_ref3, 2),
                x = _ref4[0],
                y = _ref4[1];

            this.offsetX = x;
            this.offsetY = y || x;
        }
    }]);

    return SmartImage;
}(__WEBPACK_IMPORTED_MODULE_6__element__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (SmartImage);

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elements_element__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__elements_font__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__elements_group__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__elements_image__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__elements_shape__ = __webpack_require__(222);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__elements_element__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__elements_font__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__elements_group__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__elements_image__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__elements_shape__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__elements_shape__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__elements_shape__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_4__elements_shape__["d"]; });








/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rectangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Circle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Ellipse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Triangle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__element__ = __webpack_require__(60);






/**
 * @class Rectangle
 * @extends {Element}
 */
var Rectangle = function (_Element) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Rectangle, _Element);

  /**
   * create a rectangle element
   * @param {number} width
   * @param {number} height
   */
  function Rectangle(width, height) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Rectangle);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Rectangle.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Rectangle)).call(this, 'Rectangle', width, height));
  }

  return Rectangle;
}(__WEBPACK_IMPORTED_MODULE_4__element__["a" /* default */]);

/**
 * @class Circle
 * @extends {Element}
 */
var Circle = function (_Element2) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Circle, _Element2);

  /**
   * create a circle element
   * @param {number} radius
   */
  function Circle(radius) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Circle);

    /**
     * the radius of circle
     * @type {number}
     */
    var _this2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Circle.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Circle)).call(this, 'Circle', radius * 2, radius * 2));

    _this2.radius = radius;
    return _this2;
  }

  return Circle;
}(__WEBPACK_IMPORTED_MODULE_4__element__["a" /* default */]);

/**
 * @class Ellipse
 * @extends {Element}
 */
var Ellipse = function (_Element3) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Ellipse, _Element3);

  /**
    * create a ellipse element
    * @param {number} the radius of horizontal
    * @param {number} the radius of vertical
    */
  function Ellipse(hRadius, vRadius) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Ellipse);

    /**
     * the radius of horizontal
     * @type {number}
     */
    var _this3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Ellipse.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Ellipse)).call(this, 'Ellipse', hRadius * 2, vRadius * 2));

    _this3.hRadius = hRadius;
    /**
     * the radius of vertical
     * @type {number}
     */
    _this3.vRadius = vRadius;
    return _this3;
  }

  return Ellipse;
}(__WEBPACK_IMPORTED_MODULE_4__element__["a" /* default */]);

/**
 * @class Triangle
 * @extends {Element}
 */
var Triangle = function (_Element4) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Triangle, _Element4);

  /**
   * create a triangle element
   * @param {number} width the width of the triangle
   * @param {number} height the height of the triangle
   * @param {number} theta the degree of horizontal angle
   */
  function Triangle(width, height, theta) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Triangle);

    /**
     * the degree of horizontal angle
     * @type {number}
     */
    var _this4 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Triangle.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Triangle)).call(this, 'Triangle', width, height));

    _this4.theta = theta;
    return _this4;
  }

  return Triangle;
}(__WEBPACK_IMPORTED_MODULE_4__element__["a" /* default */]);

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__engine__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__styleGenerator__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__style2canvas__ = __webpack_require__(226);











function setStyleSize(engine) {
    var rect = engine.canvas.getBoundingClientRect();
    if (rect.width !== 0 && rect.height !== 0) {
        engine.setStyleSize(rect.width, rect.height);
    } else {
        throw new Error('Please append the canvasElement into document firstly.');
    }
}

/**
 * @class Canvas2D
 * @extends {Engine}
 */

var Canvas2D = function (_Engine) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(Canvas2D, _Engine);

    /**
     * create a engine of canvas2d
     * @constructor
     */
    function Canvas2D() {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Canvas2D);

        /**
         * if use gpu accelerate
         * @type {boolean}
         */
        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Canvas2D.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Canvas2D)).call(this, 'Canvas2D'));

        _this.useGPUAccelerated = true;

        _this._offscreen = document.createElement('canvas');
        _this._offscreenRender = _this._offscreen.getContext('2d');
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Canvas2D, [{
        key: '_updateCanvasViewport',
        value: function _updateCanvasViewport() {
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
            this._offscreen.width = this.canvasWidth;
            this._offscreen.height = this.canvasHeight;
        }

        /**
         * set a canvas element to the engine
         * @override
         * @param {*} canvasElement
         */

    }, {
        key: 'setCanvasElement',
        value: function setCanvasElement(canvasElement) {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Canvas2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Canvas2D.prototype), 'setCanvasElement', this).call(this, canvasElement);
            this._canvasRender = this.canvas.getContext('2d');
        }

        /**
         * set the size of canvas
         * @override
         * @throws {Error} If not attach a element
         * @param {number|object} width a number of width or an object of rect
         * @param {number} [height]
         */

    }, {
        key: 'setCanvasSize',
        value: function setCanvasSize(width, height) {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Canvas2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Canvas2D.prototype), 'setCanvasSize', this).call(this, width, height);
            // this._updateCanvasViewport();
        }

        /**
         * clear the canvas
         * @override
         * @throws {Error} If not attach a element
         */

    }, {
        key: 'clear',
        value: function clear() {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Canvas2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Canvas2D.prototype), 'clear', this).call(this);
            this._offscreenRender.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this._canvasRender.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        }

        /**
         * calculate the size scale of canvas
         * @override
         * @throws {Error} If not attach a element
         */

    }, {
        key: 'resize',
        value: function resize() {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Canvas2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Canvas2D.prototype), 'resize', this).call(this);
            setStyleSize(this);
            this._updateCanvasViewport();
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
                    width: this.canvasWidth,
                    height: this.canvasHeight
                };
            }

            element.viewport = viewport;
            element.computedStyle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__styleGenerator__["a" /* default */])(element, viewport);
        }
    }, {
        key: '_renderStyle',
        value: function _renderStyle(_ref, _ref2) {
            var style = _ref.computedStyle;
            var render = _ref2.render;

            var width = parseFloat(style.get('width'));
            var height = parseFloat(style.get('height'));
            var left = parseFloat(style.get('left'));
            var top = parseFloat(style.get('top'));

            var rect = {
                width: width,
                height: height,
                left: left,
                top: top
            };

            __WEBPACK_IMPORTED_MODULE_9__style2canvas__["a" /* setTransform */]({ style: style, rect: rect, render: render });

            __WEBPACK_IMPORTED_MODULE_9__style2canvas__["b" /* setOpacity */]({ style: style, rect: rect, render: render });

            __WEBPACK_IMPORTED_MODULE_9__style2canvas__["c" /* setBackground */]({ style: style, rect: rect, render: render });

            // s2c.setBackgroundWithPattern({style, rect, render});
        }
    }, {
        key: '_groupCached',
        value: function _groupCached(group) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(group.children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;

                    if (child.cached === false) {
                        return false;
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

            return true;
        }
    }, {
        key: '_render',
        value: function _render(element, parent) {
            var render = parent.render;


            render.save();

            if (element.className === 'Group') {
                if (element.cached === false) {
                    this._computingStyle(element, parent);
                }

                render.save();

                this._renderStyle(element, parent);

                if (!element.canvas) {
                    var computedStyle = element.computedStyle,
                        viewport = element.viewport;


                    element.canvas = document.createElement('canvas');
                    element.render = element.canvas.getContext('2d');

                    var width = parseFloat(computedStyle.get('width'));
                    var height = parseFloat(computedStyle.get('height'));
                    var overflow = computedStyle.get('overflow');

                    if (overflow === 'hidden') {
                        element.canvas.width = width;
                        element.canvas.height = height;
                    } else {
                        element.canvas.width = viewport.width;
                        element.canvas.height = viewport.height;
                    }
                }

                element.render.clearRect(0, 0, element.canvas.width, element.canvas.height);

                if (!this._groupCached(element)) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(element.children), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var child = _step2.value;

                            this._render(child, element);
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

                render.drawImage(element.canvas, 0, 0);
                render.restore();
            } else {
                if (element.cached === false) {
                    this._computingStyle(element, parent);
                }

                render.save();
                this._renderStyle(element, parent);
                render.restore();
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
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Canvas2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Canvas2D.prototype), 'draw', this).call(this, element);

            this._render(element, {
                canvas: this._canvas,
                render: this._canvasRender
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
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Canvas2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Canvas2D.prototype), 'drawBuffer', this).call(this, buffer);

            this._offscreenRender.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(buffer), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var element = _step3.value;

                    this._render(element, {
                        canvas: this._offscreen,
                        render: this._offscreenRender
                    });
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

        /**
         * flush drawing
         * @override
         * @throws {Error} If not attach a element
         */

    }, {
        key: 'flush',
        value: function flush() {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Canvas2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Canvas2D.prototype), 'flush', this).call(this);

            this._canvasRender.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this._canvasRender.save();
            this._canvasRender.fillStyle = this._clearColor;
            this._canvasRender.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
            this._canvasRender.restore();
            this._canvasRender.drawImage(this._offscreen, 0, 0);
        }
    }]);

    return Canvas2D;
}(__WEBPACK_IMPORTED_MODULE_7__engine__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Canvas2D);

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_slicedToArray__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_set__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__engine__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__styleGenerator__ = __webpack_require__(214);









/**
 * @external {DocumentFragment} https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
 */




function setStyleSize(engine) {
    var rect = engine.canvas.getBoundingClientRect();
    if (rect.width !== 0 && rect.height !== 0) {
        engine.setStyleSize(rect.width, rect.height);
    } else {
        throw new Error('Please append the canvasElement into document firstly.');
    }
}

function appendStyle(id, content) {
    if (!document.getElementById('for-' + id)) {
        var parent = document.querySelector('head') || document.body || document.documentElement;
        var style = document.createElement('style');
        style.textContent = content;
        style.setAttribute('id', 'for-' + id);
        parent.appendChild(style);
    }
}

var CircleClipPathRegEx = /circle\(([\d\.]+)px\)/;
function parseCircleStyle(styleMap) {
    if (styleMap.has('clip-path')) {
        var _styleMap$get$match = styleMap.get('clip-path').match(CircleClipPathRegEx),
            _styleMap$get$match2 = __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_slicedToArray___default()(_styleMap$get$match, 2),
            radius = _styleMap$get$match2[1];

        styleMap.delete('clip-path');
        styleMap.set('border-radius', radius + 'px');
    }
    return styleMap;
}

var EllipseClipPathRegEx = /ellipse\(([\d\.]+)px ([\d\.]+)px\)/;
function parseEllipseStyle(styleMap) {
    if (styleMap.has('clip-path')) {
        var _styleMap$get$match3 = styleMap.get('clip-path').match(EllipseClipPathRegEx),
            _styleMap$get$match4 = __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_slicedToArray___default()(_styleMap$get$match3, 3),
            hRadius = _styleMap$get$match4[1],
            vRadius = _styleMap$get$match4[2];

        styleMap.delete('clip-path');
        styleMap.set('border-radius', hRadius + 'px/' + vRadius + 'px');
    }
    return styleMap;
}

var TriangleClipPathRegEx = /polygon\([\d\.]+px [\d\.]+px, ([\d\.]+)px ([\d\.]+)px, ([\d\.]+)px [\d\.]+px\)/;
function parseTriangleStyle(styleMap) {
    if (styleMap.has('clip-path')) {
        var _styleMap$get$match5 = styleMap.get('clip-path').match(TriangleClipPathRegEx),
            _styleMap$get$match6 = __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_slicedToArray___default()(_styleMap$get$match5, 4),
            width = _styleMap$get$match6[1],
            bottomBorderWidth = _styleMap$get$match6[2],
            leftBorderWidth = _styleMap$get$match6[3];

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

function parseBackgroundImage(domElement, styleMap) {
    var image = void 0;
    if (styleMap.has('background-image')) {
        image = styleMap.get('background-image');
    }

    var src = void 0;
    if (image instanceof Image || image instanceof HTMLImageElement) {
        src = image.src;
    } else if (typeof image === 'string') {
        var matched = image.match(/url\(["']?([^()]+)["']?\)/);
        if (matched) {
            src = matched[1];
        }
    } else if (image) {
        throw new Error('not support the image type "' + image.toString() + '"');
    }

    if (src) {
        styleMap.delete('background-image');

        var key = 'img-' + encodeURIComponent(src);
        if (domElement.getAttribute('img-hash') !== key) {
            domElement.setAttribute('img-hash', key);
            appendStyle(key, '\n                [img-hash="' + key + '"] {\n                    background-image: url(' + src + ')!important;\n                }\n            ');
        }
    }

    return styleMap;
}

function serializeStyleMap(styleMap) {
    return [].concat(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_toConsumableArray___default()(styleMap)).filter(function (_ref) {
        var _ref2 = __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_slicedToArray___default()(_ref, 2),
            value = _ref2[1];

        return value !== null && value !== undefined;
    }).map(function (_ref3) {
        var _ref4 = __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_slicedToArray___default()(_ref3, 2),
            name = _ref4[0],
            value = _ref4[1];

        return name + ':' + value;
    }).join(';');
}

/**
 * @class CSS2D
 * @extends {Engine}
 */

var CSS2D = function (_Engine) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(CSS2D, _Engine);

    /**
     * create a engine of css2d
     * @constructor
     */
    function CSS2D() {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, CSS2D);

        /**
         * a fragment of elements
         * @private
         * @type {DocumentFragment}
         */
        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CSS2D.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSS2D)).call(this, 'CSS2D'));

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
        _this._elementsContainer = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_set___default.a();

        /**
         * if use gpu accelerate
         * @type {boolean}
         */
        _this.useGPUAccelerated = true;
        return _this;
    }

    /**
     * clear the canvas
     * @override
     * @throws {Error} If not attach a element
     */


    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(CSS2D, [{
        key: 'clear',
        value: function clear() {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(CSS2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSS2D.prototype), 'clear', this).call(this);
            this.canvas.innerHTML = '';
        }

        /**
         * calculate the size scale of canvas
         * @override
         * @throws {Error} If not attach a element
         */

    }, {
        key: 'resize',
        value: function resize() {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(CSS2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSS2D.prototype), 'resize', this).call(this);
            setStyleSize(this);
        }

        /**
         * Set the clear color for canvas.
         * The color string supports `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`
         * @override
         * @throws {Error} If not attach a element
         * @param {string} color
         */

    }, {
        key: 'setClearColor',
        value: function setClearColor(color) {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(CSS2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSS2D.prototype), 'setClearColor', this).call(this, color);
            this.canvas.style.backgroundColor = this._clearColor;
        }
    }, {
        key: '_computingStyle',
        value: function _computingStyle(element, parent) {
            var canvasSize = void 0;
            if (parent && parent.getBoundingRect) {
                var parentBox = parent.getBoundingRect();
                canvasSize = {
                    width: parentBox.width,
                    height: parentBox.height
                };
            } else {
                canvasSize = {
                    width: this.canvasWidth,
                    height: this.canvasHeight
                };
            }

            element.computedStyle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__styleGenerator__["a" /* default */])(element, canvasSize, this.scaleWidth, this.scaleHeight);
        }
    }, {
        key: '_renderDOMElement',
        value: function _renderDOMElement(element, parent) {
            var computedStyle = element.computedStyle,
                className = element.className;
            var domElement = element.domElement;


            if (!domElement) {
                if (this._recycleContainer.length > 0) {
                    domElement = this._recycleContainer.shift();
                } else {
                    domElement = document.createElement('div');
                }
                element.domElement = domElement;
            }

            switch (className) {
                case 'Circle':
                    parseCircleStyle(computedStyle);
                    break;
                case 'Ellipse':
                    parseEllipseStyle(computedStyle);
                    break;
                case 'Triangle':
                    parseTriangleStyle(computedStyle);
                    break;
                case 'Font':
                    if (domElement.textContent !== element.textContent) {
                        domElement.textContent = element.textContent;
                    }
                    break;
                case 'SmartImage':
                    computedStyle.set('background-image', element.texture);
                    break;
                case 'Rectangle':
                default:
                    break;
            }

            parseBackgroundImage(domElement, computedStyle);

            domElement.style.cssText = serializeStyleMap(computedStyle);

            if (!domElement.parentNode || domElement.parentNode !== parent.domElement && !(parent.domElement instanceof DocumentFragment)) {
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
                    for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(element.children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
         * @param {Element} element
         */

    }, {
        key: 'draw',
        value: function draw(element) {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(CSS2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSS2D.prototype), 'draw', this).call(this, element);

            this._render(element, {
                domElement: this.canvas
            });
        }

        /**
         * draw a buffer of elements on canvas
         * @override
         * @throws {Error} If not attach a element
         * @param {Array<Element>} buffer
         */

    }, {
        key: 'drawBuffer',
        value: function drawBuffer(buffer) {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(CSS2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSS2D.prototype), 'drawBuffer', this).call(this, buffer);

            if (!this._bufferFragment) {
                this._bufferFragment = document.createDocumentFragment();
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(buffer), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(CSS2D.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CSS2D.prototype), 'flush', this).call(this);

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
                for (var _iterator3 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(this._elementsContainer), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
}(__WEBPACK_IMPORTED_MODULE_10__engine__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (CSS2D);

/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engines_engine__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engines_css2d__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engines_canvas2d__ = __webpack_require__(223);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__engines_engine__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__engines_css2d__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__engines_canvas2d__["a"]; });






/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setTransform;
/* harmony export (immutable) */ __webpack_exports__["b"] = setOpacity;
/* harmony export (immutable) */ __webpack_exports__["c"] = setBackground;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);

/**
 * supported:
 * - width
 * - height
 * - opacity
 * - overflow
 * - transform
 * - transform-origin
 * - background-color
 * - background-image: image
 * - background-position-x
 * - background-position-y
 * - background-size
 * - background-repeat
 * working in progress:
 * - background-image: gradient
 * - border-radius (one value)
 * - border-top-left-radius
 * - border-top-right-radius
 * - border-bottom-right-radius
 * - border-bottom-left-radius
 * - clip-path
 * - color
 * - box-sizing
 * - text-align
 * - line-height
 * - font-size
 * - font-weight
 * - border-left-color
 * - border-right-color
 * - border-top-color
 * - border-bottom-color
 * - border-left-width
 * - border-right-width
 * - border-top-width
 * - border-bottom-width
 * - border-left-style
 * - border-right-style
 * - border-top-style
 * - border-bottom-style
 */
function setTransform(_ref) {
    var style = _ref.style,
        rect = _ref.rect,
        render = _ref.render;
    var width = rect.width,
        height = rect.height,
        left = rect.left,
        top = rect.top;

    var _style$get$split = style.get('transform-origin').split(' '),
        _style$get$split2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_style$get$split, 2),
        ox = _style$get$split2[0],
        oy = _style$get$split2[1];

    if (ox && ox.match(/%$/)) {
        ox = parseFloat(ox) / 100 * width;
    } else {
        ox = parseFloat(ox) || width / 2;
    }

    if (oy.match(/%$/)) {
        oy = parseFloat(oy) / 100 * height;
    } else {
        oy = parseFloat(oy);
    }

    var m3 = style.get('transform').match(/matrix3d\(([^()]+)\)/)[1].split(',').map(function (i) {
        return parseFloat(i);
    });

    var m2 = [m3[0], m3[1], m3[4], m3[5], m3[12] + left, m3[13] + top];

    render.translate(ox, oy);
    render.transform.apply(render, m2);
    render.translate(-ox, -oy);
}

function setOpacity(_ref2) {
    var style = _ref2.style,
        render = _ref2.render;

    var opacity = parseFloat(style.get('opacity'));
    render.globalAlpha = opacity;
}

function parseBackgroundSize(style, _ref3) {
    var iw = _ref3.iw,
        ih = _ref3.ih,
        cw = _ref3.cw,
        ch = _ref3.ch;

    var rw = void 0,
        rh = void 0;
    var matched = void 0;

    var size = style.get('background-size');
    if (size === 'contain') {
        if (iw / ih > cw / ch) {
            rw = cw;
            rh = cw / iw * ih;
        } else {
            rh = ch;
            rw = ch / ih * iw;
        }
    } else if (size === 'cover') {
        if (iw / ih > cw / ch) {
            rh = ch;
            rw = ch / ih * iw;
        } else {
            rw = cw;
            rh = cw / iw * ih;
        }
    } else if (matched = size.match(/([\-\.\d]+)(px|%)(?:\s+([\-\.\d]+)(px|%))?/)) {
        var _matched = matched,
            _matched2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_matched, 5),
            v1 = _matched2[1],
            u1 = _matched2[2],
            v2 = _matched2[3],
            u2 = _matched2[4];

        if (u1 === '%') {
            rw = cw * parseFloat(v1) / 100;
        } else if (u1 === 'px') {
            rw = parseFloat(v1);
        }

        if (!v2 || !u2) {
            rh = rw / iw * ih;
        } else {
            if (u2 === '%') {
                rh = ch * parseFloat(v2) / 100;
            } else if (u2 === 'px') {
                rh = parseFloat(v2);
            }
        }
    }

    return {
        rw: rw, rh: rh
    };
}

function praseBackgroundPosition(style, _ref4) {
    var cw = _ref4.cw,
        ch = _ref4.ch,
        rw = _ref4.rw,
        rh = _ref4.rh;

    var px = '0px',
        py = '0px';
    if (style.has('background-position')) {
        var position = style.get('background-position');
        var matched = void 0;

        if (matched = position.match(/(left|center|right)(?:\s+(top|center|bottom))?/)) {
            // eslint-disable-next-line
            var _matched3 = matched,
                _matched4 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_matched3, 3),
                v1 = _matched4[1],
                v2 = _matched4[2];

            px = v1 === 'left' ? '0%' : v1 === 'center' ? '50%' : '100%';

            if (!v2) {
                v2 = 'center';
            }

            py = v2 === 'top' ? '0%' : v2 === 'center' ? '50%' : '100%';
        } else if (matched = position.match(/([\-\.\d]+)(px|%)(?:\s+([\-\.\d]+)(px|%))?/)) {
            var _matched5 = matched,
                _matched6 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_matched5, 5),
                _v = _matched6[1],
                u1 = _matched6[2],
                _v2 = _matched6[3],
                u2 = _matched6[4];

            px = '' + _v + u1;

            if (!_v2 || !u2) {
                py = '50%';
            } else {
                py = '' + _v2 + u2;
            }
        }
    }

    if (style.has('background-position-x')) {
        px = style.get('background-position-x');
    }

    if (style.has('background-position-y')) {
        py = style.get('background-position-y');
    }

    if (px.match(/px$/)) {
        px = parseFloat(px);
    } else if (px.match(/%$/)) {
        px = (cw - rw) * parseFloat(px) / 100;
    }

    if (py.match(/px$/)) {
        py = parseFloat(py);
    } else {
        py = (ch - rh) * parseFloat(py) / 100;
    }

    return {
        px: px,
        py: py
    };
}

function parseBackgroundRepeat(style, _ref5) {
    var iw = _ref5.iw,
        ih = _ref5.ih,
        cw = _ref5.cw,
        ch = _ref5.ch,
        rw = _ref5.rw,
        rh = _ref5.rh,
        px = _ref5.px,
        py = _ref5.py;

    var params = [];
    var repeat = style.get('background-repeat');

    function getParams(px, py) {
        var sx = 0,
            sy = 0,
            sw = void 0,
            sh = void 0;
        var dx = 0,
            dy = 0,
            dw = void 0,
            dh = void 0;

        if (rw > cw) {
            sw = iw / rw * cw;
            dw = cw;
        } else {
            sw = iw;
            dw = rw;
        }

        if (rh > ch) {
            sh = ih / rh * ch;
            dh = ch;
        } else {
            sh = ih;
            dh = rh;
        }

        if (px < 0) {
            sx = -px * iw / rw;
            dx = 0;
        } else {
            sx = 0;
            dx = px;

            if (px + dw > cw) {
                sw -= (px + dw - cw) * iw / rw;
                dw -= px + dw - cw;
            }
        }

        if (py < 0) {
            sy = -py * ih / rh;
            dy = 0;
        } else {
            sy = 0;
            dy = py;

            if (py + dh > ch) {
                sh -= (py + dh - ch) * ih / rh;
                dh -= py + dh - ch;
            }
        }

        return [sx, sy, sw, sh, dx, dy, dw, dh];
    }

    if (repeat === 'no-repeat') {
        params.push(getParams(px, py));
    } else if (repeat === 'repeat-x') {
        var x = void 0;

        if (px > 0) {
            x = px % rw - rw;
        } else {
            x = px;
        }

        while (x < cw) {
            params.push(getParams(x, py));
            x += rw;
        }
    } else if (repeat === 'repeat-y') {
        var y = void 0;

        if (py > 0) {
            y = py % rh - rh;
        } else {
            y = py;
        }

        while (y < ch) {
            params.push(getParams(px, y));
            y += rh;
        }
    } else if (repeat === 'repeat') {
        var _x = void 0,
            _y = void 0;

        if (px > 0) {
            _x = px % rw - rw;
        } else {
            _x = px;
        }

        while (_x < cw) {

            if (py > 0) {
                _y = py % rh - rh;
            } else {
                _y = py;
            }

            while (_y < ch) {
                params.push(getParams(_x, _y));
                _y += rh;
            }

            _x += rw;
        }
    }

    return params;
}

function setBackground(_ref6) {
    var style = _ref6.style,
        rect = _ref6.rect,
        render = _ref6.render;

    if (style.has('background-color')) {
        render.fillStyle = style.get('background-color');
        render.fillRect(0, 0, Math.floor(rect.width), Math.floor(rect.height));
    }

    if (style.has('background-image')) {
        var image = style.get('background-image');
        if (!(image instanceof Image) && !(image instanceof HTMLImageElement)) {
            throw new Error('Please set "background-image" with a Image Object in Canvas Engine');
        }

        var iw = image.width,
            ih = image.height;
        var cw = rect.width,
            ch = rect.height;

        var _parseBackgroundSize = parseBackgroundSize(style, { iw: iw, ih: ih, cw: cw, ch: ch }),
            rw = _parseBackgroundSize.rw,
            rh = _parseBackgroundSize.rh;

        var _praseBackgroundPosit = praseBackgroundPosition(style, { iw: iw, ih: ih, cw: cw, ch: ch, rw: rw, rh: rh }),
            px = _praseBackgroundPosit.px,
            py = _praseBackgroundPosit.py;

        var repeats = parseBackgroundRepeat(style, { iw: iw, ih: ih, cw: cw, ch: ch, rw: rw, rh: rh, px: px, py: py });

        repeats.forEach(function (_ref7) {
            var _ref8 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_ref7, 8),
                sx = _ref8[0],
                sy = _ref8[1],
                sw = _ref8[2],
                sh = _ref8[3],
                dx = _ref8[4],
                dy = _ref8[5],
                dw = _ref8[6],
                dh = _ref8[7];

            render.drawImage(image, Math.floor(sx), Math.floor(sy), Math.floor(sw), Math.floor(sh), Math.floor(dx), Math.floor(dy), Math.floor(dw), Math.floor(dh));
        });
    }
}

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Legacy", function() { return Legacy; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_capitalize__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_capitalize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_lodash_capitalize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__libs_event__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__lite__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__render__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__effects__ = __webpack_require__(57);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "render", function() { return __WEBPACK_IMPORTED_MODULE_13__render__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "runtime", function() { return __WEBPACK_IMPORTED_MODULE_12__lite__["runtime"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "globalTicker", function() { return __WEBPACK_IMPORTED_MODULE_12__lite__["globalTicker"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extendProxy", function() { return __WEBPACK_IMPORTED_MODULE_12__lite__["extendProxy"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extendEffect", function() { return __WEBPACK_IMPORTED_MODULE_12__lite__["extendEffect"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extendEasing", function() { return __WEBPACK_IMPORTED_MODULE_12__lite__["extendEasing"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createEffect", function() { return __WEBPACK_IMPORTED_MODULE_12__lite__["createEffect"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAnimation", function() { return __WEBPACK_IMPORTED_MODULE_12__lite__["createAnimation"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAnimations", function() { return __WEBPACK_IMPORTED_MODULE_12__lite__["createAnimations"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createTimeline", function() { return __WEBPACK_IMPORTED_MODULE_12__lite__["createTimeline"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return __WEBPACK_IMPORTED_MODULE_12__lite__["animate"]; });
















__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__lite__["extendEffect"])(__WEBPACK_IMPORTED_MODULE_14__effects__["a" /* LegacyEffects */]);

var Element = __WEBPACK_IMPORTED_MODULE_13__render__["Element"],
    Scene = __WEBPACK_IMPORTED_MODULE_13__render__["Scene"],
    Engine = __WEBPACK_IMPORTED_MODULE_13__render__["Engine"],
    CSS2D = __WEBPACK_IMPORTED_MODULE_13__render__["CSS2D"],
    Canvas2D = __WEBPACK_IMPORTED_MODULE_13__render__["Canvas2D"];
var Animation = __WEBPACK_IMPORTED_MODULE_12__lite__["runtime"].Animation,
    Timeline = __WEBPACK_IMPORTED_MODULE_12__lite__["runtime"].Timeline;


var passedEvent = ['play', 'afterplay'];

/*eslint-disable no-console*/

var Legacy = function (_Event) {
    __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default()(Legacy, _Event);

    /**
     * @example
     * const aft = new AFT(document.getElementById('canvas'), 'css');
     * aft.setSize(750);
     * @param  {HTMLElement|Engine} canvasElement
     * @param  {string} engineClass Specify "css" or "2d" for CSS2D and "canvas" for Canvas2D engine.
     * @return {Legacy}
     */
    function Legacy(canvasElement, engineClass) {
        __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, Legacy);

        var _this = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Legacy.__proto__ || __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_get_prototype_of___default()(Legacy)).call(this));

        var engine = void 0;

        if (!(canvasElement instanceof Engine)) {
            if (!engineClass) {
                if (canvasElement.tagName.toLowerCase() === 'canvas') {
                    engineClass = 'canvas';
                } else {
                    engineClass = 'css';
                }
            }

            switch (engineClass) {
                case '2d':
                case 'css':
                    engine = new CSS2D();
                    break;
                case 'canvas':
                    engine = new Canvas2D();
                    break;
                default:
                    throw new Error('"' + Engine + '" is not a valid type of engine');
            }
            engine.setCanvasElement(canvasElement);
        } else {
            engine = canvasElement;
        }

        _this._engine = engine;
        _this._scene = new Scene();
        _this._timeline = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__lite__["createTimeline"])();
        _this._start = false;

        passedEvent.forEach(function (type) {
            return _this._timeline.on(type, function () {
                if (type === 'afterplay') {
                    _this._engine.drawBuffer(_this._scene.children);
                    _this._engine.flush();
                    _this.emit('drawn');
                } else {
                    _this.emit(type);
                }
            });
        });
        return _this;
    }

    /**
     * get the engine
     * @type {Engine}
     */


    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(Legacy, [{
        key: 'resize',


        /**
         * resize the canvas
         * @return {Legacy} current context
         */
        value: function resize() {
            this._engine.resize();
            return this;
        }

        /**
         * @param {number} width
         * @param {number} [height]
         * @return {Legacy} current context
         */

    }, {
        key: 'setSize',
        value: function setSize(width, height) {
            this._engine.setCanvasSize(width, height);
            this._engine.resize();
            return this;
        }

        /**
         * @param {string} rgba
         * @return {Legacy} current context
         */

    }, {
        key: 'setClearColor',
        value: function setClearColor(rgba) {
            this._engine.setClearColor(rgba);
            return this;
        }

        /**
         * @return {Legacy} current context
         */

    }, {
        key: 'createScene',


        /**
         * create a scene
         * @return {Scene}
         */
        value: function createScene() {
            return this._scene;
        }

        /**
         * create a element
         * @example
         * const rect = aft.createElement('rectangle', 100, 100, {
         *     position: [10, 10], // an array
         *     style: { // an object
         *         opacity: 1
         *     },
         *     transform: [ // a map entry
         *         ['translateX', 100]
         *     ]
         * });
         * @param  {string} elementType rectangle/circle/triangle/group etc.
         * @param  {...*} initialArguments initial arguments for element, the last argument can be an option that include position & style & map
         * @return {Element}
         * @throws {Error} If elementType is invalid
         */

    }, {
        key: 'createElement',
        value: function createElement(elementType) {
            var ElementClass = __WEBPACK_IMPORTED_MODULE_13__render__[__WEBPACK_IMPORTED_MODULE_10_lodash_capitalize___default()(elementType)];

            if (ElementClass && ElementClass.prototype instanceof Element) {
                var options = void 0;

                for (var _len = arguments.length, initialArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    initialArguments[_key - 1] = arguments[_key];
                }

                if (initialArguments.length === ElementClass.length + 1) {
                    options = initialArguments.splice(initialArguments.length - 1, 1);
                }

                var element = new (Function.prototype.bind.apply(ElementClass, [null].concat(initialArguments)))();
                if (options) {
                    options.forEach(function (opt) {
                        if (opt.position) {
                            var _element$position;

                            (_element$position = element.position).set.apply(_element$position, __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default()(opt.position));
                        }

                        if (opt.style) {
                            __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(opt.style).forEach(function (key) {
                                element.style.set(key, opt.style[key]);
                            });
                        }

                        if (opt.transform) {
                            opt.transform.forEach(function (_ref) {
                                var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default()(_ref, 2),
                                    key = _ref2[0],
                                    value = _ref2[1];

                                element.transform.set(key, value);
                            });
                        }
                    });
                }

                return element;
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
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__lite__["createEffect"])();
        }

        /**
         * create a animation
         * @example
         * aft.createAnimation(element, effect);
         * @example
         * aft.createAnimation(element, (effect, element) => {...});
         * @param  {Element} element
         * @param  {Effect|function(effect: Effect, element: Element)} sth
         * @param  {number} iteration
         * @return {Animation}
         */

    }, {
        key: 'createAnimation',
        value: function createAnimation(element, sth, iteration) {
            var effect = sth;
            if (sth instanceof Function) {
                var fn = sth;
                sth = function sth() {
                    effect = arguments.length <= 0 ? undefined : arguments[0];
                    return fn.apply(undefined, arguments);
                };
            }

            var animation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__lite__["createAnimation"])(element, sth, iteration);

            if (effect.repeatAll) {
                // fallback to effect.loopAll()
                animation.iteration = effect.repeatAll.count;
            }

            __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_properties___default()(animation, {
                element: {
                    get: function get() {
                        return animation.current;
                    }
                },

                effect: {
                    get: function get() {
                        throw new Error('Broken! The "aniamtion.effect" is nerver used!');
                    }
                }
            });
            return animation;
        }

        /**
         * create animations
         * @param  {Element} element
         * @param  {...Effect|...function(effect: Effect, element: Element)} effects
         * @return {Animation}
         */

    }, {
        key: 'createAnimations',
        value: function createAnimations(element) {
            var _this2 = this;

            for (var _len2 = arguments.length, effects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                effects[_key2 - 1] = arguments[_key2];
            }

            return effects.map(function (effect) {
                return _this2.createAnimation(element, effect);
            });
        }

        /**
         * create a timeline
         * @param {Array<Animation>} [animations]
         * @param {Object} [option]
         * @return {Timeline}
         */

    }, {
        key: 'createTimeline',
        value: function createTimeline(animations, option) {
            var _this3 = this;

            if (animations) {
                animations.forEach(function (animation) {
                    return _this3._timeline.add(animation, option);
                });
            }
            return this._timeline;
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
         * @return {Legacy} current context
         */

    }, {
        key: 'play',
        value: function play(scene, sth) {
            var _this4 = this;

            if (sth instanceof Array) {
                sth.forEach(function (s) {
                    if (s instanceof Animation) {
                        _this4._timeline.add(s);
                    } else if (s instanceof Timeline && s !== _this4._timeline) {
                        s._animations.forEach(function (option, animation) {
                            return _this4._timeline.add(animation, option);
                        });
                    }
                });
            }

            if (!this._start) {
                this._start = true;
                this._timeline.play();
                this.emit('start');
            } else if (this.isPaused) {
                this._timeline.play();
                this.emit('resume');
            } else if (this.isFinished) {
                this._timeline.replay();
                this.emit('replay');
            }

            return this;
        }

        /**
         * pause
         * @event pause
         * @return {Core} current context
         */

    }, {
        key: 'pause',
        value: function pause() {
            if (this.isPlaying) {
                this.emit('pause');
                this._timeline.pause();
            }
            return this;
        }

        /**
         * cancel
         * @event cancel
         * @return {Core} current context
         */

    }, {
        key: 'cancel',
        value: function cancel() {
            if (!this.isFinished) {
                this.emit('cancel');
                this._timeline.stop();
            }
            return this;
        }

        /**
         * resume
         * @event resume
         * @return {Legacy} current context
         */

    }, {
        key: 'resume',
        value: function resume() {
            this.play();
            return this;
        }

        /**
         * generateCustomCoords
         * @example
         * aft.generateCustomCoords('left top');
         * @param  {string} coordsPosition like `center center`
         * @return {Array} [x, y] or [x, y, z]
         */

    }, {
        key: 'generateCustomCoords',
        value: function generateCustomCoords(coordsPosition) {
            var viewportWidth = this.viewportWidth;
            var viewportHeight = this.viewportHeight;

            coordsPosition = coordsPosition || 'center center';

            /**
             * const - description
             *
             * @param  {map} originDot origin dot
             * @return {map}           target dot
             */
            var getValue = function getValue(originDot) {
                var targetCoords = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a();
                var targetDot = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a();
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
                targetArr.push(getValue(new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a().set('x', x)).get('x'));
                targetArr.push(getValue(new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a().set('y', y)).get('y'));
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
                var resultNum = getValue(new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a().set('x', x)).get('x');
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
                var resultNum = getValue(new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_map___default.a().set('y', y)).get('y');
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
        key: 'engine',
        get: function get() {
            return this._engine;
        }

        /**
         * if is playing
         * @type {boolean}
         */

    }, {
        key: 'isPlaying',
        get: function get() {
            return !this._timeline.paused && !this._timeline.ended;
        }

        /**
         * if is paused
         * @type {boolean}
         */

    }, {
        key: 'isPaused',
        get: function get() {
            return this._timeline.paused;
        }

        /**
         * if is finished
         * @type {boolean}
         */

    }, {
        key: 'isFinished',
        get: function get() {
            return this._timeline.ended;
        }

        /**
         * get frame to skip
         * @type {number}
         */

    }, {
        key: 'skipFrames',
        get: function get() {
            return this._timeline.skipFrames;
        }

        /**
         * set frame to skip
         * @param {number} n
         */
        ,
        set: function set(n) {
            this._timeline.skipFrames = n;
        }
    }, {
        key: 'viewportWidth',
        get: function get() {
            return this._engine.canvasWidth;
        }

        /**
         * @return {Legacy} current context
         */

    }, {
        key: 'viewportHeight',
        get: function get() {
            return this._engine.canvasHeight;
        }

        /**
         * @return {Legacy} current context
         */

    }, {
        key: 'scaling',
        get: function get() {
            return this._engine.scaleWidth;
        }
    }]);

    return Legacy;
}(__WEBPACK_IMPORTED_MODULE_11__libs_event__["a" /* default */]);
/*eslint-enable no-console*/



/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromElement;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_set__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_set__);









var transformKeyWords = new __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_set___default.a(['translateX', 'translateY', 'translateZ', 'rotateX', 'rotateY', 'rotateZ', 'rotate', 'rotate3d', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY', 'skewZ']);

var ElementProxy = function (_Map) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(ElementProxy, _Map);

    function ElementProxy(element) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, ElementProxy);

        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ElementProxy.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ElementProxy)).call(this));

        _this._element = element;
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(ElementProxy, [{
        key: 'get',
        value: function get(name) {
            var value = void 0;
            if (transformKeyWords.has(name)) {
                value = this._element.transform.get(name);
            } else {
                value = this._element.style.get(name);
            }
            return value;
        }
    }, {
        key: 'set',
        value: function set(name, value) {
            if (transformKeyWords.has(name)) {
                this._element.transform.set(name, value);
            } else {
                this._element.style.set(name, value);
            }
            return this;
        }
    }, {
        key: 'has',
        value: function has(name) {
            if (transformKeyWords.has(name)) {
                return this._element.transform.has(name);
            }
            return this._element.style.has(name);
        }
    }]);

    return ElementProxy;
}(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_map___default.a);

var cacheKey = '_element_proxy_to_map__';
function fromElement(element) {
    if (!element.hasOwnProperty(cacheKey)) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(element, cacheKey, {
            value: new ElementProxy(element),
            enumerable: false
        });
    }
    return element[cacheKey];
}

/***/ }),
/* 229 */
/***/ (function(module, exports) {

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

/***/ }),
/* 230 */
/***/ (function(module, exports) {

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

/***/ }),
/* 231 */
/***/ (function(module, exports) {

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

/***/ }),
/* 232 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);
});
//# sourceMappingURL=aft.js.map
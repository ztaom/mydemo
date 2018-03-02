'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _obj = require('./obj'),
    _obj2 = _interopRequireDefault(_obj),
    _camera = require('./camera'),
    _camera2 = _interopRequireDefault(_camera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scene = function (_Obj) {
	_inherits(Scene, _Obj);

	function Scene(props) {
		_classCallCheck(this, Scene);

		var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, props)),
		    style = _this.dom.style;

		style.transformStyle = style.webkitTransformStyle = 'preserve-3d';
		style.overflow = 'hidden';

		_this.camera = new _camera2.default();
		_this.camera._scene = _this;

		_get(Scene.prototype.__proto__ || Object.getPrototypeOf(Scene.prototype), 'addChild', _this).call(_this, _this.camera);
		return _this;
	}

	_createClass(Scene, [{
		key: 'getChildren',
		value: function getChildren() {
			return this.camera.children;
		}
	}, {
		key: 'addChild',
		value: function addChild(obj) {
			// This is scene obj which has a particular matrix
			obj._isSceneObj = true;
			this.camera.addChild(obj);
			return this;
		}
	}, {
		key: 'removeChild',
		value: function removeChild(obj) {
			this.camera.removeChild(obj);
			return this;
		}
	}, {
		key: 'css',
		value: function css() {
			return null;
		}
	}]);

	return Scene;
}(_obj2.default);

exports.default = Scene;
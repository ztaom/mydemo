'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = [], _n = true, _d = false, _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _glMatrix = require('gl-matrix'),
    _matrixToCss = require('matrix-to-css'),
    _matrixToCss2 = _interopRequireDefault(_matrixToCss),
    _obj = require('./obj'),
    _obj2 = _interopRequireDefault(_obj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Camera = function (_Obj) {
	_inherits(Camera, _Obj);

	function Camera(props) {
		_classCallCheck(this, Camera);

		var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, props));

		_this.containerMatrix = _glMatrix.mat4.create();
		_this.fov = 45;

		var style = _this.dom.style;

		style.transformStyle = style.webkitTransformStyle = 'preserve-3d';
		style.width = '100%';
		style.height = '100%';
		return _this;
	}

	_createClass(Camera, [{
		key: 'perspective',
		value: function perspective(fov) {
			fov = fov || this.fov;

			var scene = this._scene;

			if (scene) {
				var perspective = 0.5 * scene._size[1] / Math.tan(fov * 0.5 / 180 * Math.PI);

				this._perspective = perspective;
				scene.dom.style.perspective = scene.dom.style.webkitPerspective = perspective + 'px';
			}

			return this;
		}
	}, {
		key: 'rotate',
		value: function rotate(rad, axis) {
			var _position = _slicedToArray(this.position, 3),
			    x = _position[0],
			    y = _position[1],
			    z = _position[2];

			// we have to translate the center of rotation to origin


			this.translate([-x, -y, -z]);

			_get(Camera.prototype.__proto__ || Object.getPrototypeOf(Camera.prototype), 'rotate', this).call(this, rad, axis);

			this.translate([x, y, z]);

			return this;
		}
	}, {
		key: 'rotateTo',
		value: function rotateTo(euler) {
			var _position2 = _slicedToArray(this.position, 3),
			    x = _position2[0],
			    y = _position2[1],
			    z = _position2[2];

			if (euler === undefined) {
				return this;
			}

			this.translate([-x, -y, -z]);

			this.euler = [euler[0], euler[1], euler[2]];

			this.translate([x, y, z]);

			return this;
		}
	}, {
		key: 'lookAt',
		value: function lookAt() {
			_glMatrix.mat4.lookAt(this.mat, eye, center, up);
		}

		// @see: https://github.com/mrdoob/three.js/blob/dev/examples/js/renderers/CSS3DRenderer.js

	}, {
		key: 'css',
		value: function css() {
			// opposite the camera 
			_glMatrix.mat4.invert(this.containerMatrix, this.mat);

			var transform = 'translate3d(0,0,' + this._perspective + 'px) ',
			    matrix = this.containerMatrix;

			matrix[1] = -matrix[1];
			matrix[5] = -matrix[5];
			matrix[9] = -matrix[9];
			matrix[13] = -matrix[13];

			transform += (0, _matrixToCss2.default)(matrix);

			transform += ' translate3d(50%, 50%, 0)';

			return transform;
		}
	}]);

	return Camera;
}(_obj2.default);

exports.default = Camera;
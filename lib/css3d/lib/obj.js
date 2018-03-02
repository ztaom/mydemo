'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _matrix = require('./matrix'),
    _matrix2 = _interopRequireDefault(_matrix),
    _size = require('./size'),
    _size2 = _interopRequireDefault(_size),
    _texture = require('./texture'),
    _texture2 = _interopRequireDefault(_texture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO:
// lookAt, @see: threejs
// change transform origin
// removeChild
var Obj = function () {
	_createClass(Obj, null, [{
		key: 'implements',
		value: function _implements(interfaces) {
			for (var prop in interfaces) {
				Obj.prototype[prop] = interfaces[prop];
			}
			// Object.assign(Obj.prototype, interfaces);
		}
	}]);

	function Obj(props) {
		_classCallCheck(this, Obj);

		if (!props) {
			props = {};
		}

		this.dom = document.createElement(props.htmlTag || 'div');
		this.dom.style.position = 'absolute';

		this.docfrag = document.createDocumentFragment();
		this.children = [];
		this._isDomInserted = false;

		this._position();
		this._rotation();
	}

	_createClass(Obj, [{
		key: 'render',
		value: function render() {
			if (!this._isDomInserted) {
				this.dom.appendChild(this.docfrag);
				this._isDomInserted = true;
			}

			if (this.children && this.children.length > 0) {
				this.children.forEach(function (child) {
					child.render();
				});
			}

			this.dom.style.transform = this.dom.style.webkitTransform = this.css();
		}
	}, {
		key: 'getChildren',
		value: function getChildren() {
			return this.children;
		}
	}, {
		key: 'addChild',
		value: function addChild(obj) {
			if (!this._isDomInserted) {
				this.docfrag.appendChild(obj.dom);
			} else {
				this.dom.appendChild(obj.dom);
			}

			this.children.push(obj);

			return this;
		}
	}, {
		key: 'removeChild',
		value: function removeChild(obj) {
			// TODO
			return this;
		}
	}]);

	return Obj;
}();

exports.default = Obj;


Obj.implements(_matrix2.default);
Obj.implements(_size2.default);
Obj.implements(_texture2.default);
'use strict';

var _glMatrix = require('gl-matrix'),
    _matrixToCss = require('matrix-to-css'),
    _matrixToCss2 = _interopRequireDefault(_matrixToCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: origin & scale
var epsilon = function epsilon(value) {
	return Math.abs(value) < Number.EPSILON ? 0 : value;
};

module.exports = {
	scale: function scale(v) {
		var mat = this.mat;

		_glMatrix.mat4.scale(mat, mat, v);

		return this;
	},

	_position: function _position() {
		var _this = this;

		this.mat = _glMatrix.mat4.create();

		this._position = [0, 0, 0];
		this.up = [0, 1, 0];

		Object.defineProperties(this, {
			position: {
				set: function set(v) {
					_this.mat[12] = v[0];
					_this.mat[13] = v[1];
					_this.mat[14] = v[2];

					_this._position = v;
				},
				get: function get() {
					return _this._position;
				}
			}
		});

		return this;
	},

	translateTo: function translateTo(pos) {
		if (!pos) {
			return this;
		}

		this.position = [pos[0], pos[1], pos[2]];

		return this;
	},

	translate: function translate(pos) {

		if (!pos) {
			return this;
		}

		var mat = this.mat,
		    cachePos = this._position;

		_glMatrix.mat4.translate(mat, mat, pos);

		pos.forEach(function (p, i) {
			cachePos[i] += pos[i];
		});

		return this;
	},

	_getQuaternionsFromEuler: function _getQuaternionsFromEuler(e) {
		var cos = Math.cos,
		    sin = Math.sin,
		    roll = e[0],
		    pitch = e[1],
		    yaw = e[2],
		    t0 = cos(yaw * 0.5),
		    t1 = sin(yaw * 0.5),
		    t2 = cos(roll * 0.5),
		    t3 = sin(roll * 0.5),
		    t4 = cos(pitch * 0.5),
		    t5 = sin(pitch * 0.5),
		    w = t0 * t2 * t4 + t1 * t3 * t5,
		    x = -(t0 * t3 * t4 - t1 * t2 * t5),
		    y = -(t0 * t2 * t5 + t1 * t3 * t4),
		    z = -(t1 * t2 * t4 - t0 * t3 * t5);

		// let w = t0 * t2 * t4 - t1 * t3 * t5;
		// let x = t0 * t3 * t4 + t1 * t2 * t5;
		// let y = t0 * t2 * t5 - t1 * t3 * t4;
		// let z = t1 * t2 * t4 + t0 * t3 * t5;

		return [x, y, z, w];
	},

	_rotation: function _rotation() {
		var _this2 = this;

		this.quaternion = [0, 0, 0, 0];
		this._euler = [0, 0, 0];

		Object.defineProperties(this, {
			euler: {
				set: function set(v) {
					var q = _this2._getQuaternionsFromEuler(v),
					    mat = _glMatrix.mat4.create();

					_glMatrix.mat4.fromRotationTranslation(_this2.mat, q, [_this2.mat[12], _this2.mat[13], _this2.mat[14]]);

					_this2._euler = v;
				},
				get: function get() {
					return _this2._euler;
				}
			}
		});
	},

	_getQuaternionFromMatrix: function _getQuaternionFromMatrix(mat) {
		var q = _glMatrix.quat.create();
		_glMatrix.mat4.getRotation(q, mat || this.mat);

		return q;
	},

	// @see: https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
	_getEulerFromQuaternion: function _getEulerFromQuaternion(q) {
		var ysqr = q[1] * q[1],
		    t0 = 2 * (q[3] * q[0] + q[1] * q[2]),
		    t1 = 1 - 2 * (q[0] * q[0] + ysqr),
		    roll = Math.atan2(t0, t1),
		    t2 = 2 * (q[3] * q[1] - q[2] * q[0]);

		// roll (x-axis rotation)


		// pitch (y-axis rotation)

		t2 = t2 > 1 ? 1 : t2;
		t2 = t2 < -1 ? -1 : t2;
		var pitch = Math.asin(t2),
		    t3 = 2 * (q[3] * q[2] + q[0] * q[1]),
		    t4 = 1 - 2 * (ysqr + q[2] * q[2]),
		    yaw = Math.atan2(t3, t4);

		// yaw (z-axis rotation)


		return [roll, pitch, yaw];
	},

	rotateTo: function rotateTo(euler) {

		if (euler === undefined) {
			return this;
		}

		this.euler = [euler[0], euler[1], euler[2]];

		return this;
	},

	rotate: function rotate(rad, axis) {
		if (rad === undefined) {
			return this;
		}

		var mat = this.mat;


		_glMatrix.mat4.rotate(mat, mat, rad, axis);

		this.quaternion = this._getQuaternionFromMatrix();
		this._euler = this._getEulerFromQuaternion(this.quaternion);

		return this;
	},

	// TODO:
	lookAt: function lookAt(eye) {
		var mat = _glMatrix.mat4.create();

		_glMatrix.mat4.lookAt(mat, eye, this._position, this.up);

		_glMatrix.mat4.translate(mat, mat, [this.mat[12], this.mat[13], this.mat[14]]);

		_glMatrix.mat4.copy(this.mat, mat);

		this.quaternion = this._getQuaternionFromMatrix();
		this._euler = this._getEulerFromQuaternion(this.quaternion);

		return this;
	},

	matrix: function matrix(_matrix) {
		this.mat = _matrix;

		return this;
	},

	css: function css() {
		var transform = '',
		    matrix = _glMatrix.mat4.create();

		_glMatrix.mat4.copy(matrix, this.mat);

		// scene obj has a particular matrix
		if (this._isSceneObj) {
			transform = 'translate3d(-50%,-50%,0) ';

			matrix[4] = -matrix[4];
			matrix[5] = -matrix[5];
			matrix[6] = -matrix[6];
			matrix[7] = -matrix[7];
		}

		transform += (0, _matrixToCss2.default)(matrix);

		return transform;
	}
};
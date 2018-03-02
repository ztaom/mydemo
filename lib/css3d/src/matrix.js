import {quat, mat4} from 'gl-matrix';
import matrixToCss from 'matrix-to-css';

// TODO: origin & scale
var epsilon = function ( value ) {
	return Math.abs( value ) < Number.EPSILON ? 0 : value;
};

module.exports = {
	scale: function(v){
		let {mat} = this;
		mat4.scale(mat, mat, v);

		return this;
	},

	_position: function(){
		this.mat = mat4.create();

		this._position = [0, 0, 0];
		this.up = [0, 1, 0];

		Object.defineProperties( this, {
			position: {
				set: (v) => {
					this.mat[12] = v[0];
					this.mat[13] = v[1];
					this.mat[14] = v[2];

					this._position = v;
				},
				get: () => {
					return this._position;
				}
			}
		});
		
		return this;
	},

	translateTo: function(pos){
		if(!pos){
			return this;
		}

		this.position = [pos[0], pos[1], pos[2]];

		return this;
	},

	translate: function(pos){

		if(!pos){
			return this;
		}

		let {mat} = this;
		let cachePos = this._position;

		mat4.translate(mat, mat, pos);

		pos.forEach(function(p, i){
			cachePos[i] += pos[i];
		});

		return this;
	},

	_getQuaternionsFromEuler: (e) => {
		let cos = Math.cos;
		let sin = Math.sin;
		let roll = e[0];
		let pitch = e[1];
		let yaw  = e[2];

		let t0 = cos(yaw * 0.5);
		let t1 = sin(yaw * 0.5);
		let t2 = cos(roll * 0.5);
		let t3 = sin(roll * 0.5);
		let t4 = cos(pitch * 0.5);
		let t5 = sin(pitch * 0.5);

		// let w = t0 * t2 * t4 - t1 * t3 * t5;
		// let x = t0 * t3 * t4 + t1 * t2 * t5;
		// let y = t0 * t2 * t5 - t1 * t3 * t4;
		// let z = t1 * t2 * t4 + t0 * t3 * t5;

		let w = t0 * t2 * t4 + t1 * t3 * t5;
		let x = -(t0 * t3 * t4 - t1 * t2 * t5);
		let y = -(t0 * t2 * t5 + t1 * t3 * t4);
		let z = -(t1 * t2 * t4 - t0 * t3 * t5);

		return [x, y, z, w];
	},

	_rotation: function(){
		this.quaternion = [0, 0, 0, 0];
		this._euler = [0, 0, 0];

		Object.defineProperties( this, {
			euler: {
				set: (v) => {
					let q = this._getQuaternionsFromEuler(v);

					let mat = mat4.create();

					mat4.fromRotationTranslation(this.mat, q, [
						this.mat[12],
						this.mat[13],
						this.mat[14]
					]);

					this._euler = v;
				},
				get: () => {
					return this._euler;
				}
			}
		});
	},

	_getQuaternionFromMatrix: function(mat){
		let q = quat.create();
		mat4.getRotation(q, mat || this.mat);

		return q;
	},

	// @see: https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
	_getEulerFromQuaternion: function(q){
		let ysqr = q[1] * q[1];

		// roll (x-axis rotation)
		let t0 = 2 * (q[3] * q[0] + q[1] * q[2]);
		let t1 = 1 - 2 * (q[0] * q[0] + ysqr);
		let roll = Math.atan2(t0, t1);

		// pitch (y-axis rotation)
		let t2 = 2 * (q[3] * q[1] - q[2] * q[0]);
		t2 = t2 > 1 ? 1 : t2;
		t2 = t2 < -1 ? -1 : t2;
		let pitch = Math.asin(t2);

		// yaw (z-axis rotation)
		let t3 = 2 * (q[3] * q[2] + q[0] *q[1]);
		let t4 = 1 - 2 * (ysqr + q[2] * q[2]);  
		let yaw = Math.atan2(t3, t4);

		return [roll, pitch, yaw];
	},

	rotateTo: function(euler){

		if(euler === undefined){
			return this;
		}

		this.euler = [euler[0], euler[1], euler[2]];

		return this;
	},

	rotate: function(rad, axis){
		if(rad === undefined){
			return this;
		}

		let {mat} = this;

		mat4.rotate(mat, mat, rad, axis);

		this.quaternion = this._getQuaternionFromMatrix();
		this._euler = this._getEulerFromQuaternion(this.quaternion);

		return this;
	},

	// TODO:
	lookAt: function(eye){
		let mat = mat4.create();

		mat4.lookAt(mat, eye, this._position, this.up);

		mat4.translate(mat, mat, [
			this.mat[12],
			this.mat[13],
			this.mat[14]
		]);

		mat4.copy(this.mat, mat);

		this.quaternion = this._getQuaternionFromMatrix();
		this._euler = this._getEulerFromQuaternion(this.quaternion);

		return this;
	},

	matrix: function(matrix){
		this.mat = matrix;

		return this;
	},

	css: function(){
		let transform = '';

		let matrix = mat4.create();
		mat4.copy(matrix, this.mat);

		// scene obj has a particular matrix
		if(this._isSceneObj){
			transform = 'translate3d(-50%,-50%,0) ';

			matrix[4] = -matrix[4];
			matrix[5] = -matrix[5];
			matrix[6] = -matrix[6];
			matrix[7] = -matrix[7];
		}

		transform += matrixToCss(matrix);

		return transform;
	}
}

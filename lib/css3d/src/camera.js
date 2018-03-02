import {mat4} from 'gl-matrix';
import matrixToCss from 'matrix-to-css';
import Obj from  './obj';

export default class Camera extends Obj{
	constructor(props){
		super(props);

		this.containerMatrix = mat4.create();
		this.fov = 45;

		let {style} = this.dom;
		style.transformStyle = style.webkitTransformStyle = 'preserve-3d';
		style.width = '100%';
		style.height = '100%';
	}

	perspective(fov){
		fov = fov || this.fov;

		let scene = this._scene;

		if(scene){
			let perspective = 0.5 * scene._size[1] / Math.tan(fov * 0.5 / 180 * Math.PI);

			this._perspective = perspective;
			scene.dom.style.perspective = scene.dom.style.webkitPerspective = perspective + 'px';
		}

		return this;
	}

	rotate(rad, axis){
		let [x, y, z] = this.position;

		// we have to translate the center of rotation to origin
		this.translate([-x, -y, -z]);

		super.rotate(rad, axis);

		this.translate([x, y, z]);

		return this;

	}

	rotateTo(euler){
		let [x, y, z] = this.position;

		if(euler === undefined){
			return this;
		}

		this.translate([-x, -y, -z]);

		this.euler = [euler[0], euler[1], euler[2]];

		this.translate([x, y, z]);

		return this;
	}

	lookAt(){
		mat4.lookAt(this.mat, eye, center, up);
	}

	// @see: https://github.com/mrdoob/three.js/blob/dev/examples/js/renderers/CSS3DRenderer.js
	css(){
		// opposite the camera 
		mat4.invert(this.containerMatrix, this.mat);

		let transform = 'translate3d(0,0,' + this._perspective + 'px) ';

		let matrix = this.containerMatrix;

		matrix[1] = -matrix[1];
		matrix[5] = -matrix[5];
		matrix[9] = -matrix[9];
		matrix[13] = -matrix[13];

		transform += matrixToCss(matrix);

		transform += ' translate3d(50%, 50%, 0)';

		return transform;
	}
}

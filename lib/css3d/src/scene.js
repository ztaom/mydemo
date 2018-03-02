import Obj from  './obj';
import Camera from  './camera';

export default class Scene extends Obj{
	constructor(props){

		super(props);
	
		let {style} = this.dom;

		style.transformStyle = style.webkitTransformStyle = 'preserve-3d';
		style.overflow = 'hidden';

		this.camera = new Camera();
		this.camera._scene = this;

		super.addChild(this.camera);
	}

	getChildren(){
		return this.camera.children;
	}

	addChild(obj){
		// This is scene obj which has a particular matrix
		obj._isSceneObj = true;
		this.camera.addChild(obj);
		return this;
	}

	removeChild(obj){
		this.camera.removeChild(obj);
		return this;
	}

	css(){
		return null;
	}
}

import Matrix from './matrix';
import Size from './size';
import Texture from './texture';

// TODO:
// lookAt, @see: threejs
// change transform origin
// removeChild
export default class Obj{
	static implements(interfaces){
		for(let prop in interfaces){
			Obj.prototype[prop] = interfaces[prop];
		}
		// Object.assign(Obj.prototype, interfaces);
	}

	constructor(props){
		if(!props){
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

	render(){
		if(!this._isDomInserted){
			this.dom.appendChild(this.docfrag);
			this._isDomInserted = true;
		}

		if(this.children && this.children.length > 0){
			this.children.forEach(function(child){
				child.render();
			});
		}

		this.dom.style.transform = this.dom.style.webkitTransform = this.css();
	}

	getChildren(){
		return this.children;
	}

	addChild(obj){
		if(!this._isDomInserted){
			this.docfrag.appendChild(obj.dom);
		}else{
			this.dom.appendChild(obj.dom);
		}

		this.children.push(obj);

		return this;
	}

	removeChild(obj){
		// TODO
		return this;
	}
}

Obj.implements(Matrix);
Obj.implements(Size);
Obj.implements(Texture);

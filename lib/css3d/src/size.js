module.exports = {
	size: function(w, h){
		let {style} = this.dom;

		style.transformStyle = style.webkitTransformStyle = 'preserve-3d';
		style.width = w + 'px';
		style.height = h + 'px';

		this._size = [w, h];

		return this;
	}
}

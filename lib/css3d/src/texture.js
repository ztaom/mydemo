module.exports = {
	texture: function(color, image){
		let {style} = this.dom;

		if(color){
			style.backgroundColor = color;
		}

		if(image){
			style.backgroundImage = 'url(' + image + ')';
			style.backgroundSize = '100% 100%';
		}

		this._texture = [color, image];

		return this;
	}
}

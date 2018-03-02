'use strict';

module.exports = {
	texture: function texture(color, image) {
		var style = this.dom.style;


		if (color) {
			style.backgroundColor = color;
		}

		if (image) {
			style.backgroundImage = 'url(' + image + ')';
			style.backgroundSize = '100% 100%';
		}

		this._texture = [color, image];

		return this;
	}
};
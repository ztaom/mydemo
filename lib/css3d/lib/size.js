'use strict';

module.exports = {
	size: function size(w, h) {
		var style = this.dom.style;


		style.transformStyle = style.webkitTransformStyle = 'preserve-3d';
		style.width = w + 'px';
		style.height = h + 'px';

		this._size = [w, h];

		return this;
	}
};
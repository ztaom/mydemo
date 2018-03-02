import Element from './element';

/**
 * @class Font
 * @extends {Element}
 */
export default class Font extends Element {
    /**
     * create a font element
     * @override
     * @param {number} width
     * @param {number} height
     * @param {string} textContent
     * @param {string} textAlign [horizontal-align(left/center/right) vertical-align(top/center/bottom)]
     * @return {Font}
     */
    constructor(width, height, textContent, textAlign) {
        super('Font', width, height);

        /**
         * the content of text
         * @type {String}
         */
        this.textContent = textContent;
        /**
         * the align of text
         * @type {String}
         */
        this.textAlign = textAlign;
    }
}
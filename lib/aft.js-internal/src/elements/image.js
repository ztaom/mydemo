import Element from './element';

/**
 * @class SmartImage
 * @extends {Element}
 */
export default class SmartImage extends Element {
    /**
     * create a font element
     * @param {number} width
     * @param {number} height
     * @param {Image|HTMLImageElement|HTMLCanvasElement} texture
     */
    constructor(width, height, texture) {
        super('SmartImage', width, height);

        if (!(texture instanceof Image)
                && !(texture instanceof HTMLImageElement)
                && !(texture instanceof HTMLCanvasElement)) {
            throw new Error('the type of texture should be Image or HTMLImageElement or HTMLCanvasElement');
        }

        /**
         * the texture of image
         * @type {Image|HTMLImageElement|Canvas}
         */
        this.texture = texture;

        this.style.set('background-size', 'contain');
        this.style.set('background-repeat', 'no-repeat');
        this.style.set('background-position-x', 0);
        this.style.set('background-position-y', 0);
    }

    /**
     * image size
     * @type {string}
     */
    get size() {
        return this.style.get('background-size');
    }

    set size(v) {
        return this.style.set('background-size', v);
    }

    /**
     * repeat count of x coords
     * @type {number}
     */
    get repeatX() {
        const repeat = this.style.get('background-repeat');
        if (repeat === 'no-repeat'
            || repeat === 'repeat-y') {
            return 1;
        } else if (repeat === 'repeat-x'
                    || repeat === 'repeat') {
            return Infinity;
        }
    }

    set repeatX(n) {
        if (n !== 1 && n !== Infinity) {
            throw new Error(`"${n}" is not a valid repeat value`);
        }

        const repeat = this.style.get('background-repeat');
        if (repeat === 'no-repeat' && n === Infinity) {
            this.style.set('background-repeat', 'repeat-x');
        } else if (repeat === 'repeat-x' && n === 1) {
            this.style.set('background-repeat', 'no-repeat');
        } else if (repeat === 'repeat-y' && n === Infinity) {
            this.style.set('background-repeat', 'repeat');
        } else if (repeat === 'repeat' && n === 1) {
            this.style.set('background-repeat', 'repeat-y');
        }
    }

    /**
     * repeat count of y coords
     * @type {number}
     */
    get repeatY() {
        const repeat = this.style.get('background-repeat');
        if (repeat === 'no-repeat'
            || repeat === 'repeat-x') {
            return 1;
        } else if (repeat === 'repeat-y'
                    || repeat === 'repeat') {
            return Infinity;
        }
    }

    set repeatY(n) {
        if (n !== 1 && n !== Infinity) {
            throw new Error(`"${n}" is not a valid repeat value`);
        }

        const repeat = this.style.get('background-repeat');
        if (repeat === 'no-repeat' && n === Infinity) {
            this.style.set('background-repeat', 'repeat-y');
        } else if (repeat === 'repeat-y' && n === 1) {
            this.style.set('background-repeat', 'no-repeat');
        } else if (repeat === 'repeat-x' && n === Infinity) {
            this.style.set('background-repeat', 'repeat');
        } else if (repeat === 'repeat' && n === 1) {
            this.style.set('background-repeat', 'repeat-x');
        }
    }

    /**
     * repeat count of x, y coords
     * @type {number[]}
     */
    get repeat() {
        return [this.repeatX, this.repeatY];
    }

    set repeat([x, y]) {
        this.repeatX = x;
        this.repeatY = y || x;
    }

    /**
     * offset of x coords
     * @type {number}
     */
    get offsetX() {
        return parseFloat(this.style.get('background-position-x'));
    }

    set offsetX(x) {
        if (typeof x !== 'number') {
            throw new Error(`${x} is not a valid offset value`);
        }

        this.style.set('background-position-x', x);
    }

    /**
     * offset of y coords
     * @type {number}
     */
    get offsetY() {
        return parseFloat(this.style.get('background-position-y'));
    }

    set offsetY(y) {
        if (typeof y!== 'number') {
            throw new Error(`${y} is not a valid offset value`);
        }

        this.style.set('background-position-y', y);
    }

    /**
     * offset of x, y coords
     * @return {number[] | string[]}
     */
    get offset() {
        return [
            this.offsetX,
            this.offsetY
        ];
    }

    set offset([x, y]) {
        this.offsetX = x;
        this.offsetY = y || x;
    }
}
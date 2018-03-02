import {
    isHex,
    isRgba,
    rgba,
    hex
} from '../libs/color';

const NoCanvasElementError = new Error('set canvas element first');
/**
 * @class Engine
 */
export default class Engine {
    /**
     * create a engine
     */
    constructor(className) {

        /**
         * the name of the class
         * @type {string}
         */
        this.className = className;

        this._flushed = false;

        this._clearColor = 'rgba(255, 255, 255, 1)';

        this._size = [];
    }

    /**
     * if flushed
     * @type {boolean}
     */
    get flushed() {
        return this._flushed;
    }

    set flushed(v) {
        this._flushed = v;
    }

    /**
     * set a canvas element to the engine
     * @param {*} canvasElement
     */
    setCanvasElement(canvasElement) {
        /**
         * @type {*}
         */
        this.canvas = canvasElement;
    }

    /**
     * set the size of canvas
     * @throws {Error} If not attach a element
     * @param {number|object} width a number of width or an object of rect
     * @param {number} [height]
     */
    setCanvasSize(width, height) {
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }

        let w, h;
        if (typeof width === 'object') {
            w = width.width;
            h = width.height;
        } else {
            w = width;
            h = height;
        }

        this._size = [w, h];
    }

    /**
     * set the size of style
     * @throws {Error} If not attach a element
     * @param {number|object} width a number of width or an object of rect
     * @param {number} [height]
     */
    setStyleSize(width, height) {
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }

        let w, h;
        if (typeof width === 'object') {
            w = width.width;
            h = width.height;
        } else {
            w = width;
            h = height;
        }
        /**
         * the width of style
         * @type {number}
         */
        this.styleWidth = w;
        /**
         * the height of style
         * @type {number}
         */
        this.styleHeight = h;
    }

    /**
     * calculate the size scale of canvas
     * @throws {Error} If not attach a element
     */
    resize() {
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }
    }

    /**
     * the width of canvas
     * @return {number}
     */
    get canvasWidth() {
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }

        return this._size[0] || this.styleWidth;
    }

    /**
     * the height of canvas
     * @return {number}
     */
    get canvasHeight() {
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }

        return this._size[1] || this.styleHeight * this.scaleWidth;
    }

    /**
     * the scale ratio of width
     * @return {number}
     */
    get scaleWidth() {
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }

        return this.canvasWidth / this.styleWidth;
    }

    /**
     * the scale ratio of height
     * @return {number}
     */
    get scaleHeight() {
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }

        return this.canvasHeight / this.styleHeight;
    }

    /**
     * clear the canvas
     * @throws {Error} If not attach a element
     */
    clear() {
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }
    }

    /**
     * Set the clear color for canvas.
     * The color string supports `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`
     * @throws {Error} If not attach a element
     * @param {string} color
     */
    setClearColor(color) {
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }
        if (isHex(color)) {
            color = hex(color);
        } else if (isRgba(color)) {
            color = rgba(color);
        }

        this._clearColor = `rgba(${color.join(',')})`;
    }

    /**
     * draw a element
     * @throws {Error} If not attach a element
     * @param  {Element} element
     */
    draw(element) { // eslint-disable-line
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }

        /* istanbul ignore if */
        if (this._flushed === true) {
            this._flushed = false;
        }
    }
    /**
     * draw a buffer of elements
     * @throws {Error} If not attach a element
     * @param  {Array<Element>} buffer
     */
    drawBuffer(buffer) { // eslint-disable-line
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }

        /* istanbul ignore if */
        if (this._flushed === true) {
            this._flushed = false;
        }
    }

    /**
     * flush drawing
     * @throws {Error} If not attach a element
     */
    flush() {
        /* istanbul ignore if */
        if (!this.canvas) {
            throw NoCanvasElementError;
        }

        /* istanbul ignore if */
        if (this._flushed === false) {
            this._flushed = true;
        }
    }

    /**
     * attach an element to the engine
     * @deprecated use "setCanvasElement" instead
     * @param {*} canvasElement
     */
    attachElement(canvasElement) {
        // eslint-disable-next-line
        console.warn('Deprecated. Please use "setCanvasElement" instead');
        this.setCanvasElement(canvasElement);
    }

    /**
     * set the size of canvas
     * @deprecated use "setCanvasSize" instead
     * @throws {Error} If not attach a element
     * @param {number} size
     */
    setSize(size) {
        // eslint-disable-next-line
        console.warn('Deprecated. Please use "setCanvasSize" instead');
        this.setCanvasSize(size);
    }

    /**
     * the scale ratio of viewport to canvas
     * @deprecated use "scaleWidth" instead
     * @return {number}
     */
    get scaling() {
        // eslint-disable-next-line
        console.warn('Deprecated. Please use "scaleWidth" instead');
        return this.scaleWidth;
    }

    /**
     * the width of viewport
     * @deprecated use "canvasWidth" instead
     * @return {number}
     */
    get viewportWidth() {
        // eslint-disable-next-line
        console.warn('Deprecated. Please use "canvasWidth" instead');
        return this.canvasWidth;
    }

    /**
     * the height of viewport
     * @deprecated use "canvasHeight" instead
     * @return {number}
     */
    get viewportHeight() {
        // eslint-disable-next-line
        console.warn('Deprecated. Please use "canvasHeight" instead');
        return this.canvasHeight;
    }
}
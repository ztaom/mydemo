import Engine from './engine';
import generateStyle from './styleGenerator';
import * as s2c from './style2canvas';

function setStyleSize(engine) {
    const rect = engine.canvas.getBoundingClientRect();
    if (rect.width !== 0
            && rect.height !== 0) {
        engine.setStyleSize(rect.width, rect.height);
    } else {
        throw new Error('Please append the canvasElement into document firstly.');
    }
}

/**
 * @class Canvas2D
 * @extends {Engine}
 */
export default class Canvas2D extends Engine {
    /**
     * create a engine of canvas2d
     * @constructor
     */
    constructor() {
        super('Canvas2D');
        /**
         * if use gpu accelerate
         * @type {boolean}
         */
        this.useGPUAccelerated = true;

        this._offscreen = document.createElement('canvas');
        this._offscreenRender = this._offscreen.getContext('2d');
    }

    _updateCanvasViewport() {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this._offscreen.width = this.canvasWidth;
        this._offscreen.height = this.canvasHeight;
    }

    /**
     * set a canvas element to the engine
     * @override
     * @param {*} canvasElement
     */
    setCanvasElement(canvasElement) {
        super.setCanvasElement(canvasElement);
        this._canvasRender = this.canvas.getContext('2d');
    }

    /**
     * set the size of canvas
     * @override
     * @throws {Error} If not attach a element
     * @param {number|object} width a number of width or an object of rect
     * @param {number} [height]
     */
    setCanvasSize(width, height) {
        super.setCanvasSize(width, height);
        // this._updateCanvasViewport();
    }

    /**
     * clear the canvas
     * @override
     * @throws {Error} If not attach a element
     */
    clear() {
        super.clear();
        this._offscreenRender.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this._canvasRender.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    /**
     * calculate the size scale of canvas
     * @override
     * @throws {Error} If not attach a element
     */
    resize() {
        super.resize();
        setStyleSize(this);
        this._updateCanvasViewport();
    }

    _computingStyle(element, parent) {
        let viewport;
        if (parent && parent.getBoundingRect) {
            const parentBox = parent.getBoundingRect();
            viewport = {
                width: parentBox.width,
                height: parentBox.height
            };
        } else {
            viewport = {
                width: this.canvasWidth,
                height: this.canvasHeight
            };
        }

        element.viewport = viewport;
        element.computedStyle = generateStyle(element, viewport);
    }

    _renderStyle({
        computedStyle: style
    }, {
        render
    }) {
        const width = parseFloat(style.get('width'));
        const height = parseFloat(style.get('height'));
        const left = parseFloat(style.get('left'));
        const top = parseFloat(style.get('top'));

        const rect = {
            width,
            height,
            left,
            top
        };

        s2c.setTransform({style, rect, render});

        s2c.setOpacity({style, rect, render});

        s2c.setBackground({style, rect, render});

        // s2c.setBackgroundWithPattern({style, rect, render});
    }

    _groupCached(group) {
        for (const child of group.children) {
            if (child.cached === false) {
                return false;
            }
        }
        return true;
    }

    _render(element, parent) {
        const {
            render
        } = parent;

        render.save();

        if (element.className === 'Group') {
            if (element.cached === false) {
                this._computingStyle(element, parent);
            }

            render.save();

            this._renderStyle(element, parent);

            if (!element.canvas) {
                const {
                    computedStyle,
                    viewport
                } = element;

                element.canvas = document.createElement('canvas');
                element.render = element.canvas.getContext('2d');

                const width = parseFloat(computedStyle.get('width'));
                const height = parseFloat(computedStyle.get('height'));
                const overflow = computedStyle.get('overflow');

                if (overflow === 'hidden') {
                    element.canvas.width = width;
                    element.canvas.height = height;
                } else {
                    element.canvas.width = viewport.width;
                    element.canvas.height = viewport.height;
                }
            }

            element.render.clearRect(0, 0, element.canvas.width, element.canvas.height);

            if (!this._groupCached(element)) {
                for (const child of element.children) {
                    this._render(child, element);
                }
            }

            render.drawImage(element.canvas, 0, 0);
            render.restore();
        } else {
            if (element.cached === false) {
                this._computingStyle(element, parent);
            }

            render.save();
            this._renderStyle(element, parent);
            render.restore();
        }
    }

    /**
     * draw a element on canvas
     * @override
     * @throws {Error} If not attach a element
     * @param {AbstractElement} element
     */
    draw(element) {
        super.draw(element);

        this._render(element, {
            canvas: this._canvas,
            render: this._canvasRender
        });
    }

    /**
     * draw a buffer of elements on canvas
     * @override
     * @throws {Error} If not attach a element
     * @param {Array<AbstractElement>} buffer
     */
    drawBuffer(buffer) {
        super.drawBuffer(buffer);

        this._offscreenRender.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        for (const element of buffer) {
            this._render(element, {
                canvas: this._offscreen,
                render: this._offscreenRender
            });
        }
    }

    /**
     * flush drawing
     * @override
     * @throws {Error} If not attach a element
     */
    flush() {
        super.flush();

        this._canvasRender.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this._canvasRender.save();
        this._canvasRender.fillStyle = this._clearColor;
        this._canvasRender.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this._canvasRender.restore();
        this._canvasRender.drawImage(this._offscreen, 0, 0);
    }
}

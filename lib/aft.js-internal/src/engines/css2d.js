/**
 * @external {DocumentFragment} https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
 */
import Set from 'babel-runtime/core-js/set';
import Engine from './engine';
import generateStyle from './styleGenerator';

function setStyleSize(engine) {
    const rect = engine.canvas.getBoundingClientRect();
    if (rect.width !== 0
            && rect.height !== 0) {
        engine.setStyleSize(rect.width, rect.height);
    } else {
        throw new Error('Please append the canvasElement into document firstly.');
    }
}

function appendStyle(id, content) {
    if (!document.getElementById(`for-${id}`)) {
        const parent = document.querySelector('head')
                        || document.body
                        || document.documentElement;
        const style = document.createElement('style');
        style.textContent = content;
        style.setAttribute('id', `for-${id}`);
        parent.appendChild(style);
    }
}

const CircleClipPathRegEx = /circle\(([\d\.]+)px\)/;
function parseCircleStyle(styleMap) {
    if (styleMap.has('clip-path')) {
        const [
            ,
            radius
        ] = styleMap.get('clip-path').match(CircleClipPathRegEx);

        styleMap.delete('clip-path');
        styleMap.set('border-radius', `${radius}px`);
    }
    return styleMap;
}

const EllipseClipPathRegEx = /ellipse\(([\d\.]+)px ([\d\.]+)px\)/;
function parseEllipseStyle(styleMap) {
    if (styleMap.has('clip-path')) {
        const [
            ,
            hRadius,
            vRadius
        ] = styleMap.get('clip-path').match(EllipseClipPathRegEx);

        styleMap.delete('clip-path');
        styleMap.set('border-radius', `${hRadius}px/${vRadius}px`);
    }
    return styleMap;
}

const TriangleClipPathRegEx = /polygon\([\d\.]+px [\d\.]+px, ([\d\.]+)px ([\d\.]+)px, ([\d\.]+)px [\d\.]+px\)/;
function parseTriangleStyle(styleMap) {
    if (styleMap.has('clip-path')) {
        const [
            ,
            width,
            bottomBorderWidth,
            leftBorderWidth
        ] = styleMap.get('clip-path').match(TriangleClipPathRegEx);

        const backgroundColor = styleMap.get('background-color');
        styleMap.delete('clip-path');
        styleMap.set('background-color', 'transparent');
        styleMap.set('border-bottom', `${parseFloat(Number(bottomBorderWidth).toFixed(6))}px solid ${backgroundColor}`);
        styleMap.set('border-left', `${parseFloat(Number(leftBorderWidth).toFixed(6))}px solid transparent`);
        styleMap.set('border-right', `${parseFloat((Number(width) - Number(leftBorderWidth)).toFixed(6))}px solid transparent`);
        styleMap.set('border-top', '0px');
    }
    return styleMap;
}

function parseBackgroundImage(domElement, styleMap) {
    let image;
    if (styleMap.has('background-image')) {
        image = styleMap.get('background-image');
    }

    let src;
    if (image instanceof Image
            || image instanceof HTMLImageElement) {
        src = image.src;
    } else if (typeof image === 'string') {
        const matched = image.match(/url\(["']?([^()]+)["']?\)/);
        if (matched) {
            src = matched[1];
        }
    } else if (image) {
        throw new Error(`not support the image type "${image.toString()}"`);
    }

    if (src) {
        styleMap.delete('background-image');

        const key = `img-${encodeURIComponent(src)}`;
        if (domElement.getAttribute('img-hash') !== key) {
            domElement.setAttribute('img-hash', key);
            appendStyle(key, `
                [img-hash="${key}"] {
                    background-image: url(${src})!important;
                }
            `);
        }
    }

    return styleMap;
}

function serializeStyleMap(styleMap) {
    return [...styleMap]
                .filter(([, value]) =>
                    value !== null && value !== undefined)
                .map(([name, value]) =>
                    `${name}:${value}` )
                .join(';');
}

/**
 * @class CSS2D
 * @extends {Engine}
 */
export default class CSS2D extends Engine {
    /**
     * create a engine of css2d
     * @constructor
     */
    constructor() {
        super('CSS2D');

        /**
         * a fragment of elements
         * @private
         * @type {DocumentFragment}
         */
        this._bufferFragment = void 0;

        /**
         * a container for keep dom alive
         * @type {Array<HTMLElement>}
         */
        this._recycleContainer = [];

        /**
         * a container of elements
         * @private
         * @type {Set<HTMLElement>}
         */
        this._elementsContainer = new Set();

        /**
         * if use gpu accelerate
         * @type {boolean}
         */
        this.useGPUAccelerated = true;
    }

    /**
     * clear the canvas
     * @override
     * @throws {Error} If not attach a element
     */
    clear() {
        super.clear();
        this.canvas.innerHTML = '';
    }

    /**
     * calculate the size scale of canvas
     * @override
     * @throws {Error} If not attach a element
     */
    resize() {
        super.resize();
        setStyleSize(this);
    }

    /**
     * Set the clear color for canvas.
     * The color string supports `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`
     * @override
     * @throws {Error} If not attach a element
     * @param {string} color
     */
    setClearColor(color) {
        super.setClearColor(color);
        this.canvas.style.backgroundColor = this._clearColor;
    }

    _computingStyle(element, parent) {
        let canvasSize;
        if (parent && parent.getBoundingRect) {
            const parentBox = parent.getBoundingRect();
            canvasSize = {
                width: parentBox.width,
                height: parentBox.height
            };
        } else {
            canvasSize = {
                width: this.canvasWidth,
                height: this.canvasHeight
            };
        }

        element.computedStyle = generateStyle(element, canvasSize, this.scaleWidth, this.scaleHeight);
    }

    _renderDOMElement(element, parent) {
        const {
            computedStyle,
            className
        } = element;

        let {
            domElement
        } = element;

        if (!domElement) {
            if (this._recycleContainer.length > 0) {
                domElement = this._recycleContainer.shift();
            } else {
                domElement = document.createElement('div');
            }
            element.domElement = domElement;
        }

        switch (className) {
            case 'Circle':
                parseCircleStyle(computedStyle);
                break;
            case 'Ellipse':
                parseEllipseStyle(computedStyle);
                break;
            case 'Triangle':
                parseTriangleStyle(computedStyle);
                break;
            case 'Font':
                if (domElement.textContent !== element.textContent) {
                    domElement.textContent = element.textContent;
                }
                break;
            case 'SmartImage':
                computedStyle.set('background-image', element.texture);
                break;
            case 'Rectangle':
            default:
                break;
        }

        parseBackgroundImage(domElement, computedStyle);

        domElement.style.cssText = serializeStyleMap(computedStyle);

        if (!domElement.parentNode ||
                domElement.parentNode !== parent.domElement &&
                !(parent.domElement instanceof DocumentFragment)) {
            parent.domElement.appendChild(domElement);
        }
    }

    _render(element, parent) {
        if (!this._elementsContainer.has(element)) {
            this._elementsContainer.add(element);
        }

        if (element.cached === false) {
            element.cached = true;

            this._computingStyle(element, parent);
            this._renderDOMElement(element, parent);
        }

        if (element.className === 'Group') {
            for (const child of element.children) {
                this._render(child, element);
            }
        }
    }

    /**
     * draw a element on canvas
     * @override
     * @throws {Error} If not attach a element
     * @param {Element} element
     */
    draw(element) {
        super.draw(element);

        this._render(element, {
            domElement: this.canvas
        });
    }

    /**
     * draw a buffer of elements on canvas
     * @override
     * @throws {Error} If not attach a element
     * @param {Array<Element>} buffer
     */
    drawBuffer(buffer) {
        super.drawBuffer(buffer);

        if (!this._bufferFragment) {
            this._bufferFragment = document.createDocumentFragment();
        }

        for (const element of buffer) {
            this._render(element, {
                domElement: this._bufferFragment
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

        // append buffer fragmlent
        if (this._bufferFragment &&
                this._bufferFragment.childNodes.length) {
            this.canvas.appendChild(this._bufferFragment);
        }
        this._bufferFragment = void 0;

        // remove dettached elements
        const dettachedElements = [];
        for (const element of this._elementsContainer) {
            if (element.life === 'dettached') {
                dettachedElements.push(element);

                const {domElement} = element;

                if (domElement.parentNode) {
                    domElement.parentNode.removeChild(domElement);
                }

                if (element.recycle === true) {
                    domElement.innerHTML = '';
                    for (const attr in domElement.attributes) {
                        domElement.removeAttribute(attr.nodeName);
                    }
                    this._recycleContainer.push(domElement);
                }
            }
        }

        dettachedElements.forEach(element => this._elementsContainer.delete(element));
    }
}

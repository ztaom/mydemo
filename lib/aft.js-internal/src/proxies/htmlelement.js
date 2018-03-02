import Map from 'babel-runtime/core-js/map';
import Set from 'babel-runtime/core-js/set';
import kebabCase from 'lodash/kebabCase';
import camelCase from 'lodash/camelCase';

const transformKeyWords = new Set([
    'translateX',
    'translateY',
    'translateZ',
    'rotateX',
    'rotateY',
    'rotateZ',
    'rotate',
    'rotate3d',
    'scaleX',
    'scaleY',
    'scaleZ',
    'skewX',
    'skewY',
    'skewZ'
]);

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

function fixBackgroundImage(domElement, backgroundImage) {
    let src;

    const matched = backgroundImage.match(/url\(["']?([^()]+)["']?\)/);
    if (matched) {
        src = matched[1];
    }

    if (src) {
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
}

class HTMLElementProxy extends Map {
    constructor(element) {
        super();

        this._element = element;
        this._initialCssText = this._element.style.cssText;
        this._computedStyle = getComputedStyle(element);
        if (this._computedStyle.transform !== 'none' &&
            this._computedStyle.transform !== undefined) {
            // eslint-disable-next-line
            console.warn('Do Not Support An Element With Inital Transform Value Yet!');
        }
    }

    get(name) {
        name = camelCase(name);
        if (super.has(name)) {
            return super.get(name);
        } else {
            return this._computedStyle[name];
        }
    }

    set(name, value) {
        name = camelCase(name);
        super.set(name, value);
        return this;
    }

    has(name) {
        return super.has(name) || this._computedStyle[name] !== undefined;
    }

    flush() {
        const transformText = [];
        const cssText = [];
        const keys = [...this.keys()];
        keys.filter(key => {
            if (transformKeyWords.has(key)) {
                transformText.push(`${key}(${super.get(key)})`);
                return false;
            }
            if (key === 'backgroundImage') {
                fixBackgroundImage(this._element, super.get(key));
                return false;
            }
            return true;
        }).forEach(key => {
            cssText.push(`${kebabCase(key)}:${super.get(key)}`);
        });
        if (this._initialCssText) {
            cssText.unshift(this._initialCssText);
        }
        if (transformText.length > 0) {
            cssText.push(`-webkit-transform:${transformText.join(' ')}`);
            cssText.push(`transform:${transformText.join(' ')}`);
        }
        this._element.style.cssText = cssText.join(';');
    }
}

const cacheKey = '__html_element_proxy_to_map__';
export default function fromHTMLElement(element) {
    if (!element.hasOwnProperty(cacheKey)) {
        Object.defineProperty(element, cacheKey, {
            value: new HTMLElementProxy(element),
            enumerable: false
        });
    }
    return element[cacheKey];
}
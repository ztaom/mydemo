import Map from 'babel-runtime/core-js/map';
import Set from 'babel-runtime/core-js/set';

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

class ElementProxy extends Map {
    constructor(element) {
        super();

        this._element = element;
    }

    get(name) {
        let value;
        if (transformKeyWords.has(name)) {
            value = this._element.transform.get(name);
        } else {
            value = this._element.style.get(name);
        }
        return value;
    }

    set(name, value) {
        if (transformKeyWords.has(name)) {
            this._element.transform.set(name, value);
        } else {
            this._element.style.set(name, value);
        }
        return this;
    }

    has(name) {
        if (transformKeyWords.has(name)) {
            return this._element.transform.has(name);
        }
        return this._element.style.has(name);
    }
}

const cacheKey = '_element_proxy_to_map__';
export default function fromElement(element) {
    if (!element.hasOwnProperty(cacheKey)) {
        Object.defineProperty(element, cacheKey, {
            value: new ElementProxy(element),
            enumerable: false
        });
    }
    return element[cacheKey];
}
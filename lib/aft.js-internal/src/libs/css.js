import Map from 'babel-runtime/core-js/map';
import kebabCase from 'lodash/kebabCase';
import camelCase from 'lodash/camelCase';
import css2mat4 from 'css-transform-to-mat4';
import {
    isHex,
    isRgba,
    hsla,
    rgba2hsla,
    hex2hsla
} from './color';
import {accuracy} from './math';

const NumberRegExp = /^[\d\-\.]+$/;
/**
 * numberify a value
 * @param {*} value
 * @return {*}
 */
export function numberify(value) {
    let val;

    if (value !== null
            && value !== undefined) {
        if (typeof value === 'string') {
            if (isHex(value)) {
                val = hex2hsla(value).map(v => accuracy(v));
            } else if (isRgba(value)) {
                val = rgba2hsla(value).map(v => accuracy(v));
            } else if (NumberRegExp.test(value)) {
                val = accuracy(value);
            } else if (value.indexOf(' ') > 0) {
                val = value.split(/\s+/g).map(v => numberify(v));
            } else {
                val = value.toString();
            }
        } else {
            val = value.valueOf();
        }
    }

    return val;
}

/**
 * stringify a value
 * @param {*} value
 * @param {string} [type] color|number|string
 * @param {string} [unit='px']
 */
export function stringify(value, type, unit = 'px') {
    let val;

    if (value !== null
            && value !== undefined) {
        if (type === 'color') {
            val = `rgba(${hsla(value).join(',')})`;
        } else if (type === 'number') {
            val = `${accuracy(value)}${unit}`;
        } else if (type === 'string') {
            val = value.toString();
        } else {
            val = value;
        }
    }

    return val;
}

// transform keys
const TRANSLATE = new Map([
    ['translateX', '0px'],
    ['translateY', '0px'],
    ['translateZ', '0px']
]);

const ROTATE = new Map([
    ['rotateX', '0deg'],
    ['rotateY', '0deg'],
    ['rotateZ', '0deg']
]);

const SKEW = new Map([
    ['skewX', '0deg'],
    ['skewY', '0deg']
]);

const SCALE = new Map([
    ['scaleX', '1'],
    ['scaleY', '1'],
    ['scaleZ', '1']
]);

const TRANSFORM = new Map([
    ...TRANSLATE,
    ...ROTATE,
    ...SKEW,
    ...SCALE
].map(([key, value]) => [key, numberify(value)]));

// other styles
const COLOR_UNIT = new Map([
    ['color', 'rgba(0,0,0,1)'],
    ['background-color', 'rgba(0,0,0,0)'],
    ['border-left-color', 'rgba(0,0,0,0)'],
    ['border-top-color', 'rgba(0,0,0,0)'],
    ['border-right-color', 'rgba(0,0,0,0)'],
    ['border-bottom-color', 'rgba(0,0,0,0)']
]);

const NUMBER_UNIT = new Map([
    ['font-size', '16px'],
    ['line-height', '16px'],
    ['border-radius', '0px'],
    ['border-top-left-radius', '0px'],
    ['border-top-right-radius', '0px'],
    ['border-bottom-right-radius', '0px'],
    ['border-bottom-left-radius', '0px'],
    ['border-left-width', '0px'],
    ['border-top-width', '0px'],
    ['border-right-width', '0px'],
    ['border-bottom-width', '0px'],
    ['background-position-x', '0px'],
    ['background-position-y', '0px']
]);

const NO_UNIT = new Map([
    ['opacity', '1']
]);

const OTHER = new Map([
    ['background-image', 'none'],
    ['background-position', '0px 0px'],
    ['background-size', 'contain'],
    ['background-repeat', 'repeat'],
    ['-webkit-transform-origin', '50% 50% 0%'],
    ['transform-origin', '50% 50% 0%'],
    ['border-left-style', 'none'],
    ['border-top-style', 'none'],
    ['border-right-style', 'none'],
    ['border-bottom-style', 'none'],
    ['font-weight', 'normal']
]);

const STYLE = new Map([
    ...COLOR_UNIT,
    ...NUMBER_UNIT,
    ...NO_UNIT,
    ...OTHER
].map(([key, value]) => [key, numberify(value)]));


/**
 * map for css style
 * @extends {Map}
 */
class CSSMap extends Map{
    /**
     * create a css map
     * @param  {Array} entries
     * @return {CSSMap}
     */
    constructor(entries) {
        super();

        this._normalizer = this.constructor.normalizer;

        this._defaultMap = this.constructor.defaultMap;

        /**
         * if modified
         * @type {Boolean}
         */
        this.modified = false;

        if (entries) {
            entries.forEach(entry => this.set(...entry));
        }
    }

    /**
     * get the normalized value by name
     * @override
     * @param  {String} name
     * @return {String|Number}
     */
    get(name) {
        const [normalizedName] = this._normalizer([name]);
        let value = super.get(normalizedName);
        if (value === undefined) {
            value = this._defaultMap.get(normalizedName);
        }
        return value;
    }

    /**
     * set the value by name
     * @override
     * @param {String} name
     * @param {String|Number} value
     * @return {CSSMap} current context
     */
    set(name, value) {
        const [normalizedName] = this._normalizer([name]);
        this.modified = true;
        return super.set(normalizedName, numberify(value));
    }

    /**
     * get a normalized css map
     * @return {Map}
     */
    normalize() {
        const entries = [...this.entries()].map(
            ([name, value]) => this._normalizer([name, value])
        );
        const normalizedMap = new Map(entries);
        return normalizedMap;
    }

    /**
     * if has a name which will be normalized
     * @override
     * @param  {String} name
     * @return {Boolean}
     */
    has(name) {
        const [normalizedName] = this._normalizer([name]);
        return super.has(normalizedName);
    }

    /**
     * delete the value by name
     * @param  {String} name
     * @return {CSSMap} current context
     */
    delete(name) {
        const [normalizedName] = this._normalizer([name]);
        this.modified = true;
        return super.delete(normalizedName);
    }
}

/**
 * a style map
 * @extends {CSSMap}
 */
export class StyleMap extends CSSMap {}

StyleMap.defaultMap = STYLE;
StyleMap.normalizer = ([name, value]) => {
    name = kebabCase(name);

    if (!STYLE.has(name)) {
        throw new Error(`${name} is not a valid style name`);
    }

    if (value !== null && value !== undefined) {
        if (COLOR_UNIT.has(name)) {
            value = stringify(value, 'color');
        } else if (NUMBER_UNIT.has(name)) {
            value = stringify(value, typeof value);
        } else if (NO_UNIT.has(name)) {
            value = stringify(value, 'string');
        } else if (value instanceof Array) {
            value = value.map(v => stringify(v, 'string')).join(' ');
        }
    }

    return [name, value];
};

/**
 * a transform map
 * @extends {CSSMap}
 */
export class TransformMap extends CSSMap {
    toMatrix(filter) {
        const cssText = [...this.normalize()].map(item => {
            if (filter) {
                item = filter(item);
            }
            const [name, value] = item;
            return `${name}(${value})`;
        }).join(' ');

        return css2mat4(cssText).map(i => accuracy(i));
    }
}

TransformMap.defaultMap = TRANSFORM;
TransformMap.normalizer = ([name, value]) => {
    name = camelCase(name);

    if (!TRANSFORM.has(name)) {
        throw new Error(`${name} is not a valid transform key`);
    }

    if (value !== null && value !== undefined) {
        if (SCALE.has(name)) {
            value = stringify(value, 'string');
        } else if (ROTATE.has(name)
                        || SKEW.has(name)){
            value = stringify(value, 'number', 'deg');
        } else {
            value = stringify(value, 'number');
        }
    }

    return [name, value];
};
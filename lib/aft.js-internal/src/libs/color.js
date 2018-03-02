import parseColor from 'pure-color/parse';
import rgb2hsl from 'pure-color/convert/rgb2hsl';
import hsl2rgb from 'pure-color/convert/hsl2rgb';

const hexColor4RegEx = /^\#[0-9A-F][0-9A-F][0-9A-F][0-9A-F]?$/i;
const hexColor8RegEx = /^\#[0-9A-F]{2}[0-9A-F]{2}[0-9A-F]{2}(?:[0-9A-F]{2})?$/i;
const rgbColorRegEx = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
const rgbaColorRegEx = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d\.]+\s*\)$/;
const hslColorRegEx = /^hsl\(\s*[\d\-\.]+\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%\s*\)$/;
const hslaColorRegEx = /^hsla\(\s*[\d\-\.]+\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+\s*\)$/;

/**
 * if is a hex color
 * @param  {string} hexColor #rrggbbaa or #rrggbb or #rgba or #rgb
 * @return {boolean}
 */
export function isHex(hexColor) {
    return hexColor8RegEx.test(hexColor) ||
                hexColor4RegEx.test(hexColor);
}

/**
 * if is a rgba color
 * @param {string} rgbaColor rgba(r, g, b, a) or rgb(r, g, b)
 * @return {boolean}
 */
export function isRgba(rgbaColor) {
    return rgbaColorRegEx.test(rgbaColor)
            || rgbColorRegEx.test(rgbaColor);
}

/**
 * if is a hsla color
 * @param {string} hslaColor hsla(h, s, l, a) or hsl(h, s, l)
 * @return {boolean}
 */
export function isHsla(hslaColor) {
    return hslaColorRegEx.test(hslaColor)
            || hslColorRegEx.test(hslaColor);
}

function normalizeRGBA(rgba, type) {
    const [r, g, b, a = 1] = rgba;
    let rgb;
    if (type === 'webgl') {
        rgb = [r, g, b].map(i => i / 255);
    } else {
        rgb = [r, g, b].map(i => parseInt(i));
    }

    return [...rgb, a];
}

/**
 * convert rgba color to [r, g, b, a]
 * @param {string} rgbaColor rgba(r, g, b, a) or rgb(r, g, b)
 * @param {string} [type='css'] css/webgl
 * @return {Array<number>} [r, g, b, a]
 */
export function rgba(rgbaColor, type = 'css') {
    if (typeof rgbaColor === 'string') {
        rgbaColor = parseColor.rgb(rgbaColor);
    }

    return normalizeRGBA(rgbaColor, type);
}

/**
 * convert hex color to [r, g, b, a]
 * @param {string} hexColor #rrggbbaa or #rrggbb or #rgba or #rgb
 * @param {string} [type='css'] css/webgl
 * @return {Array<number>} [r, g, b, a]
 */
export function hex(hexColor, type = 'css') {
    let rgb;
    let a;

    if (hexColor.length === 4 || hexColor.length === 5) {
        rgb = parseColor.hex(hexColor.substring(0, 4));
        const char = hexColor.charAt(4) || 'F';
        a = parseInt(`${char}${char}`, 16) / 255;
    } else if (hexColor.length === 7 || hexColor.length === 9) {
        rgb = parseColor.hex(hexColor.substring(0, 7));
        a = parseInt(hexColor.substring(7, 9) || 'FF', 16) / 255;
    }

    return normalizeRGBA([...rgb, a], type);
}

/**
 * convert hsla color to [r, g, b, a];
 * @param {string} hslaColor hsla(h, s, l, a) or hsl(h, s, l)
 * @param {string} [type='css'] css/webgl
 * @return {Array} [r, g, b, a]
 */
export function hsla(hslaColor, type = 'css') {
    if (typeof hslaColor === 'string') {
        hslaColor = parseColor.hsl(hslaColor);
    }

    const rgba = [...hsl2rgb(hslaColor), hslaColor[3]];
    return normalizeRGBA(rgba, type);
}

/**
 * convert rgba color to [h, s, l, a]
 * @param {string} rgbaColor rgba(r, g, b, a) or rgb(r, g, b)
 * @param {string} [type='css'] css/webgl
 * @return {Array} [h, s, l, a]
 */
export function rgba2hsla(rgbaColor) {
    rgbaColor = rgba(rgbaColor);
    return [...rgb2hsl(rgbaColor), rgbaColor[3]];
}

/**
 * convert hex color to [h, s, l, a]
 * @param {string} hexColor #rrggbbaa or #rrggbb or #rgba or #rgb
 * @param {string} [type='css'] css/webgl
 * @return {Array} [h, s, l, a]
 */
export function hex2hsla(hexColor) {
    return rgba2hsla(hex(hexColor));
}
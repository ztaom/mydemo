import Map from 'babel-runtime/core-js/map';
import Set from 'babel-runtime/core-js/set';
import {
    accuracy
} from './math';
import {
    isHex,
    isRgba,
    hsla,
    rgba2hsla,
    hex2hsla
} from './color';

const UnitRegEx = /^([\d\-\.]+)([a-z%]*)$/;

function extractUnitValue(value) {
    const matched = value.match(UnitRegEx);

    if (matched) {
        return [parseFloat(matched[1]), matched[2]];
    }
}

function color(sVal, eVal, percent) {
    let val;
    let sColor;
    let eColor;

    if (isHex(sVal)) {
        sColor = hex2hsla(sVal);
    } else if (isRgba(sVal)) {
        sColor = rgba2hsla(sVal);
    }

    if (isHex(eVal)) {
        eColor = hex2hsla(eVal);
    } else if (isRgba(eVal)) {
        eColor = rgba2hsla(eVal);
    }

    if (sColor && eColor) {
        val = `rgba(${hsla(array(sColor, eColor, percent)).join(',')})`;
    }

    return val;
}

function unit(sVal, eVal, percent) {
    let val;

    const sUnit = extractUnitValue(sVal);
    const eUnit = extractUnitValue(eVal);

    if (sUnit && eUnit && sUnit[1] === eUnit[1]) {
        val = `${sUnit[0] + (eUnit[0] - sUnit[0]) * percent}${eUnit[1]}`;
    }

    return val;
}

function string(sVal, eVal, sType, eType, percent) {
    let val;

    if (sType === 'string'
            && eType === 'string') {
        val = unit(sVal, eVal, percent)
                || color(sVal, eVal, percent);
    }

    return val;
}

function number(sVal, eVal, sType, eType, percent) {
    let val;

    if (sType === 'number'
            && eType === 'number') {
        val = accuracy(sVal + (eVal - sVal) * percent);
    }

    return val;
}

function hybrid(sVal, eVal, sType, eType, percent) {
    let val;
    let sUnit;
    let eUnit;

    if (sType !== eType
            && (sType === 'string' || sType === 'number')
            && (eType === 'string' || eType === 'number')) {

        sUnit = extractUnitValue(String(sVal));
        eUnit = extractUnitValue(String(eVal));

        if (sUnit && eUnit && (sUnit[1] === '' || eUnit[1] === '')) {
            val = `${sUnit[0] + (eUnit[0] - sUnit[0]) * percent}${eUnit[1] || sUnit[1]}`;
        }
    }

    return val;
}

/**
 * do simple interpolation
 * @param  {number|string} sVal
 * @param  {number|string} eVal
 * @param  {number} percent
 * @return {number|string}
 */
export function simple(sVal, eVal, percent) {
    const sType = typeof sVal;
    const eType = typeof eVal;
    let val = string(sVal, eVal, sType, eType, percent)
                || number(sVal, eVal, sType, eType, percent);

    if (val === null || val === undefined) {
        val = hybrid(sVal, eVal, sType, eType, percent) ||
                (percent < 1 ? sVal : eVal);
    }

    return val;
}

function array(sVal, eVal, percent, deeply = false) {
    let val;

    if (sVal instanceof Array
                && eVal instanceof Array
                && sVal.length === eVal.length) {
        val = [];
        const len = eVal.length;

        for (let i = 0; i < len; i++) {
            let v;
            if (deeply) {
                v = complex(sVal[i], eVal[i], percent, deeply);
            } else {
                v = simple(sVal[i], eVal[i], percent);
            }
            val.push(v);
        }
    }

    return val;
}

function set(sVal, eVal, percent, deeply = false) {
    let val;

    if (sVal instanceof Set
                && eVal instanceof Set
                && sVal.size === eVal.size) {
        val = new Set();
        const size = eVal.size;
        const sArr = [...sVal];
        const eArr = [...eVal];

        for (let i = 0; i < size; i++) {
            let v;
            if (deeply) {
                v = complex(sArr[i], eArr[i], percent, deeply);
            } else {
                v = simple(sArr[i], eArr[i], percent);
            }
            val.add(v);
        }
    }

    return val;
}

function map(sVal, eVal, percent, deeply = false) {
    let val;

    if (sVal instanceof Map
                && eVal instanceof Map) {
        val = new Map();

        eVal.forEach((value, key) => {
            let v;
            if (sVal.has(key) && deeply) {
                v = complex(sVal.get(key), value, percent, deeply);
            } else {
                v = simple(sVal.get(key), value, percent);
            }
            val.set(key, v);
        });
    }

    return val;
}

/**
 * do complicated interpolation, set deeply true if want
 * @param  {number|string|Array|Set|Map} sVal
 * @param  {number|string|Array|Set|Map} eVal
 * @param  {number} percent
 * @param  {boolean} [deeply = false]
 * @return {number|string|Array|Set|Map}
 */
export function complex(sVal, eVal, percent, deeply = false) {
    return array(sVal, eVal, percent, deeply)
            || set(sVal, eVal, percent, deeply)
            || map(sVal, eVal, percent, deeply)
            || simple(sVal, eVal, percent, deeply);
}
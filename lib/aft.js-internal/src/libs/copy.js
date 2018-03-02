import Map from 'babel-runtime/core-js/map';
import Set from 'babel-runtime/core-js/set';

/**
 * copy the source
 * @param {object} source
 * @param {boolean} deeply
 */
export default function copy(source, deeply) {
    if (source === undefined
         || source === null) {
        return source;
    }

    const copyValue = v => {
        if (deeply) {
            return copy(v, deeply);
        } else {
            return v;
        }
    };

    let target;
    if (source instanceof Array) {
        target = [...source].map(copyValue);
    } else if (source instanceof Map) {
        target = new Map([...source].map(([k, v]) => [k, copyValue(v)]));
    } else if (source instanceof Set) {
        target = new Set([...source].map(v => copyValue(v)));
    } else if (source instanceof Function
                || source instanceof RegExp
                || source instanceof Number
                || source instanceof String
                || typeof source !== 'object') {
        target = source.valueOf();
    } else {
        target = {};
        for (const k in source) {
            if (Object.hasOwnProperty.call(source, k)) {
                target[k] = copyValue(source[k]);
            }
        }
    }

    return target;
}
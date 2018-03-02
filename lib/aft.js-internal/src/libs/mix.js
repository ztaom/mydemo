/**
 * mix source to target
 * @param {object} target
 * @param {object} source
 */
export default function mix(target, source) {
    for (const key of Object.keys(source)) {
        if (key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name') {

            const desc = Object.getOwnPropertyDescriptor(source, key);
            const {value: sourceValue} = desc;
            let targetValue = sourceValue;
            if (sourceValue instanceof Function) {
                targetValue = function(...args) {
                    /* eslint-disable no-invalid-this */
                    const re = sourceValue && sourceValue.apply(this, args);
                    return typeof re !== 'undefined' && re !== this ? re : this;
                    /* eslint-enable no-invalid-this */
                };
            }

            Object.defineProperty(target, key, {
                value: targetValue,
                configurable: true,
                enumerable: true
            });
        }
    }
}
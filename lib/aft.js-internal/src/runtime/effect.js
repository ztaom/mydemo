import Set from 'babel-runtime/core-js/set';
import copy from '../libs/copy';
import mix from '../libs/mix';

/**
 * @class Effect
 */
export default class Effect {
    /**
     * create a effect
     * @return {Effect}
     */
    constructor() {
        this.keyframes = new Set();
    }

    /**
     * add key frames to effect
     * @param {object} options
     * @param {Map<string, any>} options.map
     * @param {Function} [options.update]
     * @param {Function} [options.easing]
     * @param {number} [options.delay = 0]
     * @param {number} [options.duration = 0]
     * @param {string} [options.fillMode = "forwards"]
     * @param {number} [options.iteration = 0]
     * @param {string} [options.direction = "normal"]
     * @return {Effect} self-context
     */
    add({
        map,
        update,
        easing = i => i,
        delay = 0,
        duration = 0,
        fillMode = 'forwards',
        iteration = 1,
        direction = 'normal'
    }) {
        if (typeof map === 'undefined') {
            throw new Error('"map" is required');
        }

        this.keyframes.add({
            map,
            update,
            easing,
            delay,
            duration,
            fillMode,
            iteration,
            direction
        });

        return this;
    }

    /** clear the effect */
    clear() {
        this.keyframes.clear();
        return this;
    }

    /**
     * clone the effect
     * @return {Effect} cloned effect object
     */
    clone() {
        const target = new Effect();
        const source = copy(this, true);
        for (const attr in source) {
            target[attr] = source[attr];
        }
        return source;
    }

    /**
     * end the effect
     */
    end() {
        return this;
    }
}

Effect.use = (...mixins) => {
    for (let mixin of mixins) {
        if (typeof mixin === 'function') {
            mixin = mixin();
        }
        mix(Effect.prototype, mixin);
    }

    return Effect;
};
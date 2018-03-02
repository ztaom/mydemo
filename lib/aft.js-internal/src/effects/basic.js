import Map from 'babel-runtime/core-js/map';
import CubicBezier from '../libs/cubicbezier';

const CubicBezierRegEx = /^\s*cubic-bezier\(\s*([\d\-\.]+)\s*,\s*([\d\-\.]+)\s*,\s*([\d\-\.]+)\s*,\s*([\d\-\.]+)\s*\)\s*$/;

export default (easingMap) => ({
    _initialBasicEffects() {
        if (this._temp === undefined) {
            this._temp = {
                map: new Map()
            };
        }
        return this._temp;
    },

    to(key, value) {
        const temp = this._initialBasicEffects();

        if (typeof key === 'string') {
            temp.map.set(key, value);
        } else if (typeof key === 'function') {
            temp.update = key;
        } else if (key instanceof Map) {
            key.forEach((value, key) => {
                temp.map.set(key, value);
            });
        } else if (typeof key === 'object') {
            for (const n in key) {
                temp.map.set(n, key[n]);
            }
        }
    },

    update(update) {
        const temp = this._initialBasicEffects();
        temp.update = update;
    },

    easing(n) {
        const temp = this._initialBasicEffects();
        let f;
        if (typeof n === 'string') {
            const matched = n.match(CubicBezierRegEx);
            if (matched) {
                const cb = new CubicBezier(...matched.slice(1).map(i => parseFloat(i)));
                f = x => cb.y(x);
            } else if (easingMap) {
                f = easingMap.get(n);
            }
        } else if (typeof n === 'function') {
            f = n;
        }

        if (!f) {
            throw new Error('invalid easing function');
        }

        temp.easing = f;
    },

    duration(t) {
        const temp = this._initialBasicEffects();
        temp.duration = t;
    },

    delay(t) {
        const temp = this._initialBasicEffects();
        temp.delay = t;
    },

    iteration(n) {
        const temp = this._initialBasicEffects();
        temp.iteration = n;
    },

    direction(d) {
        const temp = this._initialBasicEffects();
        temp.direction = d;
    },

    next() {
        const temp = this._initialBasicEffects();
        if (temp.map.size > 0 ||
                Object.keys(temp).length > 1) {
            this.add(temp);
            this._temp = undefined;
        }
    },

    then(...args) {
        // eslint-disable-next-line
        console.warn('"effect.then" is deprecated. Please use "effect.next" instead');
        this.next(...args);
    },

    end() {
        this.next();
    }
});
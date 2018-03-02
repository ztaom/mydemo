import now from 'performance-now';

/**
 * @class Clock
 */
export default class Clock {
    /**
     * create a clock, and start immediately
     */
    constructor() {
        /**
         * the elaspsed time
         * @readonly
         * @type {number}
         */
        this.elapsed = 0;

        /**
         * the delta time
         * @readonly
         * @type {number}
         */
        this.delta = 0;

        this._pasued = false;

        this._last = now() >>> 0;
    }

    /**
     * get elapsed time and delta duration
     * @readonly
     * @type {{elapsed: number, delta: number}}
     */
    get time() {
        const _now = now() >>> 0;

        if (this._pasued) {
            this._last = _now;
        }

        this.delta = _now - this._last;
        this.elapsed += this.delta;
        this._last = _now;

        return {
            delta: this.delta,
            elapsed: this.elapsed
        };
    }

    /**
     * pause status
     * @type {boolean}
     */
    get paused() {
        return this._pasued;
    }

    set paused(v) {
        if (v) {
            this._pasued = true;
            this._last = 0;
        } else {
            this._pasued = false;
            this._last = now() >>> 0;
        }
    }
}
import Map from 'babel-runtime/core-js/map';
import Event from '../libs/event';
import {
    accuracy
} from '../libs/math';
import {
    complex as interpolate
} from '../libs/interpolation';

/**
 * @class Animation
 * @extends {Event}
 */
export default class Animation extends Event {
    /**
     * create a animation
     * @param  {Map} map a key-value map
     * @param  {Effect} effect a effect that includes all keyframes
     * @param  {number} [iteration=1] a iteration count for animation
     */
    constructor(map, effect, iteration = 1) {
        super();

        this._initial = new Map();
        this._current = map;

        this._keyframes = [...effect.end().keyframes];
        this._frameIndex = 0;
        this._keyframe = null;
        this._frameDuration = [0];
        this._duration = 0;

        this._keyframes.forEach(keyframe => {
            const duration = (keyframe.delay + keyframe.duration) * keyframe.iteration;
            this._duration += duration;
            this._frameDuration.push(duration);
        });

        this._started = false;
        this._finished = false;

        this._iteration = iteration;
        this._repeated = 0;

        this._beforePlay = null;
        this._afterPlay = null;
    }


    /**
     * the status if started
     * @return {boolean}
     */
    get started() {
        return this._started;
    }

    /**
     * the status if finished
     * @return {boolean}
     */
    get finished() {
        return this._finished;
    }

    /**
     * the repeat count of the animation
     * @return {number}
     */
    get repeated() {
        return this._repeated;
    }

    /**
     * the current map
     * @return {Map}
     */
    get current() {
        return this._current;
    }

    /**
     * the duration of whole animation
     * @return {number}
     */
    get duration() {
        return this._duration;
    }

    /**
     * get the iteration of whole animation
     * @return {number}
     */
    get iteration() {
        return this._iteration;
    }

    /**
     * set the iteration of whole animation
     * @param {number} n the number of iteration
     */
    set iteration(n) {
        this._iteration = n;
    }

    _initKeyframe(keyframe) {
        const start = new Map();
        const end = new Map();

        const {
            map,
            update,
            easing,
            delay,
            duration,
            fillMode,
            iteration,
            direction
        } = keyframe;

        map.forEach((endValue, name) => {
            let startValue;

            if (this._current.has(name)) {
                startValue = this._current.get(name);
            }

            if (!this._initial.has(name)) {
                this._initial.set(name, startValue);
            }

            start.set(name, startValue);
            end.set(name, endValue);
        });

        const elapsed = 0;
        const repeated = 0;

        return {
            start,
            end,
            delay,
            duration,
            fillMode,
            update,
            iteration,
            repeated,
            direction,
            easing,
            elapsed
        };
    }

    /**
     * change the status to started
     * @event emit start
     * @return {Animation} current context
     */
    start() {
        if (!this._started) {
            this._started = true;
            this.emit('start');
        }
        return this;
    }

    /**
     * reset the animation
     * @return {Animation} current context
     */
    reset() {
        // this._current.clear();
        for (const [key, value] of this._initial) {
            this._current.set(key, value);
        }

        this._frameIndex = 0;
        this._keyframe = null;
        this._started = false;
        this._finished = false;
        this._beforePlay = null;
        this._afterPlay = null;

        return this;
    }

    /**
     * reset and change the status to started
     * @event emit restart
     * @return {Animation} current context
     */
    restart() {
        if (this._started) {
            this.reset();
            this._started = true;
            this.emit('restart');
        }
        return this;
    }

    /**
     * change the status to finish
     * @event emit finish
     * @return {Animation} current context
     */
    finish() {
        if (!this._finished) {
            this._finished = true;
            this.emit('finish');
        }
        return this;
    }

    _play(clock) {
        if (!this._keyframe) {
            const keyframe = this._keyframes[this._frameIndex];
            this._keyframe = this._initKeyframe(keyframe);
        }

        this._keyframe.elapsed += clock.delta;

        const {
            start,
            end,
            delay,
            duration,
            fillMode,
            update,
            iteration,
            direction,
            easing
        } = this._keyframe;

        const time = Math.min(this._keyframe.elapsed - delay, duration);

        if (time >= 0) {
            let percent = 1;

            if (duration !== 0) {
                percent = accuracy(easing(time / duration));
            }

            end.forEach((eVal, name) => {
                const sVal = start.get(name) || 0;
                const val = interpolate(sVal, eVal, percent);
                this._current.set(name, val);
            });

            if (update) {
                update(this._current, start, end, percent);
            }

            if (this._current.flush) {
                this._current.flush();
            }

            if (time === duration) {
                this._keyframe.repeated++;

                if (this._keyframe.repeated < iteration) {
                    this._keyframe.elapsed = 0;
                    if (direction === 'normal') {
                        this._keyframe.start = start;
                        this._keyframe.end = end;
                    } else if (direction === 'alternate') {
                        this._keyframe.start = end;
                        this._keyframe.end = start;
                    }

                    this._beforePlay = () =>
                        this._keyframe.start.forEach((val, name) =>
                            this._current.set(name, val)
                        );
                } else {
                    if (fillMode === 'backward') {
                        throw new Error('not support "backward" fill-mode yet!');
                    } else {
                        this._keyframe = null;
                        this._frameIndex++;
                    }
                }
            }
        }
    }

    /**
     * request one frame of animation with a certain clock
     * @event emit beforeplay/play/afterplay
     * @param  {Clock} clock a clock from render
     * @return {Animation} current context
     */
    requestFrame(clock) {
        if (!this._started
                || this._finished
                || !this._keyframes.length) {
            return this;
        }

        // for (let i = this._frameIndex; i < this._frameDuration.length; i++) {
        //     if (clock.elapsed <= this._frameDuration[i]) {
        //         break;
        //     } else {
        //         this._frameIndex = i;
        //     }
        // }

        this.emit('beforeplay');
        if (this._beforePlay) {
            this._beforePlay();
            this._beforePlay = null;
        }

        this.emit('play');
        this._play(clock);

        this.emit('afterplay');
        if (this._afterPlay) {
            this._afterPlay();
            this._afterPlay = null;
        }

        if (this._frameIndex === this._keyframes.length) {
            this._repeated++;

            if (this._repeated < this._iteration) {
                this._beforePlay = () => this.restart();
                return this;
            }

            this.finish();
        }

        return this;
    }
}
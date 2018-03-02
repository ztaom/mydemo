import Map from 'babel-runtime/core-js/map';
import Clock from './clock';
import copy from '../libs/copy';

const FPS = 60;
const frameTime = 1000 / FPS;

/* eslint-disable no-undef */
const raf = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame
                : typeof webkitRequestAnimationFrame !== 'undefined' ? webkitRequestAnimationFrame
                : typeof mozRequestAnimationFrame !== 'undefined' ? mozRequestAnimationFrame
                : typeof msRequestAnimationFrame !== 'undefined' ? msRequestAnimationFrame
                : fn => setTimeout(fn, frameTime);

const caf = typeof cancelAnimationFrame !== 'undefined' ? cancelAnimationFrame
                : typeof webkitCancelAnimationFrame !== 'undefined' ? webkitCancelAnimationFrame
                : typeof webkitCancelRequestAnimationFrame !== 'undefined' ? webkitCancelRequestAnimationFrame
                : typeof mozCancelAnimationFrame !== 'undefined' ? mozCancelAnimationFrame
                : typeof msCancelAnimationFrame !== 'undefined' ? msCancelAnimationFrame
                : id => clearTimeout(id);
/* eslint-enable no-undef */

let incId = 0;
function generateId() {
    return ++incId;
}

/**
 * @class Ticker
 */
export default class Ticker {
    /**
     * create a ticker
     * @return {Ticker}
     */
    constructor(rafFn, cafFn) {
        this._paused = true;
        this._skipFrames = 0;
        this._skipCount = 0;
        this._clock = null;
        this._rid = null;
        this._rafFn = rafFn || (f => raf(f));
        this._cafFn = cafFn || (n => caf(n));
        this._updater = new Map();
        this._indices = new Map();
    }

    /**
     * @type {boolean} pause flag
     */
    get paused() {
        return this._paused;
    }

    /**
     * @type {number} the frames count to skip
     */
    get skipFrames() {
        return this._skipFrames;
    }

    set skipFrames(n) {
        this._skipFrames = n;
    }

    /**
     * add a update function
     * @param {Function} fn
     * @return {number} id a function id
     */
    add(fn) {
        if (this._updater.has(fn)) {
            const {id} = this._find(fn);
            return id;
        } else {
            const id = generateId();
            this._updater.set(fn, {
                elapsed: 0,
                delta: 0,
                callCount: 0,
                id
            });
            this._indices.set(id, fn);
            return id;
        }
    }

    _find(fn) {
        if (typeof fn === 'number') {
            fn = this._indices.get(fn);
        }
        if (fn) {
            const {id} = this._updater.get(fn);
            return {
                fn, id
            };
        } else {
            return {};
        }
    }

    /**
     * freeze a update function
     * @param {Function|number} any a function or a function id
     */
    freeze(any) {
        const {fn} = this._find(any);
        if (fn) {
            const options = this._updater.get(fn);
            options.freeze = true;
        }
    }

    /**
     * unfreeze a update function
     * @param {Function|number} any a function or a function id
     */
    unfreeze(any) {
        const {fn} = this._find(any);
        if (fn) {
            const options = this._updater.get(fn);
            options.freeze = false;
        }
    }
    /**
     * remove a update function
     * @param {Function|number} any a function or a function id
     */
    remove(any) {
        const {fn, id} = this._find(any);
        if (fn) {
            this._updater.delete(fn);
            this._indices.delete(id);
        }
    }

    /**
     * running a function in loop
     */
    run() {
        if (this._paused) {
            this._paused = false;

            if (this._rid === null) {
                // 初始运行
                this._clock = new Clock();

                // 第一次总是要执行的
                this._call({
                    elapsed: this._clock.elapsed,
                    delta: this._clock.delta
                });

                // 进入 _loop
                this._rid = this._rafFn(() => this._loop());
            } else {
                this._clock.paused = false;
            }
        }
    }
    /**
     * pause the loop
     */
    pause() {
        // 非暂停状态，且有 requestId 才可以被暂停
        if (!this._paused && this._rid) {
            this._paused = true;
            this._clock.paused = true;
        }
    }

    /**
     * resume the loop
     */
    resume() {
        // 处于暂停状态，且有 requestId 才可以被重启
        if (this._paused && this._rid) {
            this._paused = false;
            this._clock.paused = false;
        }
    }

    /**
     * stop the loop
     */
    stop() {
        if (this._rid) {
            this._paused = true;
            this._cafFn(this._rid);
            this._rid = null;
            this._clock = null;
            this._updater.forEach((clock) => {
                clock.elapsed = 0;
                clock.delta = 0;
            });
        }
    }

    _call({
        delta
    }) {
        this._updater.forEach((option, fn) => {
            if (option.freeze !== true) {
                if (option.callCount) {
                    option.delta = delta;
                    option.elapsed += delta;
                }
                option.callCount++;
                fn(copy(option));
            }
        });
    }

    /**
     * the loop function
     * @param {Function} fn callback function
     */
    _loop() {
        // 如果在执行函数时 stop，则在此判断是否还需要再 _loop
        if (this._rid !== null) {
            this._rid = this._rafFn(() => this._loop());
        }

        // 暂停状态直接跳过
        if (!this._paused) {
            if (!this._skipFrames) {
                this._call(this._clock.time);
            } else {
                // 跳过 n 帧后再执行
                if (this._skipCount >= this._skipFrames) {
                    this._call(this._clock.time);
                    this._skipCount = 0;
                } else {
                    this._skipCount++;
                }
            }
        }
    }
}
import Map from 'babel-runtime/core-js/map';
import Event from '../libs/event';
import Ticker from './ticker';

/**
 * @class Timeline
 */
export default class Timeline extends Event {
    /**
     * create a timeline
     * @param {Ticker} [ticker]
     * @return {Timeline}
     */
    constructor(ticker) {
        super();

        this._ticker = ticker || new Ticker();

        this._ticker.run(); // always be runing

        this._animations = new Map();

        this._controls = false; // for debugger

        this._currentTime = 0;

        this._loop = false;

        this._paused = true;

        this._ended = false;

        this._playbackRate = 1; // hold on

        this._playbackId = 0; // initial the id
    }

    get currentTime() {
        return this._currentTime;
    }

    get loop() {
        return this._loop;
    }

    set loop(v) {
        this._loop = Boolean(v);
    }

    get paused() {
        return this._paused;
    }

    get ended() {
        return this._ended;
    }

    get skipFrames() {
        return this._ticker.skipFrames;
    }

    set skipFrames(n) {
        this._ticker.skipFrames = Number(n);
    }

    /**
     * add a animation with some option
     * @param {Animation|Array<Animation>} animations
     * @param {{playAt:number|Function, stopAt:number|Function}} [option]
     */
    add(animations, option = {}) {
        if (!(animations instanceof Array)) {
            animations = [animations];
        }

        this._paused = false;
        this._ended = false;

        animations.forEach(animation => this._animations.set(animation, option));
        return this;
    }

    /**
     * get option by a certain animation
     * @param  {Animation} animation
     * @return {Object} the option of animaiton
     */
    get(animation) {
        return this._animations.get(animation);
    }

    /**
     * remove a animation
     * @param  {Animation|Array<Animation>} animations
     * @return {Timeline} current context
     */
    remove(animations) {
        if (!(animations instanceof Array)) {
            animations = [animations];
        }

        animations.forEach(animation => {
            this._animations.delete(animation);
            animation.finish();
        });
        return this;
    }

    /**
     * clear all animations
     * @return {Timeline} current context
     */
    clear() {
        this._animations.forEach((option, animation) => {
            animation.finish();
        });
        this._animations.clear();
        return this;
    }

    /**
     * seek the timeline with a given time
     * @throws {Error} not available
     */
    seek() {
        throw new Error('not available');
    }

    /**
     * play the timeline. if the timeline is paused, then countinue to play.
     * if the timeline is ended, nothing happend.
     * @return {Timeline} current context
     */
    play() {
        if (this._ended) {
            return this;
        }

        if (!this._playbackId) {
            this._playbackId = this._ticker.add(clock => this._playback(clock));
        } else if (this._paused){
            this._ticker.unfreeze(this._playbackId);
        }

        this._paused = false;

        return this;
    }

    /**
     * pause the timeline when playing
     * @return {Timeline} current context
     */
    pause() {
        if (this._paused || this._ended) {
            return this;
        }

        this._paused = true;
        this._ticker.freeze(this._playbackId);

        return this;
    }


    /**
     * stop the timeline.
     * @return {Timeline} current context
     */
    stop() {
        this._ticker.remove(this._playbackId);
        this._playbackId = 0;

        this._animations.forEach((option, animation) => {
            animation.finish();
        });
        this._paused = false;
        this._ended = true;
        return this;
    }

    /**
     * replay the timeline
     * @return {Timeline} current context
     */
    replay() {
        this._ticker.remove(this._playbackId);

        this._animations.forEach((option, animation) => {
            animation.finish();
            animation.reset();
        });
        this._paused = false;
        this._ended = false;
        this._playbackId = this._ticker.add(clock => this._playback(clock));
        return this;
    }

    _playback({
        elapsed,
        delta
    }) {
        this._currentTime = elapsed;

        this.emit('play');

        let isAllFinished = true;
        this._animations.forEach((option, animation) => {
            if (animation.finished) {
                return;
            }

            const {playAt, stopAt} = option;
            const startTime = typeof playAt === 'function' ? playAt(option)
                                : (playAt || true);
            const endTime = typeof stopAt === 'function' ? stopAt(option)
                                : stopAt;

            if (!animation.started) {
                if (typeof startTime === 'boolean' && startTime
                            || typeof startTime === 'number' && elapsed >= startTime) {
                    option.delta = 0;
                    option.elapsed = 0;

                    animation.once('start', () => option.startAt = this._currentTime);
                    animation.once('finish', () => option.finishAt = this._currentTime);
                    animation.start();
                    animation.requestFrame(option);
                }
            } else {
                option.delta = delta;
                option.elapsed += elapsed;
                animation.requestFrame(option);
            }

            if (typeof endTime === 'boolean' && endTime
                            || typeof endTime === 'number' && elapsed >= endTime) {
                animation.finish();
            }

            isAllFinished &= animation.finished;
        });

        this.emit('afterplay');

        if (isAllFinished) {
            if (this._loop) {
                this.replay();
                this.emit('loop');
            } else {
                this.stop();
                this.emit('end');
            }
        }

        return this;
    }
}
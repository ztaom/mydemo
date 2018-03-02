import Map from 'babel-runtime/core-js/map';
import {
    Effect,
    Ticker,
    Animation,
    Timeline
} from '../runtime';
import {
    proxies,
    from as proxy
} from '../proxies';
import easing from './easing';

/**
 * extends proxy
 * @param {(any): Map} proxy
 * @param {(any): boolean} detect
 */
export function extendProxy(proxy, detect) {
    proxies.set(proxy, detect);
}

/**
 * extends easing
 * @param {Map} easingMap
 */
export function extendEasing(easingMap) {
    easingMap.forEach((v, k) => easing.set(k, v));
}

/**
 * extends effect
 * @param {...Object} effects
 */
export function extendEffect(...effects) {
    for (const effect of effects) {
        Effect.use(effect);
    }
}

/**
 * create a effect
 * @return {Effect}
 */
export function createEffect() {
    return new Effect();
}

/**
 * create a animation
 * @example
 * createAnimation(map, effect, 1);
 * @example
 * createAnimation(map, (effect, initial) => {
 *     effect.duration(400);
 * }, Infinity);
 * @param  {Map} map
 * @param  {Effect|(effect: Effect, initial: Map): void} sth
 * @param  {number} iteration
 * @return {Animation}
 */
export function createAnimation(map, sth, iteration) {
    if (!(map instanceof Map)) {
        map = proxy(map);
    }

    let effect = sth;
    if (sth instanceof Function){
        effect = new Effect();
        sth(effect, map);
    }
    return new Animation(map, effect, iteration);
}

/**
 * create animations
 * @example
 * createAnimations(map, effect1, (effect2, initial) => {
 *     return effect2.loop(2);
 * });
 * @param  {Map} map
 * @param  {Array<Effect|(effect: Effect, initial: Map): void>} sths
 * @return {Animation}
 */
export function createAnimations(map, ...sths) {
    return sths.map(sth => createAnimation(map, sth));
}

/**
 * @type {Ticker}
 */
export const globalTicker = new Ticker();

/**
 * create a timeline
 * @param {Array<Animation>} [animations]
 * @param {object} [option]
 * @return {Timeline}
 */
export function createTimeline(animations, option) {
    const timeline = new Timeline(globalTicker);
    if (animations) {
        animations.forEach(animation => timeline.add(animation, option));
    }
    return timeline;
}
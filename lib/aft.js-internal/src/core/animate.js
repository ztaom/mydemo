import Map from 'babel-runtime/core-js/map';
import Event from '../libs/event';
import {
    extendProxy,
    extendEffect,
    createEffect,
    createAnimation,
    createTimeline
} from './factory';
import isPlainObject from 'lodash/isPlainObject';
import isElement from 'lodash/isElement';
import fromObject from '../proxies/object';
import fromHTMLElement from '../proxies/htmlelement';
import {
    from as proxy
} from '../proxies';
import {
    BasicEffects
} from '../effects';
import easing from './easing';

extendProxy(fromObject, isPlainObject);
extendProxy(fromHTMLElement, isElement);
extendEffect(BasicEffects(easing));

const passedAnimationEvent = ['start', 'beforeplay', 'play', 'afterplay', 'restart', 'finish'];
const passedTimelineEvent = ['loop', 'end'];

class Tween extends Event {
    constructor(initial) {
        super();

        const timeline = createTimeline();
        let effect = createEffect();

        for (const key in effect) {
            if (key === 'end'
                    || key === 'then'
                    || key === 'next'
                    || !(effect[key] instanceof Function)) {
                continue;
            }

            Object.defineProperty(this, key, {
                value(...args) { // eslint-disable-line
                    effect[key](...args);
                    return this;
                }
            });
        }

        Object.defineProperties(this, {
            next: {
                value(next) {
                    effect.next();

                    if (next) {
                        effect
                            .to(next)
                            .duration(0)
                            .next();
                    }

                    return this;
                }
            },

            play: {
                value(iteration = 1) {
                    effect.end();
                    const animation = createAnimation(initial, effect, iteration);

                    passedAnimationEvent.forEach(ev =>
                        animation.on(ev, () =>
                            this.emit(ev, animation.current)
                        )
                    );

                    passedTimelineEvent.forEach(ev =>
                        timeline.on(ev, () =>
                            this.emit(ev, animation.current)
                        )
                    );

                    timeline.add(animation);
                    timeline.play();

                    effect = createEffect();

                    return this;
                }
            },

            stop: {
                value() {
                    timeline.stop();
                    return this;
                }
            }
        });
    }
}

/**
 * tween animation
 * @example
 * animate({
 *   a: 1,
 *   b: 2
 * })
 *   .to({
 *     a: 2,
 *     b: 3
 *   })
 *   .duration(1000)
 *   .play();
 * @example
 * animate(document.body)
 *   .to({
 *     backgroundColor: '#000',
 *     translateX: 100
 *   })
 *   .duration(1000)
 *   .play();
 * @param  {object|Map|HTMLElement} initial
 * @return {Tween}
 */
export function animate(initial) {
    if (!(initial instanceof Map)) {
        initial = proxy(initial);
    }
    const tween = new Tween(initial);
    return tween;
}
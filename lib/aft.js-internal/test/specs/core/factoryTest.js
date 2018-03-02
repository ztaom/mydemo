import chai from 'chai';
import {
    extendProxy,
    extendEasing,
    extendEffect,
    createEffect,
    createAnimation,
    createAnimations,
    createTimeline
} from '../../../src/core/factory';
import {
    Effect,
    Animation,
    Timeline
} from '../../../src/runtime';
import easing from '../../../src/core/easing';
import {
    proxies
} from '../../../src/proxies';
import {
    delay,
    curry,
    HTMLElement,
    getComputedStyle
} from '../util';

const {expect} = chai;

/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-spaced-func */
/** @test {factory} */
describe('factory', () => {

    const delay100 = delay(100);
    const delay200 = delay(200);
    const delay500 = delay(500);
    const delay600 = delay(600);

    let initial, effect, animation;

    function isPlaying(timeline) {
        return !timeline.paused && !timeline.ended;
    }

    function isPaused(timeline) {
        return timeline.paused;
    }

    function isFinished(timeline) {
        return timeline.ended;
    }

    beforeEach(() => {
        initial = new Map([['a', 1]]);
        effect = new Effect();
        effect.add({
            map: new Map([['a', 10]]),
            duration: 500
        });
        animation = new Animation(initial, effect);
    });

    before(() => {
        global.getComputedStyle = getComputedStyle;
    });

    after(() => {
        delete global.getComputedStyle;
    });

    /** @test {factory#extendProxy} */
    it('extendProxy', () => {
        const proxy = () => {};
        const detect = () => false;
        extendProxy(proxy, detect);
        expect(proxies.get(proxy)).to.eql(detect);
        proxies.delete(proxy);
    });

    /** @test {factory#extendEffect} */
    it('extendEffect', () => {
        extendEffect({
            a: () => {}
        });
        expect(Effect.prototype.hasOwnProperty('a')).to.be.true;
        delete Effect.prototype.a;
    });

    /** @test {factory#extendEasing} */
    it('extendEasing', () => {
        extendEasing(new Map([
            ['a', () => {}]
        ]));
        expect(easing.has('a')).to.be.true;
        easing.delete('a');
    });

    /** @test {factory#createEffect} */
    it('createEffect', () => {
        const effect = createEffect();
        expect(effect).to.be.an.instanceof(Effect);
    });

    /** @test {factory#createAnimation} */
    it('createAnimation', () => {
        let animation = createAnimation(initial, effect);
        expect(animation).to.be.an.instanceof(Animation);
        expect(animation.current).to.eql(initial);
        expect([...animation._keyframes]).to.eql([...effect.keyframes]);
        expect(animation._iteration).to.eql(1);

        animation = createAnimation({
            a: 20
        }, effect);
        expect(animation).to.be.an.instanceof(Animation);
        expect(animation.current.get('a')).to.eql(20);

        const element = new HTMLElement();
        element.style.a = 20;
        animation = createAnimation(element, effect);
        expect(animation).to.be.an.instanceof(Animation);
        expect(animation.current.get('a')).to.eql(20);

        let innerEffect;
        animation = createAnimation(initial, effect => {
            innerEffect = effect.to({
                a: 20
            });
        }, Infinity);
        expect(animation).to.be.an.instanceof(Animation);
        expect(animation.current).to.eql(initial);
        expect([...animation._keyframes]).to.eql([...innerEffect.keyframes]);
        expect(animation._iteration).to.eql(Infinity);
    });

    /** @test {factory#createAnimations} */
    it('createAnimations', () => {
        let innerEffect;
        const animations = createAnimations(initial, effect, effect => {
            innerEffect = effect.to({
                a: 20
            });
        });
        animations.forEach(animation => expect(animation).to.be.an.instanceof(Animation));
        expect([...animations[0]._keyframes]).to.eql([...effect.keyframes]);
        expect([...animations[1]._keyframes]).to.eql([...innerEffect.keyframes]);
    });

    /** @test {factory#createTimeline} */
    it('createTimeline', () => {
        const timeline = createTimeline([animation]);
        expect(timeline).to.be.an.instanceof(Timeline);
        expect([...timeline._animations]).to.eql([[animation, {}]]);
    });

    /** @test {factory#createTimeline} */
    it('play animation', done => {
        const timeline = createTimeline();
        timeline.add(animation);
        timeline.play();
        expect(isPlaying(timeline)).to.be.true;

        delay100(() => expect(isPlaying(timeline)).to.be.true)
        .then(curry(delay500)(() => {
            expect(isPlaying(timeline)).to.be.false;
            expect(isFinished(timeline)).to.be.true;
            timeline.replay();
        }))
        .then(curry(delay100)(() => expect(isPlaying(timeline)).to.be.true))
        .then(curry(delay500)(() => {
            expect(isPlaying(timeline)).to.be.false;
            expect(isFinished(timeline)).to.be.true;
        }))
        .then(done)
        .catch(done);
    });

    /** @test {factory#createTimeline} */
    it('play animation with certain time', done => {
        const timeline = createTimeline();
        timeline.add(animation, {
            playAt: 200
        });
        timeline.play();
        expect(isPlaying(timeline)).to.be.true;

        delay100(() => expect(isPlaying(timeline)).to.be.true)
        .then(curry(delay500)(() => expect(isPlaying(timeline)).to.be.true))
        .then(curry(delay200)(() => {
            expect(isPlaying(timeline)).to.be.false;
            expect(isFinished(timeline)).to.be.true;
            timeline.replay();
        }))
        .then(curry(delay200)(() => expect(isPlaying(timeline)).to.be.true))
        .then(curry(delay600)(() => {
            expect(isPlaying(timeline)).to.be.false;
            expect(isFinished(timeline)).to.be.true;
        }))
        .then(done)
        .catch(done);
    });

    /** @test {factory#createTimeline} */
    it('play animation with return true/false', done => {
        let toPlay = false;
        const timeline = createTimeline();
        timeline.add(animation, {
            playAt: () => toPlay
        });
        timeline.play();
        expect(isPlaying(timeline)).to.be.true;

        delay100(() => toPlay = true)
        .then(curry(delay100)(() => expect(isPlaying(timeline)).to.be.true))
        .then(curry(delay500)(() => {
            expect(isPlaying(timeline)).to.be.false;
            expect(isFinished(timeline)).to.be.true;
            timeline.replay();
        }))
        .then(curry(delay100)(() => expect(isPlaying(timeline)).to.be.true))
        .then(curry(delay500)(() => {
            expect(isPlaying(timeline)).to.be.false;
            expect(isFinished(timeline)).to.be.true;
        }))
        .then(done)
        .catch(done);
    });

    /** @test {factory#createTimeline} */
    it('pause animation', done => {
        const timeline = createTimeline();
        timeline.add(animation);
        timeline.play();
        expect(isPlaying(timeline)).to.be.true;

        delay100(() => {
            expect(isPlaying(timeline)).to.be.true;
            timeline.pause();
        })
        .then(curry(delay100)(() => {
            expect(isPaused(timeline)).to.be.true;
            timeline.play();
        }))
        .then(curry(delay100)(() => {
            expect(isPaused(timeline)).to.be.false;
            expect(isPlaying(timeline)).to.be.true;
        }))
        .then(curry(delay500)(() => {
            expect(isPlaying(timeline)).to.be.false;
            expect(isFinished(timeline)).to.be.true;
        }))
        .then(done)
        .catch(done);
    });

    /** @test {factory#createTimeline} */
    it('cancel animation', done => {
        const timeline = createTimeline();
        timeline.add(animation);
        timeline.play();
        expect(isPlaying(timeline)).to.be.true;

        delay100(() => {
            expect(isPlaying(timeline)).to.be.true;
            timeline.stop();
        })
        .then(curry(delay100)(() => {
            expect(isPlaying(timeline)).to.be.false;
            expect(isFinished(timeline)).to.be.true;
        }))
        .then(done)
        .catch(done);
    });
});
/* eslint-enable no-unexpected-multiline */
/* eslint-enable no-spaced-func */
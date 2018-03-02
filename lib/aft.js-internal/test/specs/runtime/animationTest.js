import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Effect from '../../../src/runtime/effect';
import Animation from '../../../src/runtime/animation';

import {
    Clock
} from '../util';

chai.use(sinonChai);
const {expect} = chai;

/** @test {Animation} */
describe('Animation', () => {

    /** @test {Animation#constructor} */
    /** @test {Animation#started} */
    /** @test {Animation#finished} */
    /** @test {Animation#repeated} */
    /** @test {Animation#current} */
    it('constructor', () => {
        const initial = new Map();
        const effect = new Effect();
        const animation = new Animation(initial, effect);

        expect(animation).is.instanceof(Animation);
        expect(animation.started).eql(false);
        expect(animation.finished).eql(false);
        expect(animation.repeated).eql(0);
        expect(animation.current).is.instanceof(Map);
        expect(animation.iteration).eql(1);

        animation.iteration = Infinity;
        expect(animation.iteration).eql(Infinity);
    });

    /** @test {Animation#start} */
    it('start', done => {
        const initial = new Map();
        const effect = new Effect();
        const animation = new Animation(initial, effect);

        animation.on('start', () => {
            expect(animation.started).eql(true);
            done();
        });
        animation.start();
    });

    /** @test {Animation#finish} */
    it('finish', done => {
        const initial = new Map();
        const effect = new Effect();
        const animation = new Animation(initial, effect);

        animation.on('finish', () => {
            expect(animation.finished).eql(true);
            done();
        });
        animation.finish();
    });

    /** @test {Animation#restart} */
    it('restart', done => {
        const initial = new Map();
        const effect = new Effect();
        const animation = new Animation(initial, effect);

        animation.on('restart', () => {
            expect(animation.started).eql(true);
            expect(animation.finished).eql(false);
            done();
        });
        animation.start();
        animation.finish();
        animation.restart();
    });

    /** @test {Animation#requestFrame} */
    it('play', () => {
        const initial = new Map();
        initial.set('opacity', 1);
        initial.set('translateX', 0);
        initial.flush = sinon.stub();

        const effect = new Effect();
        const keyframe = {
            map: new Map([
                ['opacity', 0],
                ['translateX', 100]
            ]),
            duration: 1000
        };
        effect.add(keyframe);
        const animation = new Animation(initial, effect);

        let playCount = 0;
        animation.on('play', () => playCount++);
        animation.start();

        const clock = new Clock();

        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);
        expect(initial.flush).to.be.calledOnce;

        clock.go(500);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0.5);
        expect(animation.current.get('translateX')).eql(50);
        expect(initial.flush).to.be.calledTwice;

        clock.go(1000);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(100);
        expect(initial.flush).to.be.calledThird;

        expect(animation.finished).eql(true);
        expect(playCount).eql(3);
    });

    /** @test {Animation#requestFrame} */
    it('play2', () => {
        const initial = new Map();
        initial.set('opacity', 1);
        initial.set('translateX', -100);

        const effect = new Effect();
        const keyframe1 = {
            map: new Map([
                ['opacity', 0]
            ]),
            duration: 1000
        };
        const keyframe2 = {
            map: new Map([
                ['translateX', 100]
            ]),
            duration: 1000
        };
        effect.add(keyframe1).add(keyframe2);

        const animation = new Animation(initial, effect);

        let playCount = 0;
        animation.on('play', () => playCount++);
        animation.start();

        const clock = new Clock();

        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(-100);

        clock.go(500);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0.5);
        expect(animation.current.get('translateX')).eql(-100);

        clock.go(1000);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(-100);

        clock.go(1000); // next tick
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql;(0);
        expect(animation.current.get('translateX')).eql(-100);

        clock.go(1500);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql;(0);
        expect(animation.current.get('translateX')).eql(0);

        clock.go(2000);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql;(0);
        expect(animation.current.get('translateX')).eql(100);

        expect(animation.finished).eql(true);
        expect(playCount).eql(6);
    });

    /** @test {Animation#requestFrame} */
    it('play with custom update function', () => {
        const initial = new Map();
        initial.set('opacity', 1);
        initial.set('translateX', 0);

        const effect = new Effect();
        const keyframe = {
            update(current, start, end, percent) {
                if (percent <= 0.5) {
                    current.set('opacity', start.get('opacity'));
                } else {
                    current.set('opacity', end.get('opacity'));
                }

                const sTranslateX = start.get('translateX');
                const eTranslateX = end.get('translateX');
                const cTranslateX = sTranslateX + (eTranslateX - sTranslateX) * percent * percent;
                current.set('translateX', cTranslateX);
            },

            map: new Map([
                ['opacity', 0],
                ['translateX', 100]
            ]),

            duration: 1000
        };
        effect.add(keyframe);
        const animation = new Animation(initial, effect);

        let playCount = 0;
        animation.on('play', () => playCount++);
        animation.start();

        const clock = new Clock();
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);

        clock.go(200);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(4);

        clock.go(500);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(25);

        clock.go(700);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(49);

        clock.go(1000);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(100);

        expect(animation.finished).eql(true);
        expect(playCount).eql(5);
    });

    /** @test {Animation#requestFrame} */
    it('delay to play', () => {
        const initial = new Map();
        initial.set('opacity', 1);
        initial.set('translateX', 0);

        const effect = new Effect();
        const keyframe = {
            map: new Map([
                ['opacity', 0],
                ['translateX', 100]
            ]),

            delay: 100,
            duration: 1000
        };
        effect.add(keyframe);
        const animation = new Animation(initial, effect);

        let playCount = 0;
        animation.on('play', () => playCount++);
        animation.start();

        const clock = new Clock();
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);

        clock.go(50);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);

        clock.go(1100);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(100);

        expect(animation.finished).eql(true);
        expect(playCount).eql(3);
    });

    /** @test {Animation#requestFrame} */
    it('play then backward', () => {
        const initial = new Map();
        initial.set('opacity', 1);
        initial.set('translateX', 0);

        const effect = new Effect();
        const keyframe = {
            map: new Map([
                ['opacity', 0],
                ['translateX', 100]
            ]),

            duration: 1000,
            fillMode: 'backward'
        };
        effect.add(keyframe);
        const animation = new Animation(initial, effect);

        let playCount = 0;
        animation.on('play', () => playCount++);
        animation.start();

        const clock = new Clock();
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);

        clock.go(1000);
        expect(() => {
            animation.requestFrame(clock);
        }).to.be.throw(Error);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(100);

        expect(animation.finished).eql(false);
        expect(playCount).eql(2);
    });

    /** @test {Animation#requestFrame} */
    it('play with iteration of effect', () => {
        const initial = new Map();
        initial.set('opacity', 1);
        initial.set('translateX', 0);

        const effect = new Effect();
        const keyframe = {
            map: new Map([
                ['opacity', 0],
                ['translateX', 100]
            ]),

            duration: 1000,
            iteration: 2
        };
        effect.add(keyframe);
        const animation = new Animation(initial, effect);

        let playCount = 0;
        animation.on('play', () => playCount++);
        animation.start();

        const clock = new Clock();
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);

        clock.go(1000);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(100);

        clock.add(0);
        animation.requestFrame(clock); // next-tick-for-test
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);

        clock.go(2000);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(100);

        expect(animation.finished).eql(true);
        expect(playCount).eql(4);
    });

    /** @test {Animation#requestFrame} */
    it('play with alternate iteration of effect', () => {
        const initial = new Map();
        initial.set('opacity', 1);
        initial.set('translateX', 0);

        const effect = new Effect();
        const keyframe = {
            map: new Map([
                ['opacity', 0],
                ['translateX', 100]
            ]),

            duration: 1000,
            iteration: 2,
            direction: 'alternate'
        };
        effect.add(keyframe);
        const animation = new Animation(initial, effect);

        let playCount = 0;
        animation.on('play', () => playCount++);
        animation.start();

        const clock = new Clock();
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);

        clock.go(1000);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(100);

        clock.add(0);
        animation.requestFrame(clock); // next-tick-for-test
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(100);

        clock.go(2000);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);

        expect(animation.finished).eql(true);
        expect(playCount).eql(4);
    });

    /** @test {Animation#requestFrame} */
    it('play with iteration of animation', () => {
        const initial = new Map();
        initial.set('opacity', 1);
        initial.set('translateX', 0);

        const effect = new Effect();
        const keyframe = {
            map: new Map([
                ['opacity', 0],
                ['translateX', 100]
            ]),

            duration: 1000
        };
        effect.add(keyframe);
        const animation = new Animation(initial, effect, 2);

        let playCount = 0;
        animation.on('play', () => playCount++);
        animation.start();

        const clock = new Clock();
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);

        clock.go(1000);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(100);

        clock.add(0);
        animation.requestFrame(clock); // next-tick-for-test
        expect(animation.current.get('opacity')).eql(1);
        expect(animation.current.get('translateX')).eql(0);

        clock.go(2000);
        animation.requestFrame(clock);
        expect(animation.current.get('opacity')).eql(0);
        expect(animation.current.get('translateX')).eql(100);

        expect(animation.finished).eql(true);
        expect(playCount).eql(4);
    });
});

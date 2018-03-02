import chai from 'chai';
import Clock from '../../../src/runtime/clock';

import {
    delay,
    curry
} from '../util';


const {expect} = chai;

/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-spaced-func */
/** @test {Clock} */
describe('Clock', () => {

    const delay500 = delay(500);
    const delay16 = delay(16);

    /** @test {Clock#constructor} */
    it('constructor', () => {
        expect(Clock).is.instanceof(Function);
        expect(Clock.length).eql(0);

        const clock = new Clock();
        expect(clock).is.instanceof(Clock);
        expect(clock.paused).eql(false);
        expect(clock.elapsed).eql(0);
        expect(clock.delta).eql(0);
    });

    /** @test {Clock#time} */
    it('time', done => {
        const clock = new Clock();

        let cElapsed;
        delay500(({expectTime}) => {
            const {
                elapsed,
                delta
            } = clock.time;
            cElapsed = elapsed;
            expect(elapsed).to.be.closeTo(expectTime, 32);
            expect(delta).to.be.closeTo(expectTime, 32);
        })
        .then(curry(delay16)(({expectTime}) => {
            const {
                elapsed,
                delta
            } = clock.time;
            expect(elapsed).to.be.closeTo(cElapsed + expectTime, 32);
            expect(delta).to.be.within(16, 32);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Clock#paused} */
    it('paused', done => {
        const clock = new Clock();

        let cElapsed;
        delay16(({expectTime}) => {
            const {
                elapsed,
                delta
            } = clock.time;
            cElapsed = elapsed;
            expect(elapsed).to.be.closeTo(expectTime, 32);
            expect(delta).to.be.closeTo(16, 32);
            clock.paused = true;
        })
        .then(curry(delay500)(() => {
            clock.paused = false;
            const {
                elapsed,
                delta
            } = clock.time;
            expect(elapsed).to.eql(cElapsed);
            expect(delta).to.eql(0);
        }))
        .then(done)
        .catch(done);
    });
});
/* eslint-enable no-spaced-func */
/* eslint-enable no-unexpected-multiline */

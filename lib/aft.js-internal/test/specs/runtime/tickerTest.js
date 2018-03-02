import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Ticker from '../../../src/runtime/ticker.js';

import {
    delay,
    curry
} from '../util';

chai.use(sinonChai);
const {expect} = chai;

/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-spaced-func */
/** @test {Ticker} */
describe('Ticker', () => {
    const delay100 = delay(100);

    /** @test {Ticker#constructor} */
    it('constructor', () => {
        expect(Ticker).is.instanceof(Function);
        expect(Ticker.length).eql(2);

        const ticker = new Ticker();
        expect(ticker).is.instanceof(Ticker);
        expect(ticker.paused).eql(true);

        const raf = sinon.stub();
        raf.returns(1);
        const caf = sinon.stub();

        const ticker1 = new Ticker(raf, caf);
        ticker1.run();
        expect(raf.callCount).eql(1);
        ticker1.stop();
        expect(caf.callCount).eql(1);
    });

    /** @test {Ticker#add} */
    it('add', () => {
        const ticker = new Ticker();

        const fn1 = () => {};
        const id = ticker.add(fn1);

        expect(ticker._updater.size).eql(1);
        expect([...ticker._updater]).eql([
            [fn1, {elapsed: 0, delta: 0, callCount: 0, id}]
        ]);
    });

    /** @test {Ticker#remove} */
    it('remove', () => {
        const ticker = new Ticker();

        const fn1 = () => {};
        const id1 = ticker.add(fn1);

        const fn2 = () => {};
        const id2 = ticker.add(fn2);

        expect(ticker._updater.size).eql(2);
        expect([...ticker._updater]).eql([
            [fn1, {elapsed: 0, delta: 0, callCount: 0, id: id1}],
            [fn2, {elapsed: 0, delta: 0, callCount: 0, id: id2}]
        ]);

        ticker.remove(fn1);

        expect(ticker._updater.size).eql(1);
        expect([...ticker._updater]).eql([
            [fn2, {elapsed: 0, delta: 0, callCount: 0, id: id2}]
        ]);

        ticker.remove(id2);
        expect(ticker._updater.size).eql(0);
    });

    /** @test {Ticker#run} */
    it('run', done => {
        const ticker = new Ticker();
        const fn = sinon.stub();

        ticker.add(fn);
        ticker.run();

        expect(fn).to.have.been.calledOnce;
        expect(ticker.paused).eql(false);

        let fnElapsed;
        let fn1;

        delay100(({expectTime}) => {

            expect(fn.callCount).to.be.above(1);
            fnElapsed = fn.lastCall.args[0].elapsed;
            expect(fnElapsed).to.be.closeTo(expectTime, 32);
            expect(fn.lastCall.args[0].delta).to.be.closeTo(16, 32);
            expect(fn.lastCall.args[0].callCount).eql(fn.callCount);
            fn1 = sinon.stub();
            ticker.add(fn1);
        })
        .then(curry(delay100)(({expectTime}) => {
            expect(fn.lastCall.args[0].elapsed).to.closeTo(fnElapsed + expectTime, 32);
            expect(fn.lastCall.args[0].delta).to.be.closeTo(16, 32);
            expect(fn.lastCall.args[0].callCount).eql(fn.callCount);

            expect(fn1.lastCall.args[0].elapsed).to.closeTo(expectTime, 32);
            expect(fn1.lastCall.args[0].delta).to.be.closeTo(16, 32);
            expect(fn1.lastCall.args[0].callCount).eql(fn1.callCount);

        }))
        .then(done)
        .catch(done);
    });

    /** @test {Ticker#pause} */
    it('pause', done => {
        const ticker = new Ticker();
        const fn = sinon.stub();

        ticker.add(fn);
        ticker.run();

        let fnCallCount;
        let fnElapsed;

        delay100(({expectTime}) => {
            fnCallCount = fn.callCount;
            ticker.pause();
            expect(ticker.paused).eql(true);
            fnElapsed = fn.lastCall.args[0].elapsed;
            expect(fnElapsed).to.be.closeTo(expectTime, 32);
            expect(fn.lastCall.args[0].delta).to.be.closeTo(16, 32);
        })
        .then(curry(delay100)(() => {
            expect(fn.callCount).eql(fnCallCount);
            expect(fn.lastCall.args[0].elapsed).to.eql(fnElapsed);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Ticker#resume} */
    it('resume', done => {
        const ticker = new Ticker();
        const fn = sinon.stub();

        ticker.add(fn);
        ticker.run();

        let fnCallCount;
        let fnElapsed;

        delay100(({expectTime}) => {
            fnCallCount = fn.callCount;
            fnElapsed = fn.lastCall.args[0].elapsed;
            expect(fnElapsed).to.be.closeTo(expectTime, 32);
            expect(fn.lastCall.args[0].delta).to.be.closeTo(16, 32);
            ticker.pause();
            expect(ticker.paused).eql(true);
        })
        .then(curry(delay100)(() => {
            expect(fn.callCount).eql(fnCallCount);
            expect(fn.lastCall.args[0].elapsed).eql(fnElapsed);
            ticker.resume();
            expect(ticker.paused).eql(false);
        })).then(curry(delay100)(({expectTime}) => {
            expect(fn.callCount).to.be.above(fnCallCount);
            expect(fn.lastCall.args[0].elapsed).to.be.closeTo(fnElapsed + expectTime, 32);
            expect(fn.lastCall.args[0].delta).to.be.closeTo(16, 32);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Ticker#stop} */
    it('stop', done => {
        const ticker = new Ticker();
        const fn = sinon.stub();

        ticker.add(fn);
        ticker.run();

        let fnCallCount;
        let fnElapsed;

        delay100(({expectTime}) => {
            fnCallCount = fn.callCount;
            fnElapsed = fn.lastCall.args[0].elapsed;
            expect(fnElapsed).to.be.closeTo(expectTime, 32);
            expect(fn.lastCall.args[0].delta).to.be.closeTo(16, 32);
            ticker.stop();
            expect(ticker.paused).eql(true);
            ticker.resume();
            expect(ticker.paused).eql(true);
        })
        .then(curry(delay100)(() => {
            expect(fn.callCount).eql(fnCallCount);
            expect(fn.lastCall.args[0].elapsed).eql(fnElapsed);
            ticker.run();
            expect(ticker.paused).eql(false);
        }))
        .then(curry(delay100)(({expectTime}) => {
            expect(fn.callCount).to.be.above(fnCallCount);
            expect(fn.lastCall.args[0].elapsed).to.be.closeTo(expectTime, 32);
            expect(fn.lastCall.args[0].delta).to.be.closeTo(16, 32);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Ticker#freeze} */
    it('freeze', done => {
        const ticker = new Ticker();
        const fn1 = sinon.stub();
        const fn2 = sinon.stub();

        const fn1Id = ticker.add(fn1);
        ticker.add(fn2);
        ticker.run();

        let fn1CallCount;
        let fn2CallCount;
        let fn1Elapsed;
        let fn2Elapsed;
        delay100(({expectTime}) => {
            fn1CallCount = fn1.callCount;
            fn2CallCount = fn2.callCount;
            expect(fn1CallCount).to.be.at.least(1);
            expect(fn2CallCount).to.be.at.least(1);
            fn1Elapsed = fn1.lastCall.args[0].elapsed;
            expect(fn1Elapsed).to.be.closeTo(expectTime, 32);
            expect(fn1.lastCall.args[0].delta).to.be.closeTo(16, 32);
            fn2Elapsed = fn2.lastCall.args[0].elapsed;
            expect(fn2Elapsed).to.be.closeTo(expectTime, 32);
            expect(fn2.lastCall.args[0].delta).to.be.closeTo(16, 32);
            ticker.freeze(fn1Id);
        })
        .then(curry(delay100)(({expectTime}) => {
            expect(fn1.callCount).to.eql(fn1CallCount);
            expect(fn2.callCount).to.be.above(fn2CallCount);
            expect(fn1.lastCall.args[0].elapsed).to.eql(fn1Elapsed);
            expect(fn2.lastCall.args[0].elapsed).to.be.closeTo(fn2Elapsed + expectTime, 32);
            fn2CallCount = fn2.callCount;
            fn2Elapsed = fn2.lastCall.args[0].elapsed;
            ticker.freeze(fn2);
        }))
        .then(curry(delay100)(() => {
            expect(fn1.callCount).to.eql(fn1CallCount);
            expect(fn2.callCount).to.eql(fn2CallCount);
            expect(fn1.lastCall.args[0].elapsed).to.eql(fn1Elapsed);
            expect(fn2.lastCall.args[0].elapsed).to.eql(fn2Elapsed);
        }))
        .then(done)
        .catch(done);
    });

   /** @test {Ticker#unfreeze} */
    it('unfreeze', done => {
        const ticker = new Ticker();
        const fn1 = sinon.stub();
        const fn2 = sinon.stub();

        const fn1Id = ticker.add(fn1);
        ticker.add(fn2);
        ticker.run();

        let fn1CallCount;
        let fn2CallCount;
        let fn1Elapsed;
        let fn2Elapsed;
        delay100(({expectTime}) => {
            fn1CallCount = fn1.callCount;
            fn2CallCount = fn2.callCount;
            expect(fn1CallCount).to.be.at.least(1);
            expect(fn2CallCount).to.be.at.least(1);
            fn1Elapsed = fn1.lastCall.args[0].elapsed;
            expect(fn1Elapsed).to.be.closeTo(expectTime, 32);
            expect(fn1.lastCall.args[0].delta).to.be.closeTo(16, 32);
            fn2Elapsed = fn2.lastCall.args[0].elapsed;
            expect(fn2Elapsed).to.be.closeTo(expectTime, 32);
            expect(fn2.lastCall.args[0].delta).to.be.closeTo(16, 32);
            ticker.freeze(fn1Id);
        })
        .then(curry(delay100)(({expectTime}) => {
            expect(fn1.callCount).to.eql(fn1CallCount);
            expect(fn2.callCount).to.be.above(fn2CallCount);
            expect(fn1.lastCall.args[0].elapsed).to.eql(fn1Elapsed);
            expect(fn2.lastCall.args[0].elapsed).to.be.closeTo(fn2Elapsed + expectTime, 32);
            fn2CallCount = fn2.callCount;
            fn2Elapsed = fn2.lastCall.args[0].elapsed;
            ticker.freeze(fn2);
            ticker.unfreeze(fn1Id);
        }))
        .then(curry(delay100)(({expectTime}) => {
            expect(fn1.callCount).to.be.above(fn1CallCount);
            expect(fn2.callCount).to.eql(fn2CallCount);
            expect(fn1.lastCall.args[0].elapsed).to.be.closeTo(fn1Elapsed + expectTime, 32);
            expect(fn2.lastCall.args[0].elapsed).to.eql(fn2Elapsed);
            fn1CallCount = fn1.callCount;
            fn1Elapsed = fn1.lastCall.args[0].elapsed;
            ticker.unfreeze(fn2);
        }))
        .then(curry(delay100)(({expectTime}) => {
            expect(fn1.callCount).to.be.above(fn1CallCount);
            expect(fn2.callCount).to.be.above(fn2CallCount);
            expect(fn1.lastCall.args[0].elapsed).to.be.closeTo(fn1Elapsed + expectTime, 32);
            expect(fn2.lastCall.args[0].elapsed).to.be.closeTo(fn2Elapsed + expectTime, 32);
        }))
        .then(done)
        .catch(done);
    });
});
/* eslint-enable no-unexpected-multiline */
/* eslint-enable no-spaced-func */
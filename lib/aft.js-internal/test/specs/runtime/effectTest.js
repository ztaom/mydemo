import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Effect from '../../../src/runtime/effect';

chai.use(sinonChai);
const {expect} = chai;

/** @test {Effect} */
describe('Effect', () => {

    /** @test {Effect#constructor} */
    it('constructor', () => {
        expect(Effect).is.instanceof(Function);
        expect(Effect.length).eql(0);

        const effect = new Effect();
        expect(effect).is.instanceof(Effect);
    });

    /** @test {Effect#add} */
    it('add', () => {
        const effect = new Effect();

        expect(() => {
            effect.add({});
        }).to.be.throw(Error);

        const kf = {
            map: new Map(),
            easing: () => {}
        };

        expect(effect.add(kf)).eql(effect);
        expect(effect.keyframes.size).eql(1);
        expect([...effect.keyframes]).eql([{
            map: kf.map,
            easing: kf.easing,
            update: undefined,
            delay: 0,
            duration: 0,
            fillMode: 'forwards',
            iteration: 1,
            direction: 'normal'
        }]);
    });

    /** @test {Effect#clear} */
    it('clear', () => {
        const effect = new Effect();

        expect(() => {
            effect.add({});
        }).to.be.throw(Error);

        const kf = {
            map: new Map(),
            easing: () => {}
        };

        effect.add(kf);
        effect.clear();
        expect(effect.keyframes.size).eql(0);
    });

    /** @test {Effect#clone} */
    it('clone', () => {
        const effect = new Effect();

        function update() {}
        function easing() {}

        effect.add({
            map: new Map([
                ['a', 1],
                ['b', 2]
            ]),
            duration: 100,
            delay: 100,
            iteration: Infinity,
            easing
        }).add({
            map: new Map([['c', 3], ['d', 4]]),
            update
        });

        const [res1, res2] = [...effect.clone().keyframes];
        expect([...res1.map]).eql([
            ['a', 1],
            ['b', 2]
        ]);
        expect(res1.duration).eql(100);
        expect(res1.delay).eql(100);
        expect(res1.iteration).eql(Infinity);
        expect(res1.easing).eql(easing);


        expect([...res2.map]).eql([
            ['c', 3],
            ['d', 4]
        ]);
        expect(res2.update).eql(update);
    });

    /** @test {Effect.use} */
    it('use', () => {
        const css = sinon.stub();
        const duration = sinon.stub();

        Effect
            .use(() => ({css}))
            .use({duration});

        const effect = new Effect();
        expect(effect.css).is.instanceof(Function);
        expect(effect.duration).is.instanceof(Function);
        expect(effect.css('color', '#fff')).eql(effect);
        expect(effect.duration(100)).eql(effect);
        expect(css).to.have.been.calledOnce;
        expect(duration).to.have.been.calledOnce;
    });
});
import chai from 'chai';
import {
    BasicEffects
} from '../../../src/effects';
import OriginalEffect from '../../../src/runtime/effect';

const {expect} = chai;

const easing = new Map();
easing.set('a', () => 'a');
easing.set('b', () => 'b');

class Effect extends OriginalEffect {}

export function clearEffect() {
    Object.keys(Effect.prototype).forEach(key => {
        if (key !== 'end') {
            delete Effect.prototype[key];
        }
    });
}

/* eslint-disable no-console */
/** @test {effects} */
describe('effects', () => {

    beforeEach(() => {
        clearEffect();
    });

    after(() => {
        clearEffect();
    });

    /** @test {BasicEffects} */
    it('basic', () => {
        Effect.use(BasicEffects);

        const effect = new Effect();
        const fn1 = () => true;
        const fn2 = x => x;

        effect
            .to('a', 1)
            .to({
                'b': 2,
                'c': 3
            })
            .update(fn1)
            .easing(fn2)
            .duration(1000)
            .delay(100)
            .iteration(Infinity)
            .direction('alternate');

        expect(effect.keyframes.size).eql(0);
        expect(effect.next()).eql(effect);
        expect(effect.keyframes.size).eql(1);
        effect.to({
            'a': 4
        });
        expect(effect.end());
        expect(effect.keyframes.size).eql(2);

        const [keyframe1, keyframe2] = [...effect.keyframes];
        expect([...keyframe1.map]).eql([
            ['a', 1],
            ['b', 2],
            ['c', 3]
        ]);
        expect(keyframe1.update).eql(fn1);
        expect(keyframe1.easing).eql(fn2);
        expect(keyframe1.duration).eql(1000);
        expect(keyframe1.delay).eql(100);
        expect(keyframe1.fillMode).eql('forwards');
        expect(keyframe1.iteration).eql(Infinity);
        expect(keyframe1.direction).eql('alternate');

        expect([...keyframe2.map]).eql([
            ['a', 4]
        ]);
        const n = Math.random();
        expect(keyframe2.easing(n)).eql(n);
        expect(keyframe2.duration).eql(0);
        expect(keyframe2.delay).eql(0);
        expect(keyframe2.fillMode).eql('forwards');
        expect(keyframe2.iteration).eql(1);
        expect(keyframe2.direction).eql('normal');
    });

    /** @test {BasicEffects#easing} */
    it('easing', () => {
        Effect.use(BasicEffects(easing));
        const effect = new Effect();

        effect.easing('a').end();
        expect([...effect.keyframes][0].easing).eql(easing.get('a'));

        effect.easing('b').end();
        expect([...effect.keyframes][1].easing).eql(easing.get('b'));

        effect.easing('cubic-bezier(0,0,1,1)').end();
        expect([...effect.keyframes][2].easing(0.5)).eql(0.5);

        effect.easing('cubic-bezier(.25, .1, .25, 1)').end();
        expect([...effect.keyframes][3].easing).is.instanceof(Function);

        effect.easing('cubic-bezier(.5, -0.5, .5, 1.5)').end();
        expect([...effect.keyframes][4].easing).is.instanceof(Function);

        expect(() => effect.easing('c')).to.be.throw(Error);
        expect(() => effect.easing()).to.be.throw(Error);
        expect(() => effect.easing('cubic-bezier()')).to.be.throw(Error);
        expect(() => effect.easing('cubic-bezier(1)')).to.be.throw(Error);
    });
});
/* eslint-enable no-console */
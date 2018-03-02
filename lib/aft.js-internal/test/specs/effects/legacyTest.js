import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {
    BasicEffects,
    LegacyEffects
} from '../../../src/effects';
import OriginalEffect from '../../../src/runtime/effect';

chai.use(sinonChai);
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

    /** @test {LegacyEffect} */
    it('legacy', () => {
        sinon.stub(console, 'warn');

        Effect
            .use(BasicEffects(easing))
            .use(LegacyEffects);
        const effect = new Effect();

        effect.ease('a');
        expect(console.warn).to.have.been.calledOnce;

        effect.loop(2);
        expect(console.warn).to.have.been.calledTwice;

        effect.loopAll(Infinity);
        expect(console.warn).to.have.been.calledThird;

        effect.mode('backwards');
        expect(console.warn).to.have.been.callCount(4);

        effect.then();
        expect(console.warn).to.have.been.callCount(5);

        const keyframe = [...effect.keyframes][0];
        expect(keyframe.easing).eql(easing.get('a'));
        expect(keyframe.iteration).eql(2);
        expect(effect.repeatAll).eql({
            count: Infinity
        });
        expect(keyframe.fillMode).eql('forwards');

        console.warn.restore();
    });
});
/* eslint-enable no-console */
import chai from 'chai';
import {
    BasicEffects,
    ElementEffects
} from '../../../src/effects';
import OriginalEffect from '../../../src/runtime/effect';

const {expect} = chai;

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

    /** @test {ElementEffects} */
    it('element', () => {
        Effect.use(BasicEffects)
            .use(ElementEffects);
        const effect = new Effect();

        effect
            .css('opacity', 1)
            .move3d(1, 2, 3)
            .rotate3d(1, 2, 3, 45)
            .scale3d(1, 2, 3)
            .end();
        expect([...[...effect.keyframes][0].map]).eql([
            ['opacity', 1],
            ['translateX', 1],
            ['translateY', 2],
            ['translateZ', 3],
            ['rotate3d', [1, 2, 3, 45]],
            ['scaleX', 1],
            ['scaleY', 2],
            ['scaleZ', 3]
        ]);

        effect
            .css({
                'background-color': '#fff',
                'color': '#000'
            })
            .move(1, 2)
            .rotate(1)
            .scale(1, 2)
            .skew(1, 2)
            .next()
            .moveX(1)
            .moveY(2)
            .moveZ(3)
            .rotateX(1)
            .rotateY(2)
            .rotateZ(3)
            .scaleX(1)
            .scaleY(2)
            .scaleZ(3)
            .skewX(1)
            .skewY(2)
            .end();

        expect([...[...effect.keyframes][1].map]).eql([
            ['background-color', [0, 0, 100, 1]],
            ['color', [0, 0, 0, 1]],
            ['translateX', 1],
            ['translateY', 2],
            ['rotateZ', 1],
            ['scaleX', 1],
            ['scaleY', 2],
            ['skewX', 1],
            ['skewY', 2]
        ]);

        expect([...[...effect.keyframes][2].map]).eql([
            ['translateX', 1],
            ['translateY', 2],
            ['translateZ', 3],
            ['rotateX', 1],
            ['rotateY', 2],
            ['rotateZ', 3],
            ['scaleX', 1],
            ['scaleY', 2],
            ['scaleZ', 3],
            ['skewX', 1],
            ['skewY', 2]
        ]);
    });
});
/* eslint-enable no-console */
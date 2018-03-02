import chai from 'chai';
import CubicBezier from '../../../src/libs/cubicbezier';

const {expect} = chai;

describe('CubicBezier', () => {
    /** @test {cubicBezier} */
    it('cubicBezier', () => {
        expect(CubicBezier).is.instanceof(Function);
        expect(CubicBezier.length).eql(4);

        const cb = new CubicBezier(0, 0, 1, 1);
        expect(cb.y).is.instanceof(Function);
        expect(cb.y(0)).eql(0);
        expect(cb.y(1)).eql(1);

        for (let i = 0; i < 100; i++) {
            const n = parseFloat(Math.random().toFixed(2));
            expect(Number(cb.y(n).toFixed(2))).eql(n);
        }
    });
});

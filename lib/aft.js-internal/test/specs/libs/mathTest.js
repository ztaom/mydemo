import chai from 'chai';
import {
    accuracy,
    deg2rad
} from '../../../src/libs/math';

const {expect} = chai;

describe('Math', () => {

    /** @test {accuracy}*/
    it('accuracy', () => {
        expect(accuracy(0.123456789)).eql(0.123457);
        expect(accuracy('0.987654321')).eql(0.987654);

        for (let i = 0; i < 100; i++) {
            const n = Math.random() * 10000;
            expect(String(accuracy(n))).eql(String(Number(n.toFixed(6))));
        }
    });

    /** @test {deg2rad} */
    it('deg2rad', () => {
        expect(deg2rad(0)).eql(0);
        expect(deg2rad(180)).eql(Math.PI);
        expect(deg2rad(360)).eql(Math.PI * 2);
        expect(deg2rad(-180)).eql(-Math.PI);
        expect(deg2rad(-360)).eql(-Math.PI * 2);
        expect(deg2rad(50)).eql(Math.PI / 180 * 50);
        expect(deg2rad(-50)).eql(-Math.PI / 180 * 50);
    });
});
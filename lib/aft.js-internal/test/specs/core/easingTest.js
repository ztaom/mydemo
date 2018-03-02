import chai from 'chai';
import easing from '../../../src/core/easing';

const {expect} = chai;

/** @test {easing} */
describe('easing', () => {

    /** @test {easing#preset} */
    it('preset', () => {
        expect(easing.has('linear'));
        expect(easing.has('ease'));
        expect(easing.has('ease-in'));
        expect(easing.has('ease-out'));
        expect(easing.has('ease-in-out'));
        expect(easing.has('bounce-in'));
        expect(easing.has('bounce-out'));
        expect(easing.has('bounce-in-out'));
    });
});
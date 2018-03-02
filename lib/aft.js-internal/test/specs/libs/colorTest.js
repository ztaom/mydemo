import chai from 'chai';
import {
    isHex,
    isRgba,
    isHsla,
    rgba,
    hex,
    hsla,
    rgba2hsla,
    hex2hsla
} from '../../../src/libs/color';

const {expect} = chai;

describe('Color', () => {

    /** @test {isHex}*/
    it('isHex', () => {
        expect(isHex('#F00')).eql(true);
        expect(isHex('#F003')).eql(true);
        expect(isHex('#112233')).eql(true);
        expect(isHex('#11223300')).eql(true);
        expect(isHex('#1122330')).eql(false);
        expect(isHex('#F0')).eql(false);
        expect(isHex('F00')).eql(false);
        expect(isHex('#ZZZ')).eql(false);
        expect(isHex('rgba(0,0,0,1)')).eql(false);
    });

    /** @test {isRgba}*/
    it('isRgba', () => {
        expect(isRgba('rgba(255, 255, 255, 1)')).eql(true);
        expect(isRgba('rgba(255, 255, 255, 0.5)')).eql(true);
        expect(isRgba('rgba(255, 255, 255)')).eql(false);
        expect(isRgba('rgba(-1, -1, -1, -1)')).eql(false);
        expect(isRgba('rgb(255, 255, 255)')).eql(true);
        expect(isRgba('rgb(255, 255, 255, 0.5)')).eql(false);
        expect(isRgba('rgb(0.5, 0.5, 0.5)')).eql(false);
    });

    it('isHsla', () => {
        expect(isHsla('hsla(100, 50%, 50%, 1)')).eql(true);
        expect(isHsla('hsla(100.5, 50.5%, 50%, 0.5)')).eql(true);
        expect(isHsla('hsla(-100.5, 50.5%, 50%, 0.5)')).eql(true);
        expect(isHsla('hsla(100.5, -50.5%, -50%)')).eql(false);
        expect(isHsla('hsl(100, 50%, 50%)')).eql(true);
        expect(isHsla('hsl(100.5, 50.5%, 50%)')).eql(true);
        expect(isHsla('hsl(-100.5, 50.5%, 50%, 1)')).eql(false);
        expect(isHsla('hsl(100.5, -50.5%, -50%)')).eql(false);
    });

    /** @test {hex}*/
    it('hex', () => {
        expect(hex('#F00')).eql([255, 0, 0, 1]);
        expect(hex('#F003')).eql([255, 0, 0, 0.2]);
        expect(hex('#112233')).eql([17, 34, 51, 1]);
        expect(hex('#11223300')).eql([17, 34, 51, 0]);
        expect(hex('#F00', 'webgl')).eql([1, 0, 0, 1]);
        expect(hex('#F003', 'webgl')).eql([1, 0, 0, 0.2]);
        expect(hex('#336699', 'webgl')).eql([0.2, 0.4, 0.6, 1]);
        expect(hex('#336699CC', 'webgl')).eql([0.2, 0.4, 0.6, 0.8]);
    });

    /** @test {rgba}*/
    it('rgba', () => {
        expect(rgba('rgba(255, 0, 0, 1)')).eql([255, 0, 0, 1]);
        expect(rgba('rgb(255, 0, 0)', 'webgl')).eql([1, 0, 0, 1]);
    });

    /** @test {hsla}*/
    it('hsla', () => {
        expect(hsla('hsla(360, 100%, 100%, 1)')).eql([255, 255, 255, 1]);
        expect(hsla('hsl(0, 0, 0)', 'webgl')).eql([0, 0, 0, 1]);
    });

    /** @test {rgba2hsla}*/
    it('rgba2hsla', () => {
        expect(rgba2hsla('rgba(255, 255, 255, 1)')).eql([0, 0, 100, 1]);
        expect(rgba2hsla('rgb(0, 0, 0)')).eql([0, 0, 0, 1]);
    });

    /** @test {hex2hsla}*/
    it('hex2hsla', () => {
        expect(hex2hsla('#FFFF')).eql([0, 0, 100, 1]);
        expect(hex2hsla('#000')).eql([0, 0, 0, 1]);
    });
});
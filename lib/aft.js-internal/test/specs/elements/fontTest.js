import chai from 'chai';
import Element from '../../../src/elements/element';
import Font from '../../../src/elements/font';

const {expect} = chai;

/** @test {Font} */
describe('FontElement', () => {

    /** @test {Font#constructor}*/
    it('constructor', () => {
        expect(Font).is.instanceof(Function);
        expect(Font.length).eql(4);

        const font = new Font(10, 10, 'font', 'left top');
        expect(font).is.instanceof(Element);
        expect(font).is.instanceof(Font);
        expect(font.className).eql('Font');
        expect(font.width).eql(10);
        expect(font.height).eql(10);
        expect(font.textContent).eql('font');
        expect(font.textAlign).eql('left top');
    });

    /** @test {Font#getBoundingRect}*/
    it('getBoundingRect', () => {
        const font = new Font(10, 10, 'font', 'left top');
        font.position.set(5, 5);
        expect(font.getBoundingRect()).eql({
            width: 10,
            height: 10,
            left: 0,
            top: 10,
            right: 10,
            bottom: 0
        });
    });
});

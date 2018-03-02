import chai from 'chai';
import Element from '../../../src/elements/element';
import SmartImage from '../../../src/elements/image';

const {expect} = chai;

/** @test {Image} */
describe('ImageElement', () => {

    before(() => {
        global.Image = () => {};
        global.HTMLImageElement = () => {};
        global.HTMLCanvasElement = () => {};
    });

    after(() => {
        delete global.Image;
        delete global.HTMLImageElement;
        delete global.HTMLCanvasElement;
    });

    /** @test {Image#constructor}*/
    it('constructor', () => {
        expect(SmartImage).is.instanceof(Function);
        expect(SmartImage.length).eql(3);

        const texture = new Image();
        const image = new SmartImage(10, 10, texture);
        expect(image).is.instanceof(Element);
        expect(image).is.instanceof(SmartImage);
        expect(image.className).eql('SmartImage');
        expect(image.texture).eql(texture);
        expect(image.width).eql(10);
        expect(image.height).eql(10);
    });

    /** @test {Image#size} */
    it('size', () => {
        const image = new SmartImage(10, 10, new Image());

        expect(image.size).eql('contain');
        image.size = 'cover';
        expect(image.size).eql('cover');
    });

    /** @test {Image#repeatX} */
    it('repeatX', () => {
        const image = new SmartImage(10, 10, new Image());

        expect(image.repeatX).eql(1);
        image.repeatX = Infinity;
        expect(image.repeatX).eql(Infinity);

        expect(() => {
            image.repeatX = 2;
        }).to.throw(Error);
    });

    /** @test {Image#repeatY} */
    it('repeatY', () => {
        const image = new SmartImage(10, 10, new Image());

        expect(image.repeatX).eql(1);
        image.repeatY = Infinity;
        expect(image.repeatY).eql(Infinity);

        expect(() => {
            image.repeatY = 2;
        }).to.throw(Error);
    });

    /** @test {Image#repeat} */
    it('repeat', () => {
        const image = new SmartImage(10, 10, new Image());

        expect(image.repeat).eql([1, 1]);
        image.repeat = [1, Infinity];
        expect(image.repeat).eql([1, Infinity]);
        expect(image.repeatX).eql(1);
        expect(image.repeatY).eql(Infinity);

        expect(() => {
            image.repeat = [-1, 2];
        }).to.throw(Error);
    });

    /** @test {Image#offsetX} */
    it('offsetX', () => {
        const image = new SmartImage(10, 10, new Image());

        expect(image.offsetX).eql(0);
        image.offsetX = 10;
        expect(image.offsetX).eql(10);

        expect(() => {
            image.offsetX = '10%';
        }).to.throw(Error);
    });

    /** @test {Image#offsetY} */
    it('offsetY', () => {
        const image = new SmartImage(10, 10, new Image());

        expect(image.offsetY).eql(0);
        image.offsetY = 10;
        expect(image.offsetY).eql(10);

        expect(() => {
            image.offsetY = '10%';
        }).to.throw(Error);
    });

    /** @test {Image#offset} */
    it('offset', () => {
        const image = new SmartImage(10, 10, new Image());

        expect(image.offset).eql([0, 0]);
        image.offset = [10, -10];
        expect(image.offset).eql([10, -10]);

        expect(() => {
            image.offset = ['50%', '10%'];
        }).to.throw(Error);
    });
});

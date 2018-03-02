import chai from 'chai';
import Element from '../../../src/elements/element';

const {expect} = chai;

/** @test {Element} */
describe('Element', () => {

    /** @test {Element#constructor}*/
    it('constructor', () => {
        expect(Element).is.instanceof(Function);
        expect(Element.length).eql(1);

        const element = new Element('abstract');
        expect(element.className).eql('abstract');
        expect(element.cached).eql(false);
        expect(element.recycle).eql(false);
        expect(element.life).eql('created');
        expect(element.position.x).eql(0);
        expect(element.position.y).eql(0);
        expect(element.position.z).eql(0);
        expect(element.style.size).eql(0);
        expect(element.transform.size).eql(0);
    });

    /** @test {Element#cached} */
    it('cached', () => {
        const element = new Element('abstract');
        expect(element.cached).eql(false);

        element.cached = true;
        expect(element.cached).eql(true);
        element.position.set(1, 1, 1);
        expect(element.cached).eql(false);

        element.cached = true;
        expect(element.cached).eql(true);
        element.style.set('opacity', 1);
        expect(element.cached).eql(false);

        element.cached = true;
        expect(element.cached).eql(true);
        element.transform.set('translateX', 1);
        expect(element.cached).eql(false);
    });

    /** @test {Element#life} */
    it('life', () => {
        const element = new Element('abstract');
        expect(element.life).eql('created');

        element.life = 'attached';
        expect(element.life).eql('attached');
    });

    /** @test {Element#getBoundingRect} */
    it('getBoundingRect', () => {
        const element1 = new Element('abstract');
        expect(element1.getBoundingRect()).eql({
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        });

        const element2 = new Element('abstract', 10, 10);
        expect(element2.getBoundingRect()).eql({
            width: 10,
            height: 10,
            left: -5,
            top: 5,
            right: 5,
            bottom: -5
        });

        const element3 = new Element('abstract', 10, 10);
        element3.position.set(10, 10);
        expect(element3.getBoundingRect()).eql({
            width: 10,
            height: 10,
            left: 5,
            top: 15,
            right: 15,
            bottom: 5
        });
    });
});

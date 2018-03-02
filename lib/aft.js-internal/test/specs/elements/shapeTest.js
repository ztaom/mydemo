import chai from 'chai';
import Element from '../../../src/elements/element';
import {
    Rectangle,
    Circle,
    Ellipse,
    Triangle
} from '../../../src/elements/shape';

const {expect} = chai;

/** @test {Shape} */
describe('ShapeElement', () => {

    /** @test {Rectangle}*/
    it('Rectangle', () => {
        expect(Rectangle).is.instanceof(Function);
        expect(Rectangle.length).eql(2);

        const rect = new Rectangle(10, 10);
        expect(rect).is.instanceof(Element);
        expect(rect).is.instanceof(Rectangle);
        expect(rect.className).eql('Rectangle');
        expect(rect.width).eql(10);
        expect(rect.height).eql(10);
        expect(rect.getBoundingRect()).eql({
            width: 10,
            height: 10,
            left: -5,
            top: 5,
            right: 5,
            bottom: -5
        });
    });

    /** @test {Circle}*/
    it('Circle', () => {
        expect(Circle).is.instanceof(Function);
        expect(Circle.length).eql(1);

        const circle = new Circle(5);
        expect(circle).is.instanceof(Element);
        expect(circle).is.instanceof(Circle);
        expect(circle.className).eql('Circle');
        expect(circle.radius).eql(5);
        expect(circle.width).eql(10);
        expect(circle.height).eql(10);
        expect(circle.getBoundingRect()).eql({
            width: 10,
            height: 10,
            left: -5,
            top: 5,
            right: 5,
            bottom: -5
        });
    });

    /** @test {Ellipse}*/
    it('Ellipse', () => {
        expect(Ellipse).is.instanceof(Function);
        expect(Ellipse.length).eql(2);

        const ellipse = new Ellipse(5, 10);
        expect(ellipse).is.instanceof(Element);
        expect(ellipse).is.instanceof(Ellipse);
        expect(ellipse.className).eql('Ellipse');
        expect(ellipse.hRadius).eql(5);
        expect(ellipse.vRadius).eql(10);
        expect(ellipse.width).eql(10);
        expect(ellipse.height).eql(20);
        expect(ellipse.getBoundingRect()).eql({
            width: 10,
            height: 20,
            left: -5,
            top: 10,
            right: 5,
            bottom: -10
        });
    });

    /** @test {Triangle}*/
    it('Triangle', () => {
        expect(Triangle).is.instanceof(Function);
        expect(Triangle.length).eql(3);

        const triangle = new Triangle(10, 10, 30);
        expect(triangle).is.instanceof(Element);
        expect(triangle).is.instanceof(Triangle);
        expect(triangle.className).eql('Triangle');
        expect(triangle.theta).eql(30);
        expect(triangle.width).eql(10);
        expect(triangle.height).eql(10);
        expect(triangle.getBoundingRect()).eql({
            width: 10,
            height: 10,
            left: -5,
            top: 5,
            right: 5,
            bottom: -5
        });
    });
});

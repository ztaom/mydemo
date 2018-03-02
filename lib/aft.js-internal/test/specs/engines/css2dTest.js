import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
    Rectangle,
    Circle,
    Ellipse,
    Triangle
} from '../../../src/elements/shape';
import Group from '../../../src/elements/group';
import Font from '../../../src/elements/font';
import SmartImage from '../../../src/elements/image';

import CSS2D from '../../../src/engines/css2d';

import {
    HTMLElement,
    DocumentFragment,
    Image,
    HTMLImageElement
} from '../util';

chai.use(sinonChai);
const {expect} = chai;

/** @test {CSS2D} */
describe('CSS2DEngine', () => {

    let canvasElement;

    before(() => {
        const head = new HTMLElement();
        const body = new HTMLElement();

        global.Image = Image;
        global.HTMLImageElement = HTMLImageElement;
        global.document = {
            body,

            getElementById(id) {
                return HTMLElement.Container.get(id);
            },

            querySelector(s) {
                if (s === 'head') {
                    return head;
                }
            },

            createElement() {
                return new HTMLElement();
            },

            createDocumentFragment() {
                return new DocumentFragment();
            }
        };
    });

    beforeEach(() => {
        canvasElement = new HTMLElement();
    });

    after(() => {
        delete global.Image;
        delete global.HTMLImageElement;
        delete global.document;
    });

    /** @test {CSS2D#constructor}*/
    it('constructor', () => {
        expect(CSS2D).is.instanceof(Function);
        expect(CSS2D.length).eql(0);

        const engine = new CSS2D();
        expect(engine).is.instanceof(CSS2D);
    });

    /** @test {CSS2D#clear} */
    it('clear', () => {
        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        canvasElement.innerHTML = 'test';
        engine.clear();
        expect(canvasElement.innerHTML).eql('');
    });

    /** @test {CSS2D#setClearColor} */
    it('setClearColor', () => {
        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setClearColor('#000');
        expect(canvasElement.style.backgroundColor).eql('rgba(0,0,0,1)');
    });

    /** @test {CSS2D#draw} */
    it('drawRectangle', () => {
        const rect = new Rectangle(10, 10);
        rect.style.set('background-color', '#F00');
        rect.style.set('border-left-width', '2px');
        rect.style.set('border-left-color', '#00F');
        rect.style.set('opacity', 0.5);
        rect.position.set(0, 0, 10);
        rect.transform.set('translateX', 100)
                        .set('translateY', 100);

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(100, 100);
        engine.draw(rect);

        expect([...engine._elementsContainer]).eql([rect]);
        const domElement = rect.domElement;
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-100,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-100,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-100,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-100,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;background-color:rgba(255,0,0,1);border-left-width:2px;border-left-color:rgba(0,0,255,1);opacity:0.5;overflow:hidden;width:10px;height:10px;left:45px;top:45px;z-index:10');
        expect(domElement.parentNode).eql(canvasElement);
        expect(canvasElement.children).eql([rect.domElement]);
    });

    /** @test {CSS2D#draw} */
    it('drawCircle', () => {
        const circle = new Circle(5);
        circle.style.set('background-color', '#F00');
        circle.style.set('opacity', 0.5);
        circle.position.set(5, 5, 10);
        circle.transform.set('translateX', 50)
                        .set('rotateZ', 90);

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(100, 100);
        engine.draw(circle);

        expect([...engine._elementsContainer]).eql([circle]);
        const domElement = circle.domElement;
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(0,-1,0,0,1,0,0,0,0,0,1,0,50,0,0,1);-ms-transform:matrix3d(0,-1,0,0,1,0,0,0,0,0,1,0,50,0,0,1);-moz-transform:matrix3d(0,-1,0,0,1,0,0,0,0,0,1,0,50,0,0,1);transform:matrix3d(0,-1,0,0,1,0,0,0,0,0,1,0,50,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;background-color:rgba(255,0,0,1);opacity:0.5;overflow:hidden;width:10px;height:10px;left:50px;top:40px;z-index:10;border-radius:5px');
        expect(domElement.parentNode).eql(canvasElement);
        expect(canvasElement.children).eql([circle.domElement]);
    });

    /** @test {CSS2D#draw} */
    it('drawEllipse', () => {
        const ellipse = new Ellipse(10, 5);
        ellipse.style.set('background-color', '#F00');
        ellipse.style.set('opacity', 0.5);
        ellipse.position.set(5, 5, 10);
        ellipse.transform.set('translateX', 50)
                        .set('rotateZ', 90);

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(100, 100);
        engine.draw(ellipse);

        expect([...engine._elementsContainer]).eql([ellipse]);
        const domElement = ellipse.domElement;
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(0,-1,0,0,1,0,0,0,0,0,1,0,50,0,0,1);-ms-transform:matrix3d(0,-1,0,0,1,0,0,0,0,0,1,0,50,0,0,1);-moz-transform:matrix3d(0,-1,0,0,1,0,0,0,0,0,1,0,50,0,0,1);transform:matrix3d(0,-1,0,0,1,0,0,0,0,0,1,0,50,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;background-color:rgba(255,0,0,1);opacity:0.5;overflow:hidden;width:20px;height:10px;left:45px;top:40px;z-index:10;border-radius:10px/5px');
        expect(domElement.parentNode).eql(canvasElement);
        expect(canvasElement.children).eql([ellipse.domElement]);
    });

    /** @test {CSS2D#draw} */
    it('drawTriangle', () => {
        const triangle = new Triangle(5, 10, 45);
        triangle.style.set('background-color', '#F00');
        triangle.style.set('opacity', 0.5);
        triangle.position.set(5, 5, 10);
        triangle.transform.set('skewY', 15)
                        .set('translateY', 50);

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(100, 100);
        engine.draw(triangle);

        expect([...engine._elementsContainer]).eql([triangle]);
        const domElement = triangle.domElement;
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,-0.267949,0,0,0,1,0,0,0,0,1,0,0,-50,0,1);-ms-transform:matrix3d(1,-0.267949,0,0,0,1,0,0,0,0,1,0,0,-50,0,1);-moz-transform:matrix3d(1,-0.267949,0,0,0,1,0,0,0,0,1,0,0,-50,0,1);transform:matrix3d(1,-0.267949,0,0,0,1,0,0,0,0,1,0,0,-50,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;background-color:transparent;opacity:0.5;overflow:hidden;width:5px;height:10px;left:52.5px;top:40px;z-index:10;border-bottom:10px solid rgba(255,0,0,1);border-left:10px solid transparent;border-right:-5px solid transparent;border-top:0px');
        expect(domElement.parentNode).eql(canvasElement);
        expect(canvasElement.children).eql([triangle.domElement]);
    });

    /** @test {CSS2D#draw} */
    it('drawGroup', () => {
        const rect = new Rectangle(10, 10);
        rect.style.set('background-color', '#F00');
        rect.style.set('opacity', 0.5);
        rect.position.set(0, 0);

        const circle = new Circle(5);
        circle.style.set('background-color', '#F00');
        circle.style.set('opacity', 0.5);
        circle.position.set(5, -5);

        const triangle = new Triangle(5, 10, 45);
        triangle.style.set('background-color', '#F00');
        triangle.style.set('opacity', 0.5);
        triangle.position.set(10, 10);

        const group = new Group();
        group.add(rect);
        group.add(circle);
        group.add(triangle);
        group.position.set(50, 50, 10);

        const world = new Group();
        world.add(group);
        world.life === 'attached';

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(100, 100);
        engine.draw(world);

        expect([...engine._elementsContainer]).eql([world, group, rect, circle, triangle]);

        let domElement;
        domElement = rect.domElement;
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;background-color:rgba(255,0,0,1);opacity:0.5;overflow:hidden;width:10px;height:10px;left:-5px;top:-5px');
        expect(domElement.parentNode).eql(group.domElement);

        domElement = circle.domElement;
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;background-color:rgba(255,0,0,1);opacity:0.5;overflow:hidden;width:10px;height:10px;left:0px;top:0px;border-radius:5px');
        expect(domElement.parentNode).eql(group.domElement);

        domElement = triangle.domElement;
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;background-color:transparent;opacity:0.5;overflow:hidden;width:5px;height:10px;left:7.5px;top:-15px;border-bottom:10px solid rgba(255,0,0,1);border-left:10px solid transparent;border-right:-5px solid transparent;border-top:0px');
        expect(domElement.parentNode).eql(group.domElement);

        domElement = group.domElement;
        expect(domElement.children).eql([rect.domElement, circle.domElement, triangle.domElement]);
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;overflow:visible;width:0px;height:0px;left:50px;top:-50px;z-index:10');
        expect(domElement.parentNode).eql(world.domElement);

        domElement = world.domElement;
        expect(domElement.children).eql([group.domElement]);
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;overflow:visible;width:0px;height:0px;left:50px;top:50px');
        expect(domElement.parentNode).eql(canvasElement);

        expect(canvasElement.children).eql([world.domElement]);
    });

    /** @test {CSS2D#draw} */
    it('drawGroup specified width & height', () => {
        const group = new Group(20, 20);
        group.position.set(10, 10);

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(100, 100);
        engine.draw(group);

        expect([...engine._elementsContainer]).eql([group]);

        const domElement = group.domElement;
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;overflow:hidden;width:20px;height:20px;left:50px;top:30px');
    });

    /** @test {CSS2D#draw} */
    it('drawFont', () => {
        const font = new Font(30, 30, 'font', 'left top');
        font.style.set('color', '#F00');
        font.style.set('font-size', '15px');
        font.position.set(0, 0, 10);

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(100, 100);
        engine.draw(font);

        const domElement = font.domElement;

        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;color:rgba(255,0,0,1);font-size:15px;overflow:visible;text-align:left;line-height:15px;width:30px;height:30px;left:35px;top:35px;z-index:10');
        expect(domElement.textContent).eql('font');

        font.textAlign = 'left center';
        font.cached = false;
        engine.draw(font);
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;color:rgba(255,0,0,1);font-size:15px;overflow:visible;text-align:left;line-height:30px;width:30px;height:30px;left:35px;top:35px;z-index:10');

        font.textAlign = 'left bottom';
        font.cached = false;
        engine.draw(font);
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;color:rgba(255,0,0,1);font-size:15px;overflow:visible;text-align:left;line-height:45px;width:30px;height:30px;left:35px;top:35px;z-index:10');

        font.textAlign = 'center center';
        font.cached = false;
        engine.draw(font);
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;color:rgba(255,0,0,1);font-size:15px;overflow:visible;text-align:center;line-height:30px;width:30px;height:30px;left:35px;top:35px;z-index:10');

        font.textAlign = 'right center';
        font.cached = false;
        engine.draw(font);
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;color:rgba(255,0,0,1);font-size:15px;overflow:visible;text-align:right;line-height:30px;width:30px;height:30px;left:35px;top:35px;z-index:10');

        font.style.set('line-height', 10);
        engine.draw(font);
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;color:rgba(255,0,0,1);font-size:15px;line-height:10px;overflow:visible;text-align:right;width:30px;height:30px;left:35px;top:35px;z-index:10');
    });

    /** @test {CSS2D#draw} */
    it('drawSmartImage', () => {
        const image = new Image();
        const imageSrc = image.src = 'abc';

        const smartImage = new SmartImage(10, 10, image);
        smartImage.size = 'cover';
        smartImage.repeatX = Infinity;
        smartImage.offsetY = 20;
        smartImage.position.set(0, 0, 10);
        smartImage.transform.set('translateX', 100)
                        .set('translateY', 100);

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(100, 100);
        engine.draw(smartImage);

        expect([...engine._elementsContainer]).eql([smartImage]);
        const domElement = smartImage.domElement;
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-100,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-100,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-100,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-100,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;background-size:cover;background-repeat:repeat-x;background-position-x:0px;background-position-y:20px;overflow:hidden;width:10px;height:10px;left:45px;top:45px;z-index:10');
        expect(domElement.parentNode).eql(canvasElement);
        expect(canvasElement.children).eql([smartImage.domElement]);

        const imgHash = domElement.getAttribute('img-hash');
        const styleElement = HTMLElement.Container.get(`for-${imgHash}`);
        expect(styleElement.getAttribute('id')).eql(`for-${imgHash}`);
        expect(styleElement.textContent.replace(/\s/g, '')).eql(`[img-hash="${imgHash}"]{background-image:url(${imageSrc})!important;}`);
    });

    /** @test {CSS2D#drawBuffer} */
    it('drawBuffer', () => {
        const rect = new Rectangle(10, 10);
        rect.style.set('background-color', '#F00');
        rect.style.set('opacity', 0.5);
        rect.position.set(0, 0);
        rect.transform.set('translateX', 100)
                        .set('translateY', 100);

        const circle = new Circle(5);
        circle.style.set('background-color', '#F00');
        circle.style.set('opacity', 0.5);
        circle.position.set(5, 5);
        circle.transform.set('translateX', 100)
                        .set('translateY', 100);

        const triangle = new Triangle(5, 10, 45);
        triangle.style.set('background-color', '#F00');
        triangle.style.set('opacity', 0.5);
        triangle.position.set(5, 5);
        triangle.transform.set('translateX', 100)
                        .set('translateY', 100);

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(100, 100);
        engine.drawBuffer([rect, circle, triangle]);

        expect(engine._bufferFragment.childNodes).eql([rect.domElement, circle.domElement, triangle.domElement]);
        expect([...engine._elementsContainer]).eql([rect, circle, triangle]);
    });

    /** @test {CSS2D#draw} */
    it('draw with scaling', () => {
        const rect = new Rectangle(10, 10);
        rect.position.set(20, 50);
        rect.transform.set('translateX', 50)
                        .set('translateY', 100);

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(50, 50);
        engine.draw(rect);

        const domElement = rect.domElement;
        expect(domElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-200,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-200,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-200,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,-200,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;overflow:hidden;width:20px;height:20px;left:80px;top:-60px');
    });

    /** @test {CSS2D#draw} */
    it('draw with non-cached', () => {
        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(50, 50);

        const rect = new Rectangle(10, 10);
        const circle = new Circle(5);
        const triangle = new Triangle(5, 10, 45);
        const buffer = [rect, circle, triangle];

        engine.drawBuffer(buffer);
        expect(rect.domElement._cssTextStub.callCount).eql(1);
        expect(circle.domElement._cssTextStub.callCount).eql(1);
        expect(triangle.domElement._cssTextStub.callCount).eql(1);

        rect.position.set(1, 1, 1);
        engine.drawBuffer(buffer);
        expect(rect.domElement._cssTextStub.callCount).eql(2);
        expect(circle.domElement._cssTextStub.callCount).eql(1);
        expect(triangle.domElement._cssTextStub.callCount).eql(1);

        circle.style.set('opacity', 0);
        engine.drawBuffer(buffer);
        expect(rect.domElement._cssTextStub.callCount).eql(2);
        expect(circle.domElement._cssTextStub.callCount).eql(2);
        expect(triangle.domElement._cssTextStub.callCount).eql(1);

        triangle.transform.set('translateX', 1);
        engine.drawBuffer(buffer);
        expect(rect.domElement._cssTextStub.callCount).eql(2);
        expect(circle.domElement._cssTextStub.callCount).eql(2);
        expect(triangle.domElement._cssTextStub.callCount).eql(2);

        engine.drawBuffer(buffer);
        expect(rect.domElement._cssTextStub.callCount).eql(2);
        expect(circle.domElement._cssTextStub.callCount).eql(2);
        expect(triangle.domElement._cssTextStub.callCount).eql(2);
    });

    /** @test {CSS2D#draw} */
    it('draw with recycle', () => {
        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(50, 50);

        const font = new Font(10, 10, 'font', 'left center');
        font.recycle = true;
        const rect = new Rectangle(10, 10);
        rect.recycle = true;
        const circle = new Circle(5);
        circle.recycle = true;
        const triangle = new Triangle(5, 10, 45);
        triangle.recycle = true;

        engine.draw(font);
        engine.flush();
        const fontDomElement = font.domElement;
        expect(fontDomElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;overflow:visible;text-align:left;line-height:20px;width:20px;height:20px;left:40px;top:40px');
        expect(fontDomElement.textContent).eql('font');
        font.life = 'dettached';

        engine.draw(rect);
        engine.flush();
        const rectDomElement = rect.domElement;
        expect(rectDomElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;overflow:hidden;width:20px;height:20px;left:40px;top:40px');
        rect.life = 'dettached';

        engine.draw(circle);
        engine.flush();
        const circleDomElement = circle.domElement;
        expect(circleDomElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;overflow:hidden;width:20px;height:20px;left:40px;top:40px;border-radius:10px');
        expect(circleDomElement.textContent).eql('');
        expect(circleDomElement).eql(fontDomElement);
        circle.life = 'dettached';

        engine.draw(triangle);
        engine.flush();
        const triangleDomElement = triangle.domElement;
        expect(triangleDomElement.style.cssText).eql('box-sizing:border-box;position:absolute;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-ms-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-moz-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);-webkit-transform-origin:50% 50% 0;-ms-transform-origin:50% 50% 0;-moz-transform-origin:50% 50% 0;transform-origin:50% 50% 0;will-change:auto;overflow:hidden;width:10px;height:20px;left:45px;top:40px;background-color:transparent;border-bottom:10px solid undefined;border-left:20px solid transparent;border-right:0px solid transparent;border-top:0px');
        expect(triangleDomElement).eql(rectDomElement);
        triangle.life = 'dettached';
    });

    /** @test {CSS2D#flush} */
    it('flush', () => {
        const rect = new Rectangle(10, 10);
        const circle = new Circle(5);
        const triangle = new Triangle(5, 10, 45);
        const group = new Group();

        group.add(rect);
        group.add(circle);

        const engine = new CSS2D();
        engine.setCanvasElement(canvasElement);
        engine.setStyleSize(100, 100);
        engine.setCanvasSize(100, 100);
        engine.drawBuffer([group, triangle]);
        engine.flush();

        expect([...engine._elementsContainer]).eql([group, rect, circle, triangle]);
        expect(engine.flushed).eql(true);
        expect(engine._bufferFragment).to.be.undefined;
        expect(engine.canvas.children).eql([group.domElement, triangle.domElement]);
        expect(group.domElement.children).eql([rect.domElement, circle.domElement]);

        group.life = 'dettached';
        engine.drawBuffer([triangle]);
        engine.flush();

        expect([...engine._elementsContainer]).eql([triangle]);
        expect(engine.flushed).eql(true);
        expect(engine._bufferFragment).to.be.undefined;
        expect(engine.canvas.children).eql([triangle.domElement]);

        triangle.life = 'dettached';
        engine.drawBuffer([]);
        engine.flush();

        expect([...engine._elementsContainer]).eql([]);
        expect(engine.flushed).eql(true);
        expect(engine._bufferFragment).to.be.undefined;
        expect(engine.canvas.children).eql([]);
    });
});

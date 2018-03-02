import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Engine from '../../../src/engines/engine';
import {
    document
} from '../util';

chai.use(sinonChai);
const {expect} = chai;

/* eslint-disable no-console */
/** @test {Engine} */
describe('Engine', () => {

    const _doc = global.document;

    before(() => {
        global.document = document;
        sinon.stub(console, 'warn');
    });

    beforeEach(() => {
        console.warn.reset();
    });

    after(() => {
        console.warn.restore();
        global.document = _doc;
    });

    /** @test {Engine#constructor} */
    it('constructor', () => {
        expect(Engine).is.instanceof(Function);
        expect(Engine.length).eql(1);

        const engine = new Engine('abstract');
        expect(engine).is.instanceof(Engine);
        expect(engine.className).to.eql('abstract');
        expect(engine.flushed).eql(false);
    });

    /** @test {Engine#setCanvasElement} */
    it('setCanvasElement', () => {
        const engine = new Engine();
        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        expect(engine.canvas).eql(canvasElement);
    });

    /** @test {Engine#setCanvasSize} */
    it('setCanvasSize', () => {
        const engine = new Engine();

        expect(() => {
            engine.setCanvasSize(100, 100);
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setCanvasSize(100, 100);
        expect(engine._size).eql([100, 100]);
    });

    /** @test {Engine#setStyleSize} */
    it('setStyleSize', () => {
        const engine = new Engine();

        expect(() => {
            engine.setStyleSize(100, 50);
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setStyleSize(100, 50);
        expect(engine.styleWidth).eql(100);
        expect(engine.styleHeight).eql(50);
    });

    /** @test {Engine#canvasWidth} */
    it('canvasWidth', () => {
        const engine = new Engine();

        expect(() => {
            engine.canvasWidth;
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setStyleSize(100, 50);
        expect(engine.canvasWidth).eql(100);

        engine.setCanvasSize(200, 100);
        expect(engine.canvasWidth).eql(200);
    });

    /** @test {Engine#canvasHeight} */
    it('canvasHeight', () => {
        const engine = new Engine();

        expect(() => {
            engine.canvasHeight;
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setStyleSize(100, 50);
        expect(engine.canvasHeight).eql(50);

        engine.setCanvasSize(200, 100);
        expect(engine.canvasHeight).eql(100);
    });

    /** @test {Engine#scaleWidth} */
    it('scaleWidth', () => {
        const engine = new Engine();

        expect(() => {
            engine.scaleWidth;
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setStyleSize(100, 50);
        expect(engine.scaleWidth).eql(1);

        engine.setCanvasSize(200, 100);
        expect(engine.scaleWidth).eql(2);
    });

    /** @test {Engine#scaleHeight} */
    it('scaleHeight', () => {
        const engine = new Engine();

        expect(() => {
            engine.scaleHeight;
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setStyleSize(100, 50);
        expect(engine.scaleHeight).eql(1);

        engine.setCanvasSize(200, 10);
        expect(engine.scaleHeight).eql(0.2);
    });

    /** @test {Engine#resize} */
    it('resize', () => {
        const engine = new Engine();

        expect(() => {
            engine.resize();
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.resize();
    });

    /** @test {Engine#clear} */
    it('clear', () => {
        const engine = new Engine();

        expect(() => {
            engine.clear();
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);
        engine.clear();
    });

    /** @test {Engine#setClearColor} */
    it('setClearColor', () => {
        const engine = new Engine();

        expect(() => {
            engine.setClearColor();
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setClearColor('#0000');
        expect(engine._clearColor).eql('rgba(0,0,0,0)');
    });

    /** @test {Engine#draw} */
    it('draw', () => {
        const engine = new Engine();

        expect(() => {
            engine.draw();
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.flushed = true;
        engine.draw();
        expect(engine.flushed).eql(false);
    });

    /** @test {Engine#drawBuffer} */
    it('drawBuffer', () => {
        const engine = new Engine();

        expect(() => {
            engine.drawBuffer();
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.flushed = true;
        engine.drawBuffer();
        expect(engine.flushed).eql(false);
    });

    /** @test {Engine#flush} */
    it('flush', () => {
        const engine = new Engine();

        expect(() => {
            engine.flush();
        }).to.be.throw(Error);

        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.drawBuffer();
        expect(engine.flushed).eql(false);
        engine.flush();
        expect(engine.flushed).eql(true);
    });

    /**
     * @test {Engine#attachElement}
     * @deprecated
     */
    it('attachElement(deprecated)', () => {
        const engine = new Engine();
        const canvasElement = Object.create(null);
        engine.attachElement(canvasElement);

        expect(console.warn).to.have.been.calledOnce;
        expect(engine.canvas).eql(canvasElement);
    });

    /**
     * @test {Engine#setSize}
     * @deprecated
     */
    it('setSize(deprecated)', () => {
        const engine = new Engine();
        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setSize(100);
        expect(console.warn).to.have.been.calledOnce;
        expect(engine._size).eql([100, undefined]);
    });

    /**
     * @test {Engine#viewportWidth}
     * @deprecated
     */
    it('viewportWidth(deprecated)', () => {
        const engine = new Engine();
        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setStyleSize(100, 50);

        expect(engine.viewportWidth).eql(100);
        expect(console.warn).to.have.been.calledOnce;

        engine.setCanvasSize(200, 100);
        expect(engine.viewportWidth).eql(200);
        expect(console.warn).to.have.been.calledTwice;
    });

    /**
     * @test {Engine#viewportHeight}
     * @deprecated
     */
    it('viewportHeight(deprecated)', () => {
        const engine = new Engine();
        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setStyleSize(100, 50);

        expect(engine.viewportHeight).eql(50);
        expect(console.warn).to.have.been.calledOnce;

        engine.setCanvasSize(200, 100);
        expect(engine.viewportHeight).eql(100);
        expect(console.warn).to.have.been.calledTwice;
    });

    /**
     * @test {Engine#scaling}
     * @deprecated
     */
    it('scaling(deprecated)', () => {
        const engine = new Engine();
        const canvasElement = Object.create(null);
        engine.setCanvasElement(canvasElement);

        engine.setStyleSize(100, 50);

        expect(engine.scaling).eql(1);
        expect(console.warn).to.have.been.calledOnce;

        engine.setCanvasSize(200, 100);
        expect(engine.scaling).eql(2);
        expect(console.warn).to.have.been.calledTwice;
    });
});
/* eslint-enable no-console */

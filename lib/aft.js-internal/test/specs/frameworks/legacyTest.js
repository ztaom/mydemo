import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {
    Legacy as AFT,
    runtime,
    render
} from '../../../src/frameworks/legacy';
import {
    HTMLElement,
    document,
    delay
} from '../util';

const {
    Effect,
    Animation,
    Timeline
} = runtime;

const {
    Scene,
    Engine
} = render;

const {expect} = chai;
chai.use(sinonChai);

/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-spaced-func */
/** @test {Legacy} */
describe('Legacy', () => {
    function stubEngine(engine) {
        sinon.spy(engine, 'setCanvasSize');
        sinon.stub(engine, 'resize');
        sinon.stub(engine, 'setClearColor');
        sinon.stub(engine, 'drawBuffer');
        sinon.stub(engine, 'flush');
    }

    let element;
    let aft;
    var _doc = global.document;

    const delay100 = delay(100);

    before(() => {
        global.document = document;
        sinon.stub(console, 'warn');
    });

    after(() => {
        // eslint-disable-next-line
        console.warn.restore();
        global.document = _doc;
    });

    beforeEach(() => {
        element = new HTMLElement('div');
        aft = new AFT(element);
        stubEngine(aft.engine);
    });

    /** @test {AFT#constructor} */
    it('constructor', () => {
        let element, aft;

        element = new HTMLElement('div');
        aft = new AFT(element);
        expect(aft.engine.className).to.eql('CSS2D');
        expect(aft.engine.canvas).to.eql(element);

        element = new HTMLElement('canvas');
        aft = new AFT(element);
        expect(aft.engine.className).to.eql('Canvas2D');
        expect(aft.engine.canvas).to.eql(element);

        element = new HTMLElement('div');
        aft = new AFT(element, '2d');
        expect(aft.engine.className).to.eql('CSS2D');
        expect(aft.engine.canvas).to.eql(element);

        element = new HTMLElement('div');
        aft = new AFT(element, 'css');
        expect(aft.engine.className).to.eql('CSS2D');
        expect(aft.engine.canvas).to.eql(element);

        element = new HTMLElement('canvas');
        aft = new AFT(element, 'canvas');
        expect(aft.engine.className).to.eql('Canvas2D');
        expect(aft.engine.canvas).to.eql(element);

        const engine = new Engine('abc');
        aft = new AFT(engine);
        expect(aft.engine).to.eql(engine);
        expect(aft.engine.className).to.eql('abc');

        expect(() => {
            // eslint-disable-next-line
            new AFT(new HTMLElement(), 'abc');
        }).to.throws(Error);
    });

    /** @test {AFT#setSize} */
    it('setSize', () => {
        aft.setSize(100);
        expect(aft.engine.setCanvasSize.callCount).eql(1);
        expect(aft.engine.setCanvasSize.firstCall.args).eql([100, undefined]);
        expect(aft.engine.resize.callCount).eql(1);
    });

    /** @test {AFT#resize} */
    it('resize', () => {
        aft.resize();
        expect(aft.engine.resize.callCount).eql(1);
        expect(aft.engine.resize.firstCall.args).eql([]);
    });

    /** @test {AFT#setClearColor} */
    it('setClearColor', () => {
        aft.setClearColor('#fff');
        expect(aft.engine.setClearColor.callCount).eql(1);
        expect(aft.engine.setClearColor.firstCall.args).eql(['#fff']);
    });

    /** @test {AFT#viewportWidth} */
    it('getViewportWidth', () => {
        expect(aft.viewportWidth).eql(aft.engine.canvasWidth);
    });

    /** @test {AFT#viewportHeight} */
    it('getViewportWidth', () => {
        expect(aft.viewportHeight).eql(aft.engine.canvasHeight);
    });

    /** @test {AFT#scaling} */
    it('scaling', () => {
        expect(aft.scaling).eql(aft.engine.scaleWidth);
    });

    /** @test {AFT#createScene} */
    it('createScene', () => {
        const scene = aft.createScene();
        expect(scene).to.be.an.instanceof(Scene);
        expect(aft.createScene()).to.eql(scene);
    });

    /** @test {AFT#createElement} */
    it('createElement', () => {
        const rect = aft.createElement('rectangle', 100, 100);
        expect(rect.className).eql('Rectangle');
        expect(rect.width).eql(100);
        expect(rect.height).eql(100);

        expect(() => {
            aft.createElement('abc');
        }).to.be.throws(Error);
    });

    /** @test {AFT#createElement} */
    it('createElement with position/style/map', () => {
        const rect = aft.createElement('rectangle', 100, 100, {
            position: [10, 10],
            style: {
                opacity: 1
            },
            transform: [
                ['translateX', 100]
            ]
        });
        expect(rect.className).eql('Rectangle');
        expect(rect.width).eql(100);
        expect(rect.height).eql(100);
        expect([rect.position.x, rect.position.y]).eql([10, 10]);
        expect([...rect.style]).eql([['opacity', 1]]);
        expect([...rect.transform]).eql([['translateX', 100]]);
    });

    /** @test {AFT#createEffect} */
    it('createEffect', () => {
        const effect = aft.createEffect();
        expect(effect).to.be.an.instanceof(Effect);
    });

    /** @test {AFT#createAnimation} */
    it('createAnimation', () => {
        const element = aft.createElement('rectangle', 10, 10);
        const effect = aft.createEffect();
        effect.repeatAll = {count: 10};
        const animation = aft.createAnimation(element, effect);
        expect(animation).to.be.an.instanceof(Animation);
        expect(animation.element._element).to.eql(element);
        expect(animation.iteration).to.eql(10);
        expect(() => {
            animation.effect;
        }).to.throws(Error);
    });

    /** @test {AFT#createAnimation} */
    it('createAnimation with effect', () => {
        const element = aft.createElement('rectangle', 10, 10);
        const animation = aft.createAnimation(element, effect => effect.loopAll(10));
        expect(animation).to.be.an.instanceof(Animation);
        expect(animation.element._element).to.eql(element);
        expect(animation.iteration).to.eql(10);
    });

    /** @test {AFT#createAnimations} */
    it('createAnimations', () => {
        const element = aft.createElement('rectangle', 10, 10);
        const effect1 = aft.createEffect();

        const animations = aft.createAnimations(element, effect1, effect => effect.loopAll(10));
        expect(animations[0]).to.be.an.instanceof(Animation);
        expect(animations[0].element._element).eql(element);
        expect(animations[0].iteration).eql(1);

        expect(animations[1]).to.be.an.instanceof(Animation);
        expect(animations[1].element._element).eql(element);
        expect(animations[1].iteration).eql(10);
    });

    /** @test {AFT#createTimeline} */
    it('createTimeline', () => {
        const timeline = aft.createTimeline();
        expect(timeline).to.be.an.instanceof(Timeline);
    });

    /** @test {AFT#createTimeline} */
    it('createTimeline with animations', () => {
        const element = aft.createElement('rectangle', 10, 10);
        const effect1 = aft.createEffect();
        const effect2 = aft.createEffect();
        const animations = aft.createAnimations(element, effect1, effect2);

        const timeline = aft.createTimeline(animations);
        expect(timeline).to.be.an.instanceof(Timeline);
        expect(timeline._animations.size).eql(2);
        expect(timeline._animations.has(animations[0])).to.be.true;
        expect(timeline._animations.has(animations[1])).to.be.true;
    });

    function createElement(aft, scene) {
        const element = aft.createElement('rectangle', 10, 10);
        scene.add(element);
        return element;
    }

    function createAnimation(aft, element) {
        return aft.createAnimation(element,
            effect =>
                effect.moveX(10).duration(500)
        );
    }

    function createTimeline(aft) {
        const timeline = aft.createTimeline();
        return timeline;
    }

    function prepareBeforePlay(aft) {
        const scene = aft.createScene();
        const element = createElement(aft, scene);
        const animation = createAnimation(aft, element);
        const timeline = createTimeline(aft);
        timeline.add(animation);
        return scene;
    }

    /** @test {AFT#play} */
    it('play', () => {
        const scene = prepareBeforePlay(aft);

        let startedCount = 0;
        aft.on('start', () => startedCount++)
            .play(scene);

        expect(aft.isPlaying).to.eql(true);
        expect(startedCount).to.eql(1);
    });

    /** @test {AFT#pause} */
    it('pause', () => {
        const scene = prepareBeforePlay(aft);

        let startedCount = 0;
        let pausedCount = 0;
        aft.on('start', () => startedCount++)
            .on('pause', () => pausedCount++)
            .play(scene);

        expect(aft.isPlaying).to.eql(true);
        expect(startedCount).to.eql(1);

        aft.pause();
        expect(aft.isPaused).to.eql(true);
        expect(pausedCount).to.eql(1);
    });

    /** @test {AFT#resume} */
    it('resume', () => {
        const scene = prepareBeforePlay(aft);

        let startedCount = 0;
        let pausedCount = 0;
        let resumeCount = 0;
        aft.on('start', () => startedCount++)
            .on('pause', () => pausedCount++)
            .on('resume', () => resumeCount++)
            .play(scene);

        expect(aft.isPlaying).to.eql(true);
        expect(startedCount).to.eql(1);

        aft.pause();
        expect(aft.isPaused).to.eql(true);
        expect(pausedCount).to.eql(1);

        aft.resume();
        expect(aft.isPlaying).to.eql(true);
        expect(resumeCount).to.eql(1);
    });

   /** @test {AFT#cancel} */
    it('cancel', () => {
        const scene = prepareBeforePlay(aft);

        let startedCount = 0;
        let pausedCount = 0;
        let cancelCount = 0;
        aft.on('start', () => startedCount++)
            .on('pause', () => pausedCount++)
            .on('cancel', () => cancelCount++)
            .play(scene);

        expect(aft.isPlaying).to.eql(true);
        expect(startedCount).to.eql(1);

        aft.pause();
        expect(aft.isPaused).to.eql(true);
        expect(pausedCount).to.eql(1);

        aft.cancel();
        expect(aft.isFinished).to.eql(true);
        expect(cancelCount).to.eql(1);
    });

    /** @test {AFT#play} */
    it('play with animations', done => {
        const scene = prepareBeforePlay(aft);
        const element = createElement(aft, scene);
        const animation = createAnimation(aft, element);

        sinon.stub(animation, 'requestFrame');

        aft.play(scene, [animation]);

        delay100(() => {
            aft.cancel();
            expect(animation.requestFrame.callCount).to.be.at.least(1);
        })
        .then(done)
        .catch(done);
    });

    /** @test {AFT#play} */
    it('play with timelines', done => {
        const scene = prepareBeforePlay(aft);
        const element = createElement(aft, scene);
        const animation = createAnimation(aft, element);
        const timeline = createTimeline(aft);
        timeline.add(animation);

        sinon.stub(animation, 'requestFrame');
        sinon.spy(timeline, 'play');

        aft.play(scene, [timeline]);

        delay100(() => {
            aft.cancel();
            expect(animation.requestFrame.callCount).to.be.at.least(1);
            expect(timeline.play.callCount).to.eql(1);
        })
        .then(done)
        .catch(done);
    });

    /* @test {AFT#generateCustomCoords} */
    it('set generateCustomCoords', () => {
        aft.setSize(100, 100);
        let pos = aft.generateCustomCoords('left top');
        expect(pos(1, 2, 3)).eql([-49, 52, 3]);
        expect(pos(1, 2)).eql([-49, 52]);
        expect(pos.x(1)).eql(-49);
        expect(pos.y(2)).eql(52);
        expect(pos.z(3)).eql(3);
        expect(pos(0, 0)).eql([-50, 50]);
        pos = aft.generateCustomCoords('right top');
        expect(pos(1, 2, 3)).eql([51, 52, 3]);
        expect(pos(1, 2)).eql([51, 52]);
        pos = aft.generateCustomCoords('center top');
        expect(pos(1, 2, 3)).eql([1, 52, 3]);
        expect(pos(1, 2)).eql([1, 52]);
        pos = aft.generateCustomCoords('left center');
        expect(pos(1, 2, 3)).eql([-49, 2, 3]);
        expect(pos(1, 2)).eql([-49, 2]);
        pos = aft.generateCustomCoords('center center');
        expect(pos(1, 2, 3)).eql([1, 2, 3]);
        expect(pos(1, 2)).eql([1, 2]);
        pos = aft.generateCustomCoords('right center');
        expect(pos(1, 2, 3)).eql([51, 2, 3]);
        expect(pos(1, 2)).eql([51, 2]);
        pos = aft.generateCustomCoords('left bottom');
        expect(pos(1, 2, 3)).eql([-49, -48, 3]);
        expect(pos(1, 2)).eql([-49, -48]);
        pos = aft.generateCustomCoords('center bottom');
        expect(pos(1, 2, 3)).eql([1, -48, 3]);
        expect(pos(1, 2)).eql([1, -48]);
        pos = aft.generateCustomCoords('right bottom');
        expect(pos(1, 2, 3)).eql([51, -48, 3]);
        expect(pos(1, 2)).eql([51, -48]);
    });
});
/* eslint-enable no-unexpected-multiline */
/* eslint-enable no-spaced-func */

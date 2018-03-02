import Map from 'babel-runtime/core-js/map';
import capitalize from 'lodash/capitalize';
import Event from '../libs/event';
import {
    runtime,
    globalTicker,
    extendProxy,
    extendEasing,
    extendEffect,
    createEffect,
    createAnimation,
    createAnimations,
    createTimeline,
    animate
} from './lite';
import * as render from './render';
import {
    LegacyEffects
} from '../effects';

extendEffect(LegacyEffects);

const {
    Element,
    Scene,
    Engine,
    CSS2D,
    Canvas2D
} = render;

const {
    Animation,
    Timeline
} = runtime;

const passedEvent = ['play', 'afterplay'];

/*eslint-disable no-console*/
class Legacy extends Event {
    /**
     * @example
     * const aft = new AFT(document.getElementById('canvas'), 'css');
     * aft.setSize(750);
     * @param  {HTMLElement|Engine} canvasElement
     * @param  {string} engineClass Specify "css" or "2d" for CSS2D and "canvas" for Canvas2D engine.
     * @return {Legacy}
     */
    constructor(canvasElement, engineClass) {
        super();

        let engine;

        if (!(canvasElement instanceof Engine)) {
            if (!engineClass) {
                if (canvasElement.tagName.toLowerCase() === 'canvas') {
                    engineClass = 'canvas';
                } else {
                    engineClass = 'css';
                }
            }

            switch (engineClass) {
                case '2d':
                case 'css':
                    engine = new CSS2D();
                    break;
                case 'canvas':
                    engine = new Canvas2D();
                    break;
                default:
                    throw new Error(`"${Engine}" is not a valid type of engine`);
            }
            engine.setCanvasElement(canvasElement);
        } else {
            engine = canvasElement;
        }

        this._engine = engine;
        this._scene = new Scene();
        this._timeline = createTimeline();
        this._start = false;

        passedEvent.forEach(type =>
            this._timeline.on(type, () => {
                if (type === 'afterplay') {
                    this._engine.drawBuffer(this._scene.children);
                    this._engine.flush();
                    this.emit('drawn');
                } else {
                    this.emit(type);
                }
            })
        );
    }

    /**
     * get the engine
     * @type {Engine}
     */
    get engine() {
        return this._engine;
    }

    /**
     * if is playing
     * @type {boolean}
     */
    get isPlaying() {
        return !this._timeline.paused && !this._timeline.ended;
    }

    /**
     * if is paused
     * @type {boolean}
     */
    get isPaused() {
        return this._timeline.paused;
    }

    /**
     * if is finished
     * @type {boolean}
     */
    get isFinished() {
        return this._timeline.ended;
    }

    /**
     * get frame to skip
     * @type {number}
     */
    get skipFrames() {
        return this._timeline.skipFrames;
    }

    /**
     * set frame to skip
     * @param {number} n
     */
    set skipFrames(n) {
        this._timeline.skipFrames = n;
    }

    /**
     * resize the canvas
     * @return {Legacy} current context
     */
    resize() {
        this._engine.resize();
        return this;
    }

    /**
     * @param {number} width
     * @param {number} [height]
     * @return {Legacy} current context
     */
    setSize(width, height) {
        this._engine.setCanvasSize(width, height);
        this._engine.resize();
        return this;
    }

    /**
     * @param {string} rgba
     * @return {Legacy} current context
     */
    setClearColor(rgba) {
        this._engine.setClearColor(rgba);
        return this;
    }

    /**
     * @return {Legacy} current context
     */
    get viewportWidth() {
        return this._engine.canvasWidth;
    }

    /**
     * @return {Legacy} current context
     */
    get viewportHeight() {
        return this._engine.canvasHeight;
    }

    /**
     * @return {Legacy} current context
     */
    get scaling() {
        return this._engine.scaleWidth;
    }

    /**
     * create a scene
     * @return {Scene}
     */
    createScene() {
        return this._scene;
    }

    /**
     * create a element
     * @example
     * const rect = aft.createElement('rectangle', 100, 100, {
     *     position: [10, 10], // an array
     *     style: { // an object
     *         opacity: 1
     *     },
     *     transform: [ // a map entry
     *         ['translateX', 100]
     *     ]
     * });
     * @param  {string} elementType rectangle/circle/triangle/group etc.
     * @param  {...*} initialArguments initial arguments for element, the last argument can be an option that include position & style & map
     * @return {Element}
     * @throws {Error} If elementType is invalid
     */
    createElement(elementType, ...initialArguments) {
        const ElementClass = render[capitalize(elementType)];

        if (ElementClass && ElementClass.prototype instanceof Element) {
            let options;
            if (initialArguments.length === ElementClass.length + 1) {
                options = initialArguments.splice(initialArguments.length - 1, 1);
            }

            const element = new ElementClass(...initialArguments);
            if (options) {
                options.forEach(opt => {
                    if (opt.position) {
                        element.position.set(...opt.position);
                    }

                    if (opt.style) {
                        Object.keys(opt.style)
                                .forEach(key => {
                                    element.style.set(key, opt.style[key]);
                                });
                    }

                    if (opt.transform) {
                        opt.transform.forEach(([key, value]) => {
                            element.transform.set(key, value);
                        });
                    }
                });
            }

            return element;
        } else {
            throw new Error(`${elementType} is not a valid type of element.`);
        }
    }

    /**
     * create a effect
     * @return {Effect}
     */
    createEffect() {
        return createEffect();
    }

    /**
     * create a animation
     * @example
     * aft.createAnimation(element, effect);
     * @example
     * aft.createAnimation(element, (effect, element) => {...});
     * @param  {Element} element
     * @param  {Effect|function(effect: Effect, element: Element)} sth
     * @param  {number} iteration
     * @return {Animation}
     */
    createAnimation(element, sth, iteration) {
        let effect = sth;
        if (sth instanceof Function) {
            const fn = sth;
            sth = (...args) => {
                effect = args[0];
                return fn(...args);
            };
        }

        const animation = createAnimation(element, sth, iteration);

        if (effect.repeatAll) { // fallback to effect.loopAll()
            animation.iteration = effect.repeatAll.count;
        }

        Object.defineProperties(animation, {
            element: {
                get() {
                    return animation.current;
                }
            },

            effect: {
                get() {
                    throw new Error('Broken! The "aniamtion.effect" is nerver used!');
                }
            }
        });
        return animation;
    }

    /**
     * create animations
     * @param  {Element} element
     * @param  {...Effect|...function(effect: Effect, element: Element)} effects
     * @return {Animation}
     */
    createAnimations(element, ...effects) {
        return effects.map(effect => this.createAnimation(element, effect));
    }

    /**
     * create a timeline
     * @param {Array<Animation>} [animations]
     * @param {Object} [option]
     * @return {Timeline}
     */
    createTimeline(animations, option) {
        if (animations) {
            animations.forEach(animation => this._timeline.add(animation, option));
        }
        return this._timeline;
    }

    /**
     * start to play timelines in a certain scene
     * @example
     * aft.play(scene, [animation1, animation2]);
     * @example
     * aft.play(scene, [timeline1, timeline2]);
     * @event start & play & drawn
     * @param  {Scene} scene
     * @param  {Array<Animation|Timeline>} sth
     * @return {Legacy} current context
     */
    play(scene, sth) {
        if (sth instanceof Array) {
            sth.forEach(s => {
                if (s instanceof Animation) {
                    this._timeline.add(s);
                } else if (s instanceof Timeline && s !== this._timeline) {
                    s._animations.forEach((option, animation) => this._timeline.add(animation, option));
                }
            });
        }

        if (!this._start) {
            this._start = true;
            this._timeline.play();
            this.emit('start');
        } else if (this.isPaused) {
            this._timeline.play();
            this.emit('resume');
        } else if (this.isFinished) {
            this._timeline.replay();
            this.emit('replay');
        }

        return this;
    }

    /**
     * pause
     * @event pause
     * @return {Core} current context
     */
    pause() {
        if (this.isPlaying) {
            this.emit('pause');
            this._timeline.pause();
        }
        return this;
    }

    /**
     * cancel
     * @event cancel
     * @return {Core} current context
     */
    cancel() {
        if (!this.isFinished) {
            this.emit('cancel');
            this._timeline.stop();
        }
        return this;
    }

    /**
     * resume
     * @event resume
     * @return {Legacy} current context
     */
    resume() {
        this.play();
        return this;
    }

    /**
     * generateCustomCoords
     * @example
     * aft.generateCustomCoords('left top');
     * @param  {string} coordsPosition like `center center`
     * @return {Array} [x, y] or [x, y, z]
     */
    generateCustomCoords(coordsPosition) {
        const viewportWidth = this.viewportWidth;
        const viewportHeight = this.viewportHeight;

        coordsPosition = coordsPosition || 'center center';

        /**
         * const - description
         *
         * @param  {map} originDot origin dot
         * @return {map}           target dot
         */
        const getValue = function(originDot) {
            const targetCoords = new Map();
            const targetDot = new Map();
            let targetX;
            let targetY;

            switch (coordsPosition) {
                case 'left top': {
                    targetX = -viewportWidth / 2;
                    targetY = viewportHeight / 2;
                    break;
                }
                case 'left center': {
                    targetX = -viewportWidth / 2;
                    targetY = 0;
                    break;
                }
                case 'left bottom': {
                    targetX = -viewportWidth / 2;
                    targetY = -viewportHeight / 2;
                    break;
                }
                case 'center top': {
                    targetX = 0;
                    targetY = viewportHeight / 2;
                    break;
                }
                case 'center center': {
                    targetX = 0;
                    targetY = 0;
                    break;
                }
                case 'center bottom': {
                    targetX = 0;
                    targetY = -viewportHeight / 2;
                    break;
                }
                case 'right top': {
                    targetX = viewportWidth / 2;
                    targetY = viewportHeight / 2;
                    break;
                }
                case 'right center': {
                    targetX = viewportWidth / 2;
                    targetY = 0;
                    break;
                }
                case 'right bottom': {``;
                    targetX = viewportWidth / 2;
                    targetY = -viewportHeight / 2;
                    break;
                }
                // eslint-disable-next-line
                default: {}
            }
            targetCoords.set('x', targetX);
            targetCoords.set('y', targetY);
            if (originDot.get('x') !== undefined) {
                targetDot.set('x', targetCoords.get('x') + originDot.get('x'));
            }
            if (originDot.get('y') !== undefined) {
                targetDot.set('y', targetCoords.get('y') + originDot.get('y'));
            }
            return targetDot;
        };


        /**
         * getResult
         *
         * @example
         * let pos = AFT.generateCustomCoords('left top');
         * pos(1,2,3);
         *
         * @param  {number} x origin
         * @param  {number} y origin
         * @param  {number} z origin
         * @return {arr}   target
         */
        function getResult(x, y, z) {
            const targetArr = [];
            targetArr.push(getValue(new Map().set('x', x)).get('x'));
            targetArr.push(getValue(new Map().set('y', y)).get('y'));
            if (z) {
                targetArr.push(z);
            }
            return targetArr;
        }

        /**
         * @example
         * let pos = AFT.generateCustomCoords('left top');
         * pos.x(1);
         *
         * @param  {number} x origin
         * @return {number}   target
         */
        getResult.x = function(x) {
            const resultNum = getValue(new Map().set('x', x)).get('x');
            return resultNum;
        };
        /**
         * @example
         * let pos = AFT.generateCustomCoords('left top');
         * pos.y(1);
         *
         * @param  {number} y origin
         * @return {number}   target
         */
        getResult.y = function(y) {
            const resultNum = getValue(new Map().set('y', y)).get('y');
            return resultNum;
        };
        /**
         * @example
         * let pos = AFT.generateCustomCoords('left top');
         * pos.z(1);
         * @param  {number} z origin
         * @return {number}   target
         */
        getResult.z = function(z) {
            const resultNum = z;
            return resultNum;
        };

        return getResult;
    }
}
/*eslint-enable no-console*/

export {
    Legacy,
    render,
    runtime,
    globalTicker,
    extendProxy,
    extendEffect,
    extendEasing,
    createEffect,
    createAnimation,
    createAnimations,
    createTimeline,
    animate
};

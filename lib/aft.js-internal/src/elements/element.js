import Vec3 from '../libs/vec3';
import {StyleMap, TransformMap} from '../libs/css';

/**
 * @class Element
 */
export default class Element{
    /**
     * create a element
     * @param {string} className
     * @param {number} [width=0]
     * @param {number} [height=0]
     */
    constructor(className, width = 0, height = 0) {
        /**
         * the classname of Element
         * @type {string}
         */
        this.className = className;

        /**
         * the width of rectangle
         * @type {number}
         */
        this.width = width;
        /**
         * the height of rectangle
         * @type {number}
         */
        this.height = height;

        /**
         * if recycle when remove from the scene
         * @beta it's a beta feature, if You set it with true, please DO NOT ANYTING on it's domElement
         * @type {boolean}
         */
        this.recycle = false;

        /**
         * a position identified three dimension vectors
         * @type {Vec3}
         */
        this.position = new Vec3(0, 0, 0);

        /**
         * a map of style
         * @type {StyleMap}
         */
        this.style = new StyleMap();

        /**
         * a map of transform
         * @type {TransformMap}
         */
        this.transform = new TransformMap();

        this._cached = false;

        this._life = 'created';
    }

    /**
     * the lifecycle of element
     * @type {string} created/attached/dettached
     */
    get life() {
        return this._life;
    }

    set life(v) {
        this._life = v;
    }

    /**
     * if use cache when rendering
     * @type {boolean}
     */
    get cached() {
        return this._cached
                    && !this.position.modified
                    && !this.style.modified
                    && !this.transform.modified;
    }

    /**
     * reset cached
     * @type {boolean} cache
     */
    set cached(cache) {
        this._cached = cache;

        if (cache === true) {
            this.position.modified = false;
            this.style.modified = false;
            this.transform.modified = false;
        }
    }

    /**
     * get bounding box for geometry
     * @return {BoundingRect}
     */
    getBoundingRect() {
        return {
            width: this.width,
            height: this.height,
            left: this.position.x - this.width / 2,
            top: this.position.y + this.height / 2,
            right: this.position.x + this.width / 2,
            bottom: this.position.y - this.height / 2
        };
    }
}
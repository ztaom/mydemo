import create from 'gl-vec3/create';
import add from 'gl-vec3/add';
import copy from 'gl-vec3/copy';
import set from 'gl-vec3/set';

function normalizeArgument(x = 0, y = 0, z = 0) {
    return [x, y, z];
}

/**
 * a vector
 */
export default class Vec3 {
    /**
     * create a vec3
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     */
    constructor(x = 0, y = 0, z = 0) {
        /**
         * if modified
         * @type {Boolean}
         */
        this.modified = false;

        copy(this, create());
        this.set(x, y, z);
    }

    /**
     * get x of position
     * @type {number}
     */
    get x() {
        return this[0];
    }

    /**
     * set x of position
     * @type {number}
     */
    set x(v) {
        this.set(v);
    }

    /**
     * get y of position
     * @type {number}
     */
    get y() {
        return this[1];
    }

    /**
     * set y of position
     * @type {number}
     */
    set y(v) {
        this.set(undefined, v);
    }

    /**
     * get z of position
     * @type {number}
     */
    get z() {
        return this[2];
    }

    /**
     * set z of position
     * @type {number}
     */
    set z(v) {
        this.set(undefined, undefined, v);
    }

    /**
     * add a vec3
     * @param {Vec3|Float32Array<number>} vec3
     * @return {Vec3} the current context
     */
    add(vec3) {
        vec3 = normalizeArgument(vec3[0], vec3[1], vec3[2]);
        this.modified = true;
        return add(this, this, vec3);
    }

    /**
     * set x, y, z
     * @param {...number} xyz
     * @return {Vec3} current context
     */
    set(...xyz) {
        for (let i = 0; i < 3; i++) {
            if (xyz[i] === undefined) {
                xyz[i] = this[i];
            }
        }

        this.modified = true;
        return set(this, ...xyz);
    }
}
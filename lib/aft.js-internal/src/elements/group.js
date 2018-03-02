import Set from 'babel-runtime/core-js/set';
import Element from './element';

/**
 * @class Group
 * @extends {Element}
 */
export default class Group extends Element {
    /**
     * create a group element
     * @param {number} [width]
     * @param {number} [height]
     */
    constructor(width, height) {
        super('Group', width, height);

        /**
         * the set of elements
         * @type {Set}
         */
        this.children = new Set();
    }

    /**
     * the lifecycle of group
     * @type {string}
     */
    get life() {
        return this._life;
    }

    set life(v) {
        this._life = v;
        for (const child of this.children) {
            child.life = v;
        }
    }

    /**
     * add element(s) to group
     * @param {...Element} elements
     * @throws {Error} If not a element
     */
    add(...elements) {
        for (const element of elements) {
            if (element instanceof Element) {
                if (!this.children.has(element)) {
                    this.children.add(element);
                    if (this.life === 'attached') {
                        element.life = 'attached';
                    }
                }
            } else {
                throw new Error('not a element');
            }
        }
    }

    /**
     * remove element(s) from group
     * @param {...Element} elements
     */
    remove(...elements) {
        for (const element of elements) {
            if (element instanceof Element) {
                if (this.children.has(element)) {
                    this.children.delete(element);
                    element.life = 'dettached';
                }
            } else {
                throw new Error('not a element');
            }
        }
    }
}
import Set from 'babel-runtime/core-js/set';
/**
 * @class Scene
 */
export default class Scene {
    /**
     * create a scene
     */
    constructor() {
        /**
         * @type {Set} elements set
         */
        this.children = new Set();
    }

    /**
     * Add an element(s) into the scene
     * @param  {...Element} elements
     */
    add(...elements) {
        for (const element of elements) {
            if (!this.children.has(element)) {
                this.children.add(element);
                element.life = 'attached';
            }
        }
    }
    /**
     * Remove the element(s) from the scene
     * @param  {...Element} elements
     */
    remove(...elements) {
        for (const element of elements) {
            if (this.children.has(element)) {
                this.children.delete(element);
                element.life = 'dettached';
            }
        }
    }
}
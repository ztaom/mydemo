import Element from './element';

/**
 * @class Rectangle
 * @extends {Element}
 */
export class Rectangle extends Element {
    /**
     * create a rectangle element
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        super('Rectangle', width, height);
    }
}

/**
 * @class Circle
 * @extends {Element}
 */
export class Circle extends Element {
    /**
     * create a circle element
     * @param {number} radius
     */
    constructor(radius) {
        super('Circle', radius * 2, radius * 2);

        /**
         * the radius of circle
         * @type {number}
         */
        this.radius = radius;
    }
}

/**
 * @class Ellipse
 * @extends {Element}
 */
export class Ellipse extends Element {
   /**
     * create a ellipse element
     * @param {number} the radius of horizontal
     * @param {number} the radius of vertical
     */
    constructor(hRadius, vRadius) {
        super('Ellipse', hRadius * 2, vRadius * 2);

        /**
         * the radius of horizontal
         * @type {number}
         */
        this.hRadius = hRadius;
        /**
         * the radius of vertical
         * @type {number}
         */
        this.vRadius = vRadius;
    }
}

/**
 * @class Triangle
 * @extends {Element}
 */
export class Triangle extends Element {
    /**
     * create a triangle element
     * @param {number} width the width of the triangle
     * @param {number} height the height of the triangle
     * @param {number} theta the degree of horizontal angle
     */
    constructor(width, height, theta) {
        super('Triangle', width, height);

        /**
         * the degree of horizontal angle
         * @type {number}
         */
        this.theta = theta;
    }
}
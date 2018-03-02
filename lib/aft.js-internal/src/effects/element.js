import {
    numberify
} from '../libs/css';

export default () => ({
    css(key, value) {
        if (typeof key === 'string') {
            this.to(key, numberify(value));
        } else if (key instanceof Map) {
            key.forEach((value, key) => {
                this.to(key, numberify(value));
            });
        } else if (typeof key === 'object') {
            for (const n in key) {
                this.to(n, numberify(key[n]));
            }
        }
    },

    move3d(x, y, z) {
        if (typeof x === 'number') {
            this.css('translateX', x);
        }
        if (typeof y === 'number') {
            this.css('translateY', y);
        }
        if (typeof z === 'number') {
            this.css('translateZ', z);
        }
    },

    move(x, y) {
        this.move3d(x, y);
    },

    moveX(x) {
        this.move3d(x);
    },

    moveY(y) {
        this.move3d(undefined, y);
    },

    moveZ(z) {
        this.move3d(undefined, undefined, z);
    },

    rotate3d(x, y, z, d) {
        this.css('rotate3d', [x, y, z, d]);
    },

    rotateX(x) {
        this.css('rotateX', x);
    },

    rotateY(y) {
        this.css('rotateY', y);
    },

    rotateZ(z) {
        this.css('rotateZ', z);
    },

    rotate(z) {
        this.rotateZ(z);
    },

    scale3d(x, y, z) {
        if (typeof x === 'number') {
            this.css('scaleX', x);
        }
        if (typeof y === 'number') {
            this.css('scaleY', y);
        }
        if (typeof z === 'number') {
            this.css('scaleZ', z);
        }
    },

    scale(x, y) {
        this.scale3d(x, y);
    },

    scaleX(x) {
        this.scale3d(x);
    },

    scaleY(y) {
        this.scale3d(undefined, y);
    },

    scaleZ(z) {
        this.scale3d(undefined, undefined, z);
    },

    skew(x, y) {
        if (typeof x === 'number') {
            this.css('skewX', x);
        }
        if (typeof y === 'number') {
            this.css('skewY', y);
        }
    },

    skewX(x) {
        this.skew(x);
    },

    skewY(y) {
        this.skew(undefined, y);
    }
});
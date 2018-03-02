import Map from 'babel-runtime/core-js/map';
/**
 * @class
 * @extends Map
 */
class ObjectProxy extends Map {
    constructor(obj) {
        super();

        this._obj = obj;
    }

    has(name) {
        return this._obj[name] !== undefined;
    }

    get(name) {
        return this._obj[name];
    }

    set(name, value) {
        super.set(name, value);
        this._obj[name] = value;
        return this;
    }
}

const cacheKey = '__object_proxy_to_map__';
/**
 * proxy an object to a map
 * @param {Object} object
 * @return {ObjectProxy}
 */
export default function fromObject(object) {
    if (!object.hasOwnProperty(cacheKey)) {
        Object.defineProperty(object, cacheKey, {
            value: new ObjectProxy(object),
            enumerable: false
        });
    }
    return object[cacheKey];
}
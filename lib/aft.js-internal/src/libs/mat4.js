import create from 'gl-mat4/create';
import copy from 'gl-mat4/copy';

/**
 * 4x4 Matrix
 */
export default class Mat4 {
    /**
     * create a 4x4 matrix
     */
    constructor() {
        copy(this, create());
    }
}
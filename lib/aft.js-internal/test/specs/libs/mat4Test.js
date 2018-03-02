import chai from 'chai';
import Mat4 from '../../../src/libs/mat4';

const {expect} = chai;

/** @test {Mat4} */
describe('Mat4', () => {

    /** @test {Mat4#create}*/
    it('create', () => {
        const mat4 = new Mat4();
        expect(mat4[0]).eql(1);
        expect(mat4[1]).eql(0);
        expect(mat4[2]).eql(0);
        expect(mat4[3]).eql(0);

        expect(mat4[4]).eql(0);
        expect(mat4[5]).eql(1);
        expect(mat4[6]).eql(0);
        expect(mat4[7]).eql(0);

        expect(mat4[8]).eql(0);
        expect(mat4[9]).eql(0);
        expect(mat4[10]).eql(1);
        expect(mat4[11]).eql(0);

        expect(mat4[12]).eql(0);
        expect(mat4[13]).eql(0);
        expect(mat4[14]).eql(0);
        expect(mat4[15]).eql(1);
    });
});
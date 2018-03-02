import chai from 'chai';
import Vec3 from '../../../src/libs/vec3';

const {expect} = chai;

/** @test {Vec3} */
describe('Vec3', () => {

    /** @test {Vec3#create}*/
    it('create', () => {
        const vec3 = new Vec3();
        expect(vec3[0]).eql(0);
        expect(vec3[1]).eql(0);
        expect(vec3[2]).eql(0);
        expect(vec3.modified).eql(true);
    });

    /** @test {Vec3#test}*/
    it('add', () => {
        const vec3 = new Vec3();
        vec3.modified = false;

        vec3.add([1, 2, 3]);
        expect(vec3[0]).eql(1);
        expect(vec3[1]).eql(2);
        expect(vec3[2]).eql(3);
        expect(vec3.modified).eql(true);

        vec3.modified = false;
        vec3.add([1]);
        expect(vec3[0]).eql(2);
        expect(vec3[1]).eql(2);
        expect(vec3[2]).eql(3);
        expect(vec3.modified).eql(true);

        vec3.modified = false;
        vec3.add([1, 1]);
        expect(vec3[0]).eql(3);
        expect(vec3[1]).eql(3);
        expect(vec3[2]).eql(3);
        expect(vec3.modified).eql(true);
    });

    /** @test {Vec3#set}*/
    it('set', () => {
        const vec3 = new Vec3(1, 2, 3);

        vec3.modified = false;
        vec3.set(2, 3, 4);
        expect(vec3[0]).eql(2);
        expect(vec3[1]).eql(3);
        expect(vec3[2]).eql(4);
        expect(vec3.modified).eql(true);

        vec3.modified = false;
        vec3.set(3);
        expect(vec3[0]).eql(3);
        expect(vec3[1]).eql(3);
        expect(vec3[2]).eql(4);
        expect(vec3.modified).eql(true);

        vec3.modified = false;
        vec3.set(4, 4);
        expect(vec3[0]).eql(4);
        expect(vec3[1]).eql(4);
        expect(vec3[2]).eql(4);
        expect(vec3.modified).eql(true);
    });

    /** @test {Vec3#x} */
    /** @test {Vec3#y} */
    /** @test {Vec3#z} */
    it('xyz', () => {
        const vec3 = new Vec3();

        vec3.modified = false;
        vec3.x = 1;
        expect(vec3.x).eql(1);
        expect(vec3[0]).eql(1);
        expect(vec3.modified).eql(true);

        vec3.modified = false;
        vec3.y = 2;
        expect(vec3.y).eql(2);
        expect(vec3[1]).eql(2);
        expect(vec3.modified).eql(true);

        vec3.modified = false;
        vec3.z = 3;
        expect(vec3.z).eql(3);
        expect(vec3[2]).eql(3);
        expect(vec3.modified).eql(true);
    });
});
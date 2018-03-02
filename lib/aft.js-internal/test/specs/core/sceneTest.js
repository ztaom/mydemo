import chai from 'chai';
import Element from '../../../src/elements/element';
import Scene from '../../../src/core/scene';

const {expect} = chai;

/** @test {Scene} */
describe('Scene', () => {

    /** @test {Scene#constructor} */
    it('constructor', () => {
        expect(Scene).is.instanceof(Function);
        expect(Scene.length).eql(0);

        const scene = new Scene();
        expect(scene.children).is.instanceof(Set);
    });

    /** @test {Scene#add} */
    it('add', () => {
        const scene = new Scene();

        const element1 = new Element();
        const element2 = new Element();
        const element3 = new Element();
        const element4 = new Element();


        expect(scene.children.size).eql(0);

        scene.add(element1);
        expect(element1.life).eql('attached');
        expect(scene.children.size).eql(1);

        scene.add(element1);
        expect(scene.children.size).eql(1);

        scene.add(element2);
        expect(element2.life).eql('attached');
        expect(scene.children.size).eql(2);

        scene.add(element3, element4);
        expect(element3.life).eql('attached');
        expect(element4.life).eql('attached');
        expect(scene.children.size).eql(4);

    });

    /** @test {Scene#remove} */
    it('remove', () => {
        const scene = new Scene();

        const element1 = new Element();
        const element2 = new Element();

        expect(scene.children.size).eql(0);

        scene.add(element1);
        scene.add(element2);
        expect(element1.life).eql('attached');
        expect(element2.life).eql('attached');
        expect(scene.children.size).eql(2);

        scene.remove(element1);
        scene.remove(element2);
        expect(element1.life).eql('dettached');
        expect(element2.life).eql('dettached');
        expect(scene.children.size).eql(0);
    });
});

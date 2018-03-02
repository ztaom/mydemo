import chai from 'chai';
import Element from '../../../src/elements/element';
import Group from '../../../src/elements/group';

const {expect} = chai;

/** @test {Group} */
describe('GroupElement', () => {

    /** @test {Group#constructor}*/
    it('constructor', () => {
        expect(Group).is.instanceof(Function);
        expect(Group.length).eql(2);

        const group = new Group(10, 10);
        expect(group).is.instanceof(Element);
        expect(group).is.instanceof(Group);
        expect(group.className).eql('Group');
        expect(group.width).eql(10);
        expect(group.height).eql(10);
    });

    /** @test {Group#getBoundingRect}*/
    it('getBoundingRect', () => {
        const group1 = new Group(10, 10);
        group1.position.set(5, 5);
        expect(group1.getBoundingRect()).eql({
            width: 10,
            height: 10,
            left: 0,
            top: 10,
            right: 10,
            bottom: 0
        });

        const group2 = new Group();
        group2.position.set(10, 10);
        expect(group2.getBoundingRect()).eql({
            width: 0,
            height: 0,
            left: 10,
            top: 10,
            right: 10,
            bottom: 10
        });
    });


    /** @test {Group#add}*/
    it('add', () => {
        const el1 = new Element();
        const el2 = new Element();
        const el3 = new Element();
        const group = new Group();

        group.add(el1);
        expect(el1.life).eql('created');
        group.life = 'attached';
        expect(el1.life).eql('attached');

        group.add(el2, el3);
        expect(el2.life).eql('attached');
        expect(el3.life).eql('attached');

        expect(group.children.has(el1)).eql(true);
        expect(group.children.has(el2)).eql(true);
        expect(group.children.has(el3)).eql(true);

        expect(() => {
            group.add(null);
        }).to.be.throw(Error);
    });

    /** @test {Group#remove}*/
    it('remove', () => {
        const el1 = new Element();
        const el2 = new Element();
        const el3 = new Element();
        const group = new Group();
        group.life = 'attached';

        group.add(el1);
        group.add(el2, el3);
        expect(el1.life).eql('attached');
        expect(el2.life).eql('attached');
        expect(el3.life).eql('attached');

        group.remove(el1, el3);
        expect(el1.life).eql('dettached');
        expect(el2.life).eql('attached');
        expect(el3.life).eql('dettached');

        group.life = 'dettached';
        expect(el2.life).eql('dettached');

        expect(group.children.has(el1)).eql(false);
        expect(group.children.has(el2)).eql(true);
        expect(group.children.has(el3)).eql(false);

        expect(() => {
            group.remove(null);
        }).to.be.throw(Error);
    });
});

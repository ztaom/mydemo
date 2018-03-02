import chai from 'chai';
import fromObject from '../../../src/proxies/object';

const {expect} = chai;

/** @test {proxies} */
describe('proxies', () => {
    /** @test {fromObject} */
    it('fromObject', () => {
        const object = {
            'a': 1,
            'b': 2
        };
        const map = fromObject(object);
        expect(map.has('a')).to.be.true;
        expect(map.has('b')).to.be.true;
        expect(map.has('c')).to.be.false;
        expect(map.get('a')).to.eql(1);
        expect(map.get('b')).to.eql(2);
        expect(map.get('c')).to.be.undefined;
        map.set('a', 2).set('b', 3).set('c', 4);
        expect(map.has('c')).to.be.true;
        expect(map.get('a')).to.eql(2);
        expect(map.get('b')).to.eql(3);
        expect(map.get('c')).to.eql(4);
        expect(object).to.eql({
            a: 2,
            b: 3,
            c: 4
        });
        expect(fromObject(object)).to.eql(map);
    });
});

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Map from 'babel-runtime/core-js/map';
import {
    proxies,
    from
} from '../../../src/proxies';

chai.use(sinonChai);
const {expect} = chai;

/** @test {proxies} */
describe('proxies', () => {
    /** @test {from} */
    it('from', () => {
        const object = {
            'a': 1,
            'b': 2
        };
        const map = from(object);
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
    });

    /** @test {extendProxy} */
    it('extendProxy', () => {
        const getStub = sinon.stub();
        const hasStub = sinon.stub();
        const setStub = sinon.stub();

        class ArrayProxy extends Map{
            constructor(array) {
                super();

                this._array = array;
            }

            get(index) {
                getStub(index);
                return this._array[Number(index)];
            }

            has(index) {
                hasStub(index);
                return this._array[Number(index)] !== undefined;
            }

            set(index, value) {
                setStub(index, value);
                this._array[Number(index)] = value;
                return this;
            }
        }

        proxies.set((sth) => new ArrayProxy(sth), (sth) => sth instanceof Array);

        const arr = ['a', 'b'];
        const map = from(arr);
        expect(map).to.be.an.instanceof(ArrayProxy);
        expect(map.has(0)).to.be.true;
        expect(map.has(1)).to.be.true;
        expect(map.has(2)).to.be.false;
        expect(map.get(0)).to.eql('a');
        expect(map.get(1)).to.eql('b');
        expect(map.get(2)).to.be.undefined;
        map.set(0, 'aa').set(1, 'bb').set(2, 'cc');
        expect(map.has(2)).to.be.true;
        expect(map.get(0)).to.eql('aa');
        expect(map.get(1)).to.eql('bb');
        expect(map.get(2)).to.eql('cc');
        expect(arr).to.eql(['aa', 'bb', 'cc']);
        expect(getStub).to.be.callCount(6);
        expect(getStub.args).to.eql([
            [0], [1], [2], [0], [1], [2]
        ]);
        expect(hasStub).to.be.callCount(4);
        expect(hasStub.args).to.eql([
            [0], [1], [2], [2]
        ]);
        expect(setStub).to.be.callCount(3);
        expect(setStub.args).to.eql([
            [0, 'aa'], [1, 'bb'], [2, 'cc']
        ]);
    });
});

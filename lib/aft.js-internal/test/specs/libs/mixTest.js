import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mix from '../../../src/libs/mix';

chai.use(sinonChai);
const {expect} = chai;

describe('mix', () => {
    it('simple', () => {
        const spy1 = sinon.spy(i => i);
        const spy2 = sinon.spy();

        const obj1 = {};
        const obj2 = {
            spy1,
            spy2
        };

        mix(obj1, obj2);
        expect(obj1.spy1(1)).eql(1);
        expect(obj1.spy2()).eql(obj1);
        expect(spy1.thisValues[0]).eql(obj1);
        expect(spy2.thisValues[0]).eql(obj1);
    });

    it('duplicate', () => {
        const spy1 = sinon.spy(i => i);
        const spy2 = sinon.spy();

        const obj1 = {};

        mix(obj1, {
            fn: spy1
        });
        expect(obj1.fn(1)).eql(1);

        mix(obj1, {
            fn: spy2
        });
        expect(obj1.fn(2)).eql(obj1);

        expect(spy1.thisValues[0]).eql(obj1);
        expect(spy2.thisValues[0]).eql(obj1);
    });
});
import chai from 'chai';
import {
    simple,
    complex
} from '../../../src/libs/interpolation';

const {expect} = chai;

describe('interpolation', () => {

    /** @test {interpolation#simple} */
    it('simple', () => {
        // number
        expect(simple(0, 1, 0)).eql(0);
        expect(simple(0, 1, 1)).eql(1);
        expect(simple(0, 1, 0.5)).eql(0.5);
        expect(simple(-1, 1, 0.8)).eql(0.6);

        // no-unit string
        expect(simple('0', '1', 0)).eql('0');
        expect(simple('0', '1', 0.5)).eql('0.5');
        expect(simple('0', '1', 1)).eql('1');

        // unit string
        expect(simple('0px', '1px', 0)).eql('0px');
        expect(simple('0px', '1px', 0.5)).eql('0.5px');
        expect(simple('0px', '1px', 1)).eql('1px');

        // normal string
        expect(simple('a', 'b', 0)).eql('a');
        expect(simple('a', 'b', 0.5)).eql('a');
        expect(simple('a', 'b', 1)).eql('b');

        // color string
        expect(simple('#fff', '#000', 0)).eql('rgba(255,255,255,1)');
        expect(simple('#fff', '#000', 0.5)).eql('rgba(127,127,127,1)');
        expect(simple('#fff', '#000', 1)).eql('rgba(0,0,0,1)');
        expect(simple('rgba(255,255,255,1)', 'rgba(0,0,0,0)', 0)).eql('rgba(255,255,255,1)');
        expect(simple('rgba(255,255,255,1)', 'rgba(0,0,0,0)', 0.5)).eql('rgba(127,127,127,0.5)');
        expect(simple('rgba(255,255,255,1)', 'rgba(0,0,0,0)', 1)).eql('rgba(0,0,0,0)');
        expect(simple('#ffff', 'rgba(0,0,0,0)', 0)).eql('rgba(255,255,255,1)');
        expect(simple('#ffff', 'rgba(0,0,0,0)', 0.5)).eql('rgba(127,127,127,0.5)');
        expect(simple('#ffff', 'rgba(0,0,0,0)', 1)).eql('rgba(0,0,0,0)');
        // hybrid
        expect(simple('0', 1, 0)).eql('0');
        expect(simple('0', 1, 0.5)).eql('0.5');
        expect(simple('0', 1, 1)).eql('1');
        expect(simple(0, '1', 0)).eql('0');
        expect(simple(0, '1', 0.5)).eql('0.5');
        expect(simple(0, '1', 1)).eql('1');
        expect(simple('0px', 1, 0)).eql('0px');
        expect(simple(0, '1px', 0.5)).eql('0.5px');
        expect(simple('0px', 1, 1)).eql('1px');

        // diffrent unit string
        expect(simple('0px', '1deg', 0)).eql('0px');
        expect(simple('0px', '1deg', 0.5)).eql('0px');
        expect(simple('0px', '1deg', 1)).eql('1deg');
    });

    /** @test {interpolation#complex} */
    it('complex', () => {
        let sVal, eVal, val;

        // array
        sVal = [1, 2];
        eVal = [2, 3];
        expect([...complex(sVal, eVal, 0)]).eql([
            1, 2
        ]);
        expect([...complex(sVal, eVal, 0.5)]).eql([
            1.5, 2.5
        ]);
        expect([...complex(sVal, eVal, 1)]).eql([
            2, 3
        ]);

        // set
        sVal = new Set();
        sVal.add(0).add(1);
        eVal = new Set();
        eVal.add(1).add(2);
        expect([...complex(sVal, eVal, 0)]).eql([
            0, 1
        ]);
        expect([...complex(sVal, eVal, 0.5)]).eql([
            0.5, 1.5
        ]);
        expect([...complex(sVal, eVal, 1)]).eql([
            1, 2
        ]);

        // map
        sVal = new Map();
        sVal.set('a', 0).set('b', 1);
        eVal = new Map();
        eVal.set('a', 1).set('b', 2);
        expect([...complex(sVal, eVal, 0)]).eql([
            ['a', 0],
            ['b', 1]
        ]);
        expect([...complex(sVal, eVal, 0.5)]).eql([
            ['a', 0.5],
            ['b', 1.5]
        ]);
        expect([...complex(sVal, eVal, 1)]).eql([
            ['a', 1],
            ['b', 2]
        ]);

        sVal = new Map();
        sVal.set('a', new Set([0, 1]))
            .set('b', new Map([['c', 1], ['d', 2]]))
            .set('e', [2, 3]);

        eVal = new Map();
        eVal.set('a', new Set([1, 2]))
            .set('b', new Map([['c', 2], ['d', 3]]))
            .set('e', [3, 4]);

        // nested
        val = complex(sVal, eVal, 0);
        expect([...val.get('a')]).eql([0, 1]);
        expect([...val.get('b')]).eql([
            ['c', 1],
            ['d', 2]
        ]);
        expect([...val.get('e')]).eql([2, 3]);

        val = complex(sVal, eVal, 0.5);
        expect([...val.get('a')]).eql([0, 1]);
        expect([...val.get('b')]).eql([
            ['c', 1],
            ['d', 2]
        ]);
        expect([...val.get('e')]).eql([2, 3]);

        val = complex(sVal, eVal, 1);
        expect([...val.get('a')]).eql([1, 2]);
        expect([...val.get('b')]).eql([
            ['c', 2],
            ['d', 3]
        ]);
        expect([...val.get('e')]).eql([3, 4]);

        // nested deeply
        val = complex(sVal, eVal, 0, true);
        expect([...val.get('a')]).eql([0, 1]);
        expect([...val.get('b')]).eql([
            ['c', 1],
            ['d', 2]
        ]);
        expect([...val.get('e')]).eql([2, 3]);

        val = complex(sVal, eVal, 0.5, true);
        expect([...val.get('a')]).eql([0.5, 1.5]);
        expect([...val.get('b')]).eql([
            ['c', 1.5],
            ['d', 2.5]
        ]);
        expect([...val.get('e')]).eql([2.5, 3.5]);

        val = complex(sVal, eVal, 1, true);
        expect([...val.get('a')]).eql([1, 2]);
        expect([...val.get('b')]).eql([
            ['c', 2],
            ['d', 3]
        ]);
        expect([...val.get('e')]).eql([3, 4]);
    });
});
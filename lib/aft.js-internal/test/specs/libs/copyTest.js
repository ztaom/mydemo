import chai from 'chai';
import copy from '../../../src/libs/copy';

const copyd = v => copy(v, true);
const {expect} = chai;

describe('copy', () => {
    it('simple', () => {
        const source = {
            a: [1, () => 2],
            b: 3,
            c: '4',
            d: /5/,
            e: () => 6,
            f: new Set([
                7, () => 8
            ]),
            g: new Map([
                ['g1', 9],
                ['g2', () => 10]
            ])
        };

        let target;

        target = copy(source.a);
        expect(target[0]).to.equal(source.a[0]);
        expect(target[1]).to.equal(source.a[1]);

        expect(copy(source.b)).to.equal(3);
        expect(copy(source.c)).to.equal('4');
        expect(copy(source.d)).to.equal(source.d);
        expect(copy(source.e)).to.equal(source.e);

        target = [...copy(source.f)];
        expect(target[0]).to.equal([...source.f][0]);
        expect(target[1]).to.equal([...source.f][1]);

        target = copy(source.g);
        expect(target.get('g1')).to.equal(source.g.get('g1'));
        expect(target.get('g2')).to.equal(source.g.get('g2'));

        target = copy(source);
        expect(target.a).to.equal(source.a);
        expect(target.b).to.equal(source.b);
        expect(target.c).to.equal(source.c);
        expect(target.d).to.equal(source.d);
        expect(target.e).to.equal(source.e);
        expect(target.f).to.equal(source.f);
        expect(target.g).to.equal(source.g);

        expect(target).to.not.equal(source);
        expect(target).eql(source);
    });

    it('deeply', () => {
        const source = {
            a: [1, () => 2],
            b: 3,
            c: '4',
            d: /5/,
            e: () => 6,
            f: new Set([
                7, () => 8
            ]),
            g: new Map([
                ['g1', 9],
                ['g2', () => 10]
            ])
        };

        let target;

        target = copyd(source.a);
        expect(target[0]).to.equal(source.a[0]);
        expect(target[1]).to.equal(source.a[1]);

        expect(copyd(source.b)).to.equal(3);
        expect(copyd(source.c)).to.equal('4');
        expect(copyd(source.d)).to.equal(source.d);
        expect(copyd(source.e)).to.equal(source.e);

        target = [...copyd(source.f)];
        expect(target[0]).to.equal([...source.f][0]);
        expect(target[1]).to.equal([...source.f][1]);

        target = copyd(source.g);
        expect(target.get('g1')).to.equal(source.g.get('g1'));
        expect(target.get('g2')).to.equal(source.g.get('g2'));

        target = copyd(source);
        expect(target.a).to.not.equal(source.a);
        expect(target.b).to.equal(source.b);
        expect(target.c).to.equal(source.c);
        expect(target.d).to.equal(source.d);
        expect(target.e).to.equal(source.e);
        expect(target.f).to.not.equal(source.f);
        expect(target.g).to.not.equal(source.g);

        expect(target).to.not.equal(source);
        expect(target).eql(source);
    });
});
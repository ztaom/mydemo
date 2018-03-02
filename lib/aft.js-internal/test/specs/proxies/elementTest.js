import chai from 'chai';
import fromElement from '../../../src/proxies/element';
import Element from '../../../src/elements/element';
const {expect} = chai;

/** @test {proxies} */
describe('proxies', () => {
    /** @test {fromHTMLElement} */
    it('fromElement', () => {
        const element = new Element();
        element.style.set('background-color', '#fff')
                        .set('opacity', 0);
        element.transform.set('translateX', 100);

        const map = fromElement(element);
        expect(map.has('background-color')).to.be.true;
        expect(map.has('opacity')).to.be.true;
        expect(map.has('color')).to.be.false;
        expect(map.has('translateX')).to.be.true;
        expect(map.has('translateY')).to.be.false;
        expect(map.get('background-color')).to.eql([0, 0, 100, 1]);
        expect(map.get('opacity')).to.eql(0);
        expect(map.get('translateX')).to.eql(100);

        map.set('background-color', '#000')
            .set('opacity', 1)
            .set('color', '#fff')
            .set('translateX', 200)
            .set('translateY', 100);

        expect(map.has('color')).to.be.true;
        expect(map.has('translateY')).to.be.true;

        expect(map.get('background-color')).to.eql([0, 0, 0, 1]);
        expect(map.get('opacity')).to.eql(1);
        expect(map.get('color')).to.eql([0, 0, 100, 1]);
        expect(map.get('translateX')).to.eql(200);
        expect(map.get('translateY')).to.eql(100);

        expect([...element.style]).to.eql([
            ['background-color', [0, 0, 0, 1]],
            ['opacity', 1],
            ['color', [0, 0, 100, 1]]
        ]);
        expect([...element.transform]).to.eql([
            ['translateX', 200],
            ['translateY', 100]
        ]);

        expect(fromElement(element)).to.be.equal(map);
    });
});

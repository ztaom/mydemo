import chai from 'chai';
import fromHTMLElement from '../../../src/proxies/htmlelement';
import {
    HTMLElement,
    getComputedStyle
} from '../util';
const {expect} = chai;

/** @test {proxies} */
describe('proxies', () => {
    before(() => {
        global.getComputedStyle = getComputedStyle;
        const head = new HTMLElement();
        const body = new HTMLElement();

        global.document = {
            body,

            getElementById(id) {
                return HTMLElement.Container.get(id);
            },

            querySelector(s) {
                if (s === 'head') {
                    return head;
                }
            },

            createElement() {
                return new HTMLElement();
            }
        };
    });

    after(() => {
        delete global.getComputedStyle;
        delete global.document;
    });

    /** @test {fromHTMLElement} */
    it('fromHTMLElement', () => {
        const element = new HTMLElement();
        element.style.backgroundColor = '#fff';
        element.style.left = '0px';
        const imageSrc = 'abc.png';
        const imageHash = `img-${encodeURIComponent(imageSrc)}`;

        const map = fromHTMLElement(element);
        expect(map.has('backgroundColor')).to.be.true;
        expect(map.has('left')).to.be.true;
        expect(map.has('right')).to.be.false;
        expect(map.get('background-color')).to.eql('#fff');
        expect(map.get('left')).to.eql('0px');
        expect(map.get('right')).to.be.undefined;
        map.set('backgroundColor', '#000')
            .set('left', '100px')
            .set('right', '100px')
            .set('backgroundImage', `url(${imageSrc})`);
        expect(map.has('right')).to.be.true;
        expect(map.get('backgroundColor')).to.eql('#000');
        expect(map.get('left')).to.eql('100px');
        expect(map.get('right')).to.eql('100px');
        expect(map.get('backgroundImage')).to.eql('url(abc.png)');
        map.flush();
        expect(element.style.cssText).to.eql('background-color:#000;left:100px;right:100px');
        expect(fromHTMLElement(element)).to.eql(map);

        const style = document.getElementById(`for-${imageHash}`);
        expect(element.getAttribute('img-hash')).to.eql(imageHash);
        expect(style.textContent.replace(/\s/g, '')).eql(`[img-hash="${imageHash}"]{background-image:url(${imageSrc})!important;}`);
    });
});

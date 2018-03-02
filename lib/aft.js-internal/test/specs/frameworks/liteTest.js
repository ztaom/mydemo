import chai from 'chai';
import * as runtime from '../../../src/runtime';
import * as factory from '../../../src/core/factory';
import * as animate from '../../../src/core/animate';
import * as lite from '../../../src/frameworks/lite';

const {expect} = chai;

/** @test {lite} */
describe('lite', () => {

    function extactValues(obj) {
        return Object.keys(obj).map(key => obj[key]);
    }

    /** @test {lite#exports} */
    it('exports', () => {
        expect(extactValues(lite.runtime)).to.eql(extactValues(runtime));
        expect(extactValues(lite)).to.include.members(extactValues(factory));
        expect(extactValues(lite)).to.include.members(extactValues(animate));
    });
});
/* eslint-enable no-unexpected-multiline */
/* eslint-enable no-spaced-func */
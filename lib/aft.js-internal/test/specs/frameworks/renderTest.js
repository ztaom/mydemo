import chai from 'chai';
import * as Elements from '../../../src/elements';
import * as Engines from '../../../src/engines';
import Scene from '../../../src/core/scene';
import * as render from '../../../src/frameworks/render';

const {expect} = chai;

/** @test {lite} */
describe('render', () => {

    function extractValues(obj) {
        return Object.keys(obj).map(key => obj[key]);
    }

    /** @test {lite#exports} */
    it('exports', () => {
        expect(extractValues(render)).to.include.members([
            Scene,
            ...extractValues(Engines),
            ...extractValues(Elements)
        ]);
    });
});
/* eslint-enable no-unexpected-multiline */
/* eslint-enable no-spaced-func */
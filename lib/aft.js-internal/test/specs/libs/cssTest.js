import chai from 'chai';
import {StyleMap, TransformMap} from '../../../src/libs/css';

const {expect} = chai;

/** @test {StyleMap} */
describe('StyleMap', () => {

    /** @test {StyleMap#constructor}*/
    it('constructor', () => {
        expect(StyleMap).is.instanceof(Function);

        const map = new StyleMap([
            ['background-color', '#FFF'],
            ['backgroundImage', 'url(path_to_image)'],
            ['border-left-width', 1],
            ['border-left-style', 'dashed'],
            ['opacity', 0.5]
        ]);
        expect(map.modified).eql(true);
        expect(map).to.be.instanceof(Map);
        expect(map).to.be.instanceof(StyleMap);
        expect(map.size).eql(5);
        expect([...map]).eql([
            ['background-color', [0, 0, 100, 1]],
            ['background-image', 'url(path_to_image)'],
            ['border-left-width', 1],
            ['border-left-style', 'dashed'],
            ['opacity', 0.5]
        ]);
    });

    /** @test {StyleMap#set}*/
    it('set', () => {
        const map = new StyleMap();
        expect(map.modified).eql(false);

        map.set('background-color', '#FFF');
        map.set('backgroundImage', 'url(path_to_image)');
        map.set('border-left-width', 1);
        map.set('border-left-style', 'dashed');
        map.set('opacity', 0.5);

        expect(map.modified).eql(true);
        expect(map.size).eql(5);
        expect([...map]).eql([
            ['background-color', [0, 0, 100, 1]],
            ['background-image', 'url(path_to_image)'],
            ['border-left-width', 1],
            ['border-left-style', 'dashed'],
            ['opacity', 0.5]
        ]);

        map.modified = false;
        map.set('background-color', '#000f');
        expect(map.modified).eql(true);
        expect([...map]).eql([
            ['background-color', [0, 0, 0, 1]],
            ['background-image', 'url(path_to_image)'],
            ['border-left-width', 1],
            ['border-left-style', 'dashed'],
            ['opacity', 0.5]
        ]);
    });

    /** @test {StyleMap#get}*/
    it('get', () => {
        const map = new StyleMap();
        expect(map.modified).eql(false);

        map.set('background-color', '#FFF');
        map.set('backgroundImage', 'url(path_to_image)');
        map.set('border-left-width', 1);
        map.set('border-left-style', 'dashed');
        map.set('opacity', 0.5);
        expect(map.modified).eql(true);

        map.modified = false;
        expect(map.size).eql(5);
        expect(map.get('background-color')).eql([0, 0, 100, 1]);
        expect(map.get('background-image')).eql('url(path_to_image)');
        expect(map.get('backgroundImage')).eql('url(path_to_image)');
        expect(map.get('border-left-width')).eql(1);
        expect(map.get('border-left-style')).eql('dashed');
        expect(map.get('opacity')).eql(0.5);
        expect(map.modified).eql(false);
    });

    /** @test {StyleMap#get}*/
    it('get default', () => {
        const map = new StyleMap();
        expect(map.modified).eql(false);

        expect(map.size).eql(0);
        expect(map.get('color')).eql([0, 0, 0, 1]);
        expect(map.get('backgroundColor')).eql([0, 0, 0, 0]);
        expect(map.get('background-image')).eql('none');
        expect(map.get('background-position')).eql(['0px', '0px']);
        expect(map.get('font-size')).eql('16px');
        expect(map.get('opacity')).eql(1);
        expect(map.modified).eql(false);
    });

    /** @test {StyleMap#normalize} */
    it('normalize', () => {
        const map = new StyleMap();
        expect(map.modified).eql(false);
        map.set('background-color', '#FFF');
        map.set('backgroundImage', 'url(path_to_image)');
        map.set('border-left-width', 1);
        map.set('border-left-style', 'dashed');
        map.set('opacity', 0.5);

        expect([...map.normalize()]).eql([
            ['background-color', 'rgba(255,255,255,1)'],
            ['background-image', 'url(path_to_image)'],
            ['border-left-width', '1px'],
            ['border-left-style', 'dashed'],
            ['opacity', '0.5']
        ]);
    });

    /** @test {StyleMap#has}*/
    it('has', () => {
        const map = new StyleMap();

        expect(map.modified).eql(false);
        map.set('background-color', '#F00');
        map.set('backgroundImage', 'url(path_to_image)');
        map.set('border-left-width', 1);
        map.set('border-left-style', 'dashed');
        map.set('opacity', 0.5);
        expect(map.modified).eql(true);

        map.modified = false;
        expect(map.size).eql(5);
        expect(map.has('background-color')).eql(true);
        expect(map.has('background-image')).eql(true);
        expect(map.has('backgroundImage')).eql(true);
        expect(map.has('border-left-width')).eql(true);
        expect(map.has('border-left-style')).eql(true);
        expect(map.has('opacity')).eql(true);
        expect(map.has('background-position')).eql(false);
        expect(map.modified).eql(false);
    });

    /** @test {StyleMap#delete}*/
    it('delete', () => {
        const map = new StyleMap();

        expect(map.modified).eql(false);
        map.set('background-color', '#F00');
        map.set('backgroundImage', 'url(path_to_image)');
        map.set('border-left-width', 1);
        map.set('border-left-style', 'dashed');
        map.set('opacity', 0.5);
        expect(map.modified).eql(true);

        map.modified = false;
        expect(map.size).eql(5);
        map.delete('background-color');
        map.delete('backgroundImage');
        expect(map.size).eql(3);
        expect(map.modified).eql(true);

        map.modified = false;
        expect(map.has('background-image')).eql(false);
        expect(map.has('background-color')).eql(false);
        expect(map.has('border-left-width')).eql(true);
        expect(map.has('border-left-style')).eql(true);
        expect(map.has('opacity')).eql(true);
        expect(map.modified).eql(false);
    });
});


/** @test {TransformMap} */
describe('TransformMap', () => {

    /** @test {TransformMap#constructor}*/
    it('constructor', () => {
        expect(TransformMap).is.instanceof(Function);

        const map = new TransformMap([
            ['translateX', 10],
            ['translateY', '10px'],
            ['rotateX', '10deg'],
            ['skewX', 10],
            ['scaleX', 2],
            ['scaleY', '1']
        ]);
        expect(map.modified).eql(true);
        expect(map).to.be.instanceof(Map);
        expect(map).to.be.instanceof(TransformMap);
        expect(map.size).eql(6);
        expect([...map]).eql([
            ['translateX', 10],
            ['translateY', '10px'],
            ['rotateX', '10deg'],
            ['skewX', 10],
            ['scaleX', 2],
            ['scaleY', 1]
        ]);
    });

    /** @test {TransformMap#set}*/
    it('set', () => {
        const map = new TransformMap();
        expect(map.modified).eql(false);
        map.set('translateX', 10);
        map.set('translateY', '10px');
        map.set('rotateX', '10deg');
        map.set('skewX', 10);
        map.set('scaleX', 2);
        map.set('scaleY', '1');
        expect(map.modified).eql(true);

        expect(map.size).eql(6);
        expect([...map]).eql([
            ['translateX', 10],
            ['translateY', '10px'],
            ['rotateX', '10deg'],
            ['skewX', 10],
            ['scaleX', 2],
            ['scaleY', 1]
        ]);

        expect(() => {
            map.set('abc', 10);
        }).to.throws(Error);
    });

    /** @test {TransformMap#get}*/
    it('get', () => {
        const map = new TransformMap();
        expect(map.modified).eql(false);
        map.set('translateX', 10);
        map.set('translateY', '10px');
        map.set('rotateX', '10deg');
        map.set('skewX', 10);
        map.set('scaleX', 2);
        map.set('scaleY', '1');
        expect(map.modified).eql(true);

        map.modified = false;
        expect(map.size).eql(6);
        expect(map.get('translateX')).eql(10);
        expect(map.get('translateY')).eql('10px');
        expect(map.get('rotateX')).eql('10deg');
        expect(map.get('skewX')).eql(10);
        expect(map.get('scaleX')).eql(2);
        expect(map.get('scaleY')).eql(1);
        expect(map.modified).eql(false);

        expect(() => {
            map.get('abc');
        }).to.throws(Error);
    });

    /** @test {TransformMap#get}*/
    it('get default', () => {
        const map = new TransformMap();

        expect(map.modified).eql(false);
        expect(map.size).eql(0);
        expect(map.get('translateX')).eql('0px');
        expect(map.get('translateY')).eql('0px');
        expect(map.get('translateZ')).eql('0px');
        expect(map.get('rotateX')).eql('0deg');
        expect(map.get('rotateY')).eql('0deg');
        expect(map.get('rotateZ')).eql('0deg');
        expect(map.get('skewX')).eql('0deg');
        expect(map.get('skewY')).eql('0deg');
        expect(map.get('scaleX')).eql(1);
        expect(map.get('scaleY')).eql(1);
        expect(map.get('scaleZ')).eql(1);
        expect(map.modified).eql(false);
    });

    /** @test {TransformMap#normalize} */
    it('normalize', () => {
        const map = new TransformMap();
        expect(map.modified).eql(false);
        map.set('translateX', 10);
        map.set('translateY', '10px');
        map.set('rotateX', '10deg');
        map.set('skewX', 10);
        map.set('scaleX', 2);
        map.set('scaleY', '1');

        expect([...map.normalize()]).eql([
            ['translateX', '10px'],
            ['translateY', '10px'],
            ['rotateX', '10deg'],
            ['skewX', '10deg'],
            ['scaleX', '2'],
            ['scaleY', '1']
        ]);
    });

    /** @test {TransformMap#has}*/
    it('has', () => {
        const map = new TransformMap();
        expect(map.modified).eql(false);
        map.set('translateX', 10);
        map.set('rotateX', 10);
        map.set('skewX', 10);
        map.set('scaleX', 2);
        expect(map.modified).eql(true);

        map.modified = false;
        expect(map.size).eql(4);
        expect(map.has('translateX')).eql(true);
        expect(map.has('rotateX')).eql(true);
        expect(map.has('skewX')).eql(true);
        expect(map.has('scaleX')).eql(true);
        expect(map.has('translateY')).eql(false);
        expect(map.modified).eql(false);

        expect(() => {
            map.has('abc');
        }).to.throws(Error);
    });

    /** @test {TransformMap#delete}*/
    it('delete', () => {
        const map = new TransformMap();

        expect(map.modified).eql(false);
        map.set('translateX', 10);
        map.set('rotateX', 10);
        map.set('skewX', 10);
        map.set('scaleX', 2);
        expect(map.modified).eql(true);

        map.modified = false;
        expect(map.size).eql(4);
        map.delete('translateX');
        map.delete('rotateX');
        expect(map.size).eql(2);
        expect(map.modified).eql(true);

        expect(map.has('translateX')).eql(false);
        expect(map.has('rotateX')).eql(false);
        expect(map.has('skewX')).eql(true);
        expect(map.has('scaleX')).eql(true);

        expect(() => {
            map.delete('abc');
        }).to.throws(Error);
    });

    /** @test {TransformMap#toMatrix} */
    it('toMatrix', () => {
        const map = new TransformMap();
        map.set('translateX', 10);
        map.set('translateY', '10px');
        map.set('rotateX', '180deg');
        map.set('scaleX', 2);
        map.set('scaleY', '1');

        expect(map.toMatrix().join(',')).eql('2,0,0,0,0,-1,0,0,0,0,-1,0,10,10,0,1');
        expect(map.toMatrix(
            ([name, value]) => [name, `-${value}`]
        ).join(',')).eql('-2,0,0,0,0,1,0,0,0,0,-1,0,-10,-10,0,1');
    });
});

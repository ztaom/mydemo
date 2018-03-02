import chai from 'chai';
import sinonChai from 'sinon-chai';
import {
    animate
} from '../../../src/core/animate';
import {
    delay,
    curry,
    HTMLElement,
    getComputedStyle
} from '../util';

chai.use(sinonChai);
const {expect} = chai;

/** @test {animate} */
describe('animate', () => {

    const delay100 = delay(100);

    before(() => {
        global.getComputedStyle = getComputedStyle;
    });

    after(() => {
        delete global.getComputedStyle;
    });

    /** @test {animate#animate} */
    it('with an object', done => {
        const initial = {
            a: 1,
            b: [2, 3]
        };

        let startCount = 0;
        let beforePlayCount = 0;
        let playCount = 0;
        let afterPlayCount = 0;
        let restartCount = 0;

        const animation = animate(initial)
            .to({
                a: 2,
                b: [3, 4]
            })
            .duration(100)
            .next()
            .to({
                a: 3,
                b: [4, 5]
            })
            .duration(100);

        animation
            .on('start', () => startCount++)
            .on('beforeplay', () => beforePlayCount++)
            .on('play', () => playCount++)
            .on('afterplay', () => afterPlayCount++)
            .on('restart', () => restartCount++)
            .on('finish', current => {
                expect(startCount).eql(1);
                expect(beforePlayCount).eql(playCount);
                expect(afterPlayCount).eql(playCount);
                expect(restartCount).eql(0);
                expect([...current]).eql([
                    ['a', 3],
                    ['b', [4, 5]]
                ]);
                expect(initial).eql({
                    a: 3,
                    b: [4, 5]
                });
                done();
            });

        animation.play();
    });

    /** @test {animate#animate} */
    it('with an object2', done => {
        const initial = {
            a: 1,
            b: 2
        };

        let startCount = 0;
        let beforePlayCount = 0;
        let playCount = 0;
        let afterPlayCount = 0;
        let restartCount = 0;

        const animation = animate(initial)
            .to({
                a: 2
            })
            .update(current => {
                expect(current.get('a') <= 2).eql(true);
                expect(current.get('b')).eql(2);
            })
            .duration(500)
            .next({
                c: 3
            })
            .to({
                b: 3,
                c: 4
            })
            .update(current => {
                expect(current.get('a')).eql(2);
                expect(current.get('b') >= 2 && current.get('b') <= 3).eql(true);
                expect(current.get('c') >= 3 && current.get('c') <= 4).eql(true);

            })
            .duration(500);

        animation
            .on('start', () => startCount++)
            .on('beforeplay', () => beforePlayCount++)
            .on('play', () => playCount++)
            .on('afterplay', () => afterPlayCount++)
            .on('restart', () => restartCount++)
            .on('finish', current => {
                expect(startCount).eql(1);
                expect(beforePlayCount).eql(playCount);
                expect(afterPlayCount).eql(playCount);
                expect(restartCount).eql(0);
                expect([...current]).eql([
                    ['a', 2],
                    ['c', 4],
                    ['b', 3]
                ]);
                expect(initial).eql({
                    a: 2,
                    b: 3,
                    c: 4
                });
                done();
            });

        animation.play();
    });

    /** @test {animate#animate} */
    it('with a map', done => {
        const initial = new Map();
        initial.set('a', 1)
                .set('b', [2, 3]);

        let startCount = 0;
        let beforePlayCount = 0;
        let playCount = 0;
        let afterPlayCount = 0;
        let restartCount = 0;

        const animation = animate(initial)
            .to({
                a: 2,
                b: [3, 4]
            })
            .duration(100)
            .next()
            .to({
                a: 3,
                b: [4, 5]
            })
            .duration(100);

        animation
            .on('start', () => startCount++)
            .on('beforeplay', () => beforePlayCount++)
            .on('play', () => playCount++)
            .on('afterplay', () => afterPlayCount++)
            .on('restart', () => restartCount++)
            .on('finish', current => {
                expect(startCount).eql(1);
                expect(beforePlayCount).eql(playCount);
                expect(afterPlayCount).eql(playCount);
                expect(restartCount).eql(0);
                expect([...current]).eql([
                    ['a', 3],
                    ['b', [4, 5]]
                ]);
                expect([...initial]).eql([
                    ['a', 3],
                    ['b', [4, 5]]
                ]);
                done();
            });

        animation.play();
    });

    /** @test {animate#animate} */
    it('with a watcher', done => {
        class Watcher extends Map {
            constructor() {
                super();

                this._initial = new Map([
                    ['a', 1],
                    ['b', [2, 3]]
                ]);
            }

            has(key) {
                return this._initial.has(key);
            }

            get(key) {
                switch (key) {
                    case 'a':
                        return [this._initial.get('a'), this._initial.get('b')[0]];
                    case 'b':
                        return this._initial.get('b')[1];
                    default:
                        break;
                }
            }

            set(key, value) {
                super.set(key, value);

                let bValue;

                switch (key) {
                    case 'a':
                        this._initial.set('a', value[0]);
                        bValue = this._initial.get('b');
                        bValue[0] = value[1];
                        break;
                    case 'b':
                        bValue = this._initial.get('b');
                        bValue[1] = value;
                        break;
                    default:
                        break;
                }
            }
        }

        let startCount = 0;
        let beforePlayCount = 0;
        let playCount = 0;
        let afterPlayCount = 0;
        let restartCount = 0;

        const watcher = new Watcher();
        const animation = animate(watcher)
            .duration(100)
            .next()
            .to({
                a: [2, 3],
                b: 4
            })
            .duration(100);

        animation
            .on('start', () => startCount++)
            .on('beforeplay', () => beforePlayCount++)
            .on('play', () => playCount++)
            .on('afterplay', () => afterPlayCount++)
            .on('restart', () => restartCount++)
            .on('finish', current => {
                expect(startCount).eql(1);
                expect(beforePlayCount).eql(playCount);
                expect(afterPlayCount).eql(playCount);
                expect(restartCount).eql(0);
                expect([...current]).eql([
                    ['a', [2, 3]],
                    ['b', 4]
                ]);
                expect(current.get('b')).eql(4);
                expect([...watcher._initial]).eql([
                    ['a', 2],
                    ['b', [3, 4]]
                ]);
                done();
            });

        animation.play();
    });

    /** @test {animate#animate} */
    it('with effect iteration', done => {
        const initial = {
            a: 1,
            b: [2, 3]
        };

        let startCount = 0;
        let beforePlayCount = 0;
        let playCount = 0;
        let afterPlayCount = 0;
        let restartCount = 0;

        let repeatCount = 0;
        const animation = animate(initial)
            .to({
                a: 2,
                b: [3, 4]
            })
            .duration(100)
            .iteration(2)
            .update(current => {
                if (current.get('a') === 2) {
                    repeatCount++;
                }
            });

        animation
            .on('start', () => startCount++)
            .on('beforeplay', () => beforePlayCount++)
            .on('play', () => playCount++)
            .on('afterplay', () => afterPlayCount++)
            .on('restart', () => restartCount++)
            .on('finish', current => {
                expect(repeatCount).eql(2);
                expect(startCount).eql(1);
                expect(beforePlayCount).eql(playCount);
                expect(afterPlayCount).eql(playCount);
                expect(restartCount).eql(0);
                expect([...current]).eql([
                    ['a', 2],
                    ['b', [3, 4]]
                ]);
                expect(initial).eql({
                    a: 2,
                    b: [3, 4]
                });
                done();
            });

        animation.play();
    });

    /** @test {animate#animate} */
    it('with animate iteration', done => {
        const initial = {
            a: 1,
            b: [2, 3]
        };

        let startCount = 0;
        let beforePlayCount = 0;
        let playCount = 0;
        let afterPlayCount = 0;
        let restartCount = 0;

        const animation = animate(initial)
            .to({
                a: 2,
                b: [3, 4]
            })
            .duration(100);

        animation
            .on('start', () => startCount++)
            .on('beforeplay', () => beforePlayCount++)
            .on('play', () => playCount++)
            .on('afterplay', () => afterPlayCount++)
            .on('restart', () => restartCount++)
            .on('finish', current => {
                expect(startCount).eql(1);
                expect(beforePlayCount).eql(playCount);
                expect(afterPlayCount).eql(playCount);
                expect(restartCount).eql(1);
                expect([...current]).eql([
                    ['a', 2],
                    ['b', [3, 4]]
                ]);
                expect(initial).eql({
                    a: 2,
                    b: [3, 4]
                });
                done();
            });

        animation.play(2);
    });

    /** @test {animate#animate} */
    it('with stop', done => {
        const initial = {
            a: 1,
            b: [2, 3]
        };

        let startCount = 0;
        let beforePlayCount = 0;
        let playCount = 0;
        let afterPlayCount = 0;
        let restartCount = 0;

        const animation = animate(initial)
            .to({
                a: 2,
                b: [3, 4]
            })
            .duration(500);

        animation
            .on('start', () => startCount++)
            .on('beforeplay', () => beforePlayCount++)
            .on('play', () => playCount++)
            .on('afterplay', () => afterPlayCount++)
            .on('restart', () => restartCount++)
            .on('finish', current => {
                expect(startCount).eql(1);
                expect(beforePlayCount).eql(playCount);
                expect(afterPlayCount).eql(playCount);
                expect(restartCount).eql(0);
                expect(current.get('a') < 2).eql(true);
                expect(current.get('b')[0] < 3).eql(true);
                expect(current.get('b')[1] < 4).eql(true);
                expect(initial.a < 2).eql(true);
                expect(initial.b[0] < 3).eql(true);
                expect(initial.b[1] < 4).eql(true);
            });

        animation.play();

        let lastPlayCount;
        delay100(() => {
            lastPlayCount = playCount;
            animation.stop();
        })
        .then(curry(delay100)(() => {
            expect(playCount).eql(lastPlayCount);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {animate#animate} */
    it('with an element', done => {
        const element = new HTMLElement();
        element.style.backgroundColor = '#fff';
        element.style.left = '0px';

        let startCount = 0;
        let beforePlayCount = 0;
        let playCount = 0;
        let afterPlayCount = 0;
        let restartCount = 0;

        const animation = animate(element)
            .to({
                backgroundColor: '#f00',
                left: '100px'
            })
            .duration(100)
            .next({
                right: '0px'
            })
            .to({
                backgroundColor: '#0000',
                right: '100px'
            })
            .duration(100);

        animation
            .on('start', () => startCount++)
            .on('beforeplay', () => beforePlayCount++)
            .on('play', () => playCount++)
            .on('afterplay', () => afterPlayCount++)
            .on('restart', () => restartCount++)
            .on('finish', current => {
                expect(startCount).eql(1);
                expect(beforePlayCount).eql(playCount);
                expect(afterPlayCount).eql(playCount);
                expect(restartCount).eql(0);
                expect(current.get('backgroundColor')).eql('rgba(0,0,0,0)');
                expect(current.get('left')).eql('100px');
                expect(current.get('right')).eql('100px');
                expect(element.style.cssText).to.eql('background-color:rgba(0,0,0,0);left:100px;right:100px');
                done();
            });

        animation.play();
    });
});
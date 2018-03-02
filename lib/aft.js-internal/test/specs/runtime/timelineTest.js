import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import EventEmitter from 'event-emitter';
import Timeline from '../../../src/runtime/timeline';
import {
    delay,
    curry,
    Clock
} from '../util';

const {expect} = chai;
chai.use(sinonChai);

/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-spaced-func */
/** @test {Timeline} */
describe('Timeline', () => {

    const delay50 = delay(50);
    const delay100 = delay(100);
    const delay150 = delay(150);
    const delay500 = delay(500);

    function createAnimation() {
        const animation = {
            started: false,
            finished: false
        };
        EventEmitter(animation);
        animation.start = sinon.spy(() => {
            if (!animation.started) {
                animation.started = true;
                animation.emit('start');
            }
        });
        animation.finish = sinon.spy(() => {
            if (!animation.finished) {
                animation.finished = true;
                animation.emit('finish');
            }
        });
        animation.restart = sinon.spy(() => {
            if (animation.started) {
                animation.started = true;
                animation.emit('restart');
            }
        });
        animation.reset = sinon.spy(() => {
            animation.started = false;
            animation.finished = false;
        });
        animation.requestFrame = sinon.stub();

        return animation;
    }

    /** @test {Timeline#constructor} */
    it('constructor', () => {
        expect(Timeline).is.instanceof(Function);
        expect(Timeline.length).eql(1);

        const timeline = new Timeline();
        expect(timeline).is.instanceof(Timeline);
        expect(timeline.currentTime).eql(0);
        expect(timeline.loop).eql(false);
        expect(timeline.paused).eql(true);
        expect(timeline.ended).eql(false);
        expect(timeline.skipFrames).eql(0);
    });

    /** @test {skipFrames} */
    it('skipFrames', () => {
        const timeline = new Timeline();
        timeline.skipFrames = 1;
        expect(timeline.skipFrames).eql(1);
    });

    /** @test {Timeline#add} */
    it('add', () => {
        const timeline = new Timeline();
        const animation1 = createAnimation();
        const animation2 = createAnimation();
        const animation3 = createAnimation();
        const option = {};

        timeline.add(animation1);
        timeline.add([animation2, animation3], option);

        expect(timeline._animations.get(animation1)).not.equal(option);
        expect(timeline._animations.get(animation2)).equal(option);
        expect(timeline._animations.get(animation3)).equal(option);
        expect(timeline._animations.size).eql(3);
    });

    /** @test {Timeline#get} */
    it('get', () => {
        const timeline = new Timeline();
        const animation = createAnimation();
        timeline.add(animation);
        expect(timeline.get(animation)).eql(timeline._animations.get(animation));
    });

    /** @test {Timeline#remove} */
    it('remove', () => {
        const timeline = new Timeline();
        const animation1 = createAnimation();
        const animation2 = createAnimation();
        const animation3 = createAnimation();
        timeline.add([animation1, animation2, animation3]);
        timeline.remove(animation1);

        expect(animation1.finish).to.be.calledOnce;
        expect(timeline._animations.has(animation1)).to.be.false;
        expect(timeline._animations.size).eql(2);

        timeline.remove([animation2, animation3]);
        expect(animation2.finish).to.be.calledOnce;
        expect(timeline._animations.has(animation2)).to.be.false;
        expect(animation3.finish).to.be.calledOnce;
        expect(timeline._animations.has(animation3)).to.be.false;
        expect(timeline._animations.size).eql(0);
    });

    /** @test {Timeline#clear} */
    it('clear', () => {
        const timeline = new Timeline();
        const animation1 = createAnimation();
        const animation2 = createAnimation();
        const animation3 = createAnimation();

        timeline.add(animation1).add(animation2).add(animation3);
        timeline.clear();

        expect(animation1.finish).to.be.calledOnce;
        expect(timeline._animations.has(animation1)).to.be.false;
        expect(animation2.finish).to.be.calledOnce;
        expect(timeline._animations.has(animation2)).to.be.false;
        expect(animation3.finish).to.be.calledOnce;
        expect(timeline._animations.has(animation3)).to.be.false;
    });

    /** @test {Timeline#seek} */
    it('seek', () => {
        const timeline = new Timeline();
        expect(() => timeline.seek()).to.be.throw(Error);
    });

    /** @test {Timeline#play} */
    it('play', done => {
        const timeline = new Timeline();
        sinon.spy(timeline, '_playback');

        const animation1 = createAnimation();
        const option1 = {
            playAt: 0,
            stopAt: 1000
        };
        timeline.add(animation1, option1);

        const animation2 = createAnimation();
        const option2 = {
            playAt: 100,
            stopAt: 500
        };
        timeline.add(animation2, option2);

        const animation3 = createAnimation();
        const option3 = {};
        timeline.add(animation3, option3);

        let playCount = 0;
        timeline.on('play', () => playCount++);
        timeline.play();

        delay50(() => expect(option1.startAt).to.eql(0))
        .then(curry(delay100)(() => expect(option2.startAt).to.be.closeTo(100, 32)))
        .then(curry(delay500)(() => expect(option2.finishAt).to.be.closeTo(500, 32)))
        .then(curry(delay500)(() => expect(option1.finishAt).to.be.closeTo(1000, 32)))
        .then(curry(delay100)(() => {
            animation3.finish();
            expect(option3.finishAt).to.be.closeTo(1250, 32);
            expect(playCount).to.be.above(0);
            expect(timeline._playback.callCount).eql(playCount);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Timeline#pause} */
    /** @test {Timeline#paused} */
    it('pause', done => {
        const timeline = new Timeline();
        sinon.spy(timeline, '_playback');

        const animation = createAnimation();
        timeline.add(animation, {
            playAt: 0,
            stopAt: 1000
        });

        let playCount = 0;
        timeline.on('play', () => playCount++);
        timeline.play();

        let playbackCount;
        delay100(() => {
            playbackCount = timeline._playback.callCount;
            expect(playbackCount).to.be.above(1);
            expect(playCount).eql(playbackCount);
            timeline.pause();
            expect(timeline.paused).eql(true);
        })
        .then(curry(delay100)(() => {
            expect(timeline._playback.callCount).eql(playbackCount);
            expect(playCount).eql(timeline._playback.callCount);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Timeline#stop} */
    it('stop', done => {
        const timeline = new Timeline();
        sinon.spy(timeline, '_playback');

        const animation = createAnimation();
        timeline.add(animation, {
            playAt: 0,
            stopAt: 1000
        });

        let playCount = 0;
        timeline.on('play', () => playCount++);
        timeline.play();

        let playbackCount;
        delay100(() => {
            playbackCount = timeline._playback.callCount;
            expect(playbackCount).to.be.above(1);
            expect(playCount).to.eql(playbackCount);

            timeline.stop();
            expect(timeline.paused).eql(false);
            expect(timeline.ended).eql(true);
            timeline.play(); // should not play
        })
        .then(curry(delay100)(() => {
            expect(timeline._playback.callCount).eql(playbackCount);
            expect(playCount).eql(timeline._playback.callCount);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Timeline#pause} */
    /** @test {Timeline#play} */
    it('pause then play', done => {
        const timeline = new Timeline();
        sinon.spy(timeline, '_playback');

        const animation = createAnimation();
        timeline.add(animation, {
            playAt: 0,
            stopAt: 1000
        });

        let playCount = 0;
        timeline.on('play', () => playCount++);
        timeline.play();

        let playbackCount;

        delay100(() => {
            playbackCount = timeline._playback.callCount;
            expect(playbackCount).to.be.above(1);
            expect(playCount).eql(playbackCount);
            timeline.pause();
            expect(timeline.paused).eql(true);
        })
        .then(curry(delay100)(() => {
            expect(timeline._playback.callCount).eql(playbackCount);
            expect(playCount).eql(timeline._playback.callCount);
            timeline.play();
            expect(timeline.paused).eql(false);
        }))
        .then(curry(delay100)(() => {
            expect(timeline._playback.callCount).to.be.above(playbackCount);
            expect(playCount).eql(timeline._playback.callCount);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Timeline#ended} */
    it('play to end', done => {
        const timeline = new Timeline();
        sinon.spy(timeline, '_playback');

        const animation = createAnimation();
        timeline.add(animation, {
            playAt: 0,
            stopAt: 100
        });

        let playCount = 0;
        let endCount = 0;
        timeline.on('play', () => playCount++);
        timeline.on('end', () => endCount++);
        timeline.play();

        let playbackCount;

        delay150(() => {
            playbackCount = timeline._playback.callCount;

            expect(timeline.paused).eql(false);
            expect(timeline.ended).eql(true);
            expect(playbackCount).to.be.above(1);
            expect(playCount).eql(playbackCount);
            expect(endCount).eql(1);

            timeline.play(); // should not be play again
        })
        .then(curry(delay50)(() => {
            expect(timeline.ended).eql(true);
            expect(timeline._playback.callCount).eql(playbackCount);
            expect(playCount).eql(timeline._playback.callCount);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Timeline#loop} */
    it('play to loop', done => {
        const timeline = new Timeline();
        sinon.spy(timeline, '_playback');

        const animation = createAnimation();
        timeline.add(animation, {
            playAt: 0,
            stopAt: 100
        });

        let playCount = 0;
        let loopCount = 0;
        timeline.loop = true;
        expect(timeline.loop).eql(true);

        timeline.on('play', () => playCount++);
        timeline.on('loop', () => loopCount++);
        timeline.play();

        let playbackCount;
        delay150(() => {
            playbackCount = timeline._playback.callCount;

            expect(timeline.paused).eql(false);
            expect(timeline.ended).eql(false);
            expect(playbackCount).to.be.above(1);
            expect(playCount).eql(playbackCount);
            expect(loopCount).eql(1);
        })
        .then(curry(delay150)(() => {
            expect(timeline.paused).eql(false);
            expect(timeline.ended).eql(false);
            expect(timeline._playback.callCount).to.be.at.least(playbackCount);
            expect(playCount).eql(timeline._playback.callCount);
            expect(loopCount).to.be.at.least(2);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Timeline#replay} */
    it('replay', done => {
        const timeline = new Timeline();
        sinon.spy(timeline, '_playback');

        const animation = createAnimation();
        timeline.add(animation, {
            playAt: 0,
            stopAt: 100
        });

        let playCount = 0;

        timeline.on('play', () => playCount++);
        timeline.play();

        let playbackCount;
        delay150(() => {
            playbackCount = timeline._playback.callCount;

            expect(playbackCount).to.be.above(1);
            expect(playCount).eql(playbackCount);
            expect(timeline.paused).eql(false);
            expect(timeline.ended).eql(true);

            timeline.replay();
        })
        .then(curry(delay50)(() => {
            expect(timeline.paused).eql(false);
            expect(timeline.ended).eql(false);
            expect(timeline._playback.callCount).to.be.above(playbackCount);
            expect(playCount).eql(timeline._playback.callCount);

            playbackCount = timeline._playback.callCount;
            timeline.replay(); // replay from begin
        }))
        .then(curry(delay50)(() => {
            expect(timeline.paused).eql(false);
            expect(timeline.ended).eql(false);
            expect(timeline._playback.callCount).to.be.above(playbackCount);
            expect(playCount).eql(timeline._playback.callCount);

            playbackCount = timeline._playback.callCount;
            timeline.pause();
            timeline.replay(); // replay from begin
        }))
        .then(curry(delay150)(() => {
            expect(timeline.paused).eql(false);
            expect(timeline.ended).eql(true);
            expect(timeline._playback.callCount).to.be.above(playbackCount);
            expect(playCount).eql(timeline._playback.callCount);
        }))
        .then(done)
        .catch(done);
    });

    /** @test {Timeline#_playback} */
    it('playback', () => {
        const timeline = new Timeline();
        const anime1 = createAnimation();
        const anime2 = createAnimation();
        const anime3 = createAnimation();
        const anime4 = createAnimation();

        timeline.add(anime1, {
            stopAt: 1000
        }).add(anime2, {
            playAt: 2000
        }).add(anime3, {
            playAt: () => anime1.finished
        }).add(anime4, {
            playAt: 500,
            stopAt: () => anime2.started
        });

        function expectAnime(anime, {
            started = false,
            finished = false,
            startAt = undefined,
            finishAt = undefined
        }) {
            expect(anime.started).eql(started);
            expect(anime.finished).eql(finished);

            const option = timeline.get(anime);
            expect(option.startAt).eql(startAt);
            expect(option.finishAt).eql(finishAt);
        }

        const clock = new Clock();

        timeline._playback(clock); // 0ms
        expectAnime(anime1, {
            started: true,
            startAt: 0
        });
        expectAnime(anime2, {});
        expectAnime(anime3, {});
        expectAnime(anime4, {});

        clock.go(500); // 500ms
        timeline._playback(clock);
        expectAnime(anime1, {
            started: true,
            startAt: 0
        });
        expectAnime(anime2, {});
        expectAnime(anime3, {});
        expectAnime(anime4, {
            started: true,
            startAt: 500
        });

        clock.go(1000); // 1000ms
        timeline._playback(clock);
        expectAnime(anime1, {
            started: true,
            startAt: 0,
            finished: true,
            finishAt: 1000
        });
        expectAnime(anime2, {});
        expectAnime(anime3, {
            started: true,
            startAt: 1000
        });
        expectAnime(anime4, {
            started: true,
            startAt: 500
        });

        clock.go(2000); // 2000ms
        timeline._playback(clock);
        expectAnime(anime1, {
            started: true,
            startAt: 0,
            finished: true,
            finishAt: 1000
        });
        expectAnime(anime2, {
            started: true,
            startAt: 2000
        });
        expectAnime(anime3, {
            started: true,
            startAt: 1000
        });
        expectAnime(anime4, {
            started: true,
            startAt: 500,
            finished: true,
            finishAt: 2000
        });
    });
});
/* eslint-enable no-unexpected-multiline */
/* eslint-enable no-spaced-func */
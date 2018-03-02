import Log from './utils/log.js';
import * as Events from './utils/events.js';
import * as Fn from './utils/fn.js';
import * as Env from 'amfe-env';

class HTML5 {

  constructor(player) {
    this.el_ = player.tag;
    this.player = player;
    this.controlBar = player.controlBar;
    this.danmakuPlay = player.danmakuPlay;
    this.sources = player.options_.sources;
    this.bindEvent();
    this.timeout = player.options_.timeout;
  }

  bindEvent() {
    // mediaevents : https://www.w3.org/TR/html5/embedded-content-0.html#mediaevents
    this.el_.addEventListener('error', ev => this.errorEmit(ev));
    this.el_.addEventListener('ended', ev => this.endedEmit(ev));
    this.el_.addEventListener('progress', ev => this.progressEmit(ev));
    this.el_.addEventListener('play', ev => this.playEmit(ev));
    this.el_.addEventListener('loadstart', ev => this.loadstartEmit(ev));
    this.el_.addEventListener('playing', ev => this.playingEmit(ev));
    this.el_.addEventListener('suspend', ev => this.suspendEmit(ev));
    this.el_.addEventListener('abort', ev => this.abortEmit(ev));
    this.el_.addEventListener('stalled', ev => this.stalledEmit(ev));
    this.el_.addEventListener('waiting', ev => this.waitingEmit(ev));
    this.el_.addEventListener('canplay', ev => this.canplayEmit(ev));
    this.el_.addEventListener('canplaythrough', ev => this.canplaythroughEmit(ev));
    this.el_.addEventListener('timeupdate', ev => this.timeupdateEmit(ev));
    this.el_.addEventListener('seeked', ev => this.seekedEmit(ev));
    this.el_.addEventListener('pause', ev => this.pauseEmit(ev));
  }

  pauseEmit(e) {
    Log('HTML5:emit:::video:pause::' + (new Date).getTime());
    this.controlBar && this.controlBar.emit('video:pause', e);
    this.player.emit('video:pause', e);
    this.pauseEmited = true;
    this.playEmited = false;
  }

  stop() {
    this.pause();
    this.el_.currentTime = 0;
  }

  seekedEmit(e) {
    Log('HTML5:emit:::video:seeked::' + (new Date).getTime());
  }

  stalledEmit(e) {
    Log('HTML5:emit:::video:stalled::' + (new Date).getTime());
    this.setTimeoutError();
  }

  waitingEmit(e) {
    Log('HTML5:emit:::video:waiting::' + (new Date).getTime());
    this.setTimeoutError();
  }

  abortEmit(e) {
    Log('HTML5:emit:::video:abort::' + (new Date).getTime());
  }

  suspendEmit(e) {
    Log('HTML5:emit:::video:suspend::' + (new Date).getTime());
  }

  canplayEmit(e) {
    Log('HTML5:emit:::video:canplay::' + (new Date).getTime());
  }

  canplaythroughEmit(e) {
    Log('HTML5:emit:::video:canplaythrough::' + (new Date).getTime());
    this.setTimeoutError();
  }

  errorEmit(e) {
    if (this.player.isDecodeHls && e.isTrusted) {
      return;
    }

    Log('HTML5:emit:::video:error::' + (new Date).getTime());

    if (this.waitTimer_) {
      clearTimeout(this.waitTimer_);
      this.waitTimer_ = 0;
    }

    this.played = false;
    this.playEmited = false;

    this.player.emit('video:error', e);
  }

  progressEmit() {
    Log('HTML5:emit:::video:progress::' + (new Date).getTime());
    this.controlBar && this.controlBar.emit('video:progress');
  }

  endedEmit(e) {
    Log('HTML5:emit:::video:ended::');
    this.player.emit('video:ended', e);
    this.controlBar && this.controlBar.emit('video:ended', e);
  }

  timeupdateEmit(e) {
    Log('HTML5:emit:::video:timeupdate::' + this.el_.currentTime);
    let currentTime = e.currentTarget.currentTime;
    let uc = navigator.userAgent.match(/UCBrowser/);

    if (this.playEmited) {
      return;
    }

    if (
      currentTime > 0 ||
      (this.player.videoLoading && this.player.options_.live && Env.os.isAndroid)
    ) {

      if (this.waitTimer_) {
        clearTimeout(this.waitTimer_);
        this.waitTimer_ = 0;
      }

      this.player.emit('video:timeupdate', e);
      this.controlBar && this.controlBar.emit('video:timeupdate', e);
      this.danmakuPlay && this.danmakuPlay.emit('video:timeupdate', e);
    }
  }

  playEmit(e) {
    if (this.pauseEmited && this.player.videoLoading && this.player.options_.live && Env.os.isAndroid) {
      this.playEmited = true;
      this.player.emit('video:timeupdate', e);
      this.controlBar && this.controlBar.emit('video:timeupdate', e);
      this.danmakuPlay && this.danmakuPlay.emit('video:timeupdate', e);
    }
    this.player.emit('video:play', e);
  }

  loadstartEmit(e) {
    Log('HTML5:emit:::video:loadstart::' + (new Date).getTime());
    this.player.emit('video:loadstart');
  }

  playingEmit() {
    Log('HTML5:emit:::video:playing::' + (new Date).getTime());
    this.player.emit('video:playing');
    this.setTimeoutError();
  }

  loadEmit() {
    Log('HTML5:emit:::video:load::' + (new Date).getTime());
    this.player.emit('video:load');
  }

  play() {
    this.played = true;

    if (this.player.isDecodeHls) {
      let hls = new Hls();

      hls.loadSource(this.player.currentSrc);
      hls.attachMedia(this.el_);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.el_.play();
      });

    } else {
      this.el_.play();
    }
  }

  load() {
    this.el_.load();
  }

  pause() {
    this.el_.pause();
  }

  setSrc(url) {
    this.el_.src = url;
  }

  setTimeoutError() {

    if (this.waitTimer_ || !this.played) return;

    this.waitTimer_ = setTimeout(() => {
      if (this.el_.networkState === this.el_.NETWORK_NO_SOURCE) {
        this.errorEmit({
          errorCode: 'NETWORK_NO_SOURCE'
        });
      } else {
        this.errorEmit({
          errorCode: 'NETWORK_TIMEOUT'
        });
      }
    }, this.timeout || 20000);
  }

  enterFullScreen() {
    var video = this.el_;

    if ('webkitDisplayingFullscreen' in video) {
      Events.one(video, 'webkitbeginfullscreen', function() {
        Events.one(video, 'webkitendfullscreen', function() {
          Events.trigger(video, 'fullscreenchange', {
            isFullscreen: false
          });
        });

        Events.trigger(video, 'fullscreenchange', {
          isFullscreen: true
        });
      });
    }

    if (video.paused && video.networkState <= video.HAVE_METADATA) {
      // attempt to prime the video element for programmatic access
      // this isn't necessary on the desktop but shouldn't hurt
      this.el_.play();

      // playing and pausing synchronously during the transition to fullscreen
      // can get iOS ~6.1 devices into a play/pause loop
      setTimeout(function() {
        video.pause();
        video.webkitEnterFullScreen();
      }, 0);
    } else {
      video.webkitEnterFullScreen();
    }
  }
}

export default HTML5;
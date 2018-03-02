import * as Dom from '../utils/dom.js';
import mergeOptions from '../utils/merge.js';
import Emitter from '../utils/emitter.js';
import Log from '../utils/log.js';
import * as Env from 'amfe-env';
import * as Events from '../utils/events.js';

class Progress extends Emitter {

  constructor(controlBar) {

    super();

    this.options_ = mergeOptions(this.options_, controlBar.options_);

    this.parent_ = controlBar.el_;

    this.controlBar = controlBar;

    this.el_ = this.getProgressEl();

    this.totalTimeEl = Dom.$('.J_TotalTime', this.el_);
    this.currentTimeEl = Dom.$('.J_CurrentTime', this.el_);
    this.progressBarEl = Dom.$('.J_ProgressBar', this.el_);
    this.progressEl = Dom.$('.J_Progress', this.el_);

    this.bindEvent();
  }

  getProgressEl() {
    let el = Dom.createEl('div', {
      className: 'vjs-progress-bar',
      innerHTML: `
        <span class="current-time"><em class="J_CurrentTime">00:00</em></span>
        <span class="progress-bar J_ProgressBar">
          <span class="progress J_Progress">
            <span class="control J_Update"></span>
          </span>
        </span>
        <span class="total-time"><em class="J_TotalTime">10:25</em></span>
      `
    });

    Dom.appendContent(Dom.$('.progress-wrap', this.parent_), el);

    return el;
  }

  bindEvent() {
    let isMouseDown = false,
      wasPlaying = false,
      mouseEventRefresh = '',
      media = this.controlBar.getVideoEl_();

    let mouseDown = (e) => {
      // console.log(e.type + ':::mouseDown');
      this.progressing = true;
      isMouseDown = true;
      wasPlaying = !media.paused;
      this.controlBar.exePause();
      this.setMediaProgress(e);
    }

    let mouseUp = (e) => {
      console.log(e.type + ':::mouseUp');
      e.preventDefault();
      clearInterval(mouseEventRefresh);
      isMouseDown = false;
      if (wasPlaying == true) {
        this.controlBar.exePlay();
        wasPlaying = false;
      } else {
        this.controlBar.exePause();
      }

      this.progressing = false;
    }
    let mouseMove = (e) => {
      e.preventDefault();
      // console.log(e.type + ':::mouseMove');
      if (isMouseDown === true) {
        mouseEventRefresh = setInterval(this.setMediaProgress(e), 1000);
        this.controlBar.showControlBar();
      }
    }

    Events.on(this.el_, 'touchstart', ev => mouseDown(ev));
    Events.on(this.el_, 'touchmove', ev => mouseMove(ev));
    Events.on(this.el_, 'touchend', ev => mouseUp(ev));

    Events.on(this.el_, 'mousedown', ev => mouseDown(ev));
    Events.on(this.el_, 'mousemove', ev => mouseMove(ev));
    Events.on(this.el_, 'mouseup', ev => mouseUp(ev));
  }

  setMediaProgress(e) {
    let media = this.controlBar.getVideoEl_();
    let tempTime = this.timeFromCursorPosition(
      this.progressBarEl,
      e,
      media.duration
    );

    media.currentTime = tempTime;
    this.updateProgress_();
  }

  timeFromCursorPosition(element, event, duration) {
    let dimensions = element.getBoundingClientRect();
    let pixelsOfBar = (event.clientX || event.changedTouches[0].clientX) - dimensions.left;
    let width = dimensions.width;
    //安卓全屏方案兼容，经旋转后
    if (Env.aliapp && Env.aliapp.appname == 'TB' && Env.os.isAndroid && this.controlBar.screen === 'landscape') {
      pixelsOfBar = (event.clientY || event.changedTouches[0].clientY) - dimensions.top;
      width = dimensions.height;
    }
    let percentToSecs = pixelsOfBar / width;
    return percentToSecs * duration;
  }

  timeupdate(e) {
    this.updateProgress_(e);
    this.updateTimeCount_(e);
  }

  updateProgress_(e) {
    //this.updateTimeCount();
    let media = this.controlBar.getVideoEl_();
    let value = 0;
    if (media.currentTime > 0) {
      value = (100 / media.duration) * media.currentTime;
    }
    this.progressEl.style.width = value + "%";
  }

  updateTimeCount_(e) {
    let media = this.controlBar.getVideoEl_();
    let currTime = this.formatTime(media.currentTime);
    let totalTime = this.formatTime(media.duration);
    if (isNaN(media.duration) === true) {
      totalTime = "00:00";
    };
    this.currentTimeEl.innerHTML = currTime;
    this.totalTimeEl.innerHTML = totalTime;
  }

  formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = ("0" + Math.round(time - minutes * 60)).slice(-2);
    return minutes + ":" + seconds;
  }

  setTimeline(time) {
    let tagDom = Dom.createEl('span', {
      className: 'vjs-progress-tag'
    });
    let media = this.controlBar.getVideoEl_();
    let value = (100 / media.duration) * time;

    tagDom.style.left = value + "%";

    Dom.appendContent(this.progressBarEl, tagDom);

    return tagDom;
  }
}
export default Progress;
import * as Dom from '../utils/dom.js';
import Emitter from '../utils/emitter.js';
import mergeOptions from '../utils/merge.js';
import Log from '../utils/log.js';
import * as Events from '../utils/events.js';

class DanmakuItem extends Emitter {

  constructor(config, danmaku){

    super();

    this.options_ = mergeOptions(this.setOption(), config);

    this.el_ = this.createItemEl();

    this.danmaku = danmaku;

    this.going = false;

    Dom.appendContent(danmaku.el_, this.el_);
  }

  setOption(){

    return {
      'size' : '14px',
      'color': '#000',
      'backgroundColor' : 'rgba(255, 255, 255, 0.6)',
      'duration' : '4292'
    }
  }

  createItemEl(){
    let that = this;

    if(!/rem|em|px/.test(that.options_.size)){
      that.options_.size += 'px';
    }

    console.log(that.options_.size);

    return Dom.createEl('div', {
      className: 'vjs-danmaku-item vjs-hidden',
      innerHTML: `
        <p style="display:inline-block;font-size:${that.options_.size};color:${that.options_.color};background-color:${that.options_.backgroundColor}">${that.options_.text}</p>
      `
    });
  }

  move(){
    let myWidth = Dom.$('p', this.el_).offsetWidth;

    this.el_.style.transform = 'translate(-'+ (myWidth + 20) +'px, 0)';
    this.el_.style.webkitTransform = 'translate(-'+ (myWidth + 20) +'px, 0)';
    this.el_.addEventListener('webkitTransitionEnd', ev => {
      if(this.webkitTransitionEndTimer) {
        clearTimeout(this.webkitTransitionEndTimer);
      }
      Dom.addElClass(this.el_, 'vjs-hidden');
      this.going = false;
    })

    this.webkitTransitionEndTimer = setTimeout(() => {
      Dom.addElClass(this.el_, 'vjs-hidden');
      this.going = false;
    }, 10000);
  }

  start(){
    
    if(this.going){
      return;
    }

    this.going = true;

    let myWidth = Dom.$('p', this.el_).offsetWidth;

    if(!/rem|em|px/.test(this.options_.top)){
      this.options_.top += 'px';
    }

    this.el_.style.position = 'absolute';
    this.el_.style.transform = 'translate(' + this.danmaku.el_.offsetWidth + 'px, 0)';
    this.el_.style.webkitTransform = 'translate(' + this.danmaku.el_.offsetWidth + 'px, 0)';
    this.el_.style.transitionDuration = this.options_.duration;
    this.el_.style.webkitTransitionDuration = this.options_.duration;
    this.el_.style.top = this.options_.top || 0;
    this.el_.style.zIndex = '10';
    Dom.removeElClass(this.el_, 'vjs-hidden');
    let delayTime = this.options_.time - (this.options_.queue - 1) * this.danmaku.checkTime;
    
    setTimeout(() => {
      this.move();
    }, delayTime)

  }
}
export default DanmakuItem;
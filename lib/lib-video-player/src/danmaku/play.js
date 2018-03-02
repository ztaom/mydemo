import * as Dom from '../utils/dom.js';
import Emitter from '../utils/emitter.js';
import DanmakuItem from './danmaku-item.js';
import Log from '../utils/log.js';
import mergeOptions from '../utils/merge.js';
import * as Events from '../utils/events.js';

class Danmaku extends Emitter {

  constructor(player){

    super();

    this.parent_ = player.el_;

    this.el_ = this.createEl();

    this.options_ = mergeOptions(this.options_, player.options_);

    this.totalTime = 9000;

    this.checkTime = 1000;

    this.playCount = Math.ceil(this.totalTime / this.checkTime);

    //this.on('video:timeupdate', ev => {
      // play danmuku
    this.init();
    //});
    
  }

  createEl(){

    let el = Dom.createEl('div', {
      className: 'vjs-danmaku-container'
    });

    Dom.appendContent(this.parent_, el);

    return el;
  }

  init(){
    if(this.playing){
      return;
    }
    
    this.playing = true;

    let playerList = this.options_.danmakuPlayerList;

    playerList.forEach((config) => {
      let queue = Math.ceil(config.time / this.checkTime);
      config.queue = queue;

      let go = new DanmakuItem(config, this);

      this.on(queue + 'start',function(){
        go.start();
      })
    });

    let currentQueue = 0;

    this.emit(currentQueue + 'start');

    setInterval(() => {
      this.emit(currentQueue + 'start');

      if (currentQueue === playerList.length - 1) {
        currentQueue = 0;
      }else{
        currentQueue++;
      }
    }, this.checkTime);

  }
}
export default Danmaku;
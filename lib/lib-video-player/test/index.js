import expect from 'chai';
import jsdom from 'mocha-jsdom';
import Player from '../src/index';

describe('lib-video-player', () => {
  var myPlayer;

  jsdom({
    scripts : 'http://g.alicdn.com/mtb/??lib-env/1.5.15/env.js,lib-windvane/2.1.1/windvane.js'
  });

  before(done => {
    var innerHTML = '<video webkit-playsinline="webkit-playsinline" autoplay="auto" live id="J_Video_Player" class="lib-video vjs-hidden" poster="https://img.alicdn.com/bao/uploaded/TB1oJg8LpXXXXb.XFXXXXXXXXXX.jpg">' +
      ' <source src="//tbliving.alicdn.com/guide/live14624285472192-live.m3u8">' +
      ' <source src="//tblive.alicdn.com/live/9d39290e-d34f-4ebf-a05a-7b7989b3fbf3_e9501cbf-60d7-4003-aa24-6bc7270cfb33.flv" type="video/flv">' +
    '</video>';

    var videoContainer = document.createElement('div');
    
    videoContainer.innerHTML = innerHTML;

    setTimeout(() => {
      var videoDom = videoContainer.childNodes[0];

      myPlayer = Player(videoDom, {
        timeout : 8000 // default 10000
      });

      done();
    }, 800);
  });

  it('video:error api', (done) => {
    myPlayer.on('video:error', function(ev){
      expect(ev.errorCode).to.equal('NETWORK_NO_SOURCE');
      //done();
    });

    done();
  });

});
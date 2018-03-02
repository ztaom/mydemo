### 直播视频(移动端统一使用M3U8格式文件, PC非Safari使用flv格式做兼容)
直播视频需要给播放器设置live属性，直播状态下控制条不显示暂停及进度条功能，仅有全屏按钮。直播视频可以输入多个source，m3u8格式用于移动端播放，flv格式用于pc端低延迟直播播放。两种格式需要分别设置type="application/x-mpegURL"及type="rtmp/flv"
```
<video live webkit-playsinline="webkit-playsinline" playsinline="playsinline" fullscreen="default" id="J_Video_Player_Live" class="lib-video vjs-hidden" poster="//img.alicdn.com/bao/uploaded/TB1oJg8LpXXXXb.XFXXXXXXXXXX.jpg">
	<source src="http://tbflive.alicdn.com/mediaplatform/0c72b0f2-0bf1-4c5b-a5dc-695880320913.m3u8?auth_key=1490942608-0-0-f96833c88a316837a56b86cb7c57834e" type="application/x-mpegURL"> 		
	<source src="http://tbflive.alicdn.com/mediaplatform/0c72b0f2-0bf1-4c5b-a5dc-695880320913.flv?auth_key=1490942608-0-0-65362c6f8d0436fc2fbd9e8dbdc7542f" type="rtmp/flv">
</video>
```

### 直播回放，m3u8格式

点播的m3u8格式视频不需要设置live属性

```html
<video webkit-playsinline="webkit-playsinline" id="J_Video_Player_m3u8" class="lib-video vjs-hidden" poster="//img.alicdn.com/bao/uploaded/TB1oJg8LpXXXXb.XFXXXXXXXXXX.jpg">
  <source src="http://tbfliving.alicdn.com/mediaplatform/72126688_1473731080200.m3u8" type="application/x-mpegURL">    
</video>
```

```javascript
var VideoPlayer = window['lib-video-player'];
var myPlayerM3u8 = VideoPlayer('J_Video_Player_m3u8');
```

* [demo页面地址](http://wapp.wapa.taobao.com/src/video-player-m3u8.html)

* ![扫描二维码](http://gw.alicdn.com/mt/TB1Rpa2RVXXXXciXFXXXXXXXXXX-300-301.png)

### 点播视频

点播视频如mp4格式不需要设置live属性，否则会无法播放，需要设置type="video/mp4"的播放源

```html
<video webkit-playsinline="webkit-playsinline" id="J_Video_Player" src="//cloud.video.taobao.com/play/u/2675628091/p/1/e/6/t/1/34341521.mp4" class="lib-video vjs-hidden" poster="//img.alicdn.com/bao/uploaded/TB1oJg8LpXXXXb.XFXXXXXXXXXX.jpg">
  <source src="//cloud.video.taobao.com/play/u/2675628091/p/1/e/6/t/1/34341521.mp4" type="video/mp4">
</video>
```

```javascript
var myPlayer = VideoPlayer('J_Video_Player', {
  timeout : 8000 // default 10000
});
```

* [demo页面地址](http://wapp.wapa.taobao.com/src/video-player-normal.html?host=h5.wapa.taobao.com)

* ![扫描二维码](http://gw.alicdn.com/mt/TB1I2vdRVXXXXaSXpXXXXXXXXXX-297-297.png)
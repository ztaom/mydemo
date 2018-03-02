# 快速入门

## 安装

```shell
tnpm install @ali/lib-video-player --save
```

## tnpm的使用方式

```javascript
import '@ali/lib-video-player/node_modules/hls.js/src/dist/hls.js'; // 引入hls.js
import '@ali/lib-video-player/src/css/cssrem/video.css'; // 引入css文件
import VideoPlayer from '@ali/lib-video-player';
```

## cdn的使用方式

```
    <link rel="stylesheet" href="//g.alicdn.com/mtb/lib-video-player/[version]/cssrem/video.css" />
    <script src="//g.alicdn.com/mtb/lib-video-player/[version]/??hls.js,video.js"></script>
```

## 例子

```html
<link href="src/css/video.css" rel="stylesheet">

<video webkit-playsinline="webkit-playsinline" live autoplay="auto" id="J_Video_Player" class="lib-video vjs-hidden" poster="https://img.alicdn.com/bao/uploaded/TB1oJg8LpXXXXb.XFXXXXXXXXXX.jpg">
	<source src="http://tbflive.alicdn.com/mediaplatform/72126688_1472536681576.m3u8?auth_key=1473141481-0-0-afd719d4e18b69a5ee9425e66b030ac7" type="application/x-mpegURL"> 		
	<source src="http://tbflive.alicdn.com/mediaplatform/72126688_1472536681576.flv?auth_key=1473141481-0-0-15cbdfd6939960633d721c501e144b4e" type="rtmp/flv">
</video>
```

### 引用

如果是通过tnpm的方式
```javascript
import VideoPlayer from '@ali/lib-video-player'
```

如果是通过cdn的方式
```
var VideoPlayer = window['lib-video-player'];
```

### 初始化

```javascript
var myPlayer = VideoPlayer('J_Video_Player');

myPlayer.on('video:error', function(ev){
	console.log('myPlayer:::video:error::' + JSON.stringify(ev));
})
```

## 说明
其中m3u8文件地址是针对移动端及PC端safari浏览器的直播视频格式。

PC浏览器如chrome、IE等不支持m3u8视频的播放flv文件地址通过flash（已经结合在本播放器中）可以在pc端进行播放。


## m3u8解码使用

默认情况使用flash做pc端兼容，但也可以使用hls.js解码m3u8格式。

* 安装[hls.js](https://github.com/dailymotion/hls.js).

```html
<link href="src/css/video.css" rel="stylesheet">
<script src="../node_modules/hls.js/dist/hls.js"></script>

<video webkit-playsinline="webkit-playsinline" live autoplay="auto" id="J_Video_Player" class="lib-video vjs-hidden" poster="https://img.alicdn.com/bao/uploaded/TB1oJg8LpXXXXb.XFXXXXXXXXXX.jpg">
	<source src="http://tbflive.alicdn.com/mediaplatform/2939719254_1472706118148.m3u8?auth_key=1473310918-0-0-61906ba0396fc69ec48ce841776073e4" type="application/x-mpegURL">
</video>

```


# @ali/lib-video-player

![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/lib-video-player.svg)

## 多媒体互动平台播放器
本播放器组件主要用于直播视频的兼容性处理及播放，封装了pc端及移动端直播（m3u8、flv等）、点播视频（mp4、ogg等）的播放功能。解决安卓和ios设备浏览器中播放一些兼容性问题，pc端除safari之外的浏览器因为不支持m3u8格式直播视频的播放。

业界常用的直播视频格式主要有m3u8及flv格式，其中m3u8文件地址是针对移动端和pc端safari浏览器的直播视频格式，是苹果公司针对移动端手机没有flash而设计的流媒体直播协议HLS视频格式。PC浏览器如chrome、IE等不支持m3u8视频的播放flv文件地址通过flash（已经结合在本播放器中）可以在pc端进行播放，是adobe公司设计推行的流媒体直播协议RTMP视频格式。通常来讲flv格式的直播源较m3u8格式延迟较低。

播放器遵循w3c规范，通过传入不同source源处理视频格式兼容性问题。会优先读取m3u8地址（type="application/x-mpegURL"的source属性），flv源（type="rtmp/flv"的source属性）若填写了就会用于pc浏览器的兼容，播放器会根据浏览器环境并选择可用的播放源进行播放，点播mp4文件不需要考虑移动端和pc端的兼容性问题。

## 安装

```shell
tnpm install @ali/lib-video-player --save
```

## 使用

```javascript
import VideoPlayer from '@ali/lib-video-player'
```

## 例子

```html
<link href="src/css/video.css" rel="stylesheet">

<video webkit-playsinline="webkit-playsinline" live autoplay="auto" id="J_Video_Player" class="lib-video vjs-hidden" poster="https://img.alicdn.com/bao/uploaded/TB1oJg8LpXXXXb.XFXXXXXXXXXX.jpg">
	<source src="http://tbflive.alicdn.com/mediaplatform/72126688_1472536681576.m3u8?auth_key=1473141481-0-0-afd719d4e18b69a5ee9425e66b030ac7" type="application/x-mpegURL"> 		
	<source src="http://tbflive.alicdn.com/mediaplatform/72126688_1472536681576.flv?auth_key=1473141481-0-0-15cbdfd6939960633d721c501e144b4e" type="rtmp/flv">
</video>
```

```javascript
import VideoPlayer from '@ali/lib-video-player'

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

```
<link href="src/css/video.css" rel="stylesheet">
<script src="../node_modules/hls.js/dist/hls.js"></script>

<video webkit-playsinline="webkit-playsinline" live autoplay="auto" id="J_Video_Player" class="lib-video vjs-hidden" poster="https://img.alicdn.com/bao/uploaded/TB1oJg8LpXXXXb.XFXXXXXXXXXX.jpg">
	<source src="http://tbflive.alicdn.com/mediaplatform/2939719254_1472706118148.m3u8?auth_key=1473310918-0-0-61906ba0396fc69ec48ce841776073e4" type="application/x-mpegURL">
</video>

```

## 参数说明

参数 | 类型 | 可选值 | 默认值 | 说明
---- | --- | --- | --- | ---
live | Boolean | true/false | false | 是否为直播视频，如果不是直播视频请不要添加live参数
autoplay | Boolean | true/false | false | 是否自动播放，如果已经设置了直播参数会自动开启自动播放
interact | Boolean | true/false | false |  设置为互动模式会在控制条中显示“宝贝”按钮
custom-controls | String | 'true'/'false' | 'false' | 是否使用自定义控制条，若设置为'true'，将不显示组件的控制条，可自行绘制
noFullscreen | Boolean | true/false | false |  设置为true之后可以隐藏全屏按钮。说明：全屏功能在手淘容器中通过windvane接口实现（详细见下方enterFullscreen接口），在外部容器中会使用浏览器的默认全屏，在容器全屏功能有问题时可以关闭全屏功能

## 实例方法

### pause()

播放暂停

### play()

开始播放

### getVideoEl()

获取html5 video

### removeVideoEl()

移除html5 video

### reload(url)

重新加载播放器，传入url可以加载新的视频地址，不传则仅刷新播放

### enterFullscreen()

触发播放器全屏播放，播放器的全屏事件在手淘（或者支持windvane的容器）中会通过windvane方法实现视频全屏，其中在android环境下会调用setNaviBarHidden方法隐藏导航栏并旋转视频容器，在ios环境下会调用transverseFullScreen方法并调整视频尺寸实现，在浏览器环境下会触发浏览器默认的全屏事件。

## 实例事件

### on('video:error', ev => {})

监听播放器异常

```jsdoc
@return {object} ev ev.errorCode: NETWORK_NO_SOURCE 没有可识别的视频源;
ev.errorCode: NETWORK_TIMEOUT 加载超时，默认10秒
```

### on('video:play', ev => {})

播放器播放事件

### on('video:pause', ev => {})

播放器暂停事件

### on('video:ended', ev => {})

视频播放结束事件

### on('video:timeupdate', ev => {})

监听时间轴更新，与原生video的timeupdate事件相同

### on('video:enterFullscreen', ev => {})

播放器进入全屏事件

### on('video:exitFullscreen', ev => {})

播放器退出全屏事件

## [文档API](http://groups.alidemo.cn/mtb/lib-video-player/book/index.html)

## [示例DEMO](http://groups.alidemo.cn/mtb/lib-video-player/samples/index.html)

## [问题讨论](http://gitlab.alibaba-inc.com/mtb/lib-video-player/issues)
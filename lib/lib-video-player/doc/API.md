# 接口描述

```javascript
import VideoPlayer from '@ali/lib-video-player';
```

## 构造函数

```jsdoc
VideoPlayer('J_Video_Player', {
	custom-controls: 'true' //不使用控制条
});
```

生成一个对象

```jsdoc
@param {object} player - a player object
```

## 参数说明

参数 | 类型 | 可选值 | 默认值 | 说明
---- | --- | --- | --- | ---
live | Boolean | true/false | false | 是否为直播视频，如果不是直播视频请不要添加live参数
autoplay | Boolean | true/false | false | 是否自动播放，如果已经设置了直播参数会自动开启自动播放
interact | Boolean | true/false | false |  设置为互动模式会在控制条中显示“宝贝”按钮
webkit-playsinline | String | 'webkit-playsinline' | 无 | 设置之后在ios浏览器中不会弹出原生视频，內联播放。
custom-controls | String | 'true'/'false' | 'false' | 是否使用自定义控制条，若设置为'true'，将不显示组件的控制条，可自行绘制
noFullscreen | Boolean | true/false | false | 设置为true之后可以隐藏全屏按钮。说明：全屏功能在手淘容器中通过windvane接口实现（详细见下方enterFullscreen接口），在外部容器中会使用浏览器的默认全屏，在容器全屏功能有问题时可以关闭全屏功能
poster | String | url | 无 | 设置视频封面，在未设置自动播放时会先展示视频封面
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

### exitFullscreen()

退出全屏播放模式

手淘中可以通过扫描以下二维码查看全屏效果：

![请用手淘扫码](http://gw.alicdn.com/mt/TB1oO5LRVXXXXcBXXXXXXXXXXXX-280-280.png)

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

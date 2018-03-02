---
title: 简介
type: guide
order: 1
---

## AFT是什么

AFT是动画流（Animation Flow）开发工具库（Tools）的缩写，它可以轻松的让一个JS对象或HTML元素动起来，也可以借助时间轴的功能来管理复杂的动画设计。并且通过编写插件，可以同时支持市面上众多的渲染引擎，例如Hilojs、Three.js等。

## 浏览器支持

>  IE9+, Firefox lastest, Chrome lastest and Android Browser 4.4+, iOS Safari 7.0+.

## 获取代码

通过tnpm安装 

```bash
tnpm install @ali/aft.js
```

然后在代码中引入

```js
import * as AFT from '@ali/aft.js';
```

或直接在HTML中用script的方式引入

```html
<script src="node_modules/@ali/aft.js/browser/polyfill.min.js"></script>
<script src="node_modules/@ali/aft.js/browser/aft-lite.min.js"></script>
<script>
  var AFT = window.AFT;
</script>
```

## 快速上手

### JS对象动画

> animate(initial: object): Tween

```js
const tween = AFT.animate({
  opacity: 0  
});
```

通过[animate](../api/index.html#lite-animate)方法，可以创建一个[Tween](../api/index.html#lite-Tween)实例，并接收一个js对象为初始参数。

> tween.to(result: object).duration(time: number).easing(type: string|function): Tween

```js
tween.to({
  opacity: 1
})
.duration(1000)
.easing('ease-out') 
```

通过链式调用[Tween](../api/index.html#lite-Tween)实例的方法，来定义一次[动画](basic.html#动画是什么)。

> tween.play(): Tween

通过调用[play](../api/index.html#Tween-play)方法，来播放这次动效，并在[update](../api/index.html#Tween-update)方法中获得每一帧变化后的值。

```js
tween.update(current => {
  console.log(current.get('opacity'));
}).play();【
```

[参考示例](http://groups.alidemo.cn/fdilab/aft.js-internal/examples/animate/stopwatch.html)

### HTML元素动画

> animate(initial: HTMLElement): Tween

用[animate](../api/index.html#lite-animate)方法，即可以操作一个js对象，也可以操作一个HTML元素。

```js
AFT.animate(document.getElementById('rectangle'))
.to({
  backgroundColor: '#f00',
  rotateZ: '360deg'
})
.duration(400)
.easing('ease-in')
.iteration(2)
.direction('alternate')
.play();
```

当操作一个HTML元素时，[to](../api/index.html#Tween-to)方法参数中的对象键名，必须是CSS的标准属性，且仅支持分量写法，例如：`backgroundColor`，`borderLeftColor`, `paddingLeft`等，不支持组合写法，例如：`margin`,`padding`等。而对于`transform`属性的动效，可以直接写其矩阵变换方法，同样也只支持分量写法，例如：`translateX`，`rotateZ`等。**并且因为矩阵变换不可逆的特性，当前版本尚不支持有初始变换矩阵值的元素**。

[参考示例](http://groups.alidemo.cn/fdilab/aft.js-internal/examples/animate/flashcolors.html)

## 继续深入

### 玩转复杂的动画逻辑

[animate](../api/index.html#lite-animate)方法能快速的创建一个动画，但是对于由多个或复杂动画片段组成的完整场景就需要用到[Effect](../api/index.html#runtime-Effect)，[Animation](../api/index.html#runtime-Animation)，[Timeline](../api/index.html#runtime-Timeline)三个模块。

> createEffect(): Effect

通过[createEffect](../api/index.html#lite-createEffect)的工厂方法可以创建一个[Effect](../api/index.html#runtime-Effect)实例，并链式的调用[动效方法]()来定义一系列动效。这些定义好的[动效]()是可以被复用的。

```js
const fadeInEffect = AFT.createEffect();
fadeInEffect.to({
  opacity: 1
})
.duration(400)
.easing('ease-in');

const bounceInEffect = AFT.createEffect();
bounceInEffect.to({
  translateY: '50px'
})
.duration(400)
.easing('cubic-bezier(.42,0,.5,1.5)');
```

> createAnimation(initial: object|HTMLElement, effect: Effect, iteration: number): Animation

通过[createAnimation](../api/index.html#lite-createAnimation)的工厂方法创建一个[Animation](../api/index.html#runtime-Animation)实例，并把js对象或HTML元素同某个[动效](basic.html#动效是什么)绑定，就定义了一个[动画](basic.html#动画是什么)。

```js
const rect = document.createElement('div');
rect.style.cssText = 'opacity:0;width:100px;height:100px;background-color:black;';
document.body.appendChild(rect);

const fadeIn = AFT.createAnimation(rect, fadeInEffect);
const bounceIn = AFT.createAnimation(rect, bounceInEffect);
```

> createTimeline(): Timeline

> timeline.add(animation: Animation, options: {playAt: number|function, stopAt: number|function}): Timeline

> timeline.play(): Timeline

通过[createTimeline](../api/index.html#lite-createTimeline)的工厂方法创建一个[Timeline](../api/index.html#runtime-Timeline)实例，并通过实例的[add](../api/index.html#Timeline-add)方法添加一个[动画](basic.html#动画是什么)以及[动画播放时机](basic.html#播放时机)的参数，就可以控制这个动画了。

**让上述定义的两个动画一起播放**

```js
const timeline = AFT.createTimeline();
timeline.add(fadeIn, {
  playAt: 0
}).add(bounceIn, {
  playAt: 0
}).play();
```

让上述定义的两个动画顺序播放

```js
const timeline = AFT.createTimeline();
timeline.add(fadeIn, {
  playAt: 0
}).add(bounceIn, {
  playAt: () => fadeIn.finished
}).play();
```

[参考示例](http://groups.alidemo.cn/fdilab/aft.js-internal/examples/timeline/matrix.html)

### 用渲染引擎制作动画

AFT提供了一套基于[虚拟DOM的渲染引擎](advanced.html#aft-render)，它比较轻便，且同时支持HTML/CSS和Canvas的渲染。

如需用这套渲染引擎，需要引入额外的代码库：

```js
import * as render from '@ali/aft.js/render';
```

或用在script引入的情况下，把`browser/aft-lite.js`替换为`browser/aft.min.js`

```html
<script src="node_modules/@ali/aft.js/browser/polyfill.min.js"></script>
<script src="node_modules/@ali/aft.js/browser/aft.min.js"></script>
<script>
  var render = window.AFT.render;
</script>
```

> class Canvas2D extends Engine

通过创建不同的引擎类，来选择不同的渲染方式。

```js
const engine = new render.Canvas2D();
```

> engine.setCanvasElement(element: HTMLElement): Engine

> engine.setCanvasSize(width: number, height?: number): Engine

> engine.setClearColor(color: string): Engine

> engine.resize(): Engine

引擎创建后，需要进行一系列的初始化操作，包括绑定HTML元素，设置画布尺寸，设置画布颜色，以及重新计算引擎的视区大小。

```js
const canvasElement = document.createElement('canvas');
canvasElement.style.cssText = 'width:100%;height:100%';
engine.setCanvasElement(canvasElement);
engine.setCanvasSize(750);
engine.setClearColor('#000');
engine.resize();
```

> class Scene()

创建一个[Scene](../api/index.html#core-Scene)实例，用来存放场景内的元素。

```js
const scene = new render.Scene();
```

> class Rectangle extends Element

> element.position: Vector3

> element.style: Map

> element.transform: Map

创建一个[Rectangle](../api/index.html#elements-Rectangle)的实例，并分别设置位置，样式和矩阵变换。

```js
const rectEl = new render.Rectangle(100, 100);
rectEl.position.set(0, 0);
rectEl.style.set('opacity', 0);
rectEl.transform.set('translateY', 50);
```

> engine.drawBuffer(elements: Array<element>): Engine

> engine.flush(): Engine

通过[drawBuffer](../api/index.html#Engine#drawBuffer)和[flush](../api/index.html#Engine#flush)方法，可以绘制出[Rectangle](../api/index.html#elements-Rectangle)的实例。

```js
engine.drawBuffer([rectEl]);
engine.flush();
```

默认情况下，[Animation](../api/index.html#runtime-Animation)对象或[animate](../api/index.html#lite-animate)方法并不支持对[Element](../api/index.html#elements-Element)实例的动画操控，但基于AFT提供的[扩展动画对象](advanced.html#扩展动画对象)机制，在render中已经让[Animation](../api/index.html#runtime-Animation)支持了对[Element](../api/index.html#elements-Element)实例的控制。接下去要做的，也就是把[Element](../api/index.html#elements-Element)实例托管给[Animation](../api/index.html#runtime-Animation)。

> timeline.on('afterplay',  callback: function);

并在动画的每一帧中调用引擎的渲染方法即可。

```js
const fadeIn = AFT.createAnimation(rectEl, fadeInEffect);
const bounceIn = AFT.createAnimation(rectEl, bounceInEffect);

const timeline = AFT.createTimeline();
timeline.add(fadeIn, {
  playAt: 0
}).add(bounceIn, {
  playAt: 0
}).on('afterplay', () => {
  engine.drawBuffer([rectEl]);
  engine.flush();
}).play();
```

[参考示例](http://groups.alidemo.cn/fdilab/aft.js-internal/examples/render/flashcolors.html)

## 兼容旧版本

在最新版本中，同时兼容了1.x/2.x版本的API。以往版本中的AFT实例，可以通过如下方式创建：

```js
import {Legacy} from '@ali/aft.js/legacy';
const canvasElement = document.getElementById('canvas');
const aft = new Legacy(canvasElement);
```

在获取兼容老版本AFT类后，就可以用1.x版本的API进行开发了。当然，新的项目建议直接使用新版本的API。

[参考示例](http://groups.alidemo.cn/fdilab/aft.js-internal/examples/legacy/matrix.html)
---
title: API
type: api
---


## Runtime Modules

提供了运行时的功能。

### runtime:Animation

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Event Emitter](https://www.npmjs.com/package/event-emitter)
- **Constructor:** 
    - `{`[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`<string, any>} map` 
    - `{`[Effect](#runtime-Effect)`} effect`
    - `{number} [iteration=1]`
- **See also:**
    - [代理动画对象](../guide/advanced.html#代理动画对象)

#### Animation#started

动画是否为开始状态。

- **Type:** `boolean`
- **Readonly**

#### Animation#finished

动画是否为结束状态。

- **Type:** `boolean`
- **Readonly**

#### Animation#repeated

动画已经循环的次数。

- **Type:** `number`
- **Readonly**

#### Animation#current

当前动画作用的数据对象。

- **Type:** [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`<string, any>`
- **Readonly**

#### Animation#duration

动画单次运行时长。

- **Type:** `number`
- **Readonly**

#### Animation#iteration

动画需要循环的次数。

- **Type:** `number`

#### Animation#start()

把动画状态设置为“开始”。

- **Returns:** `Animation实例本身`

#### Animation#finish()

把动画状态设置为“结束”。

- **Returns:** `Animation实例本身`

#### Animation#reset()

重置动画为初始状态。

- **Returns:** `Animation实例本身`

#### Animation#restart()

重置动画，把状态设置为“开始”。

- **Returns:** `Animation实例本身`

#### Animation#requestFrame(clock)

传入一个时钟实例，并根据这个时钟的状态运行一帧动画。

- **Events:** `beforeplay`, `play`, `afterplay`
- **Arguments:**
    - `{`[Clock](#runtime-Clock)`} clock 时钟的实例`
- **Returns:** `Animation实例本身`

#### Animation@start

动画启动时触发。

#### Animation@finish

动画结束时触发。

#### Animation@restart

动画重启时触发。

#### Animation@beforeplay

每一帧运行前触发。

#### Animation@play

每一帧运行时一开始触发。

#### Animation@afterplay

每一帧运行后触发。

### runtime:Clock

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Example:**

```js
const clock = new Clock();
const tick = () => {
    requestAnimationFrame(tick);
    const {elapsed, delta} = clock.time;
    console.log(`elapsed: ${elapsed}, delta: ${delta}`);
}
tick();
```
#### Clock#time

访问时钟，并获取逝去毫秒数和间隔毫秒数。

- **Type:** `{elapsed: number, delta: number}`
- **Readonly**

#### Clock#elapsed

时钟创建后，最后一次访问时钟后的逝去毫秒数。

- **Type:** `number`
- **Readonly**

#### Clock#delta

时钟创建后，前后两次访问时钟的间隔毫秒数。

- **Type:** `number`
- **Readonly**

#### Clock#paused

获取或设置时钟的暂停状态

- **Type:** boolean

### runtime:Effect

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Example:**

```js
const effect = new Effect();
effect.add({
    map: new Map([
        ['a', 1]
    ]),
    easing: i => i * i,
    delay: 100,
    duration: 400,
    iteration: 2,
    diration: 'normal'
});
```

#### Effect#add(options)

增加一个动效定义。

- **Arguments:**
    - `{object} options`
        - `{`[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`<string, any>} map 作用的对象`
        - `{(current: Map): void} [update] 每一时刻的回调函数`
        - `{(i: number): number} [easing] 缓动函数，获取一个0~1之间的值，并返回另一个0~1之间的值`
        - `{number} [delay=0]`
        - `{number} [duration=0]`
        - `{string} [fillMode="forward"]`
        - `{number} [iteration=0] 可取值正整数和Infinity`
        - `{string} [direction="normal"] 可取值normal和alternate`
- **Returns:** `Effect实例本身`

#### Effect#clear()

清空所有动效描述。

- **Returns:** `Effect实例本身`

#### Effect#clone()

复制并返回一个全新的动效实例。

- **Retruns:** `Effect实例`

#### Effect#end()

结束动效的定义。

- **Returns:** `Effect实例本身`

#### Effect.use(...mixins)

使用一个或多个动效扩展。

- **Arguments:**
    - `{...(object | (any): object)} mixins`
- **Example:**

```js
Effect.use({
    to(map, duration, easing) {
        this.add({
            map,
            duration,
            easing
        });
    }
});

const effect = new Effect();
effect.to(
    new Map([
        ['a', 1]
    ]), 
    1000,
    i => i * i
);
```

- **See also:**
    - [扩展动效](../guide/advanced.html#扩展动效)

### runtime:Ticker

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Example:**

```js
const ticker = new Ticker();
const tickId = ticker.add(({
    delta,
    elasped
}) => console.log(delta, elasped));
ticker.run();
```

#### Ticker#pasued

获取是否为暂停状态。

- **Type:** boolean
- **Readonly**

#### Ticker#skipFrames

获取或设置跳帧数。

- **Type:** `number`

#### Ticker#add(updater)

添加一个的更新函数，用于接受每次触发时的更新。

- **Arguments:**
    - `{({delta: number, elapsed: number}): void} updater`
- **Returns:** `用于标记该更新函数的id`

#### Ticker#freeze(any)

冻结一个已添加的更新函数，使其在之后的每次触发中不被更新。传入的参数可以是这个更新函数的引用，也可以是更新函数的ID。

- **Arguments**
    - `{function | number} any`

#### Ticker#unfreeze(any)

解冻一个已添加的更新函数，使其在之后的每次触发中接受更新。传入的参数可以是这个更新函数的引用，也可以是更新函数的ID。

- **Arguments**
    - `{function | number} any`

- **See also:**
    - [全局计时器](../guide/basic.html#全局计时器)

#### Ticker#remove(any)

移除一个已添加的更新函数。传入的参数可以是这个更新函数的引用，也可以是更新函数的ID。

- **Arguments**
    - `{function | number} any`

#### Ticker#run

启动或重启运行。运行时，每16毫秒（理论值）会触发一次更新操作。

#### Ticker#pause

暂停运行。

#### Ticker#resume

恢复运行（暂停后有效）。

#### Ticker#stop

停止运行，并将所有更新函数的清零。

### runtime:Timeline

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Event Emitter](https://www.npmjs.com/package/event-emitter)
- **Constructor:**
    - `{`[Ticker](#runtime-Ticker)`} [ticker] 如省略将会自动新建`

#### Timeline#currentTime

当前逝去的时间。

- **Type:** `number`
- **Readonly**

#### Timeline#loop

获取或设置是否循环播放。

- **Type:** `boolean`

#### Timeline#paused

获取是否为暂停状态。

- **Type:** `boolean`
- **Readonly**

#### Timeline#ended

获取是否为结束状态。

- **Type:** `boolean`
- **Readonly**

#### Timeline#skipFrames

获取或设置跳帧数。

- **Type:** `number`

#### Timeline#add(animation, option)

添加一个动画片段，可选设置动画的开始和结束标记。

- **Arguments:**
    - `{`[Animation](#runtime-Animation)`}` animation
    - `{object} option`
        - `{number | (option: object): boolean|number} [playAt=0] 开始标记，可以是时间或布尔值，如缺省表示立即开始。` 
        - `{number | (option: object): boolean|number} [stopAt] 结束标记，可以是时间或布尔值，如缺省表示让动画自身决定。`

- **See also:**
    - [管理动画](../guide/basic.html#管理动画)

#### Timeline#get(animation)

获取动画片段的设置。

- **Arguments:**
    - `{`[Animation](#runtime-Animation)`}` animation
- **Returns:** `{playAt, stopAt, startAt, finishAt}`

#### Timeline#remove(animation)

移除一个动画片段。

- **Arguments:**
    - `{`[Animation](#runtime-Animation)`}` animation

#### Timeline#clear()

清除所有动画片段。

#### Timeline#play()

开始播放或恢复播放（暂停时有效）。

#### Timeline#pause()

暂停播放。

#### Timeline#stop()

停止播放，并重置动画。

#### Timeline#replay()

立即重置动画，并从头开始播放。

#### Timeline@play

每一帧在所有动画播放前触发。

#### Timeline@afterplay

每一帧在所有动画播放后触发。

#### Timeline@loop

当循环播放时触发。

#### Timeline@end

当播放结束时触发。

## Render Modules

提供了渲染虚拟元素并适配CSS和Canvas引擎的功能。

### elements:Element

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Constructor:**
    - `{string} className`
    - `{number} [width=0]`
    - `{number} [height=0]`
- **See also:**
    - [虚拟元素动画](../guide/basic.html#虚拟元素动画)

#### Element#className

元素的类名。

- **Type:** `string`

#### Element#width

元素的宽度。

- **Type:** `number`

#### Element#height

元素的高度。

- **Type:** `number`

#### Element#recycle

获取或设置是否回收利用元素。

- **Type:** `boolean`

#### Element#poistion

元素的位置向量。

- **Type:** [Vec3](#libs-vec3-Vec3)

#### Element#style

元素的样式集合。

- **Type:** [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

#### Element#transform

元素的矩阵变换集合。

- **Type:** [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

#### Element#life

获取或设置元素的生命周期。分别为`created/attached/dettached`。

- **Type:** `string`

#### Element#catched

获取或设置是否缓存元素。

- **Type:** `boolean`

#### Element#getBoundingRect

获得元素的包围矩阵。

- **Returns:** `{width, height, left, top, right, bottom}`

### elements:Rectangle

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Element](#elements-Element)
- **Constructor:**
    - `{number} width`
    - `{number} height`

### elements:Circle

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Element](#elements-Element)
- **Constructor:**
    - `{number} radius`

#### Circle#radius

圆的半径。

- **Type:** `number`

### elements:Ellipse

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Element](#elements-Element)
- **Constructor:**
    - `{number} hRadius 水平方向半径`
    - `{number} vRadius 垂直方向半径`

#### Ellipse#hRadius

水平方向半径。

- **Type:** `number`

#### Ellipse#vRadius

垂直方向半径。

- **Type:** `number`

### elements:Triangle

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Element](#elements-Element)
- **Constructor:**
    - `{number} width 底边宽`
    - `{number} height 高`
    - `{number} theta 左下角的夹角度数`

#### Triangle#theta

左下角的夹角度数。

- **Type:** `number`

### elements:Group

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Element](#elements-Element)
- **Constructor:**
    - `{number} [width=0]`
    - `{number} [height=0]`

#### Group#children

子元素集合。

- **Type:** [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

#### Group#add(...elements)

添加子元素。

- **Arguments:**
    - `{...Element} elements`
- **Throws:** if not an instanceof Element

#### Group#remove(...elements)

移除子元素。

- **Arguments:**
    - `{...Element} elements`
- **Throws:** if not an instanceof Element

### elements:Image

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Element](#elements-Element)
- **Constructor:**
    - `{number} width`
    - `{number} height`
    - `{`[HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement) `|` [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) `} texture`

#### Image#texture

纹理贴图。

- **Type:** [HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement) `|` [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)

#### Image#size

伸缩方式，包括`cover`/`contain`/`n(px/%) m(px/%)`。

- **Type:** `string`

#### Image#repeatX

X轴平铺次数，暂支持`1`和`Infinity`。

- **Type:** `number`

#### Image#repeatY

Y轴平铺次数，暂支持`1`和`Infinity`。

- **Type:** `number`

#### Image#repeat

X和Y轴平铺次数，暂支持`1`和`Infinity`。

- **Type:** `number[]`

#### Image#offsetX

X轴偏移量，支持像素值或百分比。

- **Type:** `number | string`

#### Image#offsetY

Y轴偏移量，支持像素值或百分比。

- **Type:** `number | string`

#### Image#offset

X轴和Y轴偏移量，支持像素值或百分比。

- **Type:** `number[] | string[]`

### elements:Font

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Element](#elements-Element)
- **Constructor:**
    - `{number} width`
    - `{number} height`
    - `{string} textContent`
    - `{string} textAlign`

#### Font#textContent

文本内容。

- **Type:** `string`

#### Font#textAlign

文本对齐方式，水平对齐方式包括`left`/`center`/`right`，垂直对齐方式包括`top`/`center`/`bottom`，两者用空格隔开。例如：`left top`。

- **Type:** `string`

### core:Scene

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **See also:**
    - [动画里的场景](../guide/advanced.html#场景的作用)

#### Scene#add(...elements)

往场景里增加一个或多个元素。

- **Arguments:**
    - `{...`[Element](#elements-Element)`}`

#### Scene#remove(...elements)

从场景里移除一个或多个元素。

- **Arguments:**
    - `{...`[Element](#elements-Element)`}`

### engines:Engine

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Constructor:**
    - `{string} className`
- **See also:**
    - [扩展引擎](../guide/advanced.html#扩展引擎)

#### Engine#className

引擎的类名。

- **Type:** `string`

#### Engine#flushed

是否已刷新画布缓冲区。

- **Type:** `boolean`
- **Readonly**

#### Engine#canvasWidth

获取画布的绘图宽度。

- **Type:** `number`
- **Readonly**

#### Engine#canvasHeight

获取画布的绘图高度。

- **Type:** `number`
- **Readonly**

#### Engine#scaleWidth

获取画布的绘图宽度同样式（CSS）宽度的比例。

- **Type:** `number`
- **Readonly**

#### Engine#scaleHeight

获取画布的绘图高度同样式（CSS）高度的比例。

- **Type:** `number`
- **Readonly**

#### Engine#setCanvasElement(canvasElement)

设置画布元素。

- **Arguments:**
    - `{`[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)`} canvasElement`

#### Engine#setCanvasSize(width, height)

设置画布的绘图尺寸。

- **Arguments**
    - `{number} width`
    - `{number} height`

#### Engine#setStyleSize(width, height)

设置画布的样式（CSS）尺寸。

- **Arguments**
    - `{number} width`
    - `{number} height`

#### Engine#resize()

重新计算画布尺寸。

#### Engine#clear()

清空画布。

#### Engine#setClearColor(color)

设置画布颜色。

- **Arguments:**
    - `{string} color 颜色表达支持16进制。包括#rgb/#rgba/#rrggbb/#rrggbbaa`
    

#### Engine#draw(element)

在画布上绘制元素。

- **Arguments:**
    - `{`[Element](#elements-Element)`} element`

#### Engine#drawBuffer(elements)

在画布缓冲区中绘制元素。

- **Arguments:**
    - `{`[Element](#elements-Element)`[]} elements`

#### Engine#flush()

刷新画布缓冲区。

### engines:CSS2D

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Engine](#engines-Engine)
- **See also:**
    - [用CSS引擎渲染虚拟元素](../guide/advanced.html#用CSS引擎渲染)

### engines:Canvas2D

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Engine](#engines-Engine)
- **See also:**
    - [用Canvas引擎虚拟渲染元素](../guide/advanced.html#用Canvas引擎渲染)

## Frameworks

提供了各种入口函数。

### lite:animate

快速生成动画。

- **Type:** `function`
- **Arguments:**
    - `{object|`[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`|`[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)`}`
- **Returns:** [Tween](#lite-Tween)实例
- **See also:**
    - [快速上手](../guide/basic.html#快速上手)

### lite~Tween

访问[animate](#lite-animate)方法所返回的内部类。用于生成一段或多端动画片段。

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Event Emitter](https://www.npmjs.com/package/event-emitter)
- **Constructor:**
    - `{object|`[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`|`[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)`} initial`

#### Tween#to(target)

动画目标值。

- **Arguments:**
    - `{object} target`
- **Returns:** [Tween](#lite-Tween)

#### Tween#update(update)

设置当前动画片段的回调函数。在每帧更新时触发。

- **Arguments:**
    - `{(current: `[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`, start: `[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`, end: `[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`, percent: number): void} update`
- **Returns:** [Tween](#lite-Tween)
- **Example:**

```js
tween.update((current) => {
    console.log([...current]);
});
```

#### Tween#easing(easing)

设置当前动画片段的缓动函数。支持字符串常量，表达式和函数。

- **Arguments:**
    - `{string | (i: number): number} easing`
- **Returns:** [Tween](#lite-Tween)
- **Example:**

```js
tween.easing('ease-in');
```

```js
tween.easing('cubic-bezer(0, 0, 1, 1)');
```

```js
tween.easing(i => i * i);
```

- **See aslo:**
    - [缓动函数]()

#### Tween#duration(time)

设置当前动画片段的播放时间。

- **Arguments:**
    - `{number} time`
- **Returns:** [Tween](#lite-Tween)

#### Tween#delay(time)

设置当前动画片段的延迟时间。

- **Arguments:**
    - `{number} time`
- **Returns:** [Tween](#lite-Tween)

#### Tween#iteration(count)

设置当前动画片段的重复次数，

- **Arguments:**
    - `{number} count 1~Infinity`
- **Returns:** [Tween](#lite-Tween)

#### Tween#direction(dir)

设置当前动画片段的正常循环播放或交替循环播放。

- **Arguments:**
    - `{string} dir normal/alternate`
- **Returns:** [Tween](#lite-Tween)

#### Tween#next(initial)

结束当前动画片段的定义，开启下一个动画片段的定义。

- **Returns:** [Tween](#lite-Tween)
- **Example:**

```js
tween
    .to({
        a: 10
    })
    .duration(400)
    .next()
    .to({
        a: 20
    })
    .duration(400);
```

#### Tween#play(iteration)

播放所有定义的动画片段，并设置总循环次数。

- **Arguments:**
    - `{number} iteration 1~Infinity`
- **Returns:** [Tween](#lite-Tween)

#### Tween#stop()

停止播放。

- **Returns:** [Tween](#lite-Tween)

### lite:globalTicker

全局的一个[Ticker](#runtime-Ticker)实例。用[createTimeline](#runtime-createTimeline)方法创建的Timeline实例都包含这个[Ticker](runtime-Ticker)实例。

- **Type:** [Ticker](#runtime-Ticker)

### lite:extendProxy

扩展一个动画对象代理。

- **Type:** `function`
- **Arguments:**
    - `{(any): `[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`} proxy`
    - `{(any): boolean} detect`
- **See also:**
    - [代理动画对象](../guide/advanced.html#代理动画对象)

### lite:extendEasing

扩展一组缓动表达式。

- **Type:** `function`
- **Arguments:**
    - `{`[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`} easingMap`
- **See also:**
    - [扩展缓动函数](../guide/advanced.html#扩展缓动函数)

### lite:extendEffect

扩展一组动效定义。

- **Type:** `function`
- **Arguments:**
    - `{...object} effects`
- **See also:**
    - [扩展动效](../guide/advanced.html#扩展动效)

### lite:createEffect

创建一个[Effect](#runtime-Effect)实例。

- **Type:** `function`
- **Resturns:** [Effect](#runtime-Effect)

### lite:createAnimation

创建一个[Animation](#runtime-Animation)实例。

- **Type:** `function`
- **Arguments:**
    - `{`[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`<string, any>} initial` 
    - `{`[Effect](#runtime-Effect)` | (effect: Effect, initial: Map): Effect} effect`
    - `{number} [iteration=1]`
- **Resturns:** [Animation](#runtime-Animation)

### lite:createAnimations

创建多个[Animation](#runtime-Animation)实例。

- **Type:** `function`
- **Arguments:**
    - `{`[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)`<string, any>} initial` 
    - `{...(`[Effect](#runtime-Effect)` | (effect: Effect, initial: Map): Effect)} ...effects`
- **Resturns:** `Array<`[Animation](#runtime-Animation)`>`

### lite:createTimeline

创建一个[Timeline](#runtime-Timeline)实例。

- **Type:** `function`
- **Resturns:** [Timeline](#runtime-Timeline)

### lite:runtime

运行时模块集合。

- **Type:** `object`
- **Properties:**
    - [Animation](#runtime-Animation)
    - [Clock](#runtime-Clock)
    - [Effect](#runtime-Effect)
    - [Ticker](#runtime-Ticker)
    - [Timeline](#runtime-Timeline)

### render*render

渲染模块集合。

- **Type:** `object`
- **Properties:**
    - [Element](#elements-Element)
    - [Rectangle](#elements-Rectangle)
    - [Circle](#elements-Circle)
    - [Ellipse](#elements-Ellipse)
    - [Triangle](#elements-Triangle)
    - [Group](#elements-Group)
    - [Image](#elements-Image)
    - [Font](#elements-Font)
    - [Scene](#core-Scene)
    - [Engine](#engines-Engine)
    - [CSS2D](#engines-CSS2D)
    - [Canvas2D](#engines-Canvas2D)

### legacy:Legacy

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Event Emitter](https://www.npmjs.com/package/event-emitter)
- **Constructor:** 
    - `{`[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)`} canvasElement`
    - `{string} engine`
- **Constrcutor:**
    - `{Engine} engine`
- **Example:**

```js
const canvasElement = document.createElement('div');
const aft = new Legacy(canvasElement, 'css');
```

```js
const canvasElement = document.createElement('canvas');
const aft = new Legacy(canvasElement, 'canvas');
```

```js
const engine = new CSS2D();
const aft = new Legacy(engine);
```

- **See also:**
    - [兼容1.x](../guide/introduction.html#兼容旧版本)

#### Legacy#engine

[Engine](#engines-Engine)的实例。

- **Type:** [Engine](#engines-Engine)

#### Legacy#isPlaying

是否正在播放。

- **Type:** `boolean` 
- **Readonly**

#### Legacy#isPaused

是否暂停。

- **Type:** `boolean`
- **Readonly**


#### Legacy#isFinished

是否结束。

- **Type:** `boolean`
- **Readonly**

#### Legacy#skipFrames

获取或设置跳帧数。

- **Type:** `number` 

#### Legacy#viewportWidth

获取画布的绘图宽度。

- **Type:** `number`
- **Readonly**

#### Legacy#viewportHeight

获取画布的绘图高度。

- **Type:** `number`
- **Readonly**

#### Legacy#scaling

获取画布的绘图宽度同样式（CSS）宽度的比例。

- **Type:** `number`
- **Readonly**

#### Legacy#resize()

重新计算画布尺寸。

#### Legacy#setSize(width, height)

设置画布的绘图尺寸，并重新计算。

- **Arguments:**
    - `{number} width`
    - `{number} [height]`

#### Legacy#setClearColor(rgba)

设置画布颜色。

- **Arguments:**
    - `{string} color 颜色表达支持16进制。包括#rgb/#rgba/#rrggbb/#rrggbbaa`

#### Legacy#createScene()

创建场景。

- **Returns:** [Scene](#core-Scene)

#### Legacy#createElement(elementType, ...initialArgs)

创建元素。

- **Arguments:**
    - `{string} elementType rectangle/circle/ellipse/triangle/group/image/font`
    - `{...any} initialArgs`
- **Returns:** [Element](#elements-Element)
- **Example:**

```js
const rect = aft.createElement('rectangle', 100, 100);
```

#### Legacy#createEffect()

创建动效。

- **Returns:** [Effect](#runtime-Effect)

#### Legacy#createAnimation(element, effect, iteration)

创建动画。

- **Arguments:**
    - `{`[Element](#runtime-Element)`} initial` 
    - `{`[Effect](#runtime-Effect)` | (effect: Effect, initial: Map): Effect} effect`
    - `{number} [iteration=1]`
- **Resturns:** [Animation](#runtime-Animation)

#### Legacy#createAnimations(element, ...effects)

创建动画。

- **Arguments:**
    - `{`[Element](#runtime-Element)`} initial` 
    - `{...(`[Effect](#runtime-Effect)` | (effect: Effect, initial: Map): Effect)} effects`
- **Returns:** `Array<`[Animation](#runtime-Animation)`>`

#### Legacy#createTimeline()

创建时间轴。

- **Returns:** [Timeline](#runtime-Timeline)

#### Legacy#play(scene, any)

播放场景中的动画。

- **Arguments:**
    - `{`[Scene](#core-Scene)`} scene`
    - `{Array<`[Animation](#runtime-Animation)`|`[Timeline](#runtime-Timeline)`>} sth`

#### Legacy#pause()

暂停播放。

#### Legacy#resume()

恢复播放。

#### Legacy#cancel()

取消播放。

#### Legacy#generateCustomCoords(coordsPosition)

创建自定义坐标系统。

- **Arguments:**
    - `{string} coordsPosition`
- **See also:**
    - [画布的坐标系统](../guide/advanced.html#坐标系统)

## Libraries

提供了各种工具函数。

### libs/color*color

颜色函数集合。

#### color.isHex(hexColor)

判断是否为16进制表示的颜色值。

- **Arguments:**
    - `{string} hexColor`
- **Returns:** `boolean`

#### color.isRgba(rgbaColor)

判断是否为rgba表示的颜色值。

- **Arguments:**
    - `{string} rgbaColor`
- **Returns:** `boolean`

#### color.isHsla(hslaColor)

判断是否为HSLA表示的颜色值。

- **Arguments:**
    - `{string} hslaColor`
- **Returns:** `boolean`

#### color.rgba(rgbaColor, type)

把rgba表示的颜色值转换成一个`[r, g, b, a]`的数组。

- **Arguments:**
    - `{string} rgbaColor`
    - `{string} [type=css] 默认在css模式下，rgb的取值范围是0~255，如设置为webgl模式下，则rgba的取值范围是0~1。`
- **Returns:** `number[]`

#### color.hex(hexColor, type)

把16进制表示的颜色值转换成一个`[r, g, b, a]`的数组。

- **Arguments:**
    - `{string} hexColor`
    - `{string} [type=css] 默认在css模式下，rgb的取值范围是0~255，如设置为webgl模式下，则rgba的取值范围是0~1。`
- **Returns:** `number[]`

#### color.hsla(hslaColor, type)

把HSLA表示的颜色值转换成一个`[r, g, b, a]`的数组。

- **Arguments:**
    - `{string} hexColor`
    - `{string} [type=css] 默认在css模式下，rgb的取值范围是0~255，如设置为webgl模式下，则rgba的取值范围是0~1。`
- **Returns:** `number[]`

#### color.rgba2hsla(rgbaColor)

把rgba表示的颜色值转换成一个`[h, s, l, a]`的数组。

- **Arguments:**
    - `{string} rgbaColor`
- **Returns:** `number[]`

#### color.hex2hsla(rgbaColor)

把16进制表示的颜色值转换成一个`[h, s, l, a]`的数组。

- **Arguments:**
    - `{string} rgbaColor`
- **Returns:** `number[]`

### libs/copy*copy

浅拷贝或深拷贝一个对象。

- **Type:** `function`
- **Arguments:**
    - `{object} source`
    - `{boolean} deeply`

### libs/css~CSSMap

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

#### CSSMap.normalize()

返回规范化后的所有CSS键值对。

- **Returns:** [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

### libs/css~StyleMap

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [CSSMap](#libs-css-CSSMap)
- **See also:**
    - [元素的样式](../guide/advanced.html#元素的样式)

### libs/css~TransformMap

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Extends:** [CSSMap](#libs-css-CSSMap)
- **See also:**
    - [元素的变换矩阵](../guide/advanced.html#元素的变换矩阵)

#### TransformMap#toMatrix(filter)

返回一个矩阵数组，在计算时可以提供一个过滤函数。

- **Arguments:**
    - `{([key: string, value: number]): Array} filter`

### libs/cubicbezier=CubicBezier

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Example:**

```js
const cb = new CubicBezier(0, 0, 1, 1);
cb.y(0.5); // => 0.5
```

#### CubicBezier#y(x)

一个贝塞尔函数，通过`x`得出`y`。

- **Arguments:**
    - `{number} x`
- **Returns:** `number`

### libs/interpolation*interpolation

插值函数集合。

#### interpolation.simple(sVal, eVal, percent)

对简单类型做插值运算。

- **Arguments:**
    - `{number|string} sVal`
    - `{number|string} eVal`
    - `{number} percent 0~1`
- **Returns:** `number | string`
- **Example:**

```js
simple('#000', '#fff', 0.5); // => rgba(127,127,127,1)
simple(0, 1, 0.5); // => 0.5
simple('0px', '1px', 0.5); // => 0.5px
simple('0%', '100%', 0.5); // => '50%'
```

#### interpolation.complex(sVal, eVal, percent, deeply)

对复杂类型做插值运算。

- **Arguments:**
    - `{number|string|Array|Set|Map} sVal`
    - `{number|Array|Set|Map} eVal`
    - `{number} percent 0~1`
    - `{boolean} [deeply]`
- **Returns:** `number|string|Array|Set|Map`
- **Example:**

```js
complex([1, 2], [2, 3], 0.5); // => [1.5, 2.5]
complex(new Set([1, 2]), new Set[2, 3], 0.5); // => new Set([1.5, 2.5])
complex(new Map([
    ['a', 1]
    ['b', 2]
]), new Map([
    ['a', 2]
    ['b', 3]
]), 0.5); // => new Map([['a', 1.5],['b', 2.5]])
complex(
    [new Set([1]), new Map(['b', 2])],
    [new Set([2]), new Map(['b', 3])],
    0.5,
    true
); // => [new Set([1.5]), new Map(['b', 2.5])]
```
### libs/math*math

数学函数集合。

- **Type:** `object`

#### math.accuracy(value)

对数字或字符串取6位小数的进度。

- **Arguments:**
    - `{number} value`
- **Returns:** `number`

#### math.deg2rad(degree)

把角度值转化为弧度值。

- **Arguments:**
    - `{number} degree`
- **Returns:** `number`

### libs/mix=mix

把源对象的所有属性混合到目标对象中。

- **Type:** `function`
- **Arguments:**
    - `{object} target`
    - `{object} source`


### libs/vec3=Vec3

- **Type:** [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **Constrcutor:**
    - `{number} [x]`
    - `{number} [y]`
    - `{number} [z]`

#### Vec3#modified

是否被修改。

- **Type:** `boolean`

#### Vec3#x

获取或设置X向量。

- **Type:** `number`

#### Vec3#y

获取或设置Y向量。

- **Type:** `number`

#### Vec3#z

获取或设置Z向量。

- **Type:** `number`

#### Vec3#add(vec3)

向量相加。

- **Arguments:**
    - `{`[Vec3](#libs-vec3-Vec3)`|Float32Array} vec3`

#### Vec3#set(x, y, z)

设置向量。

- **Arguments:**
    - `{number} [x]`
    - `{number} [y]`
    - `{number} [z]`
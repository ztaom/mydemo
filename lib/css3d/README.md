# README

CSS 3D engine is used for creating some simple 3D scene with touch interactions. Animation of 100 objects plays very smoothly on mobile devices. 

It's based on [gl-matrix](http://glmatrix.net/). It render divs in a right-handed coordinate system.

> 这是一个用来创建简单3D场景的CSS 3D引擎库。如果场景内的元素控制在100个内，则能在手机上跑得很流畅。

> 这个库基于[gl-matrix](http://glmatrix.net/)，采用右手座标系来渲染3D场景。

Demo:
1. [Camera Motion](http://mt2preview.m.taobao.com/core/preview/act/csscameramotion.html) 
2. [3D Book](http://mt2preview.m.taobao.com/core/preview/act/3dbook.html)
3. [Periodic Table](http://mt2.wapa.taobao.com/core/preview/act/cssperiodictable.html)
 
## Getting Start

	import {Scene, Obj} from '@ali/css3d'
	
	// setup scene
	let scene = new Scene()
		.size(800, 600);
	
	// setup camera
	scene.camera.perspective(45);
		
	// add a obj
	let obj = new Obj()
		.size('100px', '100px')
		.texture('#ccc', 'mario.png')
		.rotateTo([Math.PI / 3, 0, 0])
		.translateTo([0, 10, 0])
		
	scene.addChild(obj).render();
	
	// append container to dom tree
	document.body.appendChild(scene.dom);
		
## API

### Obj

#### constructor

create an obj. You can set html tag such as `<img>`, otherwise it will create a default div element

> 创建一个对象，通常情况下是创建一个div元素，当然你也可以创建其他元素，比如`<img>`:

	new Obj({htmlTag: 'img'});
	

#### property

* dom

	Get the dom element of obj.
	
	You can do anything with the dom, such as adding style to the dom and append other dom elements to it.
	
	> 获取obj的dom元素，获取之后你可以进行任何dom操作
		
		obj.dom.style.color = '#f00'; 
		
		
* position

	Get or Set the position of obj. The original position of an obj is [0, 0, 0]. The `translateTo` method is the same as set position.
	
	> 获取或者设置一个元素的位置，也可用下面的`translateTo`方法
	
		// get
		console.log(obj.position);
		
		// set
		obj.position = [0, 1, 1];
		
* euler

	Get or Set the rotation of obj. The original rotation of an obj is [0, 0, 0]. The `rotateTo` method is the same as set euler.
	
	> 获取或者设置一个元素的旋转角度
	
	// get
	console.log(obj.euler);
	
	// set
	obj.euler = [0, Math.PI / 3, 0];
	
#### method

* size(width, height)
	
	- @param {Number} width
	- @param {Number} height
		
	Set size of div, both units are px.
	
	> 设置元素大小，单位是px
	
		obj.size(100, 100);

* texture(color, imageUrl)

	- @param {String} color
	- @param {String} imageUrl
	
	Set the texture of obj, include color and background image.
	
	> 设置贴图，第一个参数是颜色（可以为空），第二个是贴图
	
		obj.texture('#f00', 'mario.png');
	
* translate(pos)

	- @param {Array} pos
	
	Translate obj by some distance
	
	> 移动多少，增量用法
	
		obj.translate([0, 0, 1]);

* translateTo(pos)

	- @param {Array} pos

	Translate obj to some position
	
	> 移动到什么位置
	
		obj.translateTo([0, 0, 100]);

* rotate(euler, axis)

	- @param {Number} rad
	- @param {Array} axis

	Rotate obj by some euler around some axis. the line below means rotate the obj 1 deg around Y axis.
	
	> 沿着某条轴旋转多少角度
	
		obj.rotate(Math.PI / 180, [0, 1, 0]);
		
* rotateTo([xEuler, yEuler, zEuler])

	- @param {Number} rad
	- @param {Array} axis

	Rotate obj to some euler. 
	
	> 旋转到指定角度

		obj.rotateTo([Math.PI / 3, 0, 0]);
		
* getChildren()

	Get the children of obj, children are also instances of Obj.
		
	> 获取子对象
	
-------------

### Scene

`extends Obj`

#### property

* dom
	
	This is the container dom of the scene, you may append it to dom tree, otherwise, you can not see anything in browser.
	
	> 容器元素，最后要插入到dom树中，否则你啥都看不到
	
		document.body.appendChild(scene.dom);

* camera

	This is the camera instance of the scene.
	
	> `scene.camera` 获取相机实例
	
#### method

* addChild(obj)
	
	- @param	{Obj} obj

	Add one obj to scene. It is a best practice that add all children to scene before the dom of scence append to dom tree if you add lots of objs to scene. This performance speed-up does benefits from the [documentFragment](https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment) api.
	
	> 添加对象到场景中。最佳实践是先添加元素，最后渲染场景，这样性能比较好。
	
		for(let i = 0; i < 100; i++){
			let obj = new Obj();
			// 1. add child
			scene.addChld(obj);
		}
		
		// 2. then render
		scene.render();

* render()
	
	You can call the method in the `requestAnimationFrame` loop if children of scene play animation in real time.

	> 如果应用是实时渲染，可以在`requestAnimationFrame`回调函数中执行场景渲染。
	
		function animate(){
			scene.render();
			requestAnimationFrame(animate);
		}
		
		animate();
		
-------------
### Camera

`extends Obj`

The camera instance is referenced by a property of scene: `scene.camara`.

`Camera` extends `Obj`, so you can transform the camera to make wonderful animation. For example:

> 相机实例作为场景的一个属性存在，场景的动画是通过相机的动画来实现的：

	scene.camera.translateTo([0, 0, z]);
	
Change the `z` value little by little will lead to a smooth  camera zoom effect.

#### method

* perspective(fov) 

	- @param {Number} fov
	
	Set field of view. It will finally translate to a CSS `perspective` value of the container dom.
	
	> 设置相机的焦距：
	
		scene.camera.perspective(45);
		
-------------

### Other

To rotate or zoom the 3D scene by touch on mobile devices, you can add some interaction with [touch-controller](http://web.npm.alibaba-inc.com/package/@ali/touch-controller).

> 如果想要通过手势来实现交互，可以试一下这个库[touch-controller](http://web.npm.alibaba-inc.com/package/@ali/touch-controller)

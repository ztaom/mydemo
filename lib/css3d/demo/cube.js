import {Obj, Scene} from '../src/index';

// setup scene
let scene = new Scene()
	.size(800, 600);

// setup camera
scene.camera.perspective(45)
	.translateTo([0, 0, 100]);
	
// add a obj
let obj = new Obj()
	.size(100, 100)
	.texture('#ccc', 'mario.png')
	// .rotateTo(Math.PI / 3, [0, 1, 0])
	.translateTo([100, 100, 0])
	
scene.addChild(obj).render();

// append container to dom tree
document.body.appendChild(scene.dom);

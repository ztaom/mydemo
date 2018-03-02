import {Obj, Scene} from '../src/index';
import raf from 'raf';
import TWEEN from 'tween.js';
import Stats from 'stats-js';
// import TouchController from '@ali/touch-controller';

let stats = new Stats();
stats.domElement.style.transform = 'scale(2)';
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '30px';
stats.domElement.style.right = '40px';
document.body.appendChild(stats.domElement);

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let scene = new Scene()
	.translateTo([0, 0, 0])
	.size(canvasWidth, canvasHeight);

let zoom = -200;
let rotateX = 0;
let rotateY = 0;

// 
/*
new TouchController(scene.dom)
	.panSetup(0.005, 0.01)
	.panAuto(50, 0)
	.onPan(function(dx, dy){
		rotateX = dy;
		rotateY = dx;
	})
	.zoomSetup(2000, 0.0001)
	.zoomAuto(0.02)
	.onZoom(function(z){
		zoom += z;
	});
*/

function generateObj(){
	let random = function(){
		return (Math.random() - 0.5)
	};

	let origin = [random() * canvasWidth , random() * canvasHeight, random() * canvasWidth];
	let rotation = Math.random() * Math.PI;

	let imgs = [
		require('./img/0.png'),
		require('./img/1.png'),
		require('./img/2.png'),
		require('./img/3.png'),
		require('./img/4.png'),
		require('./img/5.png'),
		require('./img/6.png'),
		require('./img/7.png'),
		require('./img/8.png'),
		require('./img/9.png'),
		require('./img/10.png'),
		require('./img/11.png')
	];

	function getTexture(){
		let i = (Math.random() * 11) >> 0;

		if(i == 11){
			i = 0;
		}

		return imgs[i];
	}

	return new Obj()
		.size(canvasWidth / 10, canvasWidth / 10)
		.texture(null, getTexture())
		.rotateTo([rotation, rotation, rotation])
		.translateTo(origin)
}

for(let i = 0; i < 100; i++){
	let obj = generateObj();
	scene.addChild(obj);
}

scene.dom.style.width = canvasWidth + 'px';
scene.dom.style.height = canvasHeight + 'px';
document.body.appendChild(scene.dom);

let coords = { x: 0, y: 0, z: -canvasWidth, fov: 45, rad: 0};
let tween = new TWEEN.Tween(coords)
    .to({ x: 100, y: 0, z: canvasWidth * 2, fov: 90, rad: Math.PI * 2}, 5000)
    .start();

scene.camera.perspective(45);

function draw(){
	let {y, z, fov, rad} = coords;
	let deltaRad = 0.1;

	scene.getChildren().forEach(function(child, i){
		child.rotate(deltaRad, [1, 1, 1]);
	});

	scene.camera.translateTo([0, 0, z])
		
	scene.render();
}

function animate(){
	stats.begin();

	TWEEN.update();
	draw();
	raf(animate);

	stats.end();
}

raf(animate);

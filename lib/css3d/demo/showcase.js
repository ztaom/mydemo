import './showcase.less'
import {Obj, Scene} from '../src/index';
import TouchController from '@ali/touch-controller';

import raf from 'raf';
import TWEEN from 'tween.js';
import Stats from 'stats-js';

let stats = new Stats();
stats.domElement.style.transform = 'scale(2)';
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '30px';
stats.domElement.style.right = '40px';
document.body.appendChild(stats.domElement);

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let scene = new Scene()
	.size(canvasWidth, canvasHeight);

new TouchController(scene.dom)
	.panSetup(0.005, 0.01)
	.panAuto(50, 0)
	.onPan(function(dx, dy){
		rotateX = dy;
		rotateY = dx;
	})
	// .zoomSetup(2000, 0.0001)
	// .zoomAuto(0.02)
	// .onZoom(function(z){
	// 	zoom += z;
	// });

let rotateX = 0;
let rotateY = 0;
let zoom = 0;
let dpr = window.dpr;

let modelImgs = [
	'//gw.alicdn.com/mt/TB1I_9dPVXXXXaCXFXXXXXXXXXX-231-585.png',
	'//gw.alicdn.com/mt/TB1BL9ePVXXXXXgXFXXXXXXXXXX-232-427.png',
	'//gw.alicdn.com/mt/TB1JR1tPVXXXXb1XXXXXXXXXXXX-164-378.png',
	'//gw.alicdn.com/mt/TB1rY1kPVXXXXb9XpXXXXXXXXXX-125-474.png'
];

let showcaseImgs = [
	'//gw.alicdn.com/mt/TB1REaqPVXXXXc8XXXXXXXXXXXX-423-635.png',
	'//gw.alicdn.com/mt/TB1V34PPVXXXXcwaXXXXXXXXXXX-370-526.png',
	'//gw.alicdn.com/mt/TB1kYysPVXXXXcKXXXXXXXXXXXX-297-414.png',
	'//gw.alicdn.com/mt/TB1LDqCPVXXXXXfXXXXXXXXXXXX-365-525.png'
];

function generateObj(i, n){
	let r = 600
	let rad = Math.PI * 2 / n * i
	let origin = [0, Math.sin(rad) * r, Math.cos(rad) * r];

	let random = () => {return Math.random() * 255 >> 0}
	let randomColor = 'rgb(' + random() + ',' + random() + ',' + random() + ')'

	let randomCase = (Math.random() * 4 + 1) >> 0;
	randomCase = randomCase === 4 ? 0 : randomCase;

	let container = new Obj()
		.size(200, 525 * 0.3)
		.translateTo(origin);

	let showcase = new Obj({htmlTag: 'img'});
	let img = new Image();
	img.onload = () => {
		showcase.size(showcase.dom.width / dpr, showcase.dom.height / dpr);
	}
	img.src = showcaseImgs[randomCase];

	showcase.dom.src = img.src;


	showcase.dom.style.left = '10px';
	showcase.dom.classList.add('showcase');
	container.addChild(showcase);

	let model = new Obj({htmlTag: 'img'})
		.translateTo([0, 0, 1]);

	img = new Image();
	img.onload = () => {
		model.size(model.dom.width / dpr, model.dom.height / dpr);
	}
	img.src = modelImgs[randomCase];
	model.dom.src = img.src;
	
	model.dom.style.left = '60px';
	model.dom.style.top = '20px';
	model.dom.classList.add('model');

	container.addChild(model);

	return container;
}

let n = 15;
let objs = [];

for(let i = 0; i < n; i++){
	let obj = generateObj(i, n)

	objs.push(obj);
	scene.addChild(obj);
}

document.body.appendChild(scene.dom)

scene.camera.perspective(45)
	.translateTo([0, 0, 1200])

function draw(){
	scene.camera
		.rotate(rotateX, [1, 0, 0]);

	objs.forEach(function(card){
		card.rotate(rotateX, [1, 0, 0]);
	});

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

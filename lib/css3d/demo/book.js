import './book.less';

import {Obj, Scene} from '../src/index';
import TouchController from '@ali/touch-controller';

// set units

let docEl = document.documentElement;

// ePix 元素尺寸
// dPix 设计图尺寸
function setUnitA(ePix,dPix) {
	let docWidth = window.innerWidth;
	let ratio = (dPix / 2) / docWidth;
	return ePix =  (ePix / ratio);
}
// console.log([setUnitA(100,1334)]);

// window.addEventListener('resize', function() {
//     // setUnitA(ePix,dPix);
// }, false);

let textures = {
	catLeft: '//gw.alicdn.com/mt/TB1W5PxOVXXXXXWXFXXXXXXXXXX-330-354.png',
	catRight: '//gw.alicdn.com/mt/TB1ZUbuOVXXXXbHXFXXXXXXXXXX-262-295.png',
	deskUp: '//gw.alicdn.com/mt/TB1t8_AOVXXXXcWXpXXXXXXXXXX-1015-322.png',
	deskDown: '//gw.alicdn.com/mt/TB1FAHpOVXXXXanXVXXXXXXXXXX-1021-315.png',
	lantern: '//gw.alicdn.com/mt/TB1O9voOVXXXXczXFXXXXXXXXXX-166-232.png',
	blurLeft: '//gw.alicdn.com/mt/TB1bHYLOVXXXXb5XXXXXXXXXXXX-208-92.png',
	blurRight: '//gw.alicdn.com/mt/TB1f8LCOVXXXXa_XpXXXXXXXXXX-312-115.png',
	card1: '//gw.alicdn.com/mt/TB1TkjDOVXXXXaCXpXXXXXXXXXX-128-175.png',
	card2: '//gw.alicdn.com/mt/TB1h7u8OVXXXXbWapXXXXXXXXXX-131-192.png',
	card3: '//gw.alicdn.com/mt/TB1I5PCOVXXXXcZXpXXXXXXXXXX-143-178.png',
	card4: '//gw.alicdn.com/mt/TB15vYsOVXXXXX5XVXXXXXXXXXX-109-176.png',
	card5: '//gw.alicdn.com/mt/TB1Rge_OVXXXXcdapXXXXXXXXXX-173-210.png',
	card6: '//gw.alicdn.com/mt/TB193HQOVXXXXX8XXXXXXXXXXXX-126-171.png',
	card7: '//gw.alicdn.com/mt/TB1ZHPuOVXXXXXeXVXXXXXXXXXX-158-206.png'
};

// let stats = new Stats();
// document.body.appendChild(stats.domElement);

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let scene = new Scene()
	.size(canvasWidth, canvasHeight);

let zoom = -100;
let rotateX = 0;
let rotateY = 0;

let touchController = new TouchController(scene.dom)
	.panSetup(0.005, 0.01)
	// .panAuto(50, 0)
	.onPan(function (dx, dy){
		rotateX = dy;
		rotateY = dx;
	})
	// .zoomSetup(2000, 0.0001)
	// .zoomAuto(0.01)
	// .onZoom(function (z){
	// 	zoom += z;
	// })


let objMetas = [
	// deskUp
	{
		size: [setUnitA(1015,1334), setUnitA(322,1334)],
		texture: textures.deskUp,
		translate: [0, 0, 0]
	},
	// deskDown
	{
		size: [setUnitA(1021,1334), setUnitA(300,1334)],
		texture: textures.deskDown,
		translate: [0, -setUnitA(225,1334), setUnitA(133,1334)],
		rotate: [Math.PI / 3, 0, 0],
	},
	// card1
	{
		size: [setUnitA(128,1334), setUnitA(175,1334)],
		texture: textures.card1,
		translate: [-setUnitA(100,1334), -setUnitA(100,1334), setUnitA(100,1334)]
	},
	// card2
	{
		size: [setUnitA(131,1334), setUnitA(192,1334)],
		texture: textures.card2,
		translate: [-setUnitA(185,1334), -setUnitA(100,1334), setUnitA(105,1334)]
	},
	// card3
	{
		size: [setUnitA(143,1334), setUnitA(178,1334)],
		texture: textures.card3,
		translate: [setUnitA(160,1334), -setUnitA(100,1334), setUnitA(100,1334)]
	},
	// card4
	{
		size: [setUnitA(109,1334), setUnitA(176,1334)],
		texture: textures.card4,
		translate: [setUnitA(200,1334), -setUnitA(100,1334), setUnitA(100,1334)]
	},
	// card5
	{
		size: [setUnitA(173,1334), setUnitA(210,1334)],
		texture: textures.card5,
		translate: [-setUnitA(310,1334), -setUnitA(100,1334), setUnitA(100,1334)]
	},
	// card6
	{
		size: [setUnitA(126,1334), setUnitA(171,1334)],
		texture: textures.card6,
		translate: [setUnitA(30,1334), -setUnitA(100,1334), setUnitA(105,1334)]
	},
	// card7
	{
		size: [setUnitA(158,1334), setUnitA(206,1334)],
		texture: textures.card7,
		translate: [setUnitA(350,1334), -setUnitA(100,1334), setUnitA(100,1334)]
	},
]

let cards = [];

objMetas.forEach(function(meta, i){
	let obj = new Obj()
		.size(meta.size[0], meta.size[1])
		.texture(null, meta.texture)
		.translateTo(meta.translate);

	if(meta.rotate){
		obj.rotateTo(meta.rotate);
	}

	scene.addChild(obj);

	if(i > 1){
		cards.push(obj);
	}
});

scene.dom.style.width = canvasWidth + 'px';
scene.dom.style.height = canvasHeight + 'px';
document.querySelector('#scene').appendChild(scene.dom);

scene.camera.perspective(45)
	.translateTo([0, 80, 2000]);

function draw(){
	let [xAngle, yAngle] = scene.camera.euler;

	if(yAngle > Math.PI / 30){
		if(rotateY > 0){
			rotateY = 0;
		}
	}else if(yAngle < -Math.PI / 30){
		if(rotateY < 0){
			rotateY = 0;
		}
	}

	if(xAngle > Math.PI / 30){
		if(rotateX > 0){
			rotateX  = 0;
		}
	}else if(xAngle < -Math.PI / 30){
		if(rotateX < 0){
			rotateX = 0;
		}
	}

	scene.camera
		.rotateTo([
			xAngle + rotateX, 
			yAngle + rotateY, 
			0
		])

	cards.forEach(function(card){
		card.rotateTo([
			card.euler[0] + rotateX, 
			card.euler[1] + rotateY, 
			0
		])
	});

	scene.render();
}
// setUnitA(10, 1334);
// console.log(setUnitA(10, 1334));
function animate(){
	// stats.begin();

	draw();
	requestAnimationFrame(animate);

	// stats.end();
}

requestAnimationFrame(animate);

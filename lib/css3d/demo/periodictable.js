import './periodictable.less';
import table from './periodictable.data';
import Spherical from './periodictable.spherical';
import Cylindrical from './periodictable.cylindrical';
import {vec3} from 'gl-matrix';

import {Obj, Scene} from '../src/index';
import raf from 'raf';
import TWEEN from 'tween.js';
import Stats from 'stats-js';
import TouchController from '@ali/touch-controller';

let objects = [];
let targets = { table: [], sphere: [], helix: [], grid: [] };

let stats = new Stats();
stats.domElement.style.transformOrigin = 'top left';
stats.domElement.style.position = 'absolute';
document.body.appendChild(stats.domElement);

let scene = new Scene()
	.size(window.innerWidth, window.innerHeight);

scene.camera.perspective(40)
	.translateTo([0, 0, 3000]);

let zoom = -200;
let rotateX = 0;
let rotateY = 0;

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

// table

for (let i = 0; i < table.length; i += 5 ) {
	let obj = new Obj()
		.translateTo([
			Math.random() * 4000 - 2000,
			Math.random() * 4000 - 2000,
			Math.random() * 4000 - 2000
		]);

	let element = obj.dom;

	element.className = 'element';
	element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

	let number = document.createElement( 'div' );
	number.className = 'number';
	number.textContent = (i/5) + 1;
	element.appendChild( number );

	let symbol = document.createElement( 'div' );
	symbol.className = 'symbol';
	symbol.textContent = table[ i ];
	element.appendChild( symbol );

	let details = document.createElement( 'div' );
	details.className = 'details';
	details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
	element.appendChild( details );

	scene.addChild(obj);

	objects.push(obj);

	//

	let tableObj = new Obj()
		.translateTo([
			( table[ i + 3 ] * 140 ) - 1330,
			- ( table[ i + 4 ] * 180 ) + 990,
			0
		]);

	targets.table.push(tableObj);
}

// sphere

let s = new Spherical();

for ( let i = 0, l = objects.length; i < l; i ++ ) {

	let phi = Math.acos( -1 + ( 2 * i ) / l );
	let theta = Math.sqrt( l * Math.PI ) * phi;

	s.set( 800, phi, theta );

	let sinPhiRadius = Math.sin( s.phi ) * s.radius;

	let x = sinPhiRadius * Math.sin( s.theta );
	let y = Math.cos( s.phi ) * s.radius;
	let z = sinPhiRadius * Math.cos( s.theta );

	let obj = new Obj()
		.translateTo([x, y, z]);

	obj.lookAt([x * 2, y * 2, z * 2]);

	targets.sphere.push( obj);
}

// helix

let c = new Cylindrical();

for ( let i = 0, l = objects.length; i < l; i ++ ) {

	let theta = i * 0.175 + Math.PI;
	let _y = - ( i * 8 ) + 450;

	let obj = new Obj();

	c.set( 900, theta, _y );

	let x = c.radius * Math.sin( c.theta );
	let y = c.y
	let z = c.radius * Math.cos( c.theta );
	obj.position = [x, y, z];

	obj.lookAt([x * 2, y, z * 2]);

	targets.helix.push(obj);

}

// grid

for ( let i = 0; i < objects.length; i ++ ) {

	let obj = new Obj();

	let x = ( ( i % 5 ) * 400 ) - 800;
	let y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
	let z = (Math.floor( i / 25 ) ) * 1000 - 2000;

	obj.position = [x, y, z];

	targets.grid.push(obj);

}

//

// renderer = new THREE.CSS3DRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.domElement.style.position = 'absolute';
document.getElementById( 'container' ).appendChild( scene.dom );


/*
//
controls = new THREE.TrackballControls( camera, renderer.domElement );
controls.rotateSpeed = 0.5;
controls.minDistance = 500;
controls.maxDistance = 6000;
controls.addEventListener( 'change', render );
*/

let button = document.getElementById( 'table' );
button.addEventListener( 'click', function ( event ) {

	transform( targets.table, 2000 );

}, false );

button = document.getElementById( 'sphere' );
button.addEventListener( 'click', function ( event ) {

	transform( targets.sphere, 2000 );

}, false );

button = document.getElementById( 'helix' );
button.addEventListener( 'click', function ( event ) {

	transform( targets.helix, 2000 );

}, false );

button = document.getElementById( 'grid' );
button.addEventListener( 'click', function ( event ) {

	transform( targets.grid, 2000 );

}, false );

transform( targets.helix, 2000 );

//

// window.addEventListener( 'resize', onWindowResize, false );

function transform( targets, duration ) {

	TWEEN.removeAll();

	for ( let i = 0; i < objects.length; i ++ ) {

		let op = objects[i].position;
		let oe = objects[i].euler;
		let tp = targets[i].position;
		let te = targets[i].euler;

		new TWEEN.Tween({x: op[0], y: op[1], z: op[2]})
		// new TWEEN.Tween( { x: tp[0], y: tp[1], z: tp[2] })
			.to( { x: tp[0], y: tp[1], z: tp[2] }, Math.random() * duration + duration )
			.onUpdate(function(){
				objects[i].position = [this.x, this.y, this.z];
			})
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

		new TWEEN.Tween({x: oe[0], y: oe[1], z: oe[2]})
			.to( { x: te[0], y: te[1], z: te[2] }, Math.random() * duration + duration )
			.onUpdate(function(){
				objects[i].euler = [this.x, this.y, this.z];
			})
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

	}

	// new TWEEN.Tween( this )
	// 	.to( {}, duration * 2 )
	// 	// .onUpdate()
	// 	.start();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function draw(){
	// scene.camera.translateTo([0, 0, zoom])
		// .rotate(rotateY, [0, 1, 0])
		// .rotate(rotateX, [1, 0, 0])
		// .rotateTo(Math.PI / 6, [1, 0, 0]);
		
	scene.render();
}

function animate() {
	stats.begin();

	TWEEN.update();
	draw();
	requestAnimationFrame( animate );

	stats.end();
}

animate();

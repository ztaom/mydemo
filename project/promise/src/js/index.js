// require('../less/base.less')
// require('../less/style.less')
require('../less/sword.less')


const promiseTest = document.querySelector('.promise');
let alpha = 1;
let moveColor
let colorR = 0
let colorG = 0
let colorB = 0

promiseTest.addEventListener('touchstart', function(e){
	console.log('touchstart:'+alpha)
	console.log(e.touches[0].clientX)
	console.log(e.touches[0].clientY)
	moveColor = 'rgba('+colorR+','+colorG+','+colorB+',1)'
})

promiseTest.addEventListener('touchmove', function(e){
	
	

	moveColor = 'rgba('+colorR+','+colorG+','+colorB+',0.'+alpha+')'

	if(alpha<=100){
		alpha = alpha+1
	}

	this.style.background = moveColor
})

promiseTest.addEventListener('touchend', function(e){
	console.log('touchend:'+alpha)
})


/*
 * canvas
 * 2014.4.1
 * by gary
 * 
 */
var canvas = $('#test');
var ctx = canvas.get(0).getContext("2d");
var canvasWidth = canvas.width();
var canvasHeight = canvas.height();

var playAnimation = true;
var startButton = $('#startanimation');
var stopButton = $('#stopanimation');
startButton.click(function(){
  playAnimation = true;
  animate();
})

stopButton.click(function(){
  playAnimation = false;
})

var Shape = function(x,y,radius,m,vx,vy,ax,ay){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.radius = radius;
	this.m = m;
	this.angle = 0;
	this.vx = vx;
	this.vy = vy;
	this.ax = ax;
	this.ay = ay;
}

var shapes = new Array();

for (var i = 0; i < 10; i++) {
	var x = 20+(Math.random()*(canvasWidth-40));
	var y = 20+(Math.random()*(canvasHeight-40));
	var width = height =Math.random()*30+20;
	var radius = 5+Math.random()*10;
	var m = radius/2;
	var vx = Math.random()*4-2;
	var vy = Math.random()*4-2;
	var ax = 0;
	var ay = 0;
	shapes.push(new Shape(x,y,radius,m,vx,vy,ax,ay));
};

function animate(){
	ctx.clearRect(0,0,canvasWidth,canvasHeight)

	var shapeLength = shapes.length;

	for (var i = 0; i < shapeLength; i++) {
		var tmpShape = shapes[i];
		tmpShape.x += tmpShape.vx;
		tmpShape.y += tmpShape.vy;

		tmpShape.vx += tmpShape.ax;
		tmpShape.vy += tmpShape.ay;

		if(Math.abs(tmpShape.vx)<10){
			tmpShape.vx += tmpShape.ax;
		}

		if(Math.abs(tmpShape.vy)<10){
			tmpShape.vy += tmpShape.ay;
		}

		//摩擦力
		/*if(Math.abs(tmpShape.vx)>0.1){
			tmpShape.vx *= .9;
		}else{
			tmpShape.vx = 0;
		}

		if(Math.abs(tmpShape.vy)>0.1){
			tmpShape.vy *= .9;
		}else{
			tmpShape.vy = 0;
		}*/

		//碰撞检测
		for (var j=i+1; j < shapeLength; j++) {
			var tmpShapeB = shapes[j];
			var dx = tmpShapeB.x-tmpShape.x;
			var dy = tmpShapeB.y-tmpShape.y;
			var distance = Math.sqrt((dx*dx)+(dy*dy));
			if(distance<tmpShape.radius+tmpShapeB.radius){

				//计算两物体碰撞之后的位置、方向和速度
				var angle = Math.atan2(dy,dx);//计算碰撞的角度
				var sine = Math.sin(angle);
				var cosine = Math.cos(angle);
				var x = 0;
				var y = 0;
				var xb = dx*cosine + dy*sine;
				var yb = dy*cosine - dx*sine;

				var vx = tmpShape.vx*cosine + tmpShape.vy*sine;
				var vy = tmpShape.vy*cosine - tmpShape.vx*sine;

				var vxb = tmpShapeB.vx*cosine + tmpShapeB.vy*sine;
				var vyb = tmpShapeB.vy*cosine - tmpShapeB.vx*sine;

				var vxtotal = vx-vxb;

				vx=((tmpShape.m-tmpShapeB.m)*vx+2*tmpShapeB.m*vxb)/(tmpShape.m+tmpShapeB.m);
				vxb = vxtotal+vx

				xb = x+(tmpShape.radius+tmpShapeB.radius);

				tmpShape.x=tmpShape.x+(x*cosine-y*sine);
				tmpShape.y=tmpShape.y+(y*cosine+x*sine);

				tmpShapeB.x=tmpShape.x+(xb*cosine-yb*sine);
				tmpShapeB.y=tmpShape.y+(yb*cosine+xb*sine);


				tmpShape.vx=vx*cosine-vy*sine;
				tmpShape.vy=vy*cosine+vx*sine;

				tmpShapeB.vx=vxb*cosine-vyb*sine;
				tmpShapeB.vy=vyb*cosine+vxb*sine;

			}
		};

		//设置舞台边界
		if(tmpShape.x-tmpShape.radius<0){
			tmpShape.x=tmpShape.radius;
			tmpShape.vx *= -1;
		}else if(tmpShape.x+tmpShape.radius>canvasWidth){
			tmpShape.x=canvasWidth-tmpShape.radius;
			tmpShape.vx *= -1;
		}

		if(tmpShape.y-tmpShape.radius<0){
			tmpShape.y=tmpShape.radius;
			tmpShape.vy *= -1;
		}else if(tmpShape.y+tmpShape.radius>canvasHeight){
			tmpShape.y=canvasHeight-tmpShape.radius;
			tmpShape.vy *= -1;
		}


		
		ctx.beginPath();
		ctx.arc(tmpShape.x, tmpShape.y, tmpShape.radius, 0, 2*Math.PI, false);
		ctx.fill();
	};
	
	if(playAnimation){
		setTimeout(animate,33);
	}
}
animate()
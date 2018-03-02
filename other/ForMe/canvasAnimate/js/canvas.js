/*
 * canvas
 * 2014.3.7
 * by gary
 * 
 */

var ctx;
function Graph(id){
  this.id=id;
  ctx=$(id).get(0).getContext('2d');//2d绘图
  //ctx.clearRect(0,0,canvas.width(),canvas.height());//擦除画布上面的内容
}

Graph.prototype={

  //创建矩形
  Rect:function(bgcolor,x,y,w,h){
    ctx.fillStyle=bgcolor;
    ctx.fillRect(x,y,w,h);//矩形填充
    ctx.strokeStyle="#0000ff";//绘制轮廓
    //ctx.restore();//恢复画布状态
    ctx.strokeRect(x,y,w,h);//矩形边框
  },

  //创建路径
  Line:function(x1,y1,x2,y2){
    ctx.lineWidth=5;//加粗线条
    ctx.strokeStyle="#0000ff";//绘制轮廓
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();//绘制轮廓
  },

  //创建圆
  Circle:function(x,y,r,startAngle,stopAngle){
    //ctx.scale(1.5,1);缩放，用以制作椭圆
    ctx.beginPath();
    ctx.arc(x,y,r,startAngle,stopAngle,false);
    ctx.stroke();//绘制路径
    ctx.fill();//填充颜色

  },

  //写入文字
  Text:function(fontstyle,text,x,y){
    ctx.font = fontstyle;
    //ctx.fillText(text,x,y);
    ctx.strokeText(text,x,y);
  },

  //插入图片
  imageC:function(){
    

  },

  //重置窗口大小
  /*resizeCanvas:function(){
    $(this.id).attr('width',$(window).get(0).innerWidth);
    $(this.id).attr('height',$(window).get(0).innerHeight);
    $(this.id).fillRect(0,0,$(this.id).width(),$(this.id).height());
  }*/


}


var drawRect = new Graph("#rect");
drawRect.Rect("#ff0000",10,20,100,100);

var drawLine = new Graph("#line");
drawLine.Line(10,30,100,80);

var drawCircle = new Graph("#circle");
drawCircle.Circle(40,40,30,0,2*Math.PI);

var drawText = new Graph("#text");
drawText.Text("30px Arial","Hello World",10,50);

//载入图片
var image = new Image();
image.src="datauri.png";
$(image).load(function(){
  $("#image").get(0).getContext('2d').drawImage(image,0,0,200,150);
  var imageData=ctx.getImageData(0,0,300,150);
  var pixels = imageData.data;
  ctx.clearRect(0,0,300,150);
  var numTileRows = 20;
  var numTileCols = 20;
  var tileWidth = imageData.width/numTileCols;
  var tileHeight = imageData.height/numTileRows;
  for (var r = 0; r <numTileRows; r++) {
    for (var c = 0; c <numTileCols; c++) {
      var x = (c*tileWidth)+(tileWidth/2);
      var y = (r*tileHeight)+(tileHeight/2);
      var pos = (Math.floor(y)*(imageData.width*4))+(Math.floor(x)*4);
      var red = pixels[pos]
      var green = pixels[pos+1]
      var blue = pixels[pos+2]
      ctx.fillStyle="rgb("+red+","+green+","+blue+")";
      ctx.fillRect(x-(tileWidth/2),y-(tileHeight/2),tileWidth,tileHeight);
      ctx.beginPath();
      ctx.arc(x,y,tileWidth/2,0,Math.PI*2,false);
      ctx.closePath();
      ctx.fill();
    };
  };
})


function test(){
  ctx=$("#test").get(0).getContext('2d');
  ctx.fillStyle='#ff0000';
  
  ctx.save();//保存绘图状态
  ctx.fillRect(120,20,100,100);
  ctx.strokeStyle="#0000ff";//绘制轮廓
  ctx.strokeRect(10,20,98,98);//矩形边框

  //设置阴影效果
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX=5;
  ctx.shadowOffsetY=10;
  ctx.shadowColor="rgba(0,0,0,0.5)";

  ctx.fillStyle='#0000ff';
  ctx.fillRect(10,130,100,100);

  ctx.translate(300,20);//坐标原点移动translate和scale应同时使用
  ctx.rotate(45*Math.PI/180);//旋转以及弧度计算公式
  ctx.fillRect(0,0,100,100);


  ctx.restore();//恢复绘图状态
  ctx.translate(120,130);//坐标原点移动translate和scale应同时使用
  ctx.scale(1.5,1.5);//缩放
  ctx.fillRect(0,0,100,100);

  //变换矩阵
  /*3x3矩阵
  a c e     x轴缩放(1) x轴倾斜(0) x轴平移(0)
  b d f  =  y轴倾斜(0) y轴缩放(1) y轴平移(0)
  0 0 1         0          0          1

  用transform和setTransform操作
  */

  ctx.setTransform(1,0,0,1,0,0);//将矩阵重置为单位矩阵
  var xScale = Math.cos(0.7854);
  var ySkew = -Math.sin(0.7854);
  var xSkew = Math.sin(0.7854);
  var yScale = Math.cos(0.7854);
  var xTrans = 75;
  var yTrans = 350;
  ctx.transform(xScale,ySkew,xSkew,yScale,xTrans,yTrans);
  ctx.fillStyle="#00cfff";
  ctx.fillRect(-50,-50,100,100);
  
  ctx.globalAlpha=0.5;//设置全局透明，如果填充色是半透明的（rgba），则透明度是两个的乘积

  /*source and destination:(over,atop,in,out),lighter(重叠区域颜色相加),copy(只绘制源),xor(只绘制不重叠区域)*/
  ctx.globalCompositeOperation='xor';



  ctx.fillStyle="#ff0000";
  ctx.fillRect(0,0,100,100);

  //将画布导出为dataURL图像
  var dataURL=$("#test").get(0).toDataURL();
  console.log(dataURL)

  //像素图
  /*var imageData = ctx.getImageData(0,0,100,100);//3x3栅格
  var width=imageData.width;
  var x=2;
  var y=2;
  var pixelRed = ((y-1)*(width*4))+((x-1)*4);
  var pixelGreen = pixelRed+1;
  var pixelBlue=pixelRed+2;
  var pixelAlpha = pixelRed+3;

  var pixels = imageData.data;
  var numPixels = imageData.width*imageData.height;
  for (var i=0; i<numPixels;i++){
    pixels[i*4] = Math.floor(Math.random()*255);//红
    pixels[i*4+1] = Math.floor(Math.random()*255);//绿
    pixels[i*4+2] = Math.floor(Math.random()*255);//蓝
    pixels[i*4+3] = 255;//透明度
  }
  ctx.putImageData(imageData,10,450);*/

  //创建马赛克
  var imageData = ctx.createImageData( 100,100);
  var pixels = imageData.data;
  var numTileRows = 4;
  var numTileCols = 4;

  var tileWidth = imageData.width/numTileCols;
  var tileHeight = imageData.height/numTileRows;

  for(var r = 0; r<numTileRows; r++){
    for(var c = 0;c<numTileCols; c++){
      var red = Math.floor(Math.random()*255);//红
      var green = Math.floor(Math.random()*255);//绿
      var blue = Math.floor(Math.random()*255);//蓝

    }
  }

  for(var tr = 0; tr<tileHeight; tr++){
    for(var tc = 0; tc<tileWidth; tc++){
      var trueX = (c*tileWidth)+tc;
      var trueY = (r*tileHeight)+tr;
      var pos = (trueY*(imageData.width*4))+(trueX*4);
      pixels[pos] = red;//红
      pixels[pos+1] = green;//绿
      pixels[pos+2] = blue;//蓝
      pixels[pos+3] = 255;//透明度
    }
  }
  console.log(c,r,tc,tr,pos,red,green,blue,imageData)

  ctx.putImageData(imageData,10,450);

}
test();
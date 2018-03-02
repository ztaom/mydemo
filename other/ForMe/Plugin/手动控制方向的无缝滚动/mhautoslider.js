$(function(){

var Speed = 1;
var Speed_m = 3;
var TimeInterval=25;
var ScrollDirection = "left";
//
var ImgCount = $('#ScrollArea .item').length;
var ImgWidth = $('#ScrollArea .item').outerWidth();
$('#ScrollArea').css('width',(ImgCount+2)*ImgWidth+"px");

$('#ScrollArea').css('left',"-"+ImgWidth+"px");
var x=0;
var s=Speed;

	function set_timer(){
		timerID = setInterval(function(){
			if(ScrollDirection =="left"){
				timer_action_toL();				
			}else if(ScrollDirection =="right"){
				timer_action_toR();				
			}else{
				timer_action_toL();
			}
		},TimeInterval);
	}
	
	function clear_timer(){
		clearInterval(timerID);
	}
	
	function timer_action_toL(){
		if(x<=0){
			$('#ScrollArea .item:last').after($('#ScrollArea .item:first').clone());
			$('#ScrollArea .item:first').remove();
			x= ImgWidth;
		}		
		x = x - s;
		$('#ScrollArea .item').css('left',x+"px");
	}
	
	function timer_action_toR(){
		if(x>=ImgWidth){
			$('#ScrollArea .item:first').before($('#ScrollArea .item:last').clone());
			$('#ScrollArea .item:last').remove();
			x=0;
		}		
		x = x + s;
		$('#ScrollArea .item').css('left',x+"px");
	}
	
	$('#Leftbtn').hover(function(){
		clear_timer();
		s= Speed_m;
		ScrollDirection="left";
		set_timer();
	},
	function(){
		clear_timer();
		s= Speed;		
		ScrollDirection="left";
		set_timer();			
	});

	$('#Rightbtn').hover(function(){
		clear_timer();
		s= Speed_m;
		ScrollDirection="right";
		set_timer();
	},
	function(){
		clear_timer();
		s= Speed;
		ScrollDirection="right";
		set_timer();			
	});
	
	$('#ScrollArea').hover(function(){
		clear_timer();
	},
	function(){
		s= Speed;		
		set_timer();			
	});
	
	set_timer();
});




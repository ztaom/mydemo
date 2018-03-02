$(document).ready(function(){
	$("div#questions ul li a").click(function(){
		var selected = $(this).attr('href');	
		selected += '"'+selected+'"'
		$('.top-button').remove();
		$('.current-faq').removeClass();
		$.scrollTo(selected, 400 ,function(){ 
			$(selected).addClass('current-faq',400,function(){
				$(this).append('<a href="#" class="top-button">TOP</a>');
			});
		});		
		return false;
	});
	$('.top-button').live('click',function(){
		$('.top-button').remove();
		$('.current-faq').removeClass('current-faq',400,function(){
			$.scrollTo('0px', 800); 
		});				
		return false;
	})		
});			
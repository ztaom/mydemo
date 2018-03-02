$(document).ready(function() {
	
	$('body').css('min-height',$(window).height()-90);
	columnSortable();
	$( ".boxes" ).sortable({
		connectWith: ".demo .column",
		handle: '.drag',
		helper: function(e,li) {
		copyHelper= li.clone().insertAfter(li);
			return li.clone();
		},
		tolerance: 'pointer',
		stop: function(){ 
			saveLayout();			
			configurationElm();
			removeElm(); 
		}
	});
	
	$( ".demo" ).sortable({
		connectWith: ".demo .lyrow",
		handle: '.drag',
		//tolerance: 'pointer',
		stop: function(){ saveLayout(); }
	});
	
	$( ".rows" ).sortable({
		connectWith: ".demo",
		handle: '.drag',
		//tolerance: 'pointer',
		helper: function(e,li) {
		copyHelper= li.clone().insertAfter(li);
			return li.clone();
		},
		stop: function(){ 
			saveLayout();			
			configurationElm();
			removeElm();
			gridSystemGenerator();
		}
	});
	gridSystemGenerator();
	function gridSystemGenerator() {
		// grid system generator
		$('.lyrow .preview input').keyup(function(){
			var sum = 0;
			var src = '';
			var cols = $(this).val().split(" ",12);
			$.each(cols, function(index,value){
				sum = sum + parseInt(value)
				src += '<div class="span'+value+' column"></div>';
			});
			if(sum==12) { 
				$(this).parent().next().children().html(src);
				$(this).parent().prev().show();
				//activar las nuevas columnas
				columnSortable();
			} else {
				$(this).parent().prev().hide();
			}
		});
	}

	// menu buttons
	$('[data-target=#downloadModal]').click(function(event){
		event.preventDefault();
		downloadLayoutSrc();
	});
	
	$('#download').click(function(){
		downloadLayout();
		return false;
	});
	
	$('#downloadhtml').click(function(){
		downloadHtmlLayout();
		return false;
	});

	$('#edit').click(function(){
		$('body').removeClass('devpreview sourcepreview');
		$('body').addClass('edit');
		
		removeMenuClasses();
		
		$(this).addClass('active');

		return false;
	});
	
	$('#clear').click(function(event) {
		event.preventDefault();
		clearDemo();
	});
	
	$('#devpreview').click(function(){
		$('body').removeClass('edit sourcepreview');
		$('body').addClass('devpreview');
		
		removeMenuClasses();
		
		$(this).addClass('active');
		
		return false;
	});
	
	$('#sourcepreview').click(function(){
		$('body').removeClass('edit');
		$('body').addClass('devpreview sourcepreview');
		removeMenuClasses();
		$(this).addClass('active');
		return false;
	});
	
	$('#fluidPage').click(function(event){
		event.preventDefault();
		changeStructure('container','container-fluid');
		$('#fixedPage').removeClass('active');
		$(this).addClass('active');
		downloadLayoutSrc();
	});
	$('#fixedPage').click(function(event){
		event.preventDefault();
		changeStructure('container-fluid','container');
		$('#fluidPage').removeClass('active');
		$(this).addClass('active');
		downloadLayoutSrc();
	});
	
	//subnav accordion
	
	$('.nav-header').click(function(){
	$('.sidebar-nav .boxes, .sidebar-nav .rows').hide();
		$(this).next().slideDown();
		
	});
	
	removeElm();
	configurationElm();

});

function changeStructure(oldClass, newClass) {
	$('#download-layout .'+oldClass).removeClass(oldClass).addClass(newClass);
}

	function configurationElm() {
		// Handle elements options
		$('.configuration > a').click(function(event){
			event.preventDefault();
			var currentViewObj = $(this).parent().next().next().children();
			$(this).toggleClass('active');
			currentViewObj.toggleClass($(this).attr('rel'));
			saveLayout();
		});
	
		$('.configuration .dropdown-menu a').click(function(event){
			event.preventDefault();
			var currentClassesObj = $(this).parent().parent();
			var currentViewObj = currentClassesObj.parent().parent().next().next().children();

			currentClassesObj.find('li').removeClass('active');
			$(this).parent().addClass('active');
		
			var removeClasses = "";
			currentClassesObj.find('a').each(function(){
				removeClasses += $(this).attr('rel')  + " ";
			});
		
			// Remove open
			currentClassesObj.parent().removeClass('open');
		
			currentViewObj.removeClass(removeClasses);
			currentViewObj.addClass($(this).attr('rel'));

			saveLayout();
		
		});
	}
	function removeElm() {
		$('.remove').click(function(event) {
			event.preventDefault();
			$(this).parent().remove();
			if(!$('.demo .lyrow').length > 0) { 
				clearDemo();
			}
			saveLayout();
		});
	}
	
	function clearDemo() {
		$('.demo').html($('#defaultLayout').html());
		columnSortable();
		removeElm();
		saveLayout();
	}
	function removeMenuClasses(){
		$('#menu-layoutit li button').removeClass('active');
	}

	function columnSortable() {
		$( ".column" ).sortable({
			connectWith: ".demo .column",
			handle: '.drag',
			//tolerance: 'pointer',
			stop: function(){ saveLayout(); }
		});
	}

function downloadLayoutSrc() {
		var src = '';

		$('#download-layout').children().html($('.demo').html());
		
		var downloadContent = $('#download-layout');
		
		$('#download-layout .box-element .view').each(function(){
			$(this).parent().parent().append($(this).html());
		});
		$('#download-layout .box-element').remove();
		
		$('#download-layout .lyrow .view').each(function(){
			$(this).parent().html($(this).html());
		});
		$('#download-layout .column').removeClass('ui-sortable');	
		//$('#download-layout .column').removeAttr('style');	
		$('#download-layout .row-fluid').removeClass('clearfix');
		
		if($('#download-layout .container').length > 0) {
			changeStructure('row-fluid','row');
		}
		
		$('#downloadModal textarea').empty();
		$('#download-layout .lyrow').each(function(){
			src += $(this).html();
		});

		formatSrc = $.htmlClean(src, {format:true, allowedAttributes:[["id"], ["class"]] });

		$('#download-layout').children().html(formatSrc);
		$('#downloadModal textarea').val(formatSrc);

}

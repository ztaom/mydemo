// Load what we need
steal(
	'jquery',
	'jquery/cookie',
	'jquery/controller',
	'jquery/controller/route',
	'jquery/view/ejs',
	'jquery/lang/json',
	'//assets/style.css', 		// should be loaded here if it is desired to compress it with steal; loaded
							// it in the html file instead to avoid flickering during app startup
	'./todoitem/models/todo.js')
.then(
	'//todo/todolist/todolist.js', //load todolist jmvc plugin
	'//todo/views/todo-stats.ejs'
	)
.then(function($){

// This controller is responsible for managing the entire todo app, basically
// to instantiate the required controllers and manage events such as updating
// statistics etc.
$.Controller('Timepob',{

  listensTo: ['completionStatusChanged'] //custom event listener
    
}, {

	init: function(){
		this.find('#new-todo').val('')[0].focus();

		$('#todo-list').todolist({list : this.options.list });
		//删除list的loading
		if($('#todo-list:has(li)')){
			$('#todo-list .loading').remove();
		}

		//load all the todos into the list
		this.options.list.findAll();
		this._updateStats();
	},

	// used for loading the data onto the list based on some filter
	loadData: function(filter){
		this._currentFilter = filter;
		if(filter){
			$('#todo-list').controller().render(this.options.list[filter]());
		}else{
			$('#todo-list').controller().render(this.options.list);
		}

		this._updateStats();
	},

	// handler for the custom event
	'completionStatusChanged': function(){
		this.loadData(this._currentFilter);
	},

	// listens for key events and creates a new todo
	'#new-todo keyup' : function(el, ev){
		var value = $.trim(el.val());

		if(ev.which === 13 && value !== ''){
			new Todo({
				title : value,
				completed : false
			}).save(); //invoke the created function; proxy(...) to maintain the context of this
			
			el.val('');
		}
	},

	// the clear button is clicked
	'#clear-completed click' : function(){
		// gets completed todos in the list, destroys them
		this.options.list.completed().destroyAll();
		this._updateStats();
	},

	// listen for changes on the toggle all checkbox
	'#toggle-all change': function(el, ev){
		var isCompleted = el.is(':checked');
		
		this.options.list.each(function(idx, el){
		   el.update({ completed: isCompleted });  
		});

		this.loadData(this._currentFilter);
	},

	// When a todo is created, add it to the list and reload everything
	// to also take the current filter into account
	'{Todo} created': function(Todo, ev, item){
		this.options.list.push(item); //triggers 'add' event on the list
		this.loadData(this._currentFilter);
	},
	
	'{Todo} destroyed': function(){
	    this._updateStats();    
	},

	// a helper that updates the stats
	_updateStats : function(){
		var list = this.options.list,
			completed = list.completed().length,
			remaining = list.length - completed;
		
		this.find('#footer').html('//todo/views/todo-stats.ejs',{
			completed : completed,
			remaining : remaining
		});

		this.find('#main, #footer').toggle( list.length > 0 );

		this.find('#filters li a')
			.removeClass('selected')
			.filter('[href="#!/' + (this._currentFilter || '') + '"]')
			.addClass('selected');
		
		this.find('#toggle-all')[0].checked = !remaining;
	}

});

// The router which initializes the entire app and watches for hash changes
// in the url
$.Controller('Router', {

	init: function(){
		//var todoList = new Todo.List();
		new Timepob($('#timepob'), { list: new Todo.List() });

		$.route.ready(true); //fires 1st route event
	},

	//default route index.html#!
	'route': function(){
		$('#timepob').controller().loadData();
	},

	//route index.html#!/active
	'/active route': function(routeData){
		$('#timepob').controller().loadData('active');
	},

	//route index.html#!/completed
	'/completed route': function(routeData){
		$('#timepob').controller().loadData('completed');
	}

});

$(function(){
	//register the router
	new Router(document.body);
});
	/*$(function(){
		if(!window.localStorage){
	    	alert('你的浏览器不支持本系统');
	    }
	    //换肤  
	    $('#skin').load("skins.html?v4",function(){
	        var $li = $("#skin li");  //查找到元素
	        $li.each(function(skinNum){
	        	$li.eq(0).html("");
	          $li.eq(skinNum).attr("id","skin_"+(skinNum));
	          $li.eq(skinNum).html('<img src="img/bg_small/'+(skinNum)+'.jpg" />');
	        })

	        $li.click(function () {   //给元素添加事件
	            switchSkin(this.id);//调用函数  
	        });  
	        //保存Cookie完毕以后就可以通过Cookie来获取当前的皮肤了  
	        var cookie_skin = $.cookie("MyCssSkin");     //获取Cookie的值  
	        if (cookie_skin) {                          //如果确实存在Cookie  
	            switchSkin(cookie_skin);     //执行  
	        }
	        function switchSkin(skinName) { 
	            $("#" + skinName).addClass("selected")                //当前<li>元素选中  
	                               .siblings().removeClass("selected");  //去掉其他同辈<li>元素的选中
	            var bg_num = $("#" + skinName).attr("rel");
	            $("#skin_bg").attr("style", "background-image:url(img/bg/" + bg_num + ".jpg)"); //设置不同皮肤  
	            $.cookie("MyCssSkin", skinName, { path: '/', expires: 10 });  //保存Cookie  
	        }
	        $('#skin span').toggle(function(){
	        	$(this).next('ul').fadeIn().siblings().text('关闭');
	        },function(){
	        	$(this).next('ul').fadeOut().siblings().text('换肤');
	        });
	    });
	});*/
});

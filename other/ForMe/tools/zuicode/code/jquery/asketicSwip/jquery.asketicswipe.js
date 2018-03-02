(function($){
  $.fn.asketicSwipe = function(settings) {
            
    var _settings = {
      'cycle'      : false,          //Cycle the gallery
      'scale'      : 1,              //To streach out low-res images on mobile web (for example same size x2 smaller images)
      'tolerance'  : 0.25,           //% of width for next image
      'time'       : 300,            //Transition time
      'touchSensitivity' : 10,      //Vertical sensitivity,
      'fitContainer' : false,       //scale images to fit container
      'fitContainerMargin': 10,     //px margin if images fitted to container
      'fitContainerUpscale': false  //if upscaled when fitContainer is true
    }
        
    return this.each(function(){        
        
      var _container  = $(this);
      var _strip      = $(this).find('ul:first-child');
      var _images     = null;
      var _firstImage  = null;
      var _lastImage  = null;
      var _imageCount = 0;
      var _imageIndex = 0;
      var _width      = 0;
      var _widthHalf  = 0;
      var _height     = 0;
      var _handler    = null;
      var _handlerDiv = null;
      var _mouseDown  = false;
      var _mouseStartX= 0;
      var _mouseLastX = 0;
      var _mouseStartY= 0;
      var _mouseLastY = 0;
      var _swipe      = false;
      var _useCss3    = !$.browser.msie && !navigator.userAgent.toLowerCase().match(/(blackberry|android|opera\ mini)/);
      var _isOperaMini = navigator.userAgent.toLowerCase().match(/(opera\ mini|symbian|nokia)/);
      var _cycleTimeout = 0;
      var _enabled = true;
      
      if(settings) { 
        $.extend(_settings, settings);
      }
      
      //attach handler
      _handler = $('<div id="asketic-swipe-handler"></div>').prependTo(_container);
      _handlerDiv = _handler[0];
      _handler.css('cursor', 'pointer');
      _container.css('position', 'relative');
      _handler.css('position', 'absolute');
      _strip.css('position', 'absolute');
      
      _strip.css('width', '99999px');
      _strip.css('padding', '0');
      _strip.css('margin', '0');
      
      _strip.css('z-index', '1');
      _handler.css('z-index', '100');
      
      if($.browser.msie)
      {
        //IE hack (IE tests if actualy overlaps elements)
        _handler.css('background-color', 'red');
        _handler.css('filter', 'alpha(opacity=0)');
      }
      
      _container.asketicSwipe.refresh = function(){
        _images     = _strip.find('li');
        _imageCount = _images.length;
        _width      = _container.width();
        _height     = _container.height();
        _widthHalf = _width/2;
        
        if(_settings.cycle)
        {
          if(_lastImage)
          {
            _lastImage.remove();
          }
          if(_firstImage)
          {
            _firstImage.remove();
          }
        
          _images     = _strip.find('li');
          _imageCount = _images.length;
          
          _lastImage  = $(_images[_images.length-1]).clone().prependTo(_strip);
          _firstImage = $(_images[0]).clone().appendTo(_strip);
          _images     = _strip.find('li');
          _imageCount = _images.length;
          _imageIndex = 1;
        }
        
        _strip.css('left', -_imageIndex * _width);
        
        _handler.css('width', _width);
        _handler.css('height', _height);
        
        //Position images in the centre of container
        _images.each(function(){
          var li = $(this);
          var img = li.find(':first-child');
          var imageWidth = img.width() * _settings.scale;
          var imageHeight = img.height() * _settings.scale;
          
          //Scale to fit the container
          if(_settings.fitContainer)
          {
            var maxImageWidth = _width - _settings.fitContainerMargin * 2;
            var maxImageHeight = _height - _settings.fitContainerMargin * 2;
            
            var ratioWH = imageWidth/imageHeight;
            var ratioHW = imageHeight/imageWidth;
            
            //downscale
            if(maxImageHeight < imageHeight ||
               maxImageWidth < imageWidth ||
               _settings.fitContainerUpscale)
            {
              if(maxImageWidth < imageWidth ||
                 _settings.fitContainerUpscale &&
                 maxImageWidth > imageWidth &&
                 maxImageWidth * ratioHW <= maxImageHeight)
              {
                imageWidth = maxImageWidth
                imageHeight = imageWidth * ratioHW;
              }
              
              if(maxImageHeight < imageHeight ||
                 _settings.fitContainerUpscale &&
                 maxImageHeight > imageHeight &&
                 maxImageHeight * ratioWH <= maxImageWidth)
              {
                imageHeight = maxImageHeight
                imageWidth = imageHeight * ratioWH;
              }
            }
            
          }
          
          li.css('width', _width);
          li.css('height', _height);
          li.css('list-style', 'none');
          li.css('padding', 0);
          li.css('margin', 0);
          li.css('float', 'left');
          
          img.css('display', 'block');
          img.css('z-index', '1');
          img.css('margin-left', (_width - imageWidth)/2);
          img.css('margin-top', (_height - imageHeight)/2);
          img.css('width', imageWidth);
          img.css('height', imageHeight);
        });
        
        //Disable slection
        var everyObjectInside = _container.find('*');
        everyObjectInside.css('-webkit-user-select', 'none');
        everyObjectInside.css('-khtml-user-select', 'none');
        everyObjectInside.css('-moz-user-select', 'none');
        everyObjectInside.css('-o-user-select', 'none');
        everyObjectInside.css('user-select', 'none');
        
        handleOperaMini();
      }
      _container.asketicSwipe.refresh();
      
      //Handler events
      _handler.mousedown(function(event){
        if(!_enabled) return false;
        if(_swipe && !event.swipe) return false; //disable mouse when using swipe
        
        if(!_mouseDown)
        {
            removeTransitions();            
            _mouseDown = true;
            _mouseStartX = event.pageX;
        }
        return false;
      });
      
      _handler.mousemove(function(event){
        if(!_enabled) return false;
        if(_swipe && !event.swipe) return false; //disable mouse when using swipe
        
        if(_mouseDown)
        {
            _mouseLastX = event.pageX;
            var deltaX = _mouseLastX - _mouseStartX;
            _strip.css('left', -_imageIndex * _width + deltaX );
        }
        return false; 
      });
      
      _handler.mouseup(function(event){
        if(!_enabled) return false;
        if(_swipe && !event.swipe) return false; //disable mouse when using swipe
        
        if(!_mouseDown) return false;
        _mouseDown = false;
        
        var deltaX = event.pageX - _mouseStartX;
        if(!deltaX) return false;
       
        if(-deltaX > _widthHalf - _width * _settings.tolerance)
        {
          _container.asketicSwipe.next();
        }
        else if(deltaX > _widthHalf - _height * _settings.tolerance){
          _container.asketicSwipe.prev();
        }
        else
        {
          animateSlide();
        }
        
        return false; 
      });
      
      _handler.mouseout(function(event){
        if(!_enabled) return false;
        
        _handler.trigger({
                  type:"mouseup",
                  swipe: true,
                  pageX: _mouseLastX
                 });
        
        return false;
      });
      
      function removeTransitions()
      {
          var strCss = '';
          _strip.css('-transition', strCss);
          _strip.css('-moz-transition', strCss);
          _strip.css('-webkit-transition', strCss);
          _strip.css('-o-transition', strCss);
          _strip.css('-ms-transition', strCss);
      }
      
      function animateSlide()
      {
        if(!_isOperaMini)
        {
          if(_useCss3)
          {
            var strCss = 'left ' + (_settings.time/1000).toString() + 's';
            _strip.css('-transition', strCss);
            _strip.css('-moz-transition', strCss);
            _strip.css('-webkit-transition', strCss);
            _strip.css('-o-transition', strCss);
            _strip.css('-ms-transition', strCss);
            
            _strip.css('left', -_imageIndex * _width);
          }
          else
          {
            _strip.animate({left: -_imageIndex * _width}, _settings.time);
          }
        }
        
        if(_settings.cycle)
        {
          clearTimeout(_cycleTimeout);
          _cycleTimeout = setTimeout(function(){
              if(_imageIndex == 0)
              {
                _imageIndex = _imageCount - 2;
              }
              else if(_imageIndex == _imageCount-1)
              {
                _imageIndex = 1;
              }
              
              removeTransitions();
              if(!_isOperaMini)
              {
                _strip.css('left', -_imageIndex * _width);
              }
              
            }, _settings.time + 20);
        }
        
        handleOperaMini();
      }
      
      function handleOperaMini()
      {
        if(_isOperaMini)
        {
          var iVisible = 0;
          _strip.css('left', 0); 
          _strip.find('li').each(function(){
            if(_imageIndex == iVisible)
            {
              $(this).css('display', 'block'); 
            }
            else
            {
              $(this).css('display', 'none');  
            }
            console.log(iVisible, _imageIndex);
            iVisible++;
          });
          
        }
      }
      
      function triggerMoveEvent(strType)
      {
        var realImageIndex = _container.asketicSwipe.getImageIndex();
        var realImageCount = _container.asketicSwipe.getImageCount();
       
        _container.trigger(strType, [ realImageIndex, realImageCount ]);
      }
      
      _container.asketicSwipe.getImageCount = function()
      {
        var realImageCount = _imageCount;
        
        if(_settings.cycle)
        {
          realImageCount -= 2;
        }
        
        return realImageCount;
      }
      
      _container.asketicSwipe.getImageIndex = function()
      {
        var realImageIndex = _imageIndex;

        if(_settings.cycle)
        {
          if(realImageIndex == 0)
          {
            realImageIndex = _imageCount - 2;
          }
          else if(realImageIndex == _imageCount-1)
          {
            realImageIndex = 1;
          }
          
          realImageIndex -= 1;
        }
        
        return realImageIndex;
      }
      
      _container.asketicSwipe.moveTo = function(newImageIndex, animate)
      {
        if(_settings.cycle)
        {
          newImageIndex += 1;
        }
        
        _imageIndex = Math.min(Math.max(0, newImageIndex), _imageCount);
        
        if(animate && !_isOperaMini)
        {
          animateSlide();
        }
        else
        {
          removeTransitions();
          _strip.css('left', -_imageIndex * _width);
        }
        
        handleOperaMini();
      }
      
      _container.asketicSwipe.resize = function(widthOption, heightOption, animateOption, timeOption, easingOption)
      {
        _container.asketicSwipe.setEnabled(false);
        
        var tempIndex = _container.asketicSwipe.getImageIndex();
       
        if(animateOption)
        {
          if(!easingOption)
          {
            easingOption = 'linear';
          }
          
          _container.find('li').css('visibility', 'hidden');
          
          var img = _container.find('li img');
          img = $(img[_imageIndex]);
          img.css('visibility', 'visible');
          
          var ratioWidth = widthOption/_width;
          var ratioHeight = heightOption/_height;
          
          _strip.animate({
            left: ( -_imageIndex * widthOption )
          }, timeOption, easingOption);
          
          img.animate({
            width: ratioWidth * parseFloat(img.css('width')),
            height: ratioHeight * parseFloat(img.css('height')),
            marginLeft: ratioWidth * parseFloat(img.css('margin-left')),
            marginTop: ratioHeight * parseFloat(img.css('margin-top'))
          }, timeOption, easingOption);
          
          _container.find('li').animate({
              width: widthOption,
              height: heightOption
            }, timeOption, easingOption);
          
          _container.animate({
              width: widthOption,
              height: heightOption
            }, timeOption, easingOption, function() {
                _strip.css('left', 'auto');
                _container.find('li').css('visibility', 'visible');
                _container.asketicSwipe.refresh();
                _container.asketicSwipe.moveTo(tempIndex);
                _container.trigger('resizeComplete', [ widthOption, heightOption ]);  
            });
        }
        else
        {
          _container.css('width', widthOption);
          _container.css('height', heightOption);
          _container.asketicSwipe.refresh();
          _container.asketicSwipe.moveTo(tempIndex);
          _container.trigger('resizeComplete', [ widthOption, heightOption ]);  
        }
        
        _container.asketicSwipe.setEnabled(true);
      }
      
      _container.asketicSwipe.next = function()
      {
        _imageIndex++;
        _imageIndex = _imageIndex >= _imageCount ? _imageCount-1 : _imageIndex;
        
        animateSlide();
        triggerMoveEvent('nextComplete');
      }
      
      _container.asketicSwipe.setEnabled = function(enabled)
      {
        if(enabled)
        {
          _container.removeClass('disabled');
        }
        else
        {
          _container.addClass('disabled');  
        }
        
        _enabled = enabled;
        return _enabled;
      }
      
      _container.asketicSwipe.getEnabled = function()
      {
        return _enabled;
      }
      
      _container.asketicSwipe.prev = function()
      {
        _imageIndex--;
        _imageIndex = _imageIndex < 0 ? 0 : _imageIndex;
        
        animateSlide();
        triggerMoveEvent('prevComplete');
      }
      
      
      //Browser supports swipe
      if(_handlerDiv.addEventListener &&
         navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|blackberry|android)/))
      {
        _swipe = true;
        
        function touchStart(event)
        {
          _mouseStartY = _mouseLastY = event.targetTouches[0].pageY;
          
          _handler.trigger({
                  type:"mousedown",
                  swipe: true,
                  pageX: event.targetTouches[0].pageX
                 });
        }
        
        function touchMove(event)
        {
          _mouseStartY = event.targetTouches[0].pageY;
          if( Math.abs(_mouseLastY - _mouseStartY) < _settings.touchSensitivity )
          {
            event.preventDefault();	
          }
          
          _handler.trigger({
                  type:"mousemove",
                  swipe: true,
                  pageX: event.targetTouches[0].pageX
                 });
        }
        
        function touchEnd(event)
        {
          _handler.trigger({
                  type:"mouseup",
                  swipe: true,
                  pageX: _mouseLastX
                 });
        }
        
        function touchCancel(event)
        {
          _handler.trigger({
                  type:"mouseup",
                  swipe: true,
                  pageX: _mouseLastX
                 });
        }
        
        // Add gestures to all swipable areas
        _handlerDiv.addEventListener("touchstart", touchStart, false);
        _handlerDiv.addEventListener("touchmove", touchMove, false);
        _handlerDiv.addEventListener("touchend", touchEnd, false);
        _handlerDiv.addEventListener("touchcancel", touchCancel, false);
      }
      
    });
    
  };
})(jQuery);
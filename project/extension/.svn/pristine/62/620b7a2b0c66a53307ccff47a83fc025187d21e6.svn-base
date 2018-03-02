/**
 * Created by youku on 2015/10/21.
 */
(function(){
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            var args = Array.prototype.slice.call(arguments, 1)
            var f2bind = this
            var fnop = function () {}
            var bound = function () {
                return f2bind.apply(this instanceof fnop && oThis
                        ? this
                        : oThis,
                    args.concat(Array.prototype.slice.call(arguments)))
            }

            fnop.prototype = this.prototype
            bound.prototype = new fnop()

            return bound
        }
    };
    function Slider(){
        this.threshold=50;
        this.pages = $(".pages");
        this.page = $(".page")
    }
    Slider.prototype = {
        init:function(){
            var el = this.pages[0];
            ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'mouseup', 'mousemove', 'mousedown'].forEach(function(ev) {
                el.addEventListener(ev, this, false)
            }.bind(this));
            this.page.each(function(i,item){
                if(i==0){
                    $(item).addClass("current");
                    item.style.zIndex = 10;
                    item.style.webkitTransform = 'translate3d(0, 0 , 0);';
                    this.curPage = item;
                }else{
                    item.style.zIndex = 10+10*i;
                    item.style.webkitTransform="translate3d(0,100%,0)";
                }
            }.bind(this));
        },
        handleEvent:function(ev){
            switch (ev.type) {
                case 'touchstart':
                case 'mousedown':
                    this.start(ev)
                    break
                case 'touchmove':
                case 'mousemove':
                    this.move(ev)
                    break
                case 'touchend':
                case 'touchcancel':
                case 'mouseup':
                    this.end(ev)
            }
        },
        start: function(ev) {
            if (this.sliding)
                return
            var touch  = ev.touches ? ev.touches[0] : ev
            this.pageX = touch.pageX
            this.pageY = touch.pageY
        },
        move: function(ev) {
            ev.preventDefault()

            if (this.sliding)
                return;
            var touch  = ev.touches ? ev.touches[0] : ev;
            this.distX = touch.pageX - this.pageX;
            this.distY = touch.pageY - this.pageY;
        },
        end: function() {
            if (this.sliding)
                return

            var prevPage = this.curPage.previousElementSibling,
                nextPage = this.curPage.nextElementSibling

            if (prevPage && this.distY > this.threshold ) {
                this.prev(prevPage)
            } else if (nextPage && this.distY < -this.threshold ) {
                this.next(nextPage)
            }

            this.pageX = this.pageY = this.distX = this.distY = undefined
        },
        prev: function(el) {
            this.turn(el, true)
        },
        next: function(el) {
            this.turn(el, false)
        },
        turn: function(el, prev) {
            el.style.webkitTransform = prev ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)'
            el.style.zIndex = parseInt(el.style.zIndex)+1;
            el.style.webkitTransition = 'all 0.3s'
            this.curPage.style.webkitTransition = 'all 0.3s'
            $(el).one('webkitTransitionEnd', function() {
                el.style.webkitTransition = ''
                this.curPage.style.webkitTransition = ''
                el.style.zIndex = parseInt(el.style.zIndex)-1;
                $(this.curPage).removeClass('current');
                var cur = prev?$(".cur")[0].previousElementSibling:$(".cur")[0].nextElementSibling;
                $(".dot").removeClass("cur");
                $(cur).addClass("cur");
                $(el).addClass('current')
                this.curPage = el
                this.sliding = false
            }.bind(this))

            setTimeout(function() {
                this.sliding = true
                el.style.webkitTransform = 'translate3d(0, 0, 0)'
                this.curPage.style.webkitTransform = prev ? 'translate3d(0, 100%, 0)' : 'translate3d(0, 0, 0)'
            }.bind(this), 0)
        },
    }
    new Slider().init();
})();
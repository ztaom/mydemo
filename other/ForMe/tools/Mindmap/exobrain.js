(function( $ ) {
  $.fn.exobrain = function() {
    var defaultMap = {"nodes":[{"root":true,"x":960,"y":533,"id":"1f8c732a-bc78-29a1-aa54-26a704d7745e","text":"Welcome to Exobrain"},{"x":1156,"y":412,"gradient":{"start":"rgb(190, 150, 240)","end":"rgb(35, 25, 65)"},"depth":1,"id":"639611c9-1ccc-18b0-4c60-bfa104d25450","color":"#be96f0","text":"to make a new idea"},{"x":1284,"y":320,"gradient":{"start":"rgb(190, 150, 240)","end":"rgb(35, 25, 65)"},"depth":2,"id":"89e37592-944f-4f21-1e57-d8ebfeb68286","color":"#a481d2","text":"click and drag "},{"x":1218,"y":615,"gradient":{"start":"rgb(0, 185, 240)","end":"rgb(5, 45, 75)"},"depth":1,"id":"83cf7c32-fecb-19f4-f6d7-0c1f16d76347","color":"#00b9f0","text":"to move an idea"},{"x":1289,"y":522,"gradient":{"start":"rgb(0, 185, 240)","end":"rgb(5, 45, 75)"},"depth":2,"id":"8629292c-74ff-f98a-bafb-3e794ae1f3ab","color":"#00a1d4","text":"click, hold, and wait"},{"x":1426,"y":642,"gradient":{"start":"rgb(0, 185, 240)","end":"rgb(5, 45, 75)"},"depth":3,"id":"356c9551-51fd-35dd-ec45-00d524c6edec","color":"#018ebd","text":"then drag"},{"x":973,"y":710,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":1,"id":"978840bf-6414-7df1-e191-8507d7998a1e","color":"#ffc800","text":"to connect two ideas"},{"x":828,"y":859,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":2,"id":"f3a8adcf-69a2-54b5-adf8-944d078259e6","color":"#ffb000","text":"click and drag"},{"x":1173,"y":856,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":2,"id":"32ef92ee-4211-5212-8f28-5536454e4957","color":"#ffb000","text":"and wait for the link"},{"x":668,"y":649,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":1,"id":"91c77b81-1954-98cd-b1fc-4660eb460ecf","color":"#ff6e3c","text":"to delete a connection"},{"x":511,"y":550,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":2,"id":"8209dd82-3f30-b07c-cb68-7b4c69314c8a","color":"#e55b32","text":"mouse over any line"},{"x":385,"y":457,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":2,"id":"e5dab741-d669-fa98-de7c-9495981ae048","color":"#e55b32","text":"look for the scissors"},{"x":868,"y":410,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":1,"id":"d88b49ee-9057-b183-59b5-7b890e57c4d7","color":"#9bd29b","text":"colors grow darker"},{"x":696,"y":303,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":2,"id":"9413a3e4-af8e-eaed-e955-2955c30aa86a","color":"#87bc8b","text":"as you go"},{"x":965,"y":290,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":2,"id":"ee82a4af-ab5d-edc1-5a13-ecf9758a48d3","color":"#87bc8b","text":"every new idea"},{"x":881,"y":174,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":3,"id":"08a1ce41-526f-14e8-c875-0c7e0135635a","color":"#77aa7d","text":"gets a new color"},{"x":634,"y":426,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":3,"id":"7cbff048-b9a9-fd3b-641e-15bde9cc9afc","color":"#cf4c29","text":"and click"},{"x":1224,"y":223,"gradient":{"start":"rgb(190, 150, 240)","end":"rgb(35, 25, 65)"},"depth":3,"id":"08439e9f-56ff-da3f-2f02-1ded8d2d5729","color":"#8e6fba","text":"from any existing idea"}],"edges":[{"from":{"root":true,"x":960,"y":533,"id":"1f8c732a-bc78-29a1-aa54-26a704d7745e","text":"Welcome to Exobrain"},"to":{"x":1156,"y":412,"gradient":{"start":"rgb(190, 150, 240)","end":"rgb(35, 25, 65)"},"depth":1,"id":"639611c9-1ccc-18b0-4c60-bfa104d25450","color":"#be96f0","text":"to make a new idea"}},{"from":{"x":1156,"y":412,"gradient":{"start":"rgb(190, 150, 240)","end":"rgb(35, 25, 65)"},"depth":1,"id":"639611c9-1ccc-18b0-4c60-bfa104d25450","color":"#be96f0","text":"to make a new idea"},"to":{"x":1284,"y":320,"gradient":{"start":"rgb(190, 150, 240)","end":"rgb(35, 25, 65)"},"depth":2,"id":"89e37592-944f-4f21-1e57-d8ebfeb68286","color":"#a481d2","text":"click and drag "}},{"from":{"root":true,"x":960,"y":533,"id":"1f8c732a-bc78-29a1-aa54-26a704d7745e","text":"Welcome to Exobrain"},"to":{"x":1218,"y":615,"gradient":{"start":"rgb(0, 185, 240)","end":"rgb(5, 45, 75)"},"depth":1,"id":"83cf7c32-fecb-19f4-f6d7-0c1f16d76347","color":"#00b9f0","text":"to move an idea"}},{"from":{"x":1218,"y":615,"gradient":{"start":"rgb(0, 185, 240)","end":"rgb(5, 45, 75)"},"depth":1,"id":"83cf7c32-fecb-19f4-f6d7-0c1f16d76347","color":"#00b9f0","text":"to move an idea"},"to":{"x":1289,"y":522,"gradient":{"start":"rgb(0, 185, 240)","end":"rgb(5, 45, 75)"},"depth":2,"id":"8629292c-74ff-f98a-bafb-3e794ae1f3ab","color":"#00a1d4","text":"click, hold, and wait"}},{"from":{"x":1289,"y":522,"gradient":{"start":"rgb(0, 185, 240)","end":"rgb(5, 45, 75)"},"depth":2,"id":"8629292c-74ff-f98a-bafb-3e794ae1f3ab","color":"#00a1d4","text":"click, hold, and wait"},"to":{"x":1426,"y":642,"gradient":{"start":"rgb(0, 185, 240)","end":"rgb(5, 45, 75)"},"depth":3,"id":"356c9551-51fd-35dd-ec45-00d524c6edec","color":"#018ebd","text":"then drag"}},{"from":{"root":true,"x":960,"y":533,"id":"1f8c732a-bc78-29a1-aa54-26a704d7745e","text":"Welcome to Exobrain"},"to":{"x":973,"y":710,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":1,"id":"978840bf-6414-7df1-e191-8507d7998a1e","color":"#ffc800","text":"to connect two ideas"}},{"from":{"x":973,"y":710,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":1,"id":"978840bf-6414-7df1-e191-8507d7998a1e","color":"#ffc800","text":"to connect two ideas"},"to":{"x":828,"y":859,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":2,"id":"f3a8adcf-69a2-54b5-adf8-944d078259e6","color":"#ffb000","text":"click and drag"}},{"from":{"x":973,"y":710,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":1,"id":"978840bf-6414-7df1-e191-8507d7998a1e","color":"#ffc800","text":"to connect two ideas"},"to":{"x":1173,"y":856,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":2,"id":"32ef92ee-4211-5212-8f28-5536454e4957","color":"#ffb000","text":"and wait for the link"}},{"from":{"root":true,"x":960,"y":533,"id":"1f8c732a-bc78-29a1-aa54-26a704d7745e","text":"Welcome to Exobrain"},"to":{"x":668,"y":649,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":1,"id":"91c77b81-1954-98cd-b1fc-4660eb460ecf","color":"#ff6e3c","text":"to delete a connection"}},{"from":{"x":668,"y":649,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":1,"id":"91c77b81-1954-98cd-b1fc-4660eb460ecf","color":"#ff6e3c","text":"to delete a connection"},"to":{"x":511,"y":550,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":2,"id":"8209dd82-3f30-b07c-cb68-7b4c69314c8a","color":"#e55b32","text":"mouse over any line"}},{"from":{"root":true,"x":960,"y":533,"id":"1f8c732a-bc78-29a1-aa54-26a704d7745e","text":"Welcome to Exobrain"},"to":{"x":868,"y":410,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":1,"id":"d88b49ee-9057-b183-59b5-7b890e57c4d7","color":"#9bd29b","text":"colors grow darker"}},{"from":{"x":868,"y":410,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":1,"id":"d88b49ee-9057-b183-59b5-7b890e57c4d7","color":"#9bd29b","text":"colors grow darker"},"to":{"x":696,"y":303,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":2,"id":"9413a3e4-af8e-eaed-e955-2955c30aa86a","color":"#87bc8b","text":"as you go"}},{"from":{"x":868,"y":410,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":1,"id":"d88b49ee-9057-b183-59b5-7b890e57c4d7","color":"#9bd29b","text":"colors grow darker"},"to":{"x":965,"y":290,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":2,"id":"ee82a4af-ab5d-edc1-5a13-ecf9758a48d3","color":"#87bc8b","text":"every new idea"}},{"from":{"x":965,"y":290,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":2,"id":"ee82a4af-ab5d-edc1-5a13-ecf9758a48d3","color":"#87bc8b","text":"every new idea"},"to":{"x":881,"y":174,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":3,"id":"08a1ce41-526f-14e8-c875-0c7e0135635a","color":"#77aa7d","text":"gets a new color"}},{"from":{"x":1218,"y":615,"gradient":{"start":"rgb(0, 185, 240)","end":"rgb(5, 45, 75)"},"depth":1,"id":"83cf7c32-fecb-19f4-f6d7-0c1f16d76347","color":"#00b9f0","text":"to move an idea"},"to":{"x":973,"y":710,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":1,"id":"978840bf-6414-7df1-e191-8507d7998a1e","color":"#ffc800","text":"to connect two ideas"}},{"from":{"x":828,"y":859,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":2,"id":"f3a8adcf-69a2-54b5-adf8-944d078259e6","color":"#ffb000","text":"click and drag"},"to":{"x":828,"y":859,"gradient":{"start":"rgb(255, 200, 0 )","end":"rgb(255, 60, 0)"},"depth":2,"id":"f3a8adcf-69a2-54b5-adf8-944d078259e6","color":"#ffb000","text":"click and drag"}},{"from":{"x":511,"y":550,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":2,"id":"8209dd82-3f30-b07c-cb68-7b4c69314c8a","color":"#e55b32","text":"mouse over any line"},"to":{"x":634,"y":426,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":3,"id":"7cbff048-b9a9-fd3b-641e-15bde9cc9afc","color":"#cf4c29","text":"and click"}},{"from":{"x":881,"y":174,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":3,"id":"08a1ce41-526f-14e8-c875-0c7e0135635a","color":"#77aa7d","text":"gets a new color"},"to":{"x":881,"y":174,"gradient":{"start":"rgb(155, 210, 155)","end":"rgb(40, 80, 60)"},"depth":3,"id":"08a1ce41-526f-14e8-c875-0c7e0135635a","color":"#77aa7d","text":"gets a new color"}},{"from":{"x":1284,"y":320,"gradient":{"start":"rgb(190, 150, 240)","end":"rgb(35, 25, 65)"},"depth":2,"id":"89e37592-944f-4f21-1e57-d8ebfeb68286","color":"#a481d2","text":"click and drag "},"to":{"x":1224,"y":223,"gradient":{"start":"rgb(190, 150, 240)","end":"rgb(35, 25, 65)"},"depth":3,"id":"08439e9f-56ff-da3f-2f02-1ded8d2d5729","color":"#8e6fba","text":"from any existing idea"}},{"from":{"x":511,"y":550,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":2,"id":"8209dd82-3f30-b07c-cb68-7b4c69314c8a","color":"#e55b32","text":"mouse over any line"},"to":{"x":385,"y":457,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":2,"id":"e5dab741-d669-fa98-de7c-9495981ae048","color":"#e55b32","text":"look for the scissors"}},{"from":{"x":634,"y":426,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":3,"id":"7cbff048-b9a9-fd3b-641e-15bde9cc9afc","color":"#cf4c29","text":"and click"},"to":{"x":385,"y":457,"gradient":{"start":"rgb(255, 110, 60 )","end":"rgb(100, 0, 0)"},"depth":2,"id":"e5dab741-d669-fa98-de7c-9495981ae048","color":"#e55b32","text":"look for the scissors"}}],"color":2};
    this.each(function() {
      var VERSION = 1;
      Backbone.sync = function() { throw new Error('No Syncing'); };

      var track = function(action, label, value, noninteraction) {
        _gaq.push(['_trackEvent', 'app', action, label, value, noninteraction]);
      };

      var dom = $(this);
      var paper = Raphael(this, dom.width(), dom.height());

      $(window).on('resize', function() {
        paper.setSize(dom.width(), dom.height());
      });

      var _original_colors = [
        {start: "rgb(190, 150, 240)", end: "rgb(35,  25, 65)"},
        {start: "rgb(0,   185, 240)", end: "rgb(5,   45, 75)"},
        {start: "rgb(155, 210, 155)", end: "rgb(40,  80, 60)"},
        {start: "rgb(255, 200, 0  )", end: "rgb(255, 60, 0)" },
        {start: "rgb(255, 110, 60 )", end: "rgb(100, 0,  0)" }
      ];

      var gradients = new (Backbone.Collection.extend({
        initialize: function() {
          this.on('remove', this.checkEmpty, this);
        },
        checkEmpty: function() {
          if (this.size() === 0) {
            this.reset(_original_colors);
          }
        }
      }))(_original_colors);

      var isTouch = false;
      (function() {
        var el = document.createElement('div');
        el.setAttribute('ontouchstart', 'return');
        isTouch = typeof el.ontouchstart === "function";
      })();

      var pressEvent   = 'mousedown';
      var moveEvent    = 'mousemove';
      var releaseEvent = 'mouseup';

      if (isTouch) {
        pressEvent   = 'touchstart';
        moveEvent    = 'touchmove';
        releaseEvent = 'touchend';
      }

      var getMouseX = function(event) {
        return isTouch ? event.originalEvent.touches[0].pageX : event.clientX;
      }

      var getMouseY = function(event) {
        return isTouch ? event.originalEvent.touches[0].pageY : event.clientY;
      }

      // Generate four random hex digits.
      function S4() {
         return (Math.floor((1+Math.random())*0x10000)).toString(16).substring(1);
      }

      // Generate a pseudo-GUID by concatenating random hexadecimal.
      function guid() {
         return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
      }

      var Node = Backbone.Model.extend({
        initialize: function(attributes) {
          if (!this.get('id')) {
            this.set({id: guid()}, {silent: true});
          }
          if (attributes.gradient) {
            this.set({gradient: (new Backbone.Model(attributes.gradient))});
          }
        },
        x: function() {
          return this.get('x');
        },
        y: function() {
          return this.get('y');
        },
        root: function() {
          return this.get('root') === true;
        },
        ghost: function() {
          return this.get('ghost') === true;
        },
        gradient: function() {
          return this.get('gradient');
        },
        color: function() {
          if (this.root()) {
            return '#ffffff';
          } else if (this.get('color')) {
            return this.get('color');
          } else {
            var k = 1.2;
            var pct = 1 - Math.pow(k, (this.depth() - 1) * -1);

            var g = this.gradient();
            var s = Raphael.color(g.get('start'));
            var e = Raphael.color(g.get('end'));

            var dr = (e.r-s.r)*pct,
                dg = (e.g-s.g)*pct,
                db = (e.b-s.b)*pct;

            var color = Raphael.rgb(s.r+dr, s.g+dg, s.b+db);
            this.set({color: color});
            return color;
          }
        },
        depth: function() {
          if (this.get('depth')) {
            return this.get('depth');
          } else {
            return 0;
          }
        },
        dead: function() {
          var text = this.get('text');
          return text === undefined || text === null || text === "";
        },
        destroy: function() {
          // no sync destroy
          this.trigger('destroy', this);
        }
      });

      var Edge = Backbone.Model.extend({
        initialize: function(attributes) {
          this.get('from').on('destroy', function() { this.trigger('destroy', this); }, this);
          this.get( 'to' ).on('destroy', function() { this.trigger('destroy', this); }, this);
          this.get('from').on('change', function() { this.trigger('change', this); }, this);
          this.get( 'to' ).on('change', function() { this.trigger('change', this); }, this);
        },
        fromX: function() { return this.get('from').x(); },
        toX:   function() { return this.get('to').x(); },
        fromY: function() { return this.get('from').y(); },
        toY:   function() { return this.get('to').y(); },
        color: function() {
          if (this.from().root() || this.to().root()) {
            return '#ccc';
          }
          var fc = Raphael.color(this.from().color());
          var tc = Raphael.color(this.to().color());

          var r = (fc.r + tc.r)/2.0;
          var g = (fc.g + tc.g)/2.0;
          var b = (fc.b + tc.b)/2.0;

          return Raphael.rgb(r,g,b);
        },
        from: function() {
          return this.get('from');
        },
        to: function() {
          return this.get('to');
        },
        destroy: function() {
          // no sync destroy
          this.trigger('destroy', this);
        }
      });

      var NodesCollection = Backbone.Collection.extend({
        model: Node
      });

      var EdgesCollection = Backbone.Collection.extend({
        model: Edge
      });

      var PaperView = new (Backbone.View.extend({
        events: function() {
          var e = {};
          e[pressEvent+" svg"] = "press";
          e[releaseEvent+" svg"] = "release";
          return e;
        },
        press:   function(event) { this.trigger('press',   this, event); },
        release: function(event) { this.trigger('release', this, event); }
      }))({el: dom});


      var NodeView = Backbone.View.extend({
        className: 'node-container',
        events: function() {
          var e = {
            'keypress  .node': 'keypress',
            'keyup     .node': 'keyup',
            'blur      .node': 'deEdit',
            'click    .close': 'destroy'
          };
          e[pressEvent] = 'press';
          e[releaseEvent] = 'release';
          return e;
        },
        initialize: function(options) {
          if (this.model.root())  { this.$el.addClass('root'); }
          if (this.model.ghost()) { this.$el.addClass('ghost'); }
          this.cx = this.model.x();
          this.cy = this.model.y();

          this.model.on('destroy', this.remove, this);
          this.model.on('change', this.render, this);
          this.$el.html("<div class='node'></div><div class='close'>&#215</div>");
          dom.append(this.el);
          this.$('.node').text(this.model.get('text'));
          this.edit();
          this.render();
        },
        render: function() {
          this.$el.attr('style', [
            "top: "+this.y()+"px",
            "left: "+this.x()+"px",
            "background-color: "+this.color()
          ].join(';'));
          this.$el.toggleClass('dead', this.dead());
        },
        x: function() {
          return this.model.x() - this.width()/2.0;
        },
        y: function() {
          return this.model.y() - this.height()/2.0;
        },
        width: function() {
          return (this.$('.node').width()+13*2);
        },
        height: function() {
          return (this.$('.node').height()+6*2);
        },
        color: function() {
          return this.model.color();
        },
        keyup: function(event) {
          if (event.keyCode === 27) {
            this.keyDeEdit();
          } else {
            this.keyEditing();
          }
        },
        keypress: function(event) {
          if (event.keyCode === 13) {
            this.keyDeEdit();
          } else {
            this.keyEditing();
          }
        },
        keyDeEdit: function() {
          this.deEdit();
          this.$el.blur();
        },
        keyEditing: function() {
          this.model.set({text: this.$('.node').text()});
          this.render();
        },
        press: function(event) {
          this.trigger('press', this, event);
        },
        release: function(event) {
          this.trigger('release', this, event);
        },
        startMoving: function() {
          this.$el.addClass('moving');
        },
        stopMoving: function() {
          this.$el.removeClass('moving');
        },
        deEdit: function() {
          this.$('.node').text(this.$('.node').text().replace("\n",""));
          this.$('.node').attr('contenteditable', false);
          if (this.$('.node').text() === "") {
            if (this.model.root()) {
              this.$('.node').text('Untitled');
              this.render();
            } else {
              this.destroy();
            }
          }
          this.trigger('deEdit', this);
          this.model.set({text: this.$('.node').text()});
        },
        dead: function() {
          return this.model.dead();
        },
        edit: function() {
          this.$('.node').attr('contenteditable', true);
          this.$('.node').focus();
          document.execCommand('selectAll', false, null);
        },
        remove: function() {
          this.$el.remove();
        },
        destroy: function(e) {
          if (e) { e.stopPropagation(); }
          this.model.destroy();
        }
      });

      var EdgeView = Backbone.View.extend({
        events: {
          'click': 'destroy'
        },
        initialize: function() {
          this.model.on('destroy', this.remove, this);
          this.model.on('change', this.render, this);
          this.render();
        },
        render: function() {
          if (this.raphEl && this.raphEl.removed) { return this; }

          this.remove();

          this.raphBackdrop = paper.path([
            "M", this.model.fromX(), ",", this.model.fromY(),
            "L", this.model.toX(), ',', this.model.toY()
          ].join(''));
          $(this.raphBackdrop.node).attr('class', 'edge-backdrop');
          this.setElement(this.raphBackdrop.node);
          $(this.raphBackdrop.node).on('click', _.bind(this.destroy, this));

          this.raphEl = paper.path([
            "M", this.model.fromX(), ",", this.model.fromY(),
            "L", this.model.toX(), ',', this.model.toY()
          ].join(''));
          this.raphEl.attr({'stroke': this.model.color()});

          $(this.raphEl.node).attr('class', 'edge');
          
          return this;
        },
        remove: function() {
          if (this.raphEl && this.raphEl.removed !== true) {
            this.raphEl.remove();
            this.raphBackdrop.remove();
          }
        },
        destroy: function() {
          this.model.destroy();
        }
      });

      var InteractionController = function() {
        this.nodes = new NodesCollection();
        this.edges = new EdgesCollection();

        if (!this.restore()) {
          this.createRoot();
        }
        this.state('rest');
      };
      InteractionController.prototype = {
        state: function(newstate) {
          if (newstate) {
            dom.removeClass(this._state);
            dom.addClass(newstate);
            this._state = newstate;
            if (newstate === 'rest') {
              this.save();
            }
          }
          return this._state;
        },
        root: function() {
          return this.nodes.find(function(n) {
            return n.root();
          });
        },
        createNode: function(attributes) {
          var n = new Node(attributes);
          this.nodes.add(n);

          var nv = new NodeView({model: n});
          nv.on('press',   this.nodeMouseDown, this);
          nv.on('release', this.nodeMouseUp,   this);
          nv.on('deEdit',  this.deEdit,        this);

          return nv;
        },
        createRoot: function() {
          this.createNode({root: true, x: dom.width()/2.0, y: dom.height()/2.0});
        },

        invalidAction: function(action) {
          /*
           * Useful for debugging
           * throw "Can't handle ["+action+"] when in state ["+this.state()+"]";
           */
        },

        nodeMouseDown: function(nodeView, event) {
          if (event.which > 1) { return; } // 1 is left-click
          if (this.state() === 'rest') {
            if (!(nodeView.dead() || event.target.className === 'close')) { 
              this.startPressing(nodeView, event);
            }
          } else {
            this.invalidAction('nodeMouseDown');
          }
        },

        nodeMouseUp: function(nodeView, event) {
          if (event.which > 1) { return; } // 1 is left-click
          switch(this.state()) {
            case 'pressing':
              track('edit');
              this.edit(nodeView);
              break;
            case 'linking':
              track('link');
              this.link(nodeView);
              this.state('rest');
              break;
            case 'following':
              track('move');
              this.stopFollowing();
              break;
            case 'rest':
              break;
            default:
              this.invalidAction('nodeMouseUp');
          }
        },

        svgPress: function(paperView, event) {
          if (event.which > 1) { return; } // 1 is left-click
          if (this.state() === 'rest') {
            this.startPanning(event);
          } else {
            this.invalidAction('svgPress');
          }
        },

        svgRelease: function(paperView, event) {
          if (event.which > 1) { return; } // 1 is left-click
          switch(this.state()) {
            case 'linking':
              track('create_linked');
              this.createLinkedNode(event);
              break;
            case 'following':
              track('move');
              this.stopFollowing();
              break;
            case 'panning':
              track('pan');
              this.stopPanning(paperView, event);
              break;
            case 'rest':
              break;
            default:
              this.invalidAction('svgRelease');
          }
        },

        pressTimeout: function() {
          if (this.state() === 'pressing') {
            this.startFollowing();
          }
        },

        mouseMove: function(event) {
          event.preventDefault();
          switch(this.state()) {
            case 'pressing':
              this.startLinking(event);
              break;
            case 'following':
              this.updateFollowing(event);
              break;
            case 'panning':
              this.updatePanning(event);
              break;
            case 'linking':
              this.updateGhost(event);
              break;
            default:
              // no-op
          }
        },

        deEdit: function(event) {
          if (this.state() === 'edit') {
            this.state('rest');
          }
        },

        /* Panning */
        startPressing: function(node, event) {
          this.state('pressing');
          this.node = node;

          if (this.pressData) {
            clearTimeout(this.pressData.timer);
          }

          this.pressData = {};
          this.pressData.x = getMouseX(event);
          this.pressData.y = getMouseY(event);
          if (!this.node.model.root()) {
            this.pressData.timer = setTimeout(_.bind(this.pressTimeout, this), 250);
          }
        },

        startPanning: function(event) {
          this.state('panning');
          this.panData = {};
          this.panData.x = getMouseX(event);
          this.panData.y = getMouseY(event);;
        },

        updatePanning: function(event) {
          var x = getMouseX(event);
          var y = getMouseY(event);
          var dx = x - this.panData.x;
          var dy = y - this.panData.y;

          this.nodes.each(function(n) {
            n.set({
              x: n.get('x')+dx,
              y: n.get('y')+dy
            });
          });

          this.panData.x = x;
          this.panData.y = y;

          var root = this.root();
          var bgx = root.x();
          var bgy = root.y();
          dom.css('background-position', bgx+'px '+bgy+'px');
        },

        stopPanning: function() {
          this.panData = null;
          this.state('rest');
        },


        /* Editing */
        edit: function(node) {
          node.edit();
          this.state('edit');
        },

        /* Linking */
        startLinking: function(event) {
          var dx = Math.abs(getMouseX(event)-this.pressData.x),
              dy = Math.abs(getMouseY(event)-this.pressData.y);
          if ( dx + dy > 10) {
            this.state('linking');

            this.ghost = {};
            this.ghost.node = new Node({ghost: true, x: this.node.model.x(), y: this.node.model.y(), text: 'New Node', color: this.node.model.color()});
            this.ghost.edge = new Edge({from: this.node.model, to: this.ghost.node});
            this.ghost.edgeView = new EdgeView({model: this.ghost.edge});
          }
        },

        createLinkedNode: function(event) {
          var gradient = this.node.model.gradient();
          if (this.node.model.root()) {
            gradient = gradients.shift();
          }
          var depth = this.node.model.depth() + 1;
          var node = this.createNode({x: getMouseX(event), y: getMouseY(event)+17, gradient: gradient, depth: depth});
          this.link(node);
          this.state('edit');
        },

        link: function(node) {
          var from = this.node.model,
              to   = node.model;

          var existing = this.edges.find(function(e) {
            return (e.from() === from && e.to() === to) || (e.from() === to && e.to() === from);
          });

          if (!existing) {
            var e = new Edge({from: this.node.model, to: node.model});
            this.edges.add(e);
            var edgeView = new EdgeView({model: e});
          }

          if (this.ghost) {
            this.ghost.edgeView.remove();
          }
        },

        updateGhost: function(event) {
          this.ghost.node.set({x: getMouseX(event), y: getMouseY(event)+17});
        },

        /* Moving */
        startFollowing: function() {
          this.followData = this.pressData;
          this.node.startMoving();
          this.state('following');
        },

        updateFollowing: function(event) {
          var x = getMouseX(event);
          var y = getMouseY(event);
          var dx = x - this.followData.x;
          var dy = y - this.followData.y;

          var node = this.node.model;
          node.set({
            x: node.get('x')+dx,
            y: node.get('y')+dy
          });

          this.followData.x = x;
          this.followData.y = y;
        },

        stopFollowing: function() {
          this.node.stopMoving();
          this.state('rest');
        },

        /* Persistence */
        save: function() {
          if (this.saveTimer) {
            clearTimeout(this.saveTimer);
          }
          this.saveTimer = setTimeout(_.bind(this.realSave, this), 100);
        },

        history: function() {
          var existing = JSON.parse(localStorage.getItem('exobrain'));
          if (!existing || !existing.hasOwnProperty('version') || existing.version !== VERSION) {
            return  {
              current: 0,
              pages: [defaultMap],
              version: VERSION
            };
          } else {
            return existing;
          }
        },

        currentPage: function() {
          var history = this.history();
          return history.pages[history.current];
        },

        addPage: function(page) {
          if (JSON.stringify(this.currentPage()) === JSON.stringify(page)) {
            return;
          }
          track('save');
          var history = this.history();
          history.pages = history.pages.slice(0,history.current + 1);
          history.pages.push(page);
          history.current = history.pages.length - 1;
          localStorage.setItem('exobrain', JSON.stringify(history));
        },

        realSave: function() {
          this.saveTimer = null;
          this.addPage({
            'nodes': this.nodes.toJSON(),
            'edges': this.edges.toJSON(),
            'color': gradients.size()
          });
        },

        clean: function() {
          while(this.edges.length > 0) {
            this.edges.first().destroy();
          }

          while(this.nodes.length > 0) {
            this.nodes.first().destroy();
          }

        },

        restore: function() {
          var data = this.currentPage();

          if (!data) { return false; }
          track('restore');

          this.clean();

          _(data.nodes).each(function(node) {
            if (node.root || (node.text && node.text.length > 0)) {
              this.createNode(node);
            }
          }, this);

          _(data.edges).each(function(e) {
            var from = this.nodes.get(e.from.id);
            var to   = this.nodes.get(e.to.id);

            if (from === undefined || to === undefined) {
              return;
            }

            var edge = new Edge({from: from, to: to});
            this.edges.add(edge);
            var edgeView = new EdgeView({model: edge});
          }, this);

          while(gradients.size() > data.color) {
            gradients.shift();
          }

          clearTimeout(this.saveTimer);

          return true;
        },

        undo: function() {
          track('undo');
          var history = this.history();

          if (history.current === 0) { return false; }
          
          history.current -= 1;
          localStorage.setItem('exobrain', JSON.stringify(history));
          return this.restore();
        },

        redo: function() {
          track('redo');
          var history = this.history();
          
          if (history.pages.length > history.current + 1) {
            history.current += 1;
            localStorage.setItem('exobrain', JSON.stringify(history));
            return this.restore();
          }
        },

        reset: function(event) {
          localStorage.setItem('exobrain', null);
          this.restore();
        },

        clear: function(event) {
          localStorage.setItem('exobrain', null);
          this.clean();
          this.createRoot();
          this.save();
        }
      };

      var controller = new InteractionController();

      PaperView.on('press',   controller.svgPress, controller);
      PaperView.on('release', controller.svgRelease,   controller);
        dom.on(moveEvent, _.bind(controller.mouseMove, controller));

      $('img.undo').on('click', _.bind(controller.undo, controller));
      $('img.redo').on('click', _.bind(controller.redo, controller));
      $('a.reset' ).on('click', _.bind(controller.reset, controller));
      $('a.clear' ).on('click', _.bind(controller.clear, controller));


      track('load');

      window.dumpCurrentMap = function() {
        return JSON.stringify(_.bind(controller.currentPage, controller)());
      };
    });

  };
}( jQuery ));

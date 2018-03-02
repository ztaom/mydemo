var Block = Class.create({
  text: '',
  initialize: function(params) {

    if (!params.bgColor)
      params.bgColor = 'white';

    if (!params.borderWidth)
      params.borderWidth = '1px';

    this.element = new Element('div', {'class': 'paper'});
    this.body = new Element('div', {'class': 'body'});
    this.resizeHandle = new Element('div', {'class': 'resize'});
    this.element.appendChild(this.body);
    this.element.appendChild(this.resizeHandle);
    $('blocks').insert(this.element);

    this.options = Object.extend({snap: 9}, arguments[1] || { });

    new Draggable(this.element, {
      snap: this.snap.bind(this),
      onStart: (function () {Blocks.setSelected(this)}).bindAsEventListener(this),
      onEnd: function () {document.fire('block:changed')}
    });
    new Draggable(this.resizeHandle, {
      snap: this.snap.bind(this),
      onDrag: this.onResizeHandleDrag.bindAsEventListener(this),
      onStart: this.onResizeHandleDrag.bindAsEventListener(this),
      onEnd: this.onResizeHandleDrag.bindAsEventListener(this)
    });

    this.element.setStyle({
      width: params.width - 1 + 'px',
      height: params.height - 1 + 'px',
      top: params.top - 1 + 'px',
      left: params.left - 1 + 'px',
      lineHeight: params.height - 1 + 'px',
      backgroundColor: params.bgColor,
      textAlign: params.align
    });

    this.body.setStyle({
      width: params.width - 1 + 'px',
      height: params.height - 1 + 'px'
    });

    this.setText(params.text);
    this.setFont(params.font);
    this.setBorderWidth(params.borderWidth);

    this.element.observe('click', (function (ev) {
      Blocks.setSelected(this);
    }).bindAsEventListener(this));
    
    Blocks.push(this);
  },

  onResizeHandleDrag: function (ev) {
    var offset = this.resizeHandle.positionedOffset();
    var style = {width: offset[0] + this.options.snap + 'px', height: offset[1] + this.options.snap + 'px', lineHeight: offset[1] + this.options.snap + 'px'};
    this.element.setStyle(style);
    this.body.setStyle(style);
    Blocks.setSelected(this);
    document.fire('block:changed');
  },

  snap: function(p0, p1) {
    return [(p0 > 0 ? (p0 / this.options.snap).round() * this.options.snap - 1 : -1), (p1 > 0 ? (p1 / this.options.snap).round() * this.options.snap - 1 : -1)];
  },

  getText: function() {
    return this.text;
  },

  setText: function(text) {
    this.text = text;
    this.body.update('&nbsp;' + this.text.gsub(/\s/, '&nbsp;').gsub(/\</, '&lt;').gsub(/\>/, '&gt;').gsub(/"/, '&quot;').gsub(/'/, '&#39;') + '&nbsp;');
    document.fire('block:changed');
    return this;
  },

  setFont: function(value) {
    this.element.setStyle({fontSize: value + 'px'});
    document.fire('block:changed');
    return this;
  },
  
  setTextAlign: function(value) {
    this.element.setStyle({textAlign: value});
    document.fire('block:changed');
    return this;
  },

  setBgColor: function(color) {
    this.element.setStyle({backgroundColor: color});
    document.fire('block:changed');
    return this;
  },

  setBorderWidth: function(width) {
    this.body.setStyle({outlineWidth: width});
    document.fire('block:changed');
    return this;
  },

  toJSON: function() {
    var obj = {};
    obj.top = parseInt(this.element.getStyle('top')) + 1;
    obj.left = parseInt(this.element.getStyle('left')) + 1;
    obj.width = parseInt(this.element.getStyle('width')) + 1;
    obj.height = parseInt(this.element.getStyle('height')) + 1;
    obj.font = parseInt(this.element.getStyle('fontSize'));
    obj.align = this.element.getStyle('textAlign');
    obj.text = this.getText();
    obj.bgColor = this.element.getStyle('backgroundColor');
    obj.borderWidth = this.body.getStyle('outlineWidth');
    return Object.toJSON(obj);
  },
  
  onDelete: function () {
    this.element.remove();
    document.fire('block:changed');
  },
  
  duplicate: function () {
    var block = new Block({
      top: parseInt(this.element.getStyle('top')) + 2 * this.options.snap + 1,
      left: parseInt(this.element.getStyle('left')) + 2 * this.options.snap + 1,
      width: parseInt(this.element.getStyle('width')) + 1,
      height: parseInt(this.element.getStyle('height')) + 1,
      font: parseInt(this.element.getStyle('fontSize')),
      text: this.getText(),
      bgColor: this.element.getStyle('backgroundColor'),
      borderWidth: this.body.getStyle('outlineWidth'),
      align: this.element.getStyle('textAlign')
    });
    Blocks.setSelected(block);
    document.fire('block:changed');
  },
  
  setSelected: function(select) {
    this.body[(select ? 'add' : 'remove') + 'ClassName']('selected');
  },

  drag: function(event) {
    switch (event.keyCode) {
      case Event.KEY_UP:
        event.preventDefault();
        this.element.setStyle({top: parseInt(this.element.getStyle('top')) - this.options.snap + 'px'});
	    document.fire('block:changed');
        break;
      case Event.KEY_DOWN:
        event.preventDefault();
        this.element.setStyle({top: parseInt(this.element.getStyle('top')) + this.options.snap + 'px'});
	    document.fire('block:changed');
        break;
      case Event.KEY_LEFT:
        event.preventDefault();
        this.element.setStyle({left: parseInt(this.element.getStyle('left')) - this.options.snap + 'px'});
	    document.fire('block:changed');
        break;
      case Event.KEY_RIGHT:
        event.preventDefault();
        this.element.setStyle({left: parseInt(this.element.getStyle('left')) + this.options.snap + 'px'});
	    document.fire('block:changed');
        break;
    }
  },

  resize: function(event) {
    switch (event.keyCode) {
      case Event.KEY_UP:
        this.resizeHandle.setStyle({
          top: parseInt(this.resizeHandle.getStyle('top')) - this.options.snap + 'px',
          left: parseInt(this.resizeHandle.getStyle('left')) + 'px'
        });
        this.onResizeHandleDrag();
	    document.fire('block:changed');
        break;
      case Event.KEY_DOWN:
        this.resizeHandle.setStyle({
          top: parseInt(this.resizeHandle.getStyle('top')) + this.options.snap + 'px',
          left: parseInt(this.resizeHandle.getStyle('left')) + 'px'
        });
        this.onResizeHandleDrag();
	    document.fire('block:changed');
        break;
      case Event.KEY_LEFT:
        this.resizeHandle.setStyle({
          left: parseInt(this.resizeHandle.getStyle('left')) - this.options.snap + 'px',
          top: parseInt(this.resizeHandle.getStyle('top')) + 'px'
        });
        this.onResizeHandleDrag();
	    document.fire('block:changed');
        break;
      case Event.KEY_RIGHT:
        this.resizeHandle.setStyle({
          left: parseInt(this.resizeHandle.getStyle('left')) + this.options.snap + 'px',
          top: parseInt(this.resizeHandle.getStyle('top')) + 'px'
        });
        this.onResizeHandleDrag();
	    document.fire('block:changed');
        break;
    }
  }
});

Object.extend(Block, {
  add: function(text) {
    if (text.blank())
      var text = window.prompt('Enter text for new box', 'new box');

    new Block({top: 18, left: 18, width: 108, height: 108, font: 18, text: text})
    document.fire('block:changed');
  }
});
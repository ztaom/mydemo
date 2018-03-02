var Menu = Class.create({
  initialize: function() {
    this.element = $('menu');
    if (!this.element)
      return;

    this.addButton = $('addBlock');
    this.addButton.observe('click', (function (ev) {
      Block.add(this.textEditor.value);
    }).bindAsEventListener(this));

    this.saveButton = $('saveButton');
    this.saveButton.observe('click', function (ev) {
      Blocks.save(false);
    });

    this.deleteButton = $('deleteButton');
    this.deleteButton.observe('click', function (ev) {
      Blocks.deleteSelected();
    });

    this.duplicateButton = $('duplicateButton');
    this.duplicateButton.observe('click', function (ev) {
      if (Blocks.getSelected())
        Blocks.getSelected().duplicate();
    });
    
    this.btfButton = $('bringToFrontButton');
    this.btfButton.observe('click', function (ev) {
      if (Blocks.getSelected())
        Blocks.bringToFront();
    });

    this.stbButton = $('sendToBackButton');
    this.stbButton.observe('click', function (ev) {
      if (Blocks.getSelected())
        Blocks.sendToBack();
    });

    this.textEditor = $('textEditor');
    this.textEditor.value = '';
    this.textEditor.observe('keyup', this.onBlur.bindAsEventListener(this));
    this.textEditor.observe('keyup', this.onKeyup.bindAsEventListener(this));
    this.textEditor.observe('blur', this.onBlur.bindAsEventListener(this));

    this.element.down('a.f12', 0).observe('click', this.changeFont.bindAsEventListener(this, 12));
    this.element.down('a.f18', 0).observe('click', this.changeFont.bindAsEventListener(this, 18));
    this.element.down('a.f27', 0).observe('click', this.changeFont.bindAsEventListener(this, 27));
    this.element.down('a.f36', 0).observe('click', this.changeFont.bindAsEventListener(this, 36));

    $('bgColor1').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor1').getStyle('backgroundColor')));
    $('bgColor2').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor2').getStyle('backgroundColor')));
    $('bgColor3').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor3').getStyle('backgroundColor')));
    $('bgColor4').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor4').getStyle('backgroundColor')));
    $('bgColor5').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor5').getStyle('backgroundColor')));
    $('bgColor6').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor6').getStyle('backgroundColor')));
    $('bgColor7').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor7').getStyle('backgroundColor')));
    $('bgColor8').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor8').getStyle('backgroundColor')));
    $('bgColor9').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor9').getStyle('backgroundColor')));
    $('bgColor10').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor10').getStyle('backgroundColor')));
    $('bgColor11').observe('click', this.changeBgColor.bindAsEventListener(this, $('bgColor11').getStyle('backgroundColor')));

    $('borderWidth0').observe('click', this.changeBorderWidth.bindAsEventListener(this, '0px'));
		
		$('borderWidth1').observe('click', this.changeBorderWidth.bindAsEventListener(this, '1px'));
    $('borderWidth2').observe('click', this.changeBorderWidth.bindAsEventListener(this, '2px'));
    $('borderWidth3').observe('click', this.changeBorderWidth.bindAsEventListener(this, '3px'));
    $('borderWidth4').observe('click', this.changeBorderWidth.bindAsEventListener(this, '4px'));

	 	$('textAlignLeft').observe('click', this.changeTextAlign.bindAsEventListener(this, 'left'));
		$('textAlignCenter').observe('click', this.changeTextAlign.bindAsEventListener(this, 'center'));
		$('textAlignRight').observe('click', this.changeTextAlign.bindAsEventListener(this, 'right'));

    document.observe('block:selected', this.refresh.bindAsEventListener(this));

    new Draggable(this.element);
    Position.absolutize(this.element);
  },

  refresh: function(ev) {
    this.textEditor.value = '';
    if (Blocks.getSelected())
      this.textEditor.value = Blocks.getSelected().getText();
    this.textEditor.blur();
  },

  onBlur: function(ev) {
    if (Blocks.getSelected()) {
      Blocks.getSelected().setText(this.textEditor.value);
    }
  },

  changeFont: function(ev, value) {
    if (Blocks.getSelected()) {
      Blocks.getSelected().setFont(value);
    }
  },
	
	changeTextAlign: function(ev, value) {
    if (Blocks.getSelected()) {
      Blocks.getSelected().setTextAlign(value);
    }
	},

  changeBgColor: function(ev, value) {
    if (Blocks.getSelected()) {
      Blocks.getSelected().setBgColor(value);
    }
  },

  changeBorderWidth: function(ev, value) {
    if (Blocks.getSelected()) {
      Blocks.getSelected().setBorderWidth(value);
    }
  },

  onKeyup: function(ev) {
    if ((Event.KEY_ESC == ev.keyCode || 13 == ev.keyCode) && ev.element().tagName.toLowerCase() == 'input') {
      this.textEditor.blur();
      ev.preventDefault();
    }
  }
});
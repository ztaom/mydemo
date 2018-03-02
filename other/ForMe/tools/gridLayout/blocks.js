const STATE_DIRTY = 'STATE_DIRTY';
const STATE_CLEAN = 'STATE_CLEAN';

var Blocks = {};

Object.extend(Blocks, {
  id: null,
  date: null,
  state: STATE_CLEAN,
  selected: null,
  timer: null,
  blocks: [],
  save: function(force) {
    $('waitImg').show();
    $('savedText').hide();
    new Ajax.Request('/save/' + Blocks.id, {
      method: 'post',
      parameters: {data: Blocks.blocks.toJSON(), date: Blocks.date, force: force ? 1 : 0},
      onSuccess: function(transport) {
        $('waitImg').hide();
        if (transport.responseText.isJSON()) {
          var response = transport.responseText.evalJSON();
          if ('OK' == response[0]) {
            Blocks.date = response[1];
            Blocks.state = STATE_CLEAN;
            $('savedText').update('Saved');
          } else {
            switch(response[1]) {
              case 'Out of date':
                $('notice').update('Paper was changed, please refresh [<a href="#" onclick="$(\'notice\').hide(); Blocks.save(true); return false;">Overwrite</a>/<a href="#" onclick="$(\'notice\').hide(); return false;">Cancel</a>/<a href="#" onclick="location.href = location.href; return false;">Refresh</a>]').show();
              default:
                $('savedText').update(response[1]);
                break;
            }
          }
        } else
          $('savedText').update('Error');
        $('savedText').show().setStyle({opacity: 1});
        new Effect.Fade('savedText', {duration: 3});
      }
    });
  },
  push: function(block) {
    Blocks.blocks.push(block);
    Blocks.setSelected(block);
    document.fire('block:changed');
  },
  setSelected: function(block) {
    Blocks.blocks.invoke('setSelected', false);
    Blocks.selected = block;
    block.setSelected(true);
    document.fire('block:selected');
  },
  getSelected: function() {
    return Blocks.selected;
  },
  deleteSelected: function() {
    if (Blocks.getSelected()) {
      Blocks.getSelected().onDelete()
      Blocks.blocks = Blocks.blocks.without(Blocks.selected);
      Blocks.selected = null;
      document.fire('block:selected');
    }
  },
  unselectAll: function () {
    Blocks.blocks.invoke('setSelected', false);
    Blocks.selected = null;
    document.fire('block:selected');
  },
  bringToFront: function() {
    if (Blocks.getSelected()) {
      $('blocks').insert({bottom: Blocks.getSelected().element.remove()});
      Blocks.blocks = Blocks.blocks.without(Blocks.selected);
      Blocks.blocks.push(Blocks.selected);
      document.fire('block:changed');
    }
  },
  sendToBack: function() {
    if (Blocks.getSelected()) {
      $('blocks').insert({top: Blocks.getSelected().element.remove()});
      Blocks.blocks = Blocks.blocks.without(Blocks.selected);
      Blocks.blocks.unshift(Blocks.selected);
      document.fire('block:changed');
    }
  },
  autosave: function() {
    if (Blocks.timer)
      clearTimeout(Blocks.timer);
    if (STATE_DIRTY == Blocks.state)
      Blocks.timer = setTimeout(Blocks.save, 10000);
  },
  onStateChange: function () {
    Blocks.state = STATE_DIRTY;
  }
});

Event.observe(window, 'load', function() {  
  Event.observe(document, 'keydown', function(event) {
    if (event.ctrlKey && !event.altKey && 83 == event.keyCode) {
      event.preventDefault();
      Blocks.save(false);
      return false;
    }
    if (!event.ctrlKey && !event.altKey && (Event.KEY_BACKSPACE == event.keyCode || 46 == event.keyCode)) {
      if (event.element().tagName.toLowerCase() != 'input') {
        event.preventDefault();
        event.stop();
        Blocks.deleteSelected();
        return false;
      }
    }
    if (!event.ctrlKey && !event.altKey && (78 == event.keyCode)) {
      if (event.element().tagName.toLowerCase() != 'input') {
        event.preventDefault();
        event.stop();
        Block.add();
        return false;
      }
    }
    if (!event.ctrlKey && !event.altKey && 70 == event.keyCode) {
      if (event.element().tagName.toLowerCase() != 'input') {
        event.preventDefault();
        Blocks.bringToFront();
        return false;
      }
    }
    if (!event.ctrlKey && !event.altKey && 66 == event.keyCode) {
      if (event.element().tagName.toLowerCase() != 'input') {
        event.preventDefault();
        Blocks.sendToBack();
        return false;
      }
    }
    if (!event.ctrlKey && !event.altKey && 68 == event.keyCode) {
      if (event.element().tagName.toLowerCase() != 'input') {
        if (Blocks.getSelected()) {
          event.preventDefault();
          Blocks.getSelected().duplicate();
          return false;
        }
      }
    }
    if (Event.KEY_ESC == event.keyCode && event.element().tagName.toLowerCase() != 'input') {
      event.preventDefault();
      Blocks.unselectAll();
      return false;
    }
    if (Blocks.getSelected() && event.element().tagName.toLowerCase() != 'input' && !event.shiftKey) {
      Blocks.getSelected().drag(event);
    }
    if (Blocks.getSelected() && event.element().tagName.toLowerCase() != 'input' && event.shiftKey) {
      Blocks.getSelected().resize(event);
    }
  });

  document.observe('click', Blocks.autosave.bindAsEventListener());
  document.observe('keypress', Blocks.autosave.bindAsEventListener());

  document.observe('click', function(ev) {
    if ('body' == ev.element().tagName.toLowerCase())
      Blocks.unselectAll();
  });

  document.observe('block:changed', Blocks.onStateChange.bindAsEventListener());
});


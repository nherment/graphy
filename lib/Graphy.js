var _ = require('underscore')

function Graphy(model) {
  this._model = model
}

Graphy.prototype.next = function(current, answer) {

  var node

  if(this._history && this._history.length > 0) {
    node = lookup(this._model, this._history[this._history.length -1].name)
  }

  if(!node) {
    node = this._model
  }

  var plugin = loadPlugin(node.name)

  var nextNode = plugin.answer(answer);

}

function loadPlugin(name) {
  var plugin
  try {
    plugin = require('./plugin/'+name+'.js')
    return plugin
  } catch(err) {
    throw new Error('Could not find plugin '+name)
  }
}

function lookup(model, name) {
  if(model.name === name) {
    return model
  } else if(model.next && _.isArray(model.next)) {
    for(var i = 0 ; i < model.next.length ; i++) {
      var next = model.next[i]
      var found = lookup(next, name)
      if(found) {
        return found
      }
    }
  } else if(model.next) {
    var found = lookup(model.next, name)
    if(found) {
      return found
    }
  } else {
    return
  }

}

module.exports = Graphy

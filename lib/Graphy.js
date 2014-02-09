var _ = require('underscore')

function Graphy(model) {
  this._model = model
}

Graphy.prototype.process = function(history, answer) {

  var current = this._model

  if(history && history.length > 0) {
    for(var i = 0 ; i < history.length ; i++) {
      
    }
  }

  var node

  if(history && history.length > 0) {
    node = lookup(this._model, history[history.length -1].name)
  }

  if(!node) {
    node = this._model
  }

  var plugin = loadPlugin(node.name)

  var nextNode = plugin.answer(answer)

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

function lookup(model, current, history, index) {
  var nodeInfo = history[index]

  var current
  switch(nodeInfo.type) {
    case 'thread':
      current = model.threads[nodeInfo.name]
      break
    case 'question':

      current = model.threads[nodeInfo.name]
      break
  }


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

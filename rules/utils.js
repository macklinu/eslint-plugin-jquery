'use strict'

function traverse(node) {
  while (node) {
    switch (node.type) {
      case 'CallExpression':
        node = node.callee
        break
      case 'MemberExpression':
        node = node.object
        break
      case 'Identifier':
        return node
      default:
        return null
    }
  }
}

// Traverses from a node up to its root parent to determine if it
// originated from a jQuery `$()` function.
//
// node - The CallExpression node to start the traversal.
//
// Examples
//
//   // $('div').find('p').first()
//   isjQuery(firstNode) // => true
//
// Returns true if the function call node is attached to a jQuery element set.
function isjQuery(node) {
  const id = traverse(node)
  return id && id.name.startsWith('$')
}

function withProperty(property, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('Must provide callback function')
  }

  const properties = new Set([].concat(property))

  return function(node) {
    if (node.callee.type !== 'MemberExpression') return
    if (node.callee.object.name !== '$') return
    if (!properties.has(node.callee.property.name)) return

    callback(node)
  }
}

function withMethod(method, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('Must provide callback function')
  }

  const methods = new Set([].concat(method))

  return function(node) {
    if (node.callee.type !== 'MemberExpression') return
    if (!methods.has(node.callee.property.name)) return
    if (isjQuery(node)) {
      callback(node)
    }
  }
}

module.exports = {
  traverse: traverse,
  isjQuery: isjQuery,
  withMethod: withMethod,
  withProperty: withProperty
}

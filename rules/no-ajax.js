'use strict'

const utils = require('./utils.js')

module.exports = function(context) {
  return {
    CallExpression: utils.withProperty(
      ['ajax', 'get', 'getJSON', 'getScript', 'post'],
      function(node) {
        const name = node.callee.property.name
        context.report({
          node: node,
          message: 'Prefer fetch to $.' + name
        })
      }
    )
  }
}

module.exports.schema = []

'use strict'

const utils = require('./utils.js')

module.exports = function(context) {
  return {
    CallExpression: utils.withMethod('css', function(node) {
      context.report({
        node: node,
        message: 'Prefer getComputedStyle to $.css'
      })
    })
  }
}

module.exports.schema = []

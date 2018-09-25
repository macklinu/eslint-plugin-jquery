'use strict'

const utils = require('./utils.js')

module.exports = function(context) {
  const enforce = utils.withProperty('Deferred', function(node) {
    context.report({
      node: node,
      message: 'Prefer Promise to $.Deferred'
    })
  })

  return {
    CallExpression: enforce,
    NewExpression: enforce
  }
}

module.exports.schema = []

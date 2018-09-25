'use strict'

const utils = require('./utils.js')

module.exports = function(context) {
  return {
    CallExpression: utils.withProperty('globalEval', function(node) {
      context.report({
        node: node,
        message: '$.globalEval is not allowed'
      })
    })
  }
}

module.exports.schema = []

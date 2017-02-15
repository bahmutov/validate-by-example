'use strict'

const is = require('check-more-types')

function setAllRequired (o) {
  const R = require('ramda')
  o.properties = R.mapObjIndexed((value, key) => {
    if (value.type === 'object') {
      value = setAllRequired(value)
    }
    value.required = true
    return value
  }, o.properties)
  o.additionalProperties = false
  return o
}

function train (o) {
  const GenerateSchema = require('generate-schema')
  return setAllRequired(GenerateSchema.json(o))
}

function isSchema (s) {
  return is.object(s) &&
    is.unemptyString(s['$schema'])
}

module.exports = {
  train,
  isSchema
}

// console.log(schema)

// // validate using schema
// const validator = require('is-my-json-valid')
// const validate = validator(
//   schema,
//   {
//     greedy: true
//   }
// )
// const p = {
//   name: 'stranger',
//   age: 'twenty',
//   additional: 'some new property',
//   lives: {
//     state: 'MA'
//   }
// }
// console.log('is p valid?', validate(p))
// console.log('errors', validate.errors)

'use strict'

const R = require('ramda')
const is = require('check-more-types')

function setAllRequired (o) {
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

function validate (schema, o) {
  const validator = require('is-my-json-valid')
  const options = {
    greedy: true
  }
  const validate = validator(schema, options)
  // should we return data.Either?
  const result = validate(o)
  return {
    valid: result,
    errors: R.clone(validate.errors)
  }
}

module.exports = {
  train,
  isSchema,
  validate: R.curry(validate)
}

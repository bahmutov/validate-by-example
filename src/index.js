'use strict'

const R = require('ramda')
const la = require('lazy-ass')
const is = require('check-more-types')
const validator = require('is-my-json-valid')
const findFormat = require('./find-format')

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

function setFormats (schema, formats) {
  la(is.object(formats), 'expected formats object', formats)
  Object.keys(formats).forEach(key => {
    schema.properties[key].format = formats[key]
  })
  return schema
}

function discoverFormats (o, schema) {
  Object.keys(schema.properties).forEach(key => {
    const format = findFormat(o[key])
    if (format) {
      schema.properties[key].format = format
    }
  })
  return schema
}

function train (o, formats) {
  const GenerateSchema = require('generate-schema')
  const schema = setAllRequired(GenerateSchema.json(o))
  discoverFormats(o, schema)
  if (formats) {
    return setFormats(schema, formats)
  }
  return schema
}

function isSchema (s) {
  return is.object(s) &&
    is.unemptyString(s['$schema'])
}

function validate (schema, o) {
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

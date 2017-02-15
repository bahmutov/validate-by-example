'use strict'

const is = require('check-more-types')
const la = require('lazy-ass')
const snapshot = require('snap-shot')

/* global describe, it */
describe('validate-by-example', () => {
  const {train, isSchema, validate} = require('.')

  const person = {
    name: 'gleb',
    age: 37,
    married: true,
    lives: {
      city: 'Boston'
    }
  }

  it('has train function', () => {
    la(is.fn(train))
  })

  it('has validate function', () => {
    la(is.fn(validate))
  })

  it('trains on a person', () => {
    const schema = train(person)
    la(isSchema(schema))
  })

  it('passes the original object', () => {
    const schema = train(person)
    const result = validate(schema, person)
    snapshot(result)
  })

  it('validates another object', () => {
    const p = {
      name: 'stranger',
      age: 'twenty',
      additional: 'some new property',
      lives: {
        state: 'MA'
      }
    }
    const schema = train(person)
    const result = validate(schema, p)
    snapshot(result)
  })
})

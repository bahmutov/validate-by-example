'use strict'

const is = require('check-more-types')
const la = require('lazy-ass')
const snapshot = require('snap-shot')
const {train, isSchema, validate} = require('.')

/* global describe, it */
describe('validate-by-example', () => {
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

  it('validates several objects', () => {
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
    const result2 = validate(schema, person)
    snapshot(result2) // should have no errors
  })
})

describe('custom schema format', () => {
  const user = {
    email: 'foo@bar.com'
  }

  const invalid = {
    email: 'unknown'
  }

  it('allows unknown email', () => {
    const schema = train(user)
    snapshot(validate(schema, invalid))
  })

  it('validate email (valid)', () => {
    const schema = train(user)
    schema.properties.email.format = 'email'
    snapshot(validate(schema, user))
  })

  it('validate email (invalid)', () => {
    const schema = train(user)
    schema.properties.email.format = 'email'
    snapshot(validate(schema, invalid))
  })
})

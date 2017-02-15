'use strict'

const is = require('check-more-types')
const la = require('lazy-ass')

/* global describe, it */
describe('validate-by-example', () => {
  const {train, isSchema} = require('.')

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

  it('trains on a person', () => {
    const schema = train(person)
    la(isSchema(schema))
  })
})

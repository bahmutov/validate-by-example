'use strict'

const is = require('check-more-types')
const la = require('lazy-ass')
const findFormat = require('./find-format')

/* global describe, it */
describe('find-format', () => {
  it('is a function', () => {
    la(is.fn(findFormat))
  })

  it('email', () => {
    const format = findFormat('foo@bar.com')
    la(format === 'email', format)
  })

  it('ipv4', () => {
    const format = findFormat('127.0.0.1')
    la(format === 'ipv4', format)
  })

  it('color', () => {
    const format = findFormat('#ff00ff')
    la(format === 'color', format)
  })

  it('uri', () => {
    const format = findFormat('http://foo.com/nice/day')
    la(format === 'uri', format)
  })

  it('date', () => {
    const format = findFormat('2010-01-20')
    la(format === 'date', format)
  })

  it('date-time', () => {
    const format = findFormat('2017-02-16T15:30:28.370Z')
    la(format === 'date-time', format)
  })

  it('unknown format', () => {
    const format = findFormat(45)
    la(!format, format)
  })
})

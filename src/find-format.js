'use strict'

const formats = require('is-my-json-valid/formats')
const is = require('check-more-types')

// only consider a subset of formats, otherwise matches weird stuff
const allowed = [
  'date-time', 'date', 'time',
  'email', 'ipv4', 'ipv6', 'uri',
  'phone'
]

function findFormat (value) {
  if (is.hexRgb(value)) {
    return 'color'
  }

  return allowed.find(format => {
    if (!formats[format]) {
      return
    }
    const check = formats[format]
    return check.test(value)
  })
}

module.exports = findFormat

const formats = require('is-my-json-valid/formats')

// only consider a subset of formats, otherwise matches weird stuff
const allowed = [
  'date-time', 'date', 'time',
  'email', 'ipv4', 'ipv6', 'uri',
  'color', // not sure about the color regex
  'phone'
]

function findFormat (value) {
  return allowed.find(format => {
    if (!formats[format]) {
      return
    }
    const check = formats[format]
    return check.test(value)
  })
}

module.exports = findFormat

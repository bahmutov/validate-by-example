# validate-by-example

> Derives a JSON schema from an object and then uses it to validate other objects

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Goal

Derive [json schema][json-schema] from one object and use it to verify every
object after that. Uses [generate-schema][generate-schema] and
[is-my-json-valid][is-my-json-valid].

[json-schema]: http://json-schema.org/
[generate-schema]: https://github.com/nijikokun/generate-schema
[is-my-json-valid]: https://github.com/mafintosh/is-my-json-valid

## How to use

Install with `npm install --save validate-by-example`

In your code first train on an object (gives you a schema) and then validate
an object.

```js
const {train, validate} = require('validate-by-example')
const aPerson = {
  name: 'gleb',
  age: 37,
  married: true,
  lives: {
    city: 'Boston'
  }
}
const schema = train(person)
// now use schema to validate
const someone = {
  name: 'stranger',
  age: 'twenty',
  additional: 'some new property',
  lives: {
    state: 'MA'
  }
}
const result = validate(schema, someone)
// result is an object
// if everything goes well result.valid will be true
// otherwise
if (!result.valid) {
  console.log(result.errors)
}
```

The above example prints a few errors, because every property is required,
and no additional properties is allowed.

```json
[
  {
    "field": "data",
    "message": "has additional properties"
  },
  {
    "field": "data.age",
    "message": "is the wrong type"
  },
  {
    "field": "data.married",
    "message": "is required"
  },
  {
    "field": "data.lives",
    "message": "has additional properties"
  },
  {
    "field": "data.lives.city",
    "message": "is required"
  }
]
```

For error format, see
[is-my-json-valid](https://github.com/mafintosh/is-my-json-valid#error-messages)

See more in [tests](src/validate-by-example-spec.js)

## Additional formats

You can specify additional [JSON schema v4 format][formats] for each property.

```js
const {train, validate} = require('validate-by-example')
const user = {
  email: 'foo@bar.com'
}
const schema = train(user, {email: 'email'})
/*
  schema.properties.email will be
  {type: 'string', required: true, format: 'email'}
*/
validate({email: 'unknown'})
```

This is equivalent to

```js
const user = {
  email: 'foo@bar.com'
}
const schema = train(user)
schema.properties.email.format = 'email'
validate(schema, {email: 'unknown'})
```

and will produce the following error

```json
{
  "valid": false,
  "errors": [
    {
      "field": "data.email",
      "message": "must be email format"
    }
  ]
}
```

[formats]: http://json-schema.org/latest/json-schema-validation.html#rfc.section.7.3

## JSON schema

Related projects that can derive JSON schema from an object

* [json-schema-by-example](https://github.com/japsu/json-schema-by-example)
* [json-schema-trainer](https://github.com/davisml/json-schema-trainer)

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/validate-by-example/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/validate-by-example.svg?downloads=true
[npm-url]: https://npmjs.org/package/validate-by-example
[ci-image]: https://travis-ci.org/bahmutov/validate-by-example.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/validate-by-example
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/

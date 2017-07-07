# @medv/list

[![Build Status](https://travis-ci.org/antonmedv/list.svg?branch=master)](https://travis-ci.org/antonmedv/list)

Immutable lists in JavaScript without [] and {}

## Install

```bash
npm install @medv/list
```

## Usage

```js
const {list, reverse, print} = require('@medv/list')

const a = list(1, list(2, list(3)))
const b = reverse(a)

print(a) // (1 2 3)
print(b) // (3 2 1)
```

For all available functions and documentation see [index.js](./index.js)

## License

[MIT](./LICENSE)

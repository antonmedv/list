const test = require('ava')
const {
  list,
  empty,
  head,
  tail,
  each,
  reduce,
  foldl,
  foldr,
  length,
  reverse,
  map,
  append,
  at,
  stringify,
  range,
} = require('./index')

test('list creation', t => {
  const l = list(1)
  t.is(l(), 1)
  t.is(l(true), undefined)
})

test('head tail', t => {
  const l = list(1, list(2))
  t.is(head(l), 1)
  t.is(head(tail(l)), 2)
})

test('empty list', t => {
  t.is(empty, undefined)
  t.is(head(empty), undefined)
  t.is(tail(empty), undefined)
})

test('each', t => {
  const l = range(1, 1e6)
  t.plan(1e6)
  each(l, i => {
    t.pass()
  })
})

test('reduce', t => {
  const l = range(1, 1e6)
  t.is(reduce(l, (prev, curr) => prev + curr), 500000500000)
  t.is(reduce(l, (prev, curr) => prev + curr, 1), 500000500001)
})

test('foldl', t => {
  const l = list(1, list(2, list(3, list(4))))
  t.is(foldl(l, 0, (x, acc) => x - acc), 2)
})

test('foldr', t => {
  const l = list(1, list(2, list(3, list(4))))
  t.is(foldr(l, 0, (x, acc) => x - acc), -2)
})

test('length', t => {
  const l = range(1, 1e6)
  t.is(length(l), 1e6)
})

test('reverse', t => {
  const l = range(1, 1e6)
  t.is(head(l), 1e6)
  t.is(head(reverse(l)), 1)
})

test('map', t => {
  const l = range(1, 1e6)
  t.is(head(map(l, i => i * 2)), 2 * 1e6)
})

test('append', t => {
  const l = range(1, 5)
  const r = range(1, 5)
  t.is(stringify(append(l, r)), '(5 4 3 2 1 5 4 3 2 1)')
})

test('at', t => {
  const l = range(1, 1e6)
  t.is(at(l, 0), 1e6)
  t.is(at(l, 100), 999900)
  t.is(at(l, -1), 1)
  t.is(at(l, 1e6 + 1), undefined)
})

test('stringify', t => {
  const l = range(1, 5)
  t.is(stringify(l), '(5 4 3 2 1)')
})

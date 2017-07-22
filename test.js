const test = require('ava')
const {
  list,
  empty,
  head,
  tail,
  first,
  last,
  each,
  reduce,
  foldl,
  foldr,
  length,
  reverse,
  map,
  concat,
  at,
  stringify,
  range,
  update,
  zip,
  pair,
  apply,
} = require('./index')

test('list creation', t => {
  const l = list(1)
  t.is(l(), 1)
  t.is(l(true), undefined)
})

test('empty list', t => {
  t.is(empty, undefined)
  t.is(head(empty), undefined)
  t.is(tail(empty), undefined)
})

test('head tail', t => {
  const l = list(1, list(2))
  t.is(head(l), 1)
  t.is(head(tail(l)), 2)
})

test('first last', t => {
  const l = list(1, list(2, list(3)))
  t.is(first(l), 1)
  t.is(last(l), 3)
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
  t.is(reduce(l, x => x), 1e6)
  t.is(reduce(l, (el, acc) => el + acc), 500000500000)
  t.is(reduce(l, (el, acc) => el + acc, 1), 500000500001)
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
  t.is(head(reverse(l)), 1e6)
})

test('map', t => {
  const l = range(1, 1e6)
  t.is(last(map(l, i => i * 2)), 2 * 1e6)
})

test('concat', t => {
  const l = range(1, 5)
  const r = range(1, 5)
  t.is(stringify(concat(l, r)), '(1 2 3 4 5 1 2 3 4 5)')
  const d = range(1, 1e6)
  const f = range(1, 1e6)
  t.is(length(concat(d, f)), 2 * 1e6)
})

test('at', t => {
  const l = range(1, 1e6)
  t.is(at(l, 0), 1)
  t.is(at(l, 100), 101)
  t.is(at(l, -1), 1e6)
  t.is(at(l, 1e6 + 1), undefined)
})

test('stringify', t => {
  const l = range(1, 5)
  t.is(stringify(l), '(1 2 3 4 5)')
})

test('range', t => {
  const l = range(1, 5)
  t.is(head(l), 1)
})

test('update', t => {
  const l = range(1, 5)
  t.is(stringify(update(l, 0, _ => 0)), '(0 2 3 4 5)')
  t.is(stringify(update(l, -1, _ => 0)), '(1 2 3 4 0)')
  t.is(stringify(update(l, 2, el => el * 3)), '(1 2 9 4 5)')
})

test('zip', t => {
  const a = range(1, 5)
  const b = range(11, 15)
  const z = zip(list(a, list(b)))
  t.is(stringify(map(z, stringify)), '((1 11) (2 12) (3 13) (4 14) (5 15))')
  const l = range(1, 1e6)
  t.is(length(zip(list(l, list(l)))), 1e6)
})

test('pair', t => {
  t.is(stringify(pair(1, 2)), '(1 2)')
})

test('apply', t => {
  const params = list(1, list(2, list(3)))
  const sum = apply(a => b => c => a + b + c)
  t.is(sum(params), 6)
})

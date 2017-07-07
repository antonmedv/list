"use strict"
/**
 * Creates a list.
 *
 * Takes two arguments: head and tail.
 *
 * Head is an element to store in the list, tail is another list or undefined.
 *
 * Example: Creates a list of one element:
 *
 *   list('something')
 *
 * Example: Creates a list of three elements:
 *
 *   list(1, list(2, list(3)))
 *
 */
const list = (head, tail) => next => next ? tail : head

/**
 * Represents the empty list as undefined.
 */
const empty = void 0

/**
 * Returns the head of a list or undefined if the list is empty.
 */
const head = l => l && l()

/**
 * Returns the tail of a list or undefined if the list is empty.
 */
const tail = l => l && l(true)

/**
 * Invokes the given fn for each item in the enumerable.
 */
const each = (l, fn) => (fn(head(l)), tail(l) && each(tail(l), fn))

/**
 * Invokes fn for each element in the list, passing that element and the accumulator as arguments.
 * fn’s return value is stored in the accumulator.
 *
 * The first element of the list is used as the initial value of the accumulator.
 * If you wish to use another value for the accumulator, pass it as third argument.
 *
 * Returns the accumulator.
 */
const reduce = (l, fn, init) => {
  let acc = init
  each(l, el => {
    if (acc === empty) {
      acc = el
    } else {
      acc = fn(acc, el)
    }
  })
  return acc
}

/**
 * Folds (reduces) the given list from the left with
 * a function. Requires an accumulator.
 *
 *   foldl(range(1, 4), 0, (x, acc) => x - acc) === 2
 *
 */
const foldl = (l, acc, fn) => l ? foldl(tail(l), fn(head(l), acc), fn) : acc

/**
 * Folds (reduces) the given list from the right with
 * a function. Requires an accumulator.
 *
 *   foldr(range(1, 4), 0, (x, acc) => x - acc) === -2
 *
 */
const foldr = (l, acc, fn) => foldl(reverse(l), acc, fn)

/**
 * Returns length of given list.
 *
 * Second param is an accumulator and should be omitted.
 */
const length = (l, count = 0) => l ? length(l && l(true), count + 1) : count

/**
 * Returns a list of elements in enumerable in reverse order.
 *
 * Second param is an accumulator and should be omitted.
 */
const reverse = (l, acc = empty) => l ? reverse(tail(l), list(head(l), acc)) : acc

/**
 * Returns a list where each item is the result of invoking fn on each corresponding item of list.
 *
 * Third param is an accumulator and should be omitted.
 */
const map = (l, fn, acc = empty) => l ? map(tail(l), fn, list(fn(head(l)), acc)) : reverse(acc)

/**
 * Appends right list to left list.
 */
const append = (l, r) => l ? list(head(l), append(tail(l), r)) : r

/**
 * Finds the element at the given index (zero-based).
 *
 * Returns undefined if index is out of bounds.
 *
 * A negative index can be passed, which means the list is counted from the end (e.g. -1 finds the last element).
 *
 * Note this operation takes linear time. In order to access the element, it will need to traverse previous elements.
 */
const at = (l, i) => i < 0 ? obtain(reverse(l), (-i) - 1) : obtain(l, i)

/**
 * Finds the element at the given index (zero-based).
 *
 * Private func.
 */
const obtain = (l, i) => i > 0 ? obtain(tail(l), i - 1) : head(l)

/**
 * Converts a list to string.
 */
const stringify = l => `(${reduce(l, (prev, curr) => `${prev} ${curr}`)})`

/**
 * Converts a list to string and prints it to console.
 */
const print = l => console.log(stringify(l))

/**
 * Generates a list of number elements.
 */
const range = (from, to, step = 1) => {
  let l = empty
  for (let i = from; i <= to; i += step) {
    l = list(i, l)
  }
  return l
}

module.exports = {
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
  print,
  range,
}

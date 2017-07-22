"use strict"
/**
 * Creates a list.
 *
 * Takes two arguments: head and tail.
 *
 * Head is an element to store in the list, tail is another list or undefined.
 *
 * Example: Creates a list of one element (tail can be omitted):
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
 * Returns the first element in list or undefined if list is empty.
 */
const first = l => head(l)

/**
 * Returns the last element in list or undefined if list is empty.
 */
const last = l => tail(l) ? last(tail(l)) : head(l)

/**
 * Invokes the given fn for each item in the enumerable.
 */
const each = (l, fn) => l && (fn(head(l)), each(tail(l), fn))

/**
 * Invokes fn for each element in the list, passing that element and the accumulator as arguments.
 * fn’s return value is stored in the accumulator.
 *
 * The first element of the list is used as the initial value of the accumulator.
 * If you wish to use another value for the accumulator, pass it as third argument.
 *
 * fn receives element and accumulator.
 *
 * Returns the accumulator.
 */
const reduce = (l, fn, init) => init ? foldl(l, init, fn) : foldl(tail(l), head(l), fn)

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
 */
const length = l => foldl(l, 0, (_, acc) => acc + 1)

/**
 * Returns a list of elements in enumerable in reverse order.
 */
const reverse = l => foldl(l, empty, list)

/**
 * Returns a list where each item is the result of invoking fn on each corresponding item of list.
 */
const map = (l, fn) => foldr(l, empty, (el, acc) => list(fn(el), acc))

/**
 * Concatenates right list to left list.
 *
 * The complexity of concat is proportional to length(l), so avoid repeatedly concatenating lists of arbitrary length,
 * e.g. concat(l, list(item)). Instead, consider prepending via list(item, l) and then reversing.
 */
const concat = (l, r) => foldr(l, r, list)

/**
 * Finds the element at the given index (zero-based).
 *
 * Returns undefined if index is out of bounds.
 *
 * A negative index can be passed, which means the list is counted from the end (e.g. -1 finds the last element).
 *
 * Note this operation takes linear time. In order to access the element, it will need to traverse previous elements.
 */
const at = (l, i) => i < 0 ? _obtain(reverse(l), (-i) - 1) : _obtain(l, i)

/**
 * Finds the element at the given index (zero-based).
 *
 * Private func.
 */
const _obtain = (l, i) => i > 0 ? _obtain(tail(l), i - 1) : head(l)

/**
 * Converts a list to string.
 */
const stringify = l => `(${reduce(l, (x, acc) => `${acc} ${x}`)})`

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
  return reverse(l)
}

/**
 * Returns a list with an updated value at the specified `index`.
 * Negative indices indicate an offset from the end of the `list`.
 *
 *   update(l, 0, el => el + 10)
 *
 *   update(l, -10, _ => 123)
 *
 * Note: currently update works without tco
 */
const update = (l, index, fn) =>
  index === 0 ?
    list(fn(head(l)), tail(l)) :
    index < 0 ?
      update(l, length(l) + index, fn) :
      l ? list(head(l), update(tail(l), index - 1, fn)) : l

/**
 * Zips corresponding elements from each list.
 * The zipping finishes as soon as any first list terminates.
 *
 *   const a = range(1, 5)
 *   const b = range(11, 15)
 *
 *   zip(list(a, list(b))) // ((1 11) (2 12) (3 13) (4 14) (5 15))
 *
 */
const zip = (ls, acc) => head(ls) ? zip(map(ls, tail), list(map(ls, head), acc)) : reverse(acc)

/**
 * Creates a list of two elements.
 */
const pair = (a, b) => list(a, list(b))

/**
 * Creates an applicative function.
 * Takes a curry function with arity of list.
 *
 *    const params = list(1, list(2))
 *    const sum = apply(a => b => a + b)
 *
 *    sum(params) === 3
 *
 */
const apply = fn => l => foldl(tail(l), fn(head(l)), (el, acc) => acc(el))

module.exports = {
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
  print,
  range,
  update,
  zip,
  pair,
  apply,
}

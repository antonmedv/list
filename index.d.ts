export interface List<T> {
  (): T
  (next: true): List<T>
}

export const list: <T>(head: T, tail?: List<T>) => List<T>
export const empty: List<undefined>
export const head: <T>(l: List<T>) => T
export const tail: <T>(l: List<T>) => List<T>
export const first: <T>(l: List<T>) => T
export const last: <T>(l: List<T>) => T
export const each: <T>(l: List<T>, fn: (T) => void) => List<T>
export const reduce: <T, K>(l: List<T>, fn: <K>(el: T, acc: K) => K, acc?: K) => K
export const foldl: <T, K>(l: List<T>, acc: K, fn: <K>(el: T, acc: K) => K) => K
export const foldr: <T, K>(l: List<T>, acc: K, fn: <K>(el: T, acc: K) => K) => K
export const length: <T>(l: List<T>) => number
export const reverse: <T>(l: List<T>) => List<T>
export const map: <T, K>(l: List<T>, fn: (el: T) => K) => List<K>
export const concat: <T, K>(l: List<T>, r: List<K>) => List<T | K>
export const at: <T>(l: List<T>, i: number) => T
export const stringify: <T>(l: List<T>) => string
export const print: <T>(l: List<T>) => void
export const range: (from: number, to: number, step?: number) => List<number>
export const update: <T>(l: List<T>, index: number, fn: (el: T) => T) => List<T>
export const zip: <T, K>(l: List<T>) => List<K>
export const pair: <T>(a: T, b: T) => List<T>
export const apply: <T, K>(fn: (el: T) => K) => (l: List<T>) => K

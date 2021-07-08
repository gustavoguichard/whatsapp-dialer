import {
  compose,
  first,
  flatten,
  fromPairs,
  isBoolean,
  isNil,
  join,
  reject,
  sortBy,
  toPairs,
  replace,
  split,
} from 'lodash/fp'

const cx = (...args: unknown[]): string =>
  compose(join(' '), reject(isBoolean), reject(isNil), flatten)(args)

const getFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

const sortObj: (o: Record<string, unknown>) => Record<string, unknown> =
  compose(fromPairs, sortBy(first), toPairs)

const extractCountryNumber = compose(first, split('-'), replace(/^\+/, ''))

export { cx, getFlagEmoji, sortObj, extractCountryNumber }

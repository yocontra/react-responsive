import hyphenate from 'hyphenate-style-name'
import mq from './mediaQuery'

const negate = (cond) => `not ${cond}`

const keyVal = (k, v) => {
  const realKey = hyphenate(k)

  // px shorthand
  if (typeof v === 'number') {
    v = `${v}px`
  }
  if (v === true) {
    return realKey
  }
  if (v === false) {
    return negate(realKey)
  }
  return `(${realKey}: ${v})`
}

const join = (conds) => conds.join(' and ')

const toQuery = (obj) => {
  const rules = []
  Object.keys(mq.all).forEach((k) => {
    const v = obj[k]
    if (v != null) {
      rules.push(keyVal(k, v))
    }
  })
  return join(rules)
}

export default toQuery

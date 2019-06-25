import { assert } from 'chai'
import toQuery from 'toQuery'

describe('toQuery', () => {
  it('makes number rules', () => {
    const q = toQuery({ minWidth: 760 })
    assert.equal(q, '(min-width: 760px)')
  })
  it('makes true rules', () => {
    const q = toQuery({ colorIndex: true })
    assert.equal(q, 'color-index')
  })
  it('makes negative rules', () => {
    const q = toQuery({ colorIndex: false })
    assert.equal(q, 'not color-index')
  })
  it('makes regular rules', () => {
    const q = toQuery({ orientation: 'portrait' })
    assert.equal(q, '(orientation: portrait)')
  })
  it('handles multiple rules', () => {
    const q = toQuery({ orientation: 'portrait', minWidth: 760 })
    assert.equal(q, '(min-width: 760px) and (orientation: portrait)')
  })
})

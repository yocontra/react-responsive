import { assert } from 'chai'
import toQuery from 'toQuery'

describe('toQuery', () => {
  it('makes number rules', () => {
    const q = toQuery({ minWidth: 760 })
    assert.equal(q, '(min-width: 760px)')
  })
  it('makes true rules', () => {
    const q = toQuery({ all: true })
    assert.equal(q, 'all')
  })
  it('makes negative rules', () => {
    const q = toQuery({ all: false })
    assert.equal(q, 'not all')
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

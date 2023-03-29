import { assert } from 'chai'
import mediaQuery from '../src/mediaQuery'

describe('mediaQuery', () => {
  it('has types and features in [all]', () => {
    assert.deepEqual(
      Object.keys(mediaQuery.all),
      Object.keys(mediaQuery.types).concat(Object.keys(mediaQuery.features))
    )
  })
  it('has all media types', () => {
    const types = [
      'all',
      'grid',
      'aural',
      'braille',
      'handheld',
      'print',
      'projection',
      'screen',
      'tty',
      'tv',
      'embossed'
    ]
    assert.deepEqual(Object.keys(mediaQuery.types), types)
  })
  it('has matchers', () => {
    const matchers = [
      'orientation',
      'scan',
      'aspectRatio',
      'deviceAspectRatio',
      'height',
      'deviceHeight',
      'width',
      'deviceWidth',
      'color',
      'colorIndex',
      'monochrome',
      'resolution',
      'type'
    ]
    assert.deepEqual(Object.keys(mediaQuery.matchers), matchers)
  })
  it('has features', () => {
    const features = [
      'minAspectRatio',
      'maxAspectRatio',
      'minDeviceAspectRatio',
      'maxDeviceAspectRatio',
      'minHeight',
      'maxHeight',
      'minDeviceHeight',
      'maxDeviceHeight',
      'minWidth',
      'maxWidth',
      'minDeviceWidth',
      'maxDeviceWidth',
      'minColor',
      'maxColor',
      'minColorIndex',
      'maxColorIndex',
      'minMonochrome',
      'maxMonochrome',
      'minResolution',
      'maxResolution'
    ]
    const keys = features.concat(Object.keys(mediaQuery.matchers))
    keys.splice(keys.indexOf('type'), 1)

    assert.deepEqual(Object.keys(mediaQuery.features), keys)
  })
})

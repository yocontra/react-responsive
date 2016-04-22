var assert = require('chai').assert;
var mediaQuery = require('mediaQuery');

describe('mediaQuery', function() {
  it('has types and features in [all]', function() {
    assert.deepEqual(Object.keys(mediaQuery.all), Object.keys(mediaQuery.types).concat(Object.keys(mediaQuery.features)));
  });
  it('has all media types', function () {
    var types = [
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
    ];
    assert.deepEqual(Object.keys(mediaQuery.types), types);
  });
  it('has matchers', function() {
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
      'resolution'
    ];
    matchers.push('type');
    assert.deepEqual(Object.keys(mediaQuery.matchers), matchers);
  });
  it('has features', function() {
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
    ];
    const keys = features.concat(Object.keys(mediaQuery.matchers));
    keys.splice(keys.indexOf('type'), 1);

    assert.deepEqual(Object.keys(mediaQuery.features), keys);
  });
});

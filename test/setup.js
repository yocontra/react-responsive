const JSDOM = require('jsdom').JSDOM
const matchMedia = require('matchmediaquery')

process.env.NODE_ENV = 'test'

global.window = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
  url: 'http://test.page'
}).window
global.document = window.document
global.self = global.window
global.navigator = global.window.navigator

global.window.matchMedia = matchMedia

global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0)
}

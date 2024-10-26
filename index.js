if (typeof WebAssembly === 'undefined') {
  console.log('[i] WebAssembly is not available, using polywasm...')
  globalThis.WebAssembly = require('polywasm').WebAssembly
}

require('./app.js')

console.log('[*] preparing environment...')

if (typeof WebAssembly === 'undefined') {
  console.log('[i] WebAssembly is not available, using polywasm...')
  globalThis.WebAssembly = require('polywasm').WebAssembly
}

console.log('[i] preparation complete.')

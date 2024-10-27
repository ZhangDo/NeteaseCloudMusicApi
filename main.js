const fs = require('fs')
const path = require('path')
const tmpPath = require('os').tmpdir()
const { cookieToJson } = require('./util')

// Handle anonymous token
if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
  fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
}

let firstRun = true

/** @type {Record<string, any>} */
let obj = {}

// Load modules directly using require
const moduleFiles = fs
  .readdirSync(path.join(__dirname, 'module'))
  .filter((file) => file.endsWith('.js'))

moduleFiles.reverse().forEach((file) => {
  try {
    // Use require with relative path
    const fileModule = require(`./module/${file}`)
    const fn = file.split('.').shift() || ''

    obj[fn] = function (data = {}) {
      if (typeof data.cookie === 'string') {
        data.cookie = cookieToJson(data.cookie)
      }
      return fileModule(
        {
          ...data,
          cookie: data.cookie ? data.cookie : {},
        },
        async (...args) => {
          if (firstRun) {
            firstRun = false
            const generateConfig = require('./generateConfig')
            await generateConfig()
          }
          const request = require('./util/request')
          return request(...args)
        },
      )
    }
  } catch (err) {
    console.error(`Error loading module ${file}:`, err)
  }
})

/**
 * @type {Record<string, any> & import("./server")}
 */
module.exports = {
  ...require('./server'),
  ...obj,
}

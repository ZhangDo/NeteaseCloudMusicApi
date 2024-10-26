#!/usr/bin/env node

console.log('[*] starting application...')

const fs = require('fs')
const path = require('path')
const tmpPath = require('os').tmpdir()

console.log('[i] using temp dir:', tmpPath)

const env = process.env
const port = env.PORT || 3000

console.log('[i] using port:', port)

async function start() {
  // 检测是否存在 anonymous_token 文件,没有则生成
  if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
    fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
  }
  // 启动时更新anonymous_token
  const generateConfig = require('./generateConfig')
  await generateConfig()
  require('./server').serveNcmApi({
    checkVersion: true,
    port: port,
  })
}
start()

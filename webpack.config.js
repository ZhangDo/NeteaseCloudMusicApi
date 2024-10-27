const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'module', to: 'module' },
        { from: 'util', to: 'util' },
        { from: 'server.js', to: 'server.js' },
        { from: 'generateConfig.js', to: 'generateConfig.js' },
        { from: 'main.js', to: 'main.js' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js'],
    mainFields: ['main'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  ignoreWarnings: [
    {
      module: /server\.js/,
      message: /Critical dependency/,
    },
  ],
  optimization: {
    minimize: true,
  },
}

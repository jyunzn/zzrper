const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/zzrper/index.js'),
  output: {
    filename: 'zzrper.js',
    path: path.resolve(__dirname, '..', 'dist'),
    library: 'zzrper',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { bugfixes: true, modules: false }]
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', {
                useESModules: true
              }]
            ]
          }
        }
      }
    ]
  }
}

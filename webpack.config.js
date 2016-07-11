var webpack = require('webpack');
var fs = require('fs');

var tripLicenseInfo = fs.readFileSync('./src/trip._header_.js', 'utf8');

module.exports = {
  entry: './src/trip.core.js',
  output: {
    path: './dist',
    filename: 'trip.js',
    library: 'Trip',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'jquery': {
      amd: 'jquery',
      root: 'jQuery',
      commonjs: 'jquery',
      commonjs2: 'jquery'
    }
  },
  plugins: [
    new webpack.BannerPlugin(tripLicenseInfo, {
      raw: true
    })
  ]
};

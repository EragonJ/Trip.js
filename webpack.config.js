var webpack = require('webpack');
var fs = require('fs');

var tripLicenseInfo = fs.readFileSync('./src/trip._header_.js', 'utf8');

module.exports = {
  entry: './src/trip.core.js',
  output: {
    path: './dist',
    filename: 'trip.js',
    library: 'Trip',
    libraryTarget: 'umd'
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    new webpack.BannerPlugin(tripLicenseInfo, {
      raw: true
    })
  ]
};

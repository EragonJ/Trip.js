module.exports = TripTheme;

var Themes = require('./themes');

function TripTheme() {

}

TripTheme.get = function(name) {
  var theme = Themes[name];
  return theme;
};

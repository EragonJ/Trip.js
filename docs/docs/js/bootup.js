(function() {
  var path = '/js/jquery-1.10.2.min';

  if (window.location.hostname.match('github')) {
    path = '/Trip.js' + path;
  }

  requirejs.config({
    paths: {
      jquery: path
    }
  });
})();

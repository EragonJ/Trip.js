$(document).ready(function() {
  // highlight code
  hljs.initHighlightingOnLoad();

  // UI
  $('#top-header .nav li').hover(function() {
    $(this).toggleClass('active');
  });
});

$(document).ready(function() {

    // highlight code
    hljs.initHighlightingOnLoad();

    // UI 
    $(".nav li").hover(function() {
        $(this).toggleClass("active");
    });

});

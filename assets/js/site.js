
// require('foundation.core');
// require('foundation.sticky');
// require('foundation.util.mediaQuery');
// require('foundation.util.triggers');
require('magnific-popup/dist/jquery.magnific-popup');(function($, window) {
  function scrollDebounce(runFn) {
    var timer;
    $(window).on('scroll', function() {
      clearTimeout(timer)
      timer = setTimeout(runFn, 50);
    });
  };
  $.externalizeLink = function(a) {
    var href = a.href;
    if (href && !href.match('/' + window.location.host + '/') && a.target != '_blank') {
      console.log('This is an external link', a.target, a.href, window.location.host);
      return true;
    }
    else
      return false;
  };

	$(function () {
		$('.email-link').attr('href', 'mailto:hire@jeffwilkerson.net').text('hire@jeffwilkerson.net');
		$('.nav-toggle').click(function(e) {
			e.preventDefault();
		});

		$('.toggle-btn').click(function(e) {
			e.preventDefault();
			var target = $(this).data('target');
			$('#'+target).slideToggle();
		});
		
		// $('a').each(function() {
		// 	if($.externalizeLink(this))
		// 		this.target = '_blank';
		// });

		scrollDebounce(function() {
			if($(this).scrollTop() > 10)
				$('body').addClass('scrolling');
			else
				$('body').removeClass('scrolling');
		});
 	});
})(jQuery, window);
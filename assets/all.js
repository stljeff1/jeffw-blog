(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// require('foundation.core');
// require('foundation.sticky');
// require('foundation.util.mediaQuery');
// require('foundation.util.triggers');
(function ($, window) {
  function scrollDebounce(runFn) {
    var timer;
    $(window).on('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(runFn, 50);
    });
  }

  ;

  $.externalizeLink = function (a) {
    var href = a.href;

    if (href && !href.match('/' + window.location.host + '/') && a.target != '_blank') {
      console.log('This is an external link', a.target, a.href, window.location.host);
      return true;
    } else return false;
  };

  $(function () {
    $('.email-link').attr('href', 'mailto:hire@jeffwilkerson.net').text('hire@jeffwilkerson.net');
    $('.nav-toggle').click(function (e) {
      e.preventDefault();
    });
    $('.toggle-btn').click(function (e) {
      e.preventDefault();
      var target = $(this).data('target');
      $('#' + target).slideToggle();
    });
    $('a').each(function () {
      if ($.externalizeLink(this)) this.target = '_blank';
    });
    scrollDebounce(function () {
      if ($(this).scrollTop() > 10) $('body').addClass('scrolling');else $('body').removeClass('scrolling');
    });
  });
})(jQuery, window);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvdmVuZG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFVBQVMsQ0FBVCxFQUFZLE1BQVosRUFBb0I7QUFDbkIsV0FBUyxjQUFULENBQXdCLEtBQXhCLEVBQStCO0FBQzdCLFFBQUksS0FBSjtBQUNBLElBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLFlBQVc7QUFDaEMsTUFBQSxZQUFZLENBQUMsS0FBRCxDQUFaO0FBQ0EsTUFBQSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUQsRUFBUSxFQUFSLENBQWxCO0FBQ0QsS0FIRDtBQUlEOztBQUFBOztBQUNELEVBQUEsQ0FBQyxDQUFDLGVBQUYsR0FBb0IsVUFBUyxDQUFULEVBQVk7QUFDOUIsUUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQWI7O0FBQ0EsUUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBTCxDQUFXLE1BQU0sTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsSUFBdEIsR0FBNkIsR0FBeEMsQ0FBVCxJQUF5RCxDQUFDLENBQUMsTUFBRixJQUFZLFFBQXpFLEVBQW1GO0FBQ2pGLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSwwQkFBWixFQUF3QyxDQUFDLENBQUMsTUFBMUMsRUFBa0QsQ0FBQyxDQUFDLElBQXBELEVBQTBELE1BQU0sQ0FBQyxRQUFQLENBQWdCLElBQTFFO0FBQ0EsYUFBTyxJQUFQO0FBQ0QsS0FIRCxNQUtFLE9BQU8sS0FBUDtBQUNILEdBUkQ7O0FBVUQsRUFBQSxDQUFDLENBQUMsWUFBWTtBQUNiLElBQUEsQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQixJQUFqQixDQUFzQixNQUF0QixFQUE4QiwrQkFBOUIsRUFBK0QsSUFBL0QsQ0FBb0Usd0JBQXBFO0FBQ0EsSUFBQSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCLEtBQWpCLENBQXVCLFVBQVMsQ0FBVCxFQUFZO0FBQ2xDLE1BQUEsQ0FBQyxDQUFDLGNBQUY7QUFDQSxLQUZEO0FBSUEsSUFBQSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCLEtBQWpCLENBQXVCLFVBQVMsQ0FBVCxFQUFZO0FBQ2xDLE1BQUEsQ0FBQyxDQUFDLGNBQUY7QUFDQSxVQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsSUFBUixDQUFhLFFBQWIsQ0FBYjtBQUNBLE1BQUEsQ0FBQyxDQUFDLE1BQUksTUFBTCxDQUFELENBQWMsV0FBZDtBQUNBLEtBSkQ7QUFNQSxJQUFBLENBQUMsQ0FBQyxHQUFELENBQUQsQ0FBTyxJQUFQLENBQVksWUFBVztBQUN0QixVQUFHLENBQUMsQ0FBQyxlQUFGLENBQWtCLElBQWxCLENBQUgsRUFDQyxLQUFLLE1BQUwsR0FBYyxRQUFkO0FBQ0QsS0FIRDtBQUtBLElBQUEsY0FBYyxDQUFDLFlBQVc7QUFDekIsVUFBRyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsU0FBUixLQUFzQixFQUF6QixFQUNDLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxRQUFWLENBQW1CLFdBQW5CLEVBREQsS0FHQyxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsV0FBVixDQUFzQixXQUF0QjtBQUNELEtBTGEsQ0FBZDtBQU1DLEdBdkJELENBQUQ7QUF3QkEsQ0ExQ0QsRUEwQ0csTUExQ0gsRUEwQ1csTUExQ1giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcclxuLy8gcmVxdWlyZSgnZm91bmRhdGlvbi5jb3JlJyk7XHJcbi8vIHJlcXVpcmUoJ2ZvdW5kYXRpb24uc3RpY2t5Jyk7XHJcbi8vIHJlcXVpcmUoJ2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5Jyk7XHJcbi8vIHJlcXVpcmUoJ2ZvdW5kYXRpb24udXRpbC50cmlnZ2VycycpO1xyXG4oZnVuY3Rpb24oJCwgd2luZG93KSB7XHJcbiAgZnVuY3Rpb24gc2Nyb2xsRGVib3VuY2UocnVuRm4pIHtcclxuICAgIHZhciB0aW1lcjtcclxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KHJ1bkZuLCA1MCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gICQuZXh0ZXJuYWxpemVMaW5rID0gZnVuY3Rpb24oYSkge1xyXG4gICAgdmFyIGhyZWYgPSBhLmhyZWY7XHJcbiAgICBpZiAoaHJlZiAmJiAhaHJlZi5tYXRjaCgnLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArICcvJykgJiYgYS50YXJnZXQgIT0gJ19ibGFuaycpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1RoaXMgaXMgYW4gZXh0ZXJuYWwgbGluaycsIGEudGFyZ2V0LCBhLmhyZWYsIHdpbmRvdy5sb2NhdGlvbi5ob3N0KTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuXHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoJy5lbWFpbC1saW5rJykuYXR0cignaHJlZicsICdtYWlsdG86aGlyZUBqZWZmd2lsa2Vyc29uLm5ldCcpLnRleHQoJ2hpcmVAamVmZndpbGtlcnNvbi5uZXQnKTtcclxuXHRcdCQoJy5uYXYtdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcudG9nZ2xlLWJ0bicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR2YXIgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcclxuXHRcdFx0JCgnIycrdGFyZ2V0KS5zbGlkZVRvZ2dsZSgpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdCQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkLmV4dGVybmFsaXplTGluayh0aGlzKSlcclxuXHRcdFx0XHR0aGlzLnRhcmdldCA9ICdfYmxhbmsnO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2Nyb2xsRGVib3VuY2UoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAxMClcclxuXHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ3Njcm9sbGluZycpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdzY3JvbGxpbmcnKTtcclxuXHRcdH0pO1xyXG4gXHR9KTtcclxufSkoalF1ZXJ5LCB3aW5kb3cpOyJdfQ==

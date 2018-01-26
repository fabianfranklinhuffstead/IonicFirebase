//This is the start of an custom directive I was working on unfortunately I could not get this in quite working order
// I am however using some of the ionic frameworks built in directives
/*

angular.module('starter.directives', [])

.directive('pushSearch', function() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        var amt, st, header;

        $element.bind('scroll', function(e) {
          if(!header) {
            header = document.getElementById('search-bar');
          }
          st = e.detail.scrollTop;
          if(st < 0) {
            header.style.webkitTransform = 'translate3d(0, 0px, 0)';
          } else {
            header.style.webkitTransform = 'translate3d(0, ' + -st + 'px, 0)';
          }
        });
      }
    }
})

.directive('photo', function($window) {
    return {
      restrict: 'C',
      link: function($scope, $element, $attr) {
        var size = ($window.outerWidth / 3) - 3;
        $element.css('width', size + 'px');
      }
    }
})

;

 */

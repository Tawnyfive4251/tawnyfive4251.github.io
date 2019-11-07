$(document).ready(function() {

  // typing animation
  (function($) {
    $.fn.writeText = function(content) {
        var contentArray = content.split(""),
            current = 0,
            elem = this;
        setInterval(function() {
            if(current < contentArray.length) {
                elem.text(elem.text() + contentArray[current++]);
            }
        }, 100);
    };

  })(jQuery);

  // input text for typing animation
  $("#holder").writeText("STUDENT AND SCIENCE ENTHUSIAST");


  if($(window).width() < 1000){ $('#fullpage').removeAttr('id'); }

  // initialize wow.js
  new WOW(
    {
mobile:       false,       // default
live:         false        // default
}
  ).init();

  // Push the body and the nav over by 285px over
  var main = function() {
    $('.fa-bars').click(function() {
      $('.nav-screen').animate({
        right: "0px"
      }, 200);

      $('body').animate({
        right: "285px"
      }, 200);
    });

    // Then push them back */
    $('.fa-times').click(function() {
      $('.nav-screen').animate({
        right: "-285px"
      }, 200);

      $('body').animate({
        right: "0px"
      }, 200);
    });

    $('.nav-links a').click(function() {
      $('.nav-screen').animate({
        right: "-285px"
      }, 500);

      $('body').animate({
        right: "0px"
      }, 500);
    });
  };

  $(document).ready(main);

  // initiate full page scroll

  $('#fullpage').fullpage({
    scrollBar: true,
    responsiveWidth: 400,
    navigation: true,
    navigationTooltips: ['home', 'about', 'portfolio', 'contact', 'connect'],
    anchors: ['home', 'about', 'portfolio', 'contact', 'connect'],
    menu: '#myMenu',
    fitToSection: true,

    afterLoad: function ( anchorLink, index){
      var loadedSection = $(this);


      //using index
      if(index==1){
        /* add opacity to arrow */
        $('.fa-chevron-down').each(function(){
          $(this).css('opacity','1')
        });
        $('.header-links a').each(function(){
          $(this).css('color','white')
        });
        $('.header-links').css("background-color","transparent");
      }

      else if(index!=1){
        $('.header-links a').each(function(){
          $(this).css('color','black')
        });
        $('.header-links').css('background-color', 'white');
      }

      //using index
      if(index == 2){

        /* animate skill bars */
        $('.skillbar').each(function(){
          $(this).find('.skillbar-bar').animate({
            width:jQuery(this).attr('data-percent')
          },2500);
        });
      }
    }
  });


  // move section down one
  $(document).on('click', '#moveDown', function(){
    $.fn.fullpage.moveSectionDown();
  });

  // fullpage.js link navigation
  $(document).on('click', '#skills', function(){
$.fn.fullpage.moveSectionDown();  });

  $(document).on('click', '#projects', function(){
$.fn.fullpage.moveSectionDown();  });

  $(document).on('click', '#contact', function(){
    $.fn.fullpage.moveTo(4);
  });

  // smooth scrolling
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 700);
          return false;
        }
      }
    });
  });

  //ajax form
  $(function() {

    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
      // Stop the browser from submitting the form.
      e.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      })
      .done(function(response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
      })
      .fail(function(data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text('Oops! An error occured and your message could not be sent.');
        }
      });

    });

  });

});
var API = (function(window, document, undefined) {

  // Canvas vars
  var canvas = document.getElementById('canvas'),

    ctx = canvas.getContext("2d"),
    cH, cW; // Canvas height / Canvas width
    document.body.style.background = "url(" + canvas.toDataURL() + ")";

  function initCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    cH = canvas.height;
    cW = canvas.width;
  }

  var colors = {
    circle: "white"
  };

  window.onresize = function() {
    initCanvas();
    initScene();
  };
  initCanvas();

  var velocity = 0.3;
  var util = {
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomVelocity: function() {
      return (velocity - (Math.random() * 0.5));
    }
  };
  // Math.root
  Math.root = function(val) {
    return val * val;
  };

  // Points class
  var basePointSize = 0.5;
  var Point = function(x, y) {
    var _x = x || util.getRandomInt(0, cW),
      _y = y || util.getRandomInt(0, cH),
      _radius = basePointSize + util.getRandomInt(0, 4);

    var _vx = util.getRandomVelocity(),
      _vy = util.getRandomVelocity();

    // Draw point
    this.drawPoint = function() {
      ctx.beginPath();
      ctx.arc(
        _x,
        _y,
        _radius,
        0,
        2 * Math.PI
      );
      ctx.fill();
    };

    // Getters
    this.x = function() {
      return _x
    };
    this.y = function() {
      return _y;
    };
    this.size = function() {
      return _radius;
    };

    // Animate
    this.animate = function() {
      if (_y < _radius || _y > (cH - _radius)) {
        _vy = -1 * _vy;
      } else if (_x < _radius || _x > (cW - _radius)) {
        _vx = -1 * _vx;
      }
      _x += _vx;
      _y += _vy;
    };

    return this;
  };

  // Line between 2 points
  var Line = function(point1, point2, distance) {

    var t1 = minDist * (point1.size() / 2),
      t2 = minDist * (point2.size() / 2);

    var threShould = t1 > t2 ? t1 : t2;

    if (distance < threShould) {

      var opacity = (1 - distance / threShould * 1.2);
      ctx.strokeStyle = "rgba(255, 255,255," + opacity + ")";

      ctx.beginPath();
      ctx.moveTo(point1.x(), point1.y());
      ctx.lineTo(point2.x(), point2.y());
      ctx.stroke();
    }
  };

  // Number of generated pointsm points array, min dits between points
  var pointsNumber,
    points,
    minDist;

  var refValue = {
    surface: 736000,
    dotsNumber: 260,
    minDistBetweenDots: 80
  };

  var passedVal;
  // Create Points
  function initScene(dotCount) {
    passedVal = passedVal || dotCount;

    pointsNumber = passedVal || Math.floor(refValue.dotsNumber * (cH * cW) / refValue.surface);
    minDist = refValue.minDistBetweenDots;

    points = [];
    for (var i = 0; i < pointsNumber; i++) {
      points.push(new Point());
      points[i].drawPoint();
    }

    ctx.fillStyle = colors.circle;
    ctx.lineWidth = 0.5;
  }

  // Update values and redraw
  function updateScene() {
    ctx.clearRect(0, 0, cW, cH);

    // For all points
    for (var i = 0; i < pointsNumber; i++) {

      // Move points
      points[i].animate();

      for (var j = i; j < pointsNumber; j++) {
        // Make line between 2 points
        new Line(
          points[i],
          points[j],
          Math.sqrt((Math.root(points[j].x() - points[i].x()) + Math.root(points[j].y() - points[i].y())))
        )

      }

      // Draw point last to overlad lines
      points[i].drawPoint();
    }
  }

  // Add point at given coordinate
  function bindClickToAddPoint() {

    function addPoint(x, y) {
      ++pointsNumber;
      points.push(new Point(x, y));
    }

    canvas.addEventListener('click', function(event) {
      var rect = canvas.getBoundingClientRect();
      addPoint(event.clientX - rect.left, event.clientY - rect.top);
    });
  }

  return {
    init: initScene,
    update: updateScene,
    bindClick: bindClickToAddPoint
  }

})(window, document);

(function() {
  API.init();
  API.bindClick();

  (function animate() {
    API.update();
    requestAnimationFrame(animate);
  })();
})();

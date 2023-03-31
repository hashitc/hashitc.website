/*-----------------------------------------------------------------------------------
    Template Name: Cantus Agency HTML Template
    Template URI: https://webtend.biz/cantus
    Author: WebTend
    Author URI: https://www.webtend.com
    Version: 1.0

	Note: This is Main js File For custom and jQuery plugins activation Code..
-----------------------------------------------------------------------------------

/*---------------------------
	JS INDEX
	===================
    01. Preloader
	02. MeanMenu
	03. OnePage Nav
	04. OFF Canvas Menu
	05. Sticky
	06. Search Form
	07. Feature Box Hover Effect
	08. Project Image Popup & Isotope
	09. Service Boxes Hover Effect
	10. Team Slider Active
	11. Counter UP
	12.  Video Popup
	13. Testimonial Slider Activation
	14. Init Wow js
	15. Scroll Event
-----------------------------*/


// canvas ??

const canvas = document.getElementById("canvasID");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let arrayParticle;

// mouse
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80)
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// create particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // draw individual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgb(255 255 255 / 0.1%)";
    ctx.fill();
  }

  //check article position
  //check mouse position
  //move particle
  update() {
    //check particle is still within canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    //check collision detection
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }
    //move particle
    this.x += this.directionX;
    this.y += this.directionY;

    //draw particle
    this.draw();
  }
}

init = () => {
  arrayParticle = [];
  console.log("...");
  let numberOfParticle = (canvas.height * canvas.width) / 20000;
  for (let i = 0; i < numberOfParticle * 2; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;

    let color = "rgb(255 255 255 / 0.1%)";
    arrayParticle.push(new Particle(x, y, directionX, directionY, size, color));
  }
};

//animate loop
animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < arrayParticle.length; i++) {
    arrayParticle[i].update();
  }
  connect();
};

// connecti dot
connect = () => {
  let opacity = 1;
  for (let i = 0; i < arrayParticle.length; i++) {
    for (let j = i; j < arrayParticle.length; j++) {
      let distance =
        (arrayParticle[i].x - arrayParticle[j].x) *
          (arrayParticle[i].x - arrayParticle[j].x) +
        (arrayParticle[i].y - arrayParticle[j].y) *
          (arrayParticle[i].y - arrayParticle[j].y);

      if (distance < (canvas.width / 8) * (canvas.height / 8)) {
        // opacity = 1 - distance / 1000;
        ctx.strokeStyle = "rgb(255 255 255 / 5%)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(arrayParticle[i].x, arrayParticle[i].y);
        ctx.lineTo(arrayParticle[j].x, arrayParticle[j].y);
        ctx.stroke();
      }
    }
  }
};

// resize event
window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 50) * (canvas.height / 80);
  init();
});

// mouse out
window.addEventListener("mouseout", () => {
  mouse.x = undefined;
});

init();
animate();


// canvas ??





$(document).ready(function() {

	matchHeight.init();
	matchHeightLi.init();
	matchHeightEx.init();

	/* Submit Contact Form */
	$("#contact_form").submit(function(e) {
		e.preventDefault(); // avoid to execute the actual submit of the form.
		$("#submit_btn").attr('disabled', 'disabled').text("Submitting...");
		var form = $(this);
		jQuery.ajax({
			url: "contact.php",
			data: form.serialize(),
			type: "POST",
			success:function(data){
				$('.success-msg').removeClass('d-none');
				setTimeout(function() {
					$('.success-msg').addClass('d-none');
				}, 6000);
				$("#submit_btn").removeAttr('disabled').text("Submit");
			},
			error:function (){
				$("#submit_btn").removeAttr('disabled').text("Submit");
			}
		});
	});
});


var matchHeight = (function () {
	function init() {
		eventListeners();
		matchHeight();
	}

	function eventListeners() {
		$(window).on("resize", function () {
			matchHeight();
		});
	}

	function matchHeight() {
		var groupName = $("[data-match-height]");
		var groupHeights = [];

		groupName.css("min-height", "auto");

		groupName.each(function () {
			groupHeights.push($(this).outerHeight());
		});

		var maxHeight = Math.max.apply(null, groupHeights);
		groupName.css("min-height", maxHeight);
	}
	

	return {
		init: init
	};

	
})();

var matchHeightLi = (function () {
	function init() {
		eventListeners();
		matchHeightLi();
	}

	function eventListeners() {
		$(window).on("resize", function () {
			matchHeightLi();
		});
	}

	function matchHeightLi() {
		var groupNameLi = $("[data-match-height-li]");
		var groupHeightsLi = [];
		console.log(groupNameLi)

		groupNameLi.css("min-height", "auto");

		groupNameLi.each(function () {
			groupHeightsLi.push($(this).outerHeight());
		});

		var maxHeightLi = Math.max.apply(null, groupHeightsLi);
		groupNameLi.css("min-height", maxHeightLi);
	}
	

	return {
		init: init
	};

	
})();


var matchHeightEx = (function () {
	function init() {
		eventListeners();
		matchHeightEx();
	}

	function eventListeners() {
		$(window).on("resize", function () {
			matchHeightEx();
		});
	}

	function matchHeightEx() {
		var groupNameEx = $("[data-match-height-Ex]");
		var groupHeightsEx = [];
		console.log(groupNameEx)

		groupNameEx.css("min-height", "auto");

		groupNameEx.each(function () {
			console.log($(this).outerHeight());
			groupHeightsEx.push($(this).outerHeight());
		});

		var maxHeightEx = Math.max.apply(null, groupHeightsEx);
		console.log(maxHeightEx)
		groupNameEx.css("min-height", maxHeightEx);
	}
	

	return {
		init: init
	};

	
})();



$(function() {
	'use strict';

	// ===== 01. Preloader
	$(window).on('load', function(event) {
		$('.loaderOne')
			.delay(500)
			.fadeOut(500);
	});

	// ===== 02. MeanMenu
	$('header .main-mneu').meanmenu({
		meanMenuContainer: '.mobilemenu',
		meanScreenWidth: '991',
		meanRevealPosition: 'right'
	});

	// ===== 03. OnePage Nav
	var top_offset = $('header').height();
	$('.main-mneu ul, .mobilemenu ul').onePageNav({
		currentClass: 'active',
		scrollOffset: top_offset
	});

	// ===== 04. OFF Canvas Menu
	$('.off-canver-menu').on('click', function(e) {
		e.preventDefault();
		$('.off-canvas-wrap').addClass('show-off-canvas');
		$('.overly').addClass('show-overly');
	});
	$('.off-canvas-close').on('click', function(e) {
		e.preventDefault();
		$('.overly').removeClass('show-overly');
		$('.off-canvas-wrap').removeClass('show-off-canvas');
	});
	$('.overly').on('click', function(e) {
		$(this).removeClass('show-overly');
		$('.off-canvas-wrap').removeClass('show-off-canvas');
	});

	// ===== 05. Sticky
	$(window).on('scroll', function(event) {
		var scroll = $(window).scrollTop();
		if (scroll < 110) {
			$('header').removeClass('sticky');
		} else {
			$('header').addClass('sticky');
		}
	});

	//===== 06. Search Form
	$('.search-icon').on('click', function(e) {
		e.preventDefault();
		$('.search-form').toggleClass('show-search');
	});

	//===== 07. Feature Box Hover Effect
	$('.feature-loop').on('mouseover', '.feature-box', function() {
		$('.feature-box.active').removeClass('active');
		$(this).addClass('active');
	});

	//===== 08. Project Image Popup & Isotope
	var grid = $('.grid').isotope({
		itemSelector: '.grid-item',
		percentPosition: true,
		masonry: {
			columnWidth: '.grid-item'
		}
	});
	$('.portfolio-menu ul li').on('click', function() {
		$(this)
			.siblings('.active')
			.removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr('data-filter');
		grid.isotope({ filter: filterValue });
	});
	$('.image-popup').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	//===== 09. Service Boxes Hover Effect
	$('.service-loop').on('mouseover', '.service-box', function() {
		$('.service-box.active').removeClass('active');
		$(this).addClass('active');
	});

	//===== 10. Team Slider Active
	var teamSlider = $('#teamSlider');
	teamSlider.slick({
		autoplay: true,
		arrows: false,
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});


		//===== 10. Team Slider Active
		var teamSlider = $('#ServicesSlider');
		teamSlider.slick({
			autoplay: true,
			arrows: false,
			dots: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	

	//===== 11. Counter UP
	$('.counter').counterUp({
		delay: 10,
		time: 3000
	});

	//===== 12.  Video Popup
	$('.video-popup').magnificPopup({
		type: 'iframe'
	});

	//===== 13. Testimonial Slider Activation
	var testimonialSlide = $('#testimonialSlide');
	// var testimonialAuthor = $('#testimonialAuthor');
	testimonialSlide.slick({
		autoplay: false,
		arrows: true,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow:
			'<span class="slick-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></span>',
		nextArrow:
			'<span class="slick-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></span>',

			responsive: [
				{
				  breakpoint: 700,
				  settings: {
					autoplay: false,
					arrows: true,
					dots: false,
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				},
			
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
			  ]
		// asNavFor: testimonialAuthor
	});
	//testimonialAuthor.slick({
	//	autoplay: false,
	//	arrows: false,
	//	dots: false,
	//	slidesToShow: 3,
	//	slidesToScroll: 1,
	//	asNavFor: testimonialSlide,
	//	focusOnSelect: true
//	});

	//===== 14. Init Wow js
	new WOW().init();

	//===== 15. Scroll Event
	$(window).on('scroll', function() {
		var scrolled = $(window).scrollTop();
		if (scrolled > 300) $('.go-top').addClass('active');
		if (scrolled < 300) $('.go-top').removeClass('active');
	});
	$('.go-top').on('click', function() {
		$('html, body').animate(
			{
				scrollTop: '0'
			},
			1200
		);
	});
	
});



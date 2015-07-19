// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//resize home div (welcome)
$(document).ready(function(){
	
	if(window.innerHeight > "550"){
	
		var homeHeight = $(window).height() - $('#main-nav').height() - 80;
		$("#welcome .section").css("height", homeHeight);
		
		
	
	}else {
		
			var homeHeightFixed = 550 - $('#main-nav').height() - 80;
			$("#welcome .section").css("height", homeHeightFixed);

	}
	
});




//resize contact div
$(document).ready(function(){
	
	if(window.innerHeight > "500"){
		
		function resize()
		{
		    var heights = window.innerHeight - 60;
		    document.getElementById("contact-window").style.height = heights + "px";
		}
		resize();
		window.onresize = function() {
		    resize();
		};
		
		
	}
	

});


//parallax
//paralax effect on header img & text, thanks to www.brandaiddesignco.com
	var top_header = '';
	$(document).ready(function(){
	  top_header = $('#welcome section');
	});
	
	$(window).scroll(function () {
	  var st = $(window).scrollTop();
	  top_header.css({'background-position':"center "+(st*-.4)+"px"});
	});



	////change z index of #work to 999 on click of work
$(document).ready(function(){

	$("#work").on("click", ".workbtn", function(){

		    $("#work").css({"z-index": "999"});

	});

	$("#work").on("click", "#overlay-close", function(){

		    $("#work").css({"z-index": "400"});
		    $('html, body').delay(400).animate({
		        scrollTop: $(".section2").offset().top - 62
		    }, 200 );
	});

});





// change nav colors when scrolling to about section
$(document).ready(function () {
    var menu = $('.m1 li');

    $(window).scroll(function () {
        var y = $(this).scrollTop();
        var z = $('.section3').offset().top - 30;

        if (y >= z) {
            menu.removeClass('nav-white').addClass('nav-black');
        }
        else{
            menu.removeClass('nav-black').addClass('nav-white');
        }
    });
  

});

//nav starting position when browser < 785

//$(document).ready(function() {
//	var welcomeHeight = $("#section1").height();
//	var navHeight =  $('#main-nav').height();
//	var navPosShort = welcomeHeight - navHeight;
	
//	if (welcomeHeight < 643){
		
//		$("#main-nav").css({"top", navPosShort});
		
//	} 
	
	
	
//});



// Sticky Nav + smooth scrolling
// Originally written by Eric Hasseltine of Choppingblock.com

	// Make menu stick to top of the page when it reaches the top of the page
	// Menu items should highlight when you scroll to the right place on the page (add a css class to differentiate it)
	// Use $(element).offset().top liberally
	// Click on menu element should scroll the page to the proper section

	var NAV_INIT_POS = $(window).height() - $('#main-nav').height() - 170;

	var NAV_STICK_POSITION = $(window).height() - $('#main-nav').height() - 170;
	var MENU_HEIGHT = 64;
	var SECTION_TOPS = [];
	
	$(".menu").css("top", NAV_INIT_POS);
	
	
	$(".section").each(function(){			
		SECTION_TOPS.push($(this).offset().top);
	});

	// Particularly if your images affect the height of your page
	// Recalculate when page is done loading
	$(document).load(function(){
		$(".section").each(function(){			
			SECTION_TOPS.push($(this).offset().top);
		});			
	});



	$(".menu").on("click", "li", function(){
	
	
		var sectionClass = $(this).attr("data-section");
	
		var sectionTop = $("." + sectionClass).offset().top - MENU_HEIGHT + 2;
	
		$("html,body").animate({
			scrollTop: sectionTop
		
		});
	
	});


	$(document).scroll(function(){
	
		// This is where we watch for scroll events
		// Check this to decide when things should happen
		if($(document).scrollTop() >= NAV_STICK_POSITION){
			// $(".main-nav").css({
			// 	position: "fixed",
			// 	top: 0					
			// });
			$(".menu").css("top", 0);
			$(".menu").addClass("fixed");
		
		}else{
		
			$(".menu").removeClass("fixed");
			$(".menu").css("top", NAV_INIT_POS);
			// $(".main-nav").css({
			// 	position: "absolute",
			// 	top: NAV_STICK_POSITION					
			// });
		
		}
	
	
		
	
	
		for (var i=0; i < SECTION_TOPS.length-1; i++) {
		
			if($(document).scrollTop() >= SECTION_TOPS[i]-MENU_HEIGHT && $(document).scrollTop() < SECTION_TOPS[i+1]){
				var sectionClass = "section" + (i+1);
				$(".menu .active").removeClass("active");
			
				$("li[data-section='" + sectionClass +"']").addClass("active");
			
				window.location.hash = sectionClass;
			}else if($(document).scrollTop() > SECTION_TOPS[SECTION_TOPS.length-1] ){
				var sectionClass = "section" + (SECTION_TOPS.length);
			
				$(".menu .active").removeClass("active");
				$("li[data-section='" + sectionClass +"']").addClass("active");
				window.location.hash = sectionClass;					
			}
		};
	
	
	
	});



	// On page load
	// Look at


	if(window.location.hash != ""){
		// Determine which section the page should scroll to
	
		var hashClass = window.location.hash;
		var section = $("." + hashClass.substr(1));
		if(section.length > 0){
			var sectionTop = section.offset().top - MENU_HEIGHT + 2;
			$(document).scrollTop(sectionTop);
		
		}

	}

	if($(window).width() < 600){
	
		// When you click on the menu bar
		// You need to to slide out the menu
		// And slide over the page
		// (Just add the right CSS classes)
		// When that menu is slide out, any new clicks should close it ($(body).one...)
	
	
		$(".menu-bar").click(function(event){
			$(".wrap").addClass("open");
			$(".menu").addClass("open");
		
			// Stop click event from bubbling up to the body element
			// before adding additional handler
			// event.stopPropagation();
		
			$("body").one("click", function(){
				console.log("Body clicked");
					$(".wrap").removeClass("open");
					$(".menu").removeClass("open");
				
				
				})
		
		})
	
	
	}

$(document).ready(function() {

	//----- DATEPICKER -----//
	$(function() {
	  $( "#datepicker" ).datepicker()
											.datepicker("setDate", new Date());
	});

	//----- CHANGE NAVBAR STYLE AFTER SCROLL -----//
	$(window).on("scroll",function() {
    if($(window).scrollTop() > 50){
    	$(".navbar").addClass("scrolled");
    	$(".navbar img").attr("src", "http://templates.framework-y.com/gourmet/images/logo-2.png");
    }
    else{
    	$(".navbar").removeClass("scrolled");
    	$(".navbar img").attr("src", "http://templates.framework-y.com/gourmet/images/logo.png");
    }
  });


	//----- SMOOTH SCROLLING -----//

	// Add smooth scrolling on all links inside the navbar
	$("#myNavbar a, .smooth-scroll-anchor").on('click', function(event) {

	  // Make sure this.hash has a value before overriding default behavior
	  if (this.hash !== "") {

	    // Prevent default anchor click behavior
	    event.preventDefault();

	    // Store hash
	    var hash = this.hash;

	    // Using jQuery's animate() method to add smooth page scroll
	    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	    $('html, body').animate({
	      scrollTop: $(hash).offset().top
	    }, 800, function(){

	    // Add hash (#) to URL when done scrolling (default click behavior)
	      window.location.hash = hash;
	    });

	  } // End if

	}); 
});
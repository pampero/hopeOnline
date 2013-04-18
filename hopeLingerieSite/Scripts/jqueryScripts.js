jQuery(document).ready(function(){
    
    jQuery("#header_menu_category dd").hover(function() {
		jQuery("#header_menu_category").find("dd.hover").removeClass('hover');
		
		jQuery(this).addClass('hover');
		
	}, function() {
		
		jQuery(this).addClass('hover');
		
	});
	
	jQuery("#header_menu_category").hover(
	    function() {
	    },
	    function() {
	         
	    }
	);

});
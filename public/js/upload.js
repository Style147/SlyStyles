'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	$('.secretB').click(reenable);
	function reenable(event){
		alert("hi");
		event.preventDefault();
		alert("hi");
		$('.upload-form').prop("disabled", false);
	}
})

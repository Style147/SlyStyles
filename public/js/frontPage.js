'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#searchBtn').click(search);
}

function search(e) {
	var searchTextBox = $('#searchTextBox');
	var searchInput = searchTextBox.val();
	if(!searchInput)
		$('#searchTextBox').attr('placeholder','Enter a Search!');
	else {
		console.log(searchInput);
		$(this).closest('form').submit();
	}
}
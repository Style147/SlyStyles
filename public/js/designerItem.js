'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	var pathname = window.location.pathname;
	console.log('init page');
 	$('#filterBtnLikes').click(function(e) {
		console.log('like btn clicked');
 		$.get(pathname + '/filter/likes', filter)
 	});
 	$('#filterBtnPriceLoHi').click(function(e) {
 		console.log('like btn clicked');
 		$.get(pathname + '/filter/priceLoHi', filter)
 	});
 	$('#filterBtnPriceHiLo').click(function(e) {
 		console.log('like btn clicked');
 		$.get(pathname + '/filter/priceHiLo', filter)
 	});
}

function filter(results) {
	console.log('filter callback with data:')
	console.log(results);
 	var alts = results.alts;
 	var designerItem = results.designerItem;
 	var listHtml = '<div class="alternative-item-grid">';
 	listHtml += '<div class="row">';
 	for (var i = 0; i < alts.length; i++) {
 		var alt = alts[i];

		listHtml += '<div class="col-xs-6">'
			+ '<div class="thumbnail">'
			+ '<a href="/designerItem/'+designerItem._id+'/altItem/'+alt._id+'"><img src="'+alt.image+'" alt="foo1" class="img-responsive"></a>'
			+ '<div class="caption">'
			+ '<a href="/designerItem/'+designerItem._id+'/altItem/'+alt._id+'">'
			+ '<h3 class="item-name">'+alt.name+'</h3>'
			+ '<p/>'
			+ '<h5 class="item-brand">by '+alt.brand+'</h5>'
			+ '<p class="item-price">'+alt.price+'</p>'
			+ '</a>';

		if(alt.liked) {
			listHtml += '<p>'
				+ '<p>'
				+ '<a href="/aunlike/'+alt._id+'"><i class="fa fa-heart fa-2x liked"> </i></a>'+alt.likes
				+ '</p>';
		}
		else {
			listHtml += '<a href="/alike/'+alt._id+'"><i class="fa fa-heart fa-2x unliked"> </i></a>'+alt.likes
				+ '</p>';
		}
		listHtml += '</div>'
			+ '</div>'
			+ '</div>';
	}

	listHtml += '</div>'
		+ '</div>';

	console.log(listHtml);
	console.log($('.alternative-item-grid').length);
	//set the html
	$('.alternative-item-grid').html(listHtml);
}

var yourVariable = '<%= Session["name"] %>';
console.log(yourVariable);
//make sure body has padding for navbar
$('body').css('padding-top','70px');

//add in navbar code at the beginning of the body
function addNavBar(name, url){
	console.log();
	$('body').prepend('<!-- Nav Bar at top -->'
	+'<nav class="navbar-inverse navbar-default navbar-fixed-top" role="navigation" id="top">'
	+'<div class="container" >'
		+'<!-- Brand and toggle get grouped for better mobile display -->'
		+'<div class="navbar-header">'
			+'<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">'
				+'<span class="sr-only">Toggle navigation</span>'
				+'<span class="icon-bar"></span>'
				+'<span class="icon-bar"></span>'
				+'<span class="icon-bar"></span>'
			+'</button>'
			+'<a class="navbar-brand" href="/">SlyStyles</a>'
		+'</div>'
		+'<!-- Collect the nav links, forms, and other content for toggling -->'
		+'<div class="collapse navbar-collapse navbar-ex1-collapse">'
			+'<table class="wider ">'
				+'<tr >'
					+'<td class="leftBar">'
						+'<img class="smaller" src = "/images/lindsey.jpg"></img>'
					+'</td>'
					+'<td>'
						+'<ul class="nav navbar-nav navbar-right"  id="dropdown" >'
							+'<li>'
								+'<a href="/profile.html" target="_self"><i class="fa fa-user"></i>&nbsp; Lindsey</a>'
							+'</li>'
							+'<li>'
								+'<a href="/settings.html" target="_self"><i class="fa fa-gears"></i>&nbsp; Settings</a>'
							+'</li>'
							+'<li>'
								+'<a href="/logout" target="_self"><i class="fa fa-power-off"></i>&nbsp; Logout</a>'
							+'</li>'
						+'</ul>'
					+'</td>'
				+'</tr>'
			+'</table>'
		+'</div><!-- /.navbar-collapse -->'
	+'</div>'
+'</nav>');

}



/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var designerItem = require('./routes/designerItem');
var altItem = require('./routes/altItem');
var profile = require('./routes/profile');
var userSettings = require('./routes/settings');
var user = require('./routes/user');
var frontPage = require('./routes/frontPage');
var tags = require('./routes/tags');
// Example route
// var user = require('./routes/user');

// create database and connect
var local_database_name = 'slystylesTestDB';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/designerItem/:id', designerItem.view);
app.get('/designerItem/:designerID/altItem/:altID', altItem.view);
app.get('/profile', profile.view);
app.get('/settings', userSettings.view);
app.post('/addDesignerItem', designerItem.addDesignerItem);
app.post('/designerItem/:designerID/addAltForDesignerItem', designerItem.addAltItem)
app.get('/login', user.login);
app.get('/frontpage', frontPage.view);
app.get('/logout', user.logout);
app.get('/createAccount', user.create);
app.post('/createAccount', user.create);
app.get('/likes', user.getLikes);
app.get('/dlike/:itemID', designerItem.like);
app.get('/frontPage/search', frontPage.searchDesignerItems);
app.get('/dunlike/:itemID', designerItem.unlike);
app.get('/profilecon', profile.viewcon);
app.get('/alike/:itemID', altItem.like);
app.get('/aunlike/:itemID', altItem.unlike);
app.get('/tag/:tag', tags.search);
app.get('/designerItem/:designerID/filter/:filterType', designerItem.filter);
// Example route
// app.get('/users', user.list);
// <app var from express>.get('<url path to js file>', <jsfilename>.<exported function>)


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

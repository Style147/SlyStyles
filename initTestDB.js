
/*
	This script will initialize a local Mongo database
	on your machine so you can do development work.

	IMPORTANT: You should make sure the

			local_database_name

	variable matches its value in app.js  Otherwise, you'll have
	initialized the wrong database.
	*/

	var mongoose = require('mongoose');
	var DesignerItemModel = require('./models/designerItemModel');
	var AltItemModel = require('./models/altItemModel');
	var UserModel = require('./models/userModel');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'slystylesTestDB';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var designer_items_json = require('./designer-items.json');
designer_items_json = designer_items_json.designerItems;

var alt_items_json = require('./alt-items.json');
alt_items_json = alt_items_json.altItems;

var user_json = require('./users.json');
user_json = user_json.users;

// Step 2: Remove all existing documents
DesignerItemModel.DesignerItem
	.find()
	.remove()
	.exec(onceDesignerClear);

UserModel.User
	.find()
	.remove()
	.exec(onceUserClear);


//this is to deal with the closure in a loop problem
//returns a function that creates links in the DB between the given designer
//item and all alts of the same type
function createLinkerFn(designerItem) {
	return function() {
		//get all alt items with same 'type'
		AltItemModel.AltItem.find({type: designerItem.type}).exec(function(err, results) {
			if(err)
				console.log(err);

			for(var i = 0; i < results.length; i++) {
				var altItem = results[i];
				
				//create links
				console.log('linking ' + designerItem.name + ' with ' + altItem.name);
				DesignerItemModel.DesignerItem.update(
					{_id: designerItem._id}, 
					{$push: {'alts': altItem._id}},
					{upsert: true},
					function(err){
						if(err) console.log(err);
					}
				);
				AltItemModel.AltItem.update(
					{_id: altItem._id}, 
					{$push: {'designerMatch': designerItem._id}},
					{upsert: true},
					function(err){
						if(err) console.log(err);
					}
				);
			}

			toUpdateCount--;
			console.log(toUpdateCount + ' designer items left to link');
			if(toUpdateCount <= 0) {
				console.log('DONE linking alts to designer items');
				// The script won't terminate until the 
				// connection to the database is closed
				//console.log('closing db connection');
				//mongoose.connection.close()
			}
		});
	};
}


// Step 3: load the data from the JSON file
function onceDesignerClear(err) {
	if(err) console.log(err);

	// loop over the items, construct and save an object from each one
	var to_save_count = designer_items_json.length;
	for(var i=0; i<designer_items_json.length; i++) {
		var designerItem = designer_items_json[i];
		designerItem = new DesignerItemModel.DesignerItem(designerItem);

		designerItem.save(function(err) {
			if(err)
				console.log(err);

			to_save_count--;
			console.log(to_save_count + ' designer items left to save');
			if(to_save_count <= 0) {
				console.log('DONE saving designer items');
				console.log('Clearing alts');
				
				//once all of the saves are done, move on to saving alts
				AltItemModel.AltItem
				.find()
				.remove()
				.exec(function(err) {
					if(err) console.log(err);

					console.log('DONE clearing alts');

					// loop over the items, construct and save an object from each one
					var to_save_count = alt_items_json.length;
					for(var i = 0; i < alt_items_json.length; i++) {
						var altItem = alt_items_json[i];
						altItem = new AltItemModel.AltItem(altItem);

						altItem.save(function(err) {
							if(err) console.log(err);

							to_save_count--;
							console.log(to_save_count + ' alt items left to save');
							if(to_save_count <= 0) {
								console.log('DONE saving alt items');

								//once all the alts are saved, move on to linking

								//Step 4: create links between items
								//get all designer items
								//for each designer item, get alt items with same 'type' attribute
								//for each alt item
								//  update the designerItem's alts to include this alt's id
								//  update this alt to include the designerItem's id as a match
								DesignerItemModel.DesignerItem.find().exec(function(err, results) {
									if(err)
										console.log(err);

									toUpdateCount = results.length;
									for(var i = 0; i < results.length; i++) {
										var designerItem = results[i];

										var linkfn = createLinkerFn(designerItem);
										linkfn();
									}
								});
							}
						});
					}
				});
			}
		});
	}
}



function onceUserClear(err) {
	if(err) console.log(err);

	// loop over the items, construct and save an object from each one
	// Note that we don't care what order these saves are happening in...
	var to_save_count = user_json.length;
	for(var i=0; i<user_json.length; i++) {
		var user = user_json[i];
		user = new UserModel.User(user);

		user.save(function(err, proj) {
			if(err) console.log(err);

			to_save_count--;
			console.log(to_save_count + ' users left to save');
			if(to_save_count <= 0) {
				console.log('DONE saving users');
				// The script won't terminate until the 
				// connection to the database is closed
				//console.log('closing db connection');
				//mongoose.connection.close()
			}
		});
	}
}




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
  .exec(onceDesignerClear); // callback to continue at

  AltItemModel.AltItem
  .find()
  .remove()
  .exec(onceAltClear); // callback to continue at

  UserModel.User
  .find()
  .remove()
  .exec(onceUserClear); // callback to continue at

// Step 3: load the data from the JSON file
function onceDesignerClear(err) {
  if(err) console.log(err);

  // loop over the items, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = designer_items_json.length;
  for(var i=0; i<designer_items_json.length; i++) {
    var json = designer_items_json[i];
    var altitem = alt_items_json[i];
    var proj = new DesignerItemModel.DesignerItem(json);
    altitem.designerMatch = proj._id;
    var altItemObj = new AltItemModel.AltItem(altitem);

    //console.log('i ' + i + ' ');
   // console.log(altitem);
   proj.save(function(err, saved) {
    console.log(saved);
    if(err) console.log(err);

    });

   altItemObj.save(function(err, alternateItem) {
    if(err) console.log(err);
    DesignerItemModel.DesignerItem.update({'_id': alternateItem.designerMatch},
      {$push: {'alts': alternateItem._id}},
      {upsert: true},
      afterUpdater);
    function afterUpdater(err){
      if(err) console.log(err);
    }
    console.log(alternateItem);
  });

 }
}

function onceAltClear(err) {
 /* if(err) console.log(err);

  // loop over the items, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = alt_items_json.length;
  for(var i=0; i<alt_items_json.length; i++) {
    var json = alt_items_json[i];
    var proj = new AltItemModel.AltItem(json);
    proj.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' alt items left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
      }
    });
}*/
}

function onceUserClear(err) {
  if(err) console.log(err);

  // loop over the items, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = user_json.length;
  for(var i=0; i<user_json.length; i++) {
    var json = user_json[i];
    var proj = new UserModel.User(json);
    console.log(json);


    proj.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' users left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
        // The script won't terminate until the 
        // connection to the database is closed
        console.log('closing db connection');
        mongoose.connection.close()
      }
    });
  }
}

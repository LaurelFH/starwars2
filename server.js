// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
//internal so we don't need to do anything with it
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
//haev to give at leadt one port to get it to run
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Star Wars Characters (DATA)
// =============================================================
var characters = [{
  routeName: "yoda",
  name: "Yoda",
  role: "Jedi Master",
  age: 900,
  forcePoints: 2000
}, {
  routeName: "darthmaul",
  name: "Darth Maul",
  role: "Sith Lord",
  age: 200,
  forcePoints: 1200
}, {
  routeName: "obiwankenobi",
  name: "Obi Wan Kenobi",
  role: "Jedi Master",
  age: 55,
  forcePoints: 1350
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

//info from the form 
app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Get all characterss
app.get("/all", function(req, res) {
  res.json(characters);
});

// Search for Specific Character (or all characters) - provides JSON
//so /api/finn should return Finn's info 
app.get("/api/:characters?", function(req, res) {
  var chosen = req.params.characters;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }
    return res.json(false);
  }
  return res.json(characters);
});

// Create New Characters - takes in JSON input
//can test in Postman?
app.post("/api/new", function(req, res) {
  var newcharacter = req.body;
  //regulr expression information/websites for more info on this (for strings), 
  //no need to remeber this ("do this globally on the string")
  //two operations on one line here!
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);
  //to save to our database
  // saveToDB(newcharacter);


  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


// function saveToDB(objectToSave){

//   //mysql information with create DB, UPdate DB SET values etc.  
//   //then we can create a new method to read stuff from the DATABASE 
//   //and not just the hardcoded stuff
// }
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuidv1 = require('uuid/v1');

const app = express();
var serverPort = 3000;
var PORT = process.env.PORT || serverPort;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set static folder to retrieve css and js files
app.use(express.static(__dirname + '/public'));

// Middleware

/* GET request  */
app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function(err, data) {
    let db  = JSON.parse(data);
    res.send(db);
  });
});

/* POST request */ 
app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json', (err, data) => {
    if(err) throw err;
    let json = JSON.parse(data);
    let note = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv1()
    }

    json.push(note);

    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      if(err) throw err;
      res.send('200');
    });
  });
});

/* DELETE request */

app.delete('/api/notes/:id', (req, res) => {

  fs.readFile('db/db.json', (err, data) => {
    // Check for error
    if(err) throw err;
    let deleteId = req.params.id;
    // Handle data gathering for json update
    let json = JSON.parse(data);
    json.forEach((item, i) => {
      if(item.id.includes(deleteId)){
      json.splice(i,1);
    }
    });

    // Write updated json to array
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      //Check for err
      if(err) throw err;
      res.send('200');
    });
  });
})


// Routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

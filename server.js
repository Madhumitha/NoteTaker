const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Middleware

// GET request 
app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function(err, data) {
    let db  = JSON.parse(data);
    res.send(db);
  });
});

// POST request 
app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json', (err, data) => {
    if(err) throw err;
    let json = JSON.parse(data);
    let note = {
      title: req.body.title,
      text: req.body.text
    }

    json.push(note);

    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      if(err) throw err;
      res.send('200');
    });
  });
});


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

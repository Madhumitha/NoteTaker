const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Middleware

app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function(err, data) {
    var db  = JSON.parse(data);
    res.send(db);
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

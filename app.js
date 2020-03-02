//Dependecies 
const express = require("express");
const path = require("path");
const fs = require("fs");

//Set up Express App
const app = express();
const PORT = process.env.PORT || 8080;

//handling data Parsing (bodyParser or express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// to access files in public folder (ACTS AS A MIDDLEWARE)
app.use(express.static('public'));

//HTML Routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


//API routes
app.get("/api/notes", (req, res) => {
    res.send("/db/db.json")
});
app.post("/api/notes", (req, res) => {

});
app.delete("/api/notes", (req, res) => {

});

//Listen to PORT
app.listen(PORT, () => {
    console.log(`Your local PORT IS http://localhost:${PORT}`);
});


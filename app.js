//Dependecies 
const express = require("express");
const fs = require("fs");

//Set up Express App
const app = express();
const PORT = process.env.PORT || 8080;

//handling data Parsing (bodyParser or express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// to access files in public folder (ACTS AS A MIDDLEWARE)
app.use(express.static('public'));

var notesArr = [];
//API routes
app.get("/api/notes", (req, res) => {
     let readFileStuff = fs.readFileSync("db/db.json", 'utf-8');
     readFileStuff = JSON.parse(readFileStuff);
     console.log(`THIS IS THE NOTE STUFF ${readFileStuff}`);
     res.json(readFileStuff);
});


app.post("/api/notes", (req, res) => {

    var notes = req.body;
    notesArr.push(notes);
    console.log(notesArr);
    fs.writeFileSync("db/db.json", JSON.stringify(notesArr) + "\n"); 
    res.json(notesArr);
    
});

app.delete("/api/notes/:id", (req, res) => {
    notesArr = [];
    let readFileStuff = fs.readFileSync("db/db.json", 'utf-8');
    readFileStuff = JSON.parse(readFileStuff);

    let deleteStuff = readFileStuff.filter( (notes) => {
        return notes.id != req.params.id;
    });

    //changed the array inside the FILE
    deleteStuff = JSON.stringify(deleteStuff);

    const writeFile = fs.writeFileSync("db/db.json", deleteStuff);
    res.json(notesArr);


});

//Listen to PORT
app.listen(PORT, () => {
    console.log(`Your local PORT IS http://localhost:${PORT}`);
});


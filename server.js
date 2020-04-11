// require all the modules and packages needed
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//return the `notes.html` file.

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res)=>{
    // reads the JSON file
    fs.readFile("db/db.json", "utf8", (err, data)=>{
        //checks for error
        if(err) throw err;
      //parse the JSON file
     res.json(JSON.parse(data))
    });
});

//sets up the POST route
app.post("/api/notes", (req, res) =>{
    fs.readFile("db/db.json", "utf8", (err, data)=>{
        
        if(err) throw err;
        
        let dNotes = JSON.parse(data)
        const newNote = req.body;
        //set up the id
        newNote.id = (dNotes.length + 1)
        //push user data to json file
        returnedData.push(newNote)
        //writes JSON file
        fs.writeFile("db/db.json", JSON.stringify(dNotes), "utf8", (err)=>{
          
            if(err) throw err;
        })
        return res.json(data);
    }) 
});


//sets up the API delete route
app.delete("/api/notes/:id", (req, res)=> {
    //reads the json file
    fs.readFile("db/db.json", "utf8", (err,data)=>{
        //check for error
        if(err) throw err;
        //will parse the data and save to a local variable
        let dNotes = JSON.parse(data);
        const id = req.params.id;
        //filter deleted notes
        dNotes = dNotes.filter((dNotes)=> dNotes.id != id)
        //writes a new file
        fs.writeFile("db/db.json", JSON.stringify(dNotes), "utf8", (err)=>{
            //checks for error
            if(err) throw err;
        })
        return res.json(data)
    })
})
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//listens
app.listen(PORT, ()=>{
    console.log("listening on PORT" + PORT)
})
// Require express
const express = require("express");
// path package
const path = require("path");
// file package
const fs = require("fs");
// Create an instance of express
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// functionalities
// view Routes -> html
// get route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// api routes -> JSON
// to send note data back 
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API Routes -> JSON
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("Error occurred");
    } else {
      // convert json to js
      const arrayOfNotes = JSON.parse(data);
      // converts back to json
      res.json(arrayOfNotes);
    }
  });
});
// post route
// add new note by post request
app.post("/api/notes", (req, res) => {
//     // Read data from the file
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("Error occurred");
    } else {
//         // manipulate/update the data
      const arrayOfNotes = JSON.parse(data);
      arrayOfNotes.push(req.body);
//     // write the data back to file
    fs.writeFile("./db/db.json", JSON.stringify(arrayOfNotes), "utf8", (err)=>{
        if(err){
            return res.send("An error occurred writing your data")
        }
        res.json(arrayOfNotes)
    })
    }
  });
});
// delete route

// Listener
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

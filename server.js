// Require express
const express = require("express");
// Require path package
const path = require("path");
// Require file package
const fs = require("fs");
// Create an instance of express
const app = express();
// Creating PORT
const PORT = process.env.PORT || 3000;

// data parsing to read post body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// View Routes -> html
// notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// reads file and returns all saved notes
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});
// home page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// API Routes -> JSON
// post route
// Creating a new note via a POST request
app.post("/api/notes", (req, res) => {
  // check the inputs and inject to the db
  console.log(req.body);
  const newNotes = req.body;
  newNotes.id = req.body.title;
  console.log(req.body.title);
  // Read data from the file
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("Error occurred reading your data!");
    } else {
      // manipulate/update the data
      let arrayOfNotes = JSON.parse(data);
      arrayOfNotes.push(newNotes);
      // write the data back to file
      fs.writeFile("./db/db.json", JSON.stringify(arrayOfNotes), (err) => {
        if (err) {
          return res.send("An error occurred writing your data!");
        }
        res.json("Successfully wrote note!");
      });
    }
  });
});
// delete route
app.delete("/api/notes/:id", (req, res) => {
  // declaring the selected note's index
  const index = req.params.id;
  // const arrayOfNotes = JSON.parse(data)
  // console.log(arrayOfNotes)
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("Error occurred reading note data!");
    } else {
      // manipulate/update the data
      let noteObj = JSON.parse(data);
      // test each element,return elements whose index value is not equal to the selected note
      let newNote = noteObj.filter((item) => {
        return item.id !== index;
      });
      // write the notes back to file
      fs.writeFile("./db/db.json", JSON.stringify(newNote), (err) => {
        if (err) {
          return res.send("Error deleting notes");
        } else {
          console.log("Deleted notes!");
          res.json("Deleted!");
        }
      });
    }
  });
});
// Listener for the PORT
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

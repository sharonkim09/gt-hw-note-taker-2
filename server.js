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
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// reads file and returns all saved notes
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// API Routes -> JSON
// post route
// add new note by post request
app.post("/api/notes", (req, res) => {
    // Read data from the file
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("Error occurred");
    } else {
      // manipulate/update the data
      const arrayOfNotes = JSON.parse(data);
      arrayOfNotes.push(req.body);
      // write the data back to file
      fs.writeFile("./db/db.json",JSON.stringify(arrayOfNotes),(err) => {
          if (err) {
            return res.send("An error occurred writing your data");
          }
          res.json("Successfully wrote note!");
        }
      );
    }
  });

});
// delete route

// Listener
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

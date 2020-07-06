// Require express
const express = require("express")
// path package
const path = require("path")
// file package
const fs = require("fs");
// Create an instance of express
const app = express()
// PORT
const PORT = process.env.PORT || 3000;

// functionalities
// view Routes -> html
// get route
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// API Routes -> JSON
app.get("/api/db",(req,res)=>{
    fs.readFile("./db/db.json","utf8",(err,data)=>{
        if(err){
            return res.send("Error occurred")
        }
        else{
            // convert json to js 
            const arrayOfNotes= JSON.parse(data);
            // converts back to json
            res.json(arrayOfNotes);
        }
    })
})
// post route
// delete route

// Listener
app.listen(PORT, ()=>{
console.log(`listening on http://localhost:${PORT}`)
})
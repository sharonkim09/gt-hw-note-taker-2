// Require express
const express = require("express")
// path package
const path = require("path")
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

// post route
// delete route

// Listener
app.listen(PORT, ()=>{
console.log(`listening on http://localhost:${PORT}`)
})
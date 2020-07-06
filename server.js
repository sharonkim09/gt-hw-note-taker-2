// Require express
const express = require("express")
// Create an instance of express
const app = express()
// PORT
const PORT = process.env.PORT || 3000;
// Listener
app.listen(PORT, ()=>{
console.log(`listening on http://localhost:${PORT}`)
})
const mongoose = require ('mongoose')

mongoose.connect("mongodb://localhost/playground")
.then(()=>console.log("connected to MongoDB..."))


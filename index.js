const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,})
.then(()=>console.log("connected"))
.catch((err)=>console.log("could not connect to mongodb"))
// mongoose
//   .connect("mongodb://localhost/127.0.0.1:27017", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("connected to MongoDB..."))
//   .catch((err) => console.log("could not connect to mongo db", err));




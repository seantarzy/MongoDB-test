const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,})
.then(()=>console.log("connected"))
.catch((err)=>console.log("could not connect to mongodb", err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model("Course", courseSchema);


async function createCourse(){

    const course = new Course({
        name: "angular.js COurse", 
        author: "Sean", 
        tags: ['angular', 'frontend'], 
        isPublished: true
    })
    
    const result = await course.save(); 
    console.log(result)
}

createCourse()

// mongoose
//   .connect("mongodb://localhost/127.0.0.1:27017", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("connected to MongoDB..."))
//   .catch((err) => console.log("could not connect to mongo db", err));




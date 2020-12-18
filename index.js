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


async function getCourses(){
  const courses = await Course
//   .find({price: {$gte: 10, $lse: 20}})
.find({price: {$in: [10, 15, 20]}})
  .limit(10)
  .sort({name: 1})
  .select({name: 1, tags: 1});
   console.log(courses)
}
// createCourse()

getCourses()
//eq (equal)
//ne (not equal)
//gt (greater than)
// lt (less than)
// gt (greater than)
// gte (greater than or equal to)
// lte (less than or equal to)
// in
//nin (not in)
// mongoose
//   .connect("mongodb://localhost/127.0.0.1:27017", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("connected to MongoDB..."))
//   .catch((err) => console.log("could not connect to mongo db", err));




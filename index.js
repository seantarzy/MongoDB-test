const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,})
.then(()=>console.log("connected"))
.catch((err)=>console.log("could not connect to mongodb", err))

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 255},
    category: {
        // required: true,
        enum: ['web', 'mobile', 'network'],
    // lowercase: true,
    // trim: true
    },
    author: String,
    tags: {type: Array,
         validate: {
             isAsync: true,
        validator: function(v, callback){
            setTimeout(()=>{

               const result = v && v.length > 0;
               callback(result)
            }, 4000)
        },
        message: "tags are required, bro"
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        min: 10,
        max: 200,
        type: Number,
        required: function(){return this.isPublished},
        get: v=>Math.round(v),
        set: v=>Math.round(v)
    }
})

const Course = mongoose.model("Course", courseSchema);


async function createCourse(){

//implementing pagination
    const course = new Course({
        name: "angular.js COurse", 
        author: "Sean", 
        tags: ['angular', 'frontend'], 
        isPublished: true,
        price: 15.8
    })

    try{
    //    const course = await course.validate()
        const result = await course.save(); 
        console.log(result)
    }
    catch(ex){
        for(field in ex.errors){
            console.log(ex.errors[field].message)
        }
        console.log("coudn't create", ex.message)
    }
    
}


async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;
    //or 
    //and
  const courses = await Course
//   .find({price: {$gte: 10, $lse: 20}})
// .find({price: {$in: [10, 15, 20]}})
//starts with Sean
.find({author: /^Sean/})

//ends with Tarzy
.find({author: /Tarzy$/i})

//contains "Sean"
//i = case insensitivity
.find({author: /.*Sean.*/i})
// .or([{name: "Sean"}, {isPublished: "true"}])
//   .limit(10)
//   .sort({name: 1})
//   .select({name: 1, tags: 1});
// .countDocuments()
.skip((pageNumber-1)*pageSize)
.limit(pageSize)
   console.log(courses)
}

// async function updateCourse(id){

//     const course = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: "Jason",
//             isPublished: false
//         }

//     }, {new: true})
//     // const course = await Course.findById(id)

//     // if(!course)
//     // return;

//     // course.isPublished = true
//     // course.author = "Another Author"

//     // course.set({
//     //     isPublished: true,
//     //     author: "Another Author"
//     // })
//     // const course = await course.save()
//     console.log(course)
// }

async function removeCourse(id){

    const result = await Course.deleteOne({_id: id});
    console.log(result)

}
// createCourse()

// getCourses()
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


//exercise: 

async function getSpecificCoursesAndSort(){

   const courses = await Course
    .find({isPublished: true})
    .sort({name:1})
    .select({name: 1, author: 1})

    console.log(courses)
    
}


// getSpecificCoursesAndSort()

createCourse()

mongoose = require('mongoose')



mongoose
  .connect("mongodb://localhost/mongo-exercises", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log("could not connect to mongodb", err));

  const courseSchema = new mongoose.Schema({
      name: String,
      author: String,
      tags: [String],
      date: Date,
      isPublished: Boolean,
      price: Number
  })

  const Course = mongoose.model("Course", courseSchema);

  async function getSpecificCoursesAndSort() {
    return await Course.find({ isPublished: true })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 });
  }

  async function run(){
      const courses = await getSpecificCoursesAndSort()
      console.log(courses)
  }

  run()

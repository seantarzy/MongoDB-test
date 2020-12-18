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
    const courses = await Course.find({ isPublished: true })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 });

    console.log(courses);
  }

  getSpecificCoursesAndSort()
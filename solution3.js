mongoose = require("mongoose");

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
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getSpecificCoursesAndSort() {
  return await Course.find({
    isPublished: true,
    // tags: { $in: ["backend", "frontend"] },
  })
  .or([
      {price: {$gte: 15}},
  {name: {$in: /.*by.*/i}}
    ])
    .sort({ price: -1 })
    .select("name author price");
}

async function run() {
  const courses = await getSpecificCoursesAndSort();
  console.log(courses);
}

run();

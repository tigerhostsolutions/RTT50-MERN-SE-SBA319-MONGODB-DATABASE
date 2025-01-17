import mongoose from 'mongoose';

// Define the schema
const OreillySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
    /*Used to test validation. Too restrictive to implement.*/
    // enum: {
    //   values: [
    //     "Programming",
    //     "Data Science",
    //     "Web Development",
    //     "Machine Learning",
    //     "Cloud Computing",
    //     "Database",
    //     "Security",
    //   ],
    //   message: "Subject must be one of the specified categories",
    // },
    trim: true,
  },
  edition: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: true,
    min: [1984, "Year must be no earlier than 1984"],
  },
});

// Create the Mongoose model
const Oreilly = mongoose.model("Oreilly", OreillySchema);
export default Oreilly;
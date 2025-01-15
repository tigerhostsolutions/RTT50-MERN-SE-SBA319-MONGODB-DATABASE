import mongoose from 'mongoose';

// Define the schema for the O'Reilly books
const BookSchema = new mongoose.Schema({
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
  },
  edition: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: true,
  },
});

const OreillySchema = new mongoose.Schema({
  publisher: {
    type: String,
    required: true,
    default: "O'Reilly Media",
  },
  books: [BookSchema],
});

// Create the Mongoose model
const Oreilly = mongoose.model("Oreilly", OreillySchema);
export default Oreilly;
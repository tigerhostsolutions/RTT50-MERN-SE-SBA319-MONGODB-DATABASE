import mongoose from 'mongoose';

// Define the schema for Dummies series
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

const DummiesSeriesSchema = new mongoose.Schema({
  series: {
    type: String,
    required: true,
    default: "For Dummies",
  },
  books: [BookSchema],
});

// Create the Mongoose model
const Dummies = mongoose.model("Dummies", DummiesSeriesSchema);
export default Dummies;
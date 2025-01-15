import mongoose from 'mongoose';

// Define the schema for textbooks published by Murach Publishing
const TextbookSchema = new mongoose.Schema({
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

const MurachSchema = new mongoose.Schema({
  publisher: {
    type: String,
    required: true,
    default: "Murach Publishing",
  },
  textbooks: [TextbookSchema],
});

// Create the Mongoose model
const Murach = mongoose.model("Murach", MurachSchema);
export default Murach;
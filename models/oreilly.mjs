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

// Create the Mongoose model
const Oreilly = mongoose.model("Oreilly", OreillySchema);
export default Oreilly;
import mongoose from 'mongoose';

// Define the schema
const DummiesCisSchema = new mongoose.Schema({
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
const DummiesCis = mongoose.model("Dummies_CIS", DummiesCisSchema);
export default DummiesCis

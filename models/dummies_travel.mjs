import mongoose from 'mongoose';

// Define the schema
const DummiesTravelSchema = new mongoose.Schema({
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
  destination: {
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
const DummiesTravel = mongoose.model("Dummies_Travel", DummiesTravelSchema);
export default DummiesTravel;
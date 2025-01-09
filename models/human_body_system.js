import mongoose from 'mongoose';

const HumanBodySystemSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  }
})

const Human_Body_System = mongoose.model('Human_Body_System', HumanBodySystemSchema);
export default Human_Body_System;
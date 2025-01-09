import mongoose from 'mongoose';

const muscularSystemSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  insertion: {
    type:String,
    required: true
  },
  action: {
    type:String,
    required: true
  }
})

const Muscular_System = mongoose.model('Muscular_System', muscularSystemSchema);
export default Muscular_System;
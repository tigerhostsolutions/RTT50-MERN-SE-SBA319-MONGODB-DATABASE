import mongoose from 'mongoose';

const MuscularSystemSchema = new mongoose.Schema({
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

const Muscular_System = mongoose.model('Muscular_System', MuscularSystemSchema);
export default Muscular_System;
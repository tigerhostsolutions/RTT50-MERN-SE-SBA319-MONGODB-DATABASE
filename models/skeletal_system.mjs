import mongoose from 'mongoose';

const SkeletalSystemSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  }
})

const Skeletal_System = mongoose.model('Skeletal_System', SkeletalSystemSchema);
export default Skeletal_System;
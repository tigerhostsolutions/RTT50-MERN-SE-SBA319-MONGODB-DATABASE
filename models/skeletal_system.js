import mongoose from 'mongoose';

const skeletalSystemSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  }
})

const Skeletal_System = mongoose.model('Skeletal_System', skeletalSystemSchema);
export default Skeletal_System;
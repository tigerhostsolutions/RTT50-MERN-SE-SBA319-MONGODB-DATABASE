import mongoose from 'mongoose';

const HumanBodySystemSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  }
})

const Physiology = mongoose.model('Physiology', HumanBodySystemSchema);
export default Physiology;
import mongoose from 'mongoose';

const PhysiologySchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  purpose: {
    type:String,
    required: true
  }
})

const Physiology = mongoose.model('Physiology', PhysiologySchema);
export default Physiology;
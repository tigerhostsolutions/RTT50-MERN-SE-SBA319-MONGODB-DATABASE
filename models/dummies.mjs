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

const Dummies = mongoose.model('Dummies', PhysiologySchema);
export default Dummies;
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

const Murach = mongoose.model('Murach', MuscularSystemSchema);
export default Murach;
import mongoose from 'mongoose';

const SkeletalSystemSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  }
})

const Oreilly = mongoose.model('Oreilly', SkeletalSystemSchema);
export default Oreilly;
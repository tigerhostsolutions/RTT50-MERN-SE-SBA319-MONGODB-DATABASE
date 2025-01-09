import mongoose from 'mongoose';

export const conn = async () => {

  try {
    //connect to db
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once('open', () => {
      console.log('connected to mongodb');
    });
  }
  catch (e) {
    console.log(`Connection Error: ${e.message}`);
  }
};

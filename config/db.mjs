import mongoose from 'mongoose';
import {logger} from './winston_logger.mjs';

export const conn = async () => {
  try {
    //connect to db
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once('open', () => {
    logger.info('connected to mongodb');
    });
  }
  catch (e) {
    logger.error(`Connection Error: ${e.message}`);
  }
};

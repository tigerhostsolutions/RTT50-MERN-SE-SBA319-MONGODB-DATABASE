import mongoose from 'mongoose';
import {logger} from '../middlewares/winston_logger.mjs';

 const conn = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once('open', () => {
    logger.info(`MongoDb Connection ${db.connection.host} Successful.`);
    });
  }
  catch (e) {
    logger.error(`MongoDb Connection Error: ${e.message}`);
    process.exit(1);
  }
};

export default conn;
import mongoose from 'mongoose';

const checkDbConn = (req, res, next) => {
  const state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({ message: "Service Unavailable: Database Connection Lost" });
  }
  next();
};

export default checkDbConn;
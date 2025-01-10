// middlewares/dbConnectionCheck.js

const mongoose = require("mongoose");

const checkDatabaseConnection = (req, res, next) => {
  const state = mongoose.connection.readyState;

  /*
    Mongoose connection states:
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
  */
  if (state !== 1) {
    return res.status(503).json({ message: "Service Unavailable: Database Connection Lost" });
  }

  next();
};

module.exports = checkDatabaseConnection;
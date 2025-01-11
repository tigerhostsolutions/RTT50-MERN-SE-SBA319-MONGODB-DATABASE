import winston from 'winston';

const error_handler = (err, req, res, next) => {
  // Log the error details using Winston
  winston.error(err.message, { metadata: { stack: err.stack } });

  // Customize the response sent to the client
  res.status(err.status || 500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
};

export default error_handler;
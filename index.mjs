import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import seed_routes from './routes/seed_routes.mjs';

import {
  skeletal_system_demo, muscular_system_demo, physiology_demo,
} from './config/seed.mjs';
import Muscular_System from './models/muscular_system.mjs';
import Skeletal_System from './models/skeletal_system.mjs';
import Physiology from './models/physiology.mjs';

import {logger} from './config/winston_logger.mjs';
import {conn} from './config/db.mjs';

dotenv.config();
const app = express(); // Creates an Express app
const port = process.env.PORT3000; // Sets the port
conn().
    then(() => logger.info('Successfully connected to the database')).
    catch((err) => {
      logger.error('Failed to connect to the database:', err.message);
      process.exit(1);
    });

// Middleware
app.use(express.json());

// Error-Handling Middleware
app.use((err, req, res, next) => {
  logger.error({
    message: err.message, stack: err.stack, // error stack trace - debugging
    url: req.originalUrl, // Log the URL where the error occurred
    method: req.method, // Log the HTTP method
    statusCode: res.statusCode || 500, // Log the response status code
  });
  res.status(500).send('Server Error');
});

// Resolve the dynamic imports before using them
const muscular_routes = await import('./routes/muscular_routes.mjs').then(
    module => module.default);
const skeletal_routes = await import('./routes/skeletal_routes.mjs').then(
    module => module.default);
const physiology_routes = await import('./routes/physiology_route.mjs').then(
    module => module.default);

// Mount Routes - route definitions
app.use('/api/ap/anatomy/muscular_system', muscular_routes);
app.use('/api/ap/anatomy/skeletal_system', skeletal_routes);
app.use('/api/ap/physiology', physiology_routes);

// Seeding routes
app.use('/api', seed_routes);

//home route
app.get('/', (req, res) => {
  res.send('Welcome to Human Anatomy & Physiology API');
});

// seed route -- populate db with start data
app.get('/ap/anatomy/seed', async (req, res) => {

  try {
    // Parallel deletion using Promise.all
    await Promise.all([
      Muscular_System.deleteMany({}),
      Skeletal_System.deleteMany({}),
      Physiology.deleteMany({}),
    ]);
    logger.warn('Deleted all system data');
  }
  catch (e) {
    logger.error(`Error deleting system data: ${e.message}`);
  }

  try {
    // Parallel insertion using Promise.all
    const [muscular_system_data, skeletal_system_data, physiology_data] = await Promise.all(
        [
          Muscular_System.create(muscular_system_demo),
          Skeletal_System.create(skeletal_system_demo),
          Physiology.create(physiology_demo),
        ]);
    logger.info('Imported all data successfully');

    // Send response back to client
    return res.json({
      Muscular_System: muscular_system_data,
      Skeletal_System: skeletal_system_data,
      Physiology: physiology_data,
    });
  }
  catch (e) {
    // Handle errors properly
    logger.error(`Something went wrong loading seed data: ${e.message}`);
    return res.status(500).
               json({
                 error: 'Failed to seed the anatomy chart data',
                 details: e.message,
               });
  }
});

// Starts the server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

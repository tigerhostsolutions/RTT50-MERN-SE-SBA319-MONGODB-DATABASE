import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import {conn} from './config/db.mjs';
import errorHandler from './middlewares/errorHandler.js';
import {logger} from './middlewares/winston_logger.mjs';
import Muscular_System from './models/muscular_system.mjs';
import Skeletal_System from './models/skeletal_system.mjs';
import Physiology from './models/physiology.mjs';
import seed_routes from './routes/seed_routes.mjs';

dotenv.config();
const app = express(); // Creates an Express app
const port = process.env.PORT3000 || 5000; // Sets the port
conn().
    then(() => logger.info('Successfully connected to the database')).
    catch((err) => {
      logger.error('Failed to connect to the database:', err.message);
      process.exit(1);
    });
// Middleware
app.use(express.json());
// Resolve the dynamic imports before using them
const muscular_routes = await import('./routes/muscular_routes.mjs').then(
    module => module.default);
const skeletal_routes = await import('./routes/skeletal_routes.mjs').then(
    module => module.default);
const physiology_routes = await import('./routes/physiology_route.mjs').then(
    module => module.default);
// Route definitions
app.use('/api/ap/muscular_system', muscular_routes);
app.use('/api/ap/skeletal_system', skeletal_routes);
app.use('/api/ap/physiology', physiology_routes);
app.use('/api', seed_routes); // Seeding routes
// Home Route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Human Anatomy & Physiology API</h1>' +
      '<a href="http://localhost:3000/api/ap/muscular_system" target="_blank">Muscle' +
      ' List</a>'+ '<br/>'+
      '<a href="http://localhost:3000/api/ap/skeletal_system" target="_blank">Bone' +
      ' List</a>'+ '<br/>'+
      '<a href="http://localhost:3000/api/ap/physiology"' +
      ' target="_blank">Physiology List</a>');
});

app.get('/api/seed/all', async (req, res) => {
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
    logger.error(`Something went wrong loading seed data: ${e.message}`);
    return res.status(500).
               json({
                 error: 'Failed to seed the anatomy chart data',
                 details: e.message,
               });
  }
});

app.use(errorHandler);
// Starts the server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

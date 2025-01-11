import dotenv from 'dotenv';
import express from 'express';
import conn from './config/db.mjs';
import checkDbConn from './middlewares/db_conn_check.mjs';
import error_handler from './middlewares/error_handler.mjs';
import {logger} from './middlewares/winston_logger.mjs';
import Muscular_System from './models/muscular_system.mjs';
import Skeletal_System from './models/skeletal_system.mjs';
import Physiology from './models/physiology.mjs';
import seed_routes from './routes/seed_routes.mjs';

dotenv.config();
const app = express();
const port = process.env.PORT5000;
conn()

// Middleware
app.use(express.json());

// Resolve the dynamic imports before using them
const muscular_filter_routes = await import('./routes/muscular_filter_routes.mjs').then(
    module => module.default);
const muscular_routes = await import('./routes/muscular_routes.mjs').then(
    module => module.default);
const skeletal_routes = await import('./routes/skeletal_routes.mjs').then(
    module => module.default);
const physiology_routes = await import('./routes/physiology_route.mjs').then(
    module => module.default);

app.use(checkDbConn);

// Route definitions
app.use('/api/ap/muscular_system', muscular_filter_routes);
app.use('/api/ap/muscular_system', muscular_routes);
app.use('/api/ap/skeletal_system', skeletal_routes);
app.use('/api/ap/physiology', physiology_routes);

// Home Route
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to Human Anatomy & Physiology API</h1>` +
      `<a href="http://localhost:${port}/api/ap/muscular_system" target="_blank">Muscle List</a>`+ '<br/>'+
      `<a href="http://localhost:${port}/api/ap/skeletal_system" target="_blank">Bone List</a>`+ '<br/>'+
      `<a href="http://localhost:${port}/api/ap/physiology" target="_blank">Physiology List</a>`);
});

app.use('/api', seed_routes);
app.get('/api/seed/all', async (req, res) => {
  try {
    await Promise.all([
      Muscular_System.deleteMany({}),
      Skeletal_System.deleteMany({}),
      Physiology.deleteMany({}),
    ]);
    logger.warn('Deleted all data');
  }
  catch (e) {
    logger.error(`Error deleting data: ${e.message}`);
  }

//   try {
//     const [muscular_system_data, skeletal_system_data, physiology_data] = await Promise.all(
//         [
//           // Muscular_System.create(muscular_system_seed),
//           // Skeletal_System.create(skeletal_system_seed),
//           // Physiology.create(physiology_seed),
//         ]);
//     logger.info('Imported all seed data successfully');
//     // Send response back to client
//     return res.json({
//       Muscular_System: muscular_system_data,
//       Skeletal_System: skeletal_system_data,
//       Physiology: physiology_data,
//     });
//   }
//   catch (e) {
//     logger.error(`Something went wrong loading seed data: ${e.message}`);
//     return res.status(500).
//                json({
//                  error: 'Failed to seed the anatomy chart data',
//                  details: e.message,
//                });
//   }
});

app.use(error_handler);
// Starts the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

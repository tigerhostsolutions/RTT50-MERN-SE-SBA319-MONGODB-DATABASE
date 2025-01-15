import dotenv from 'dotenv';
import express from 'express';
import conn from './config/db.mjs';
import checkDbConn from './middlewares/db_conn_check.mjs';
import error_handler from './middlewares/error_handler.mjs';
import {logger} from './middlewares/winston_logger.mjs';
import Murach from './models/murach.mjs';
import Oreilly from './models/oreilly.mjs';
import DummiesCis from './models/dummies_cis.mjs';
import DummiesTravel from './models/dummies_travel.mjs';
import seed_routes from './routes/seed_routes.mjs';

dotenv.config();
const app = express();
const port = process.env.PORT5000;
conn()

// Middleware
app.use(express.json());

// Resolve the dynamic imports before using them
const murach = await import('./routes/murach_routes.mjs').then(
    module => module.default);
const oreilly = await import('./routes/oreilly_routes.mjs').then(
    module => module.default);
const dummies_cis = await import('./routes/dummies_cis_routes.mjs').then(
    module => module.default);
const dummies_travel = await import('./routes/dummies_travel_routes.mjs').then(
    module => module.default);

app.use(checkDbConn);

//Route definitions
app.use('/api/books/murach', murach);
app.use('/api/books/oreilly', oreilly);
app.use('/api/books/dummies_cis', dummies_cis);
app.use('/api/books/dummies_travel', dummies_travel);

//Home Route
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to My CS Book Library API</h1>` +
      `<a href="http://localhost:${port}/api/books/murach" target="_blank">Murach List</a>`+ '<br/>'+
      `<a href="http://localhost:${port}/api/books/oreilly" target="_blank">O'Reilly List</a>`+ '<br/>'+
      `<a href="http://localhost:${port}/api/books/dummies_cis" target="_blank">Dummies CIS List</a>` + '<br/>' +
      `<a href="http://localhost:${port}/api/books/dummies_travels" target="_blank">Dummies Travel List</a>`);
});

app.use('/api', seed_routes);

//Route to seed all data
app.get('/api/seed/books/all', async (req, res) => {
  try {
    await Promise.all([
      Murach.deleteMany({}),
      Oreilly.deleteMany({}),
      DummiesCis.deleteMany({}),
      DummiesTravel.deleteMany({}),
    ]);
    logger.warn('Delete on all data attempted at startup!');
    console.warn('Delete on all data attempted at startup!')
  }
  catch (e) {
    logger.error(`Error deleting data: ${e.message}`);
  }
});

//Method to handle errors
app.use(error_handler);

// Starts the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

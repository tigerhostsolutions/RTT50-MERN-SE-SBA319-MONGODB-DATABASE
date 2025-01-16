import dotenv from 'dotenv';
import express from 'express';
import conn from './config/db.mjs';
import checkDbConn from './middlewares/db_conn_check.mjs';
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
const murach_routes = await import('./routes/murach_routes.mjs').then(
    module => module.default);
const oreilly_routes = await import('./routes/oreilly_routes.mjs').then(
    module => module.default);
const dummies_cis_routes = await import('./routes/dummies_cis_routes.mjs').then(
    module => module.default);
const dummies_travel_routes = await import('./routes/dummies_travel_routes.mjs').then(
    module => module.default);

app.use(checkDbConn);

//Route definitions
app.use('/mymedialibrary/books/murach', murach_routes);
app.use('/mymedialibrary/books/oreilly', oreilly_routes);
app.use('/mymedialibrary/books/dummies/', dummies_cis_routes, dummies_travel_routes );

//Home Route
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to MyMediaLibrary API</h1>` +
      `<a href="http://localhost:${port}/mymedialibrary/books/murach" target="_blank">Murach List</a>`+ '<br/>'+
      `<a href="http://localhost:${port}/mymedialibrary/books/oreilly" target="_blank">O'Reilly List</a>`+ '<br/>'+
      `<a href="http://localhost:${port}/mymedialibrary/books/dummies/cis" target="_blank">Dummies CIS List</a>` + '<br/>' +
      `<a href="http://localhost:${port}/mymedialibrary/books/dummies/travel" target="_blank">Dummies Travel List</a>`);
});

app.use('/mymedialibrary', seed_routes);

//Route to seed all data
app.get('/mymedialibrary/seed/books/all', async (req, res) => {
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

// Starts the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

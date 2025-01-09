import dotenv from 'dotenv'; // Loads environment variables from .env file
import express from 'express';
import {skeletal_system_demo,muscular_system_demo} from './config/seed.js';
import Muscular_System from './models/muscular_system.js';
import Skeletal_System from './models/skeletal_system.js';
import {conn} from './config/db.js';

dotenv.config();
const app = express(); // Creates an Express app
const port = process.env.PORT || 5000; // Sets the port

conn()
.then(() => console.log("Successfully connected to the database"))
 .catch((err) => {
  console.error("Failed to connect to the database:", err.message);
  process.exit(1);
});

// Resolve the dynamic imports before using them
const muscular_routes = await import('./routes/muscular_routes.js')
      .then(module => module.default);
const skeletal_routes = await import('./routes/skeletal_routes.js')
      .then(module => module.default);


// Middleware
app.use(express.json());

// Mount Routes
app.use('/api/anatomy_chart/muscular_system', muscular_routes);
app.use('/api/anatomy_chart/skeletal_system', skeletal_routes);

//home route
app.get('/', (req, res) => {
  res.send('Welcome to My Anatomy API');
});

//seed route -- populate db with start data
app.get('/anatomy_chart/seed', async (req, res) => {
  try {
    await Muscular_System.deleteMany({});
    await Skeletal_System.deleteMany({});
    const muscular_system_data = await Muscular_System.create(
        muscular_system_demo);
    const skeletal_system_data = await Skeletal_System.create(
        skeletal_system_demo);
    res.json({
      muscular_system: muscular_system_data,
      skeletal_system: skeletal_system_data,
    });
  }
  catch (e) {
    console.log(`Something went wrong loading seed data: ${e.message}`);
  }
});


// Starts the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


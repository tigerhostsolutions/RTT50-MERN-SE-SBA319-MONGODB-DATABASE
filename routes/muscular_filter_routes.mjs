import express from 'express';
import {seedMuscularSystem} from '../config/seed_util.mjs';
// import {logger} from 'middlewares/winston_logger.mjs';
const router = express.Router();

/*testng this approach to read seed data*/
// import fs from 'fs/promises';
// import { fileURLToPath } from 'url';
// import path from 'path';
//
// // Define __dirname to locate the current file's directory
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// // Proper and absolute resolution of the JSON file path
// const DATA_PATH = path.join(__dirname, '../data/muscle_seed.json');
// console.log('Attempting to load file at:', DATA_PATH);

// Route to handle muscular system data
router.get('/api/ap/muscular_system', async (req, res) => {
  try {

    /*testing seed function, templating other seeding routes*/
    await seedMuscularSystem();
    res.status(200).send('Muscular System seeding requested!');

    // console.log('Attempting to load file at:', DATA_PATH);
    // const rawData = await fs.readFile(DATA_PATH, 'utf8');
    // const muscles = JSON.parse(rawData);

    // Filter muscles by query
    if (req.query.name) {
      const filteredMuscles = muscles.filter((muscle) =>
          muscle.name.toLowerCase().includes(req.query.name.toLowerCase())
      );
      console.log(`Filtered data for query "${req.query.name}":`, filteredMuscles);
      return res.json(filteredMuscles);
    }

    console.log('Muscular_System data loaded from JSON:', muscles);
    res.json(muscles);
  } catch (err) {
    console.error('Error loading muscular data:', err.message);
    res.status(500).json({ error: 'Could not load muscular data', details: err.message });
  }
});

/*used for testing in terminal*/
// app.listen(port, () => {
//   logger.info(`Server is running on http://localhost:${port}`);
// });


export default router;
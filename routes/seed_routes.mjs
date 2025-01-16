import express from 'express';
const router = express.Router();
import {
  seedMurach,
  seedOReilly,
  seedDummies,
  seedDummiesTravel,
} from '../config/seed_util.mjs';

router.get('/seed/books/murach', async (req, res) => {
  try {
    await seedMurach();
    res.status(200).send('Murach seeding requested/delivered!');
  } catch (error) {
    res.status(500).send(`Error seeding Murach: ${error.message}`);
  }
});

router.get('/seed/books/oreilly', async (req, res) => {
  try {
    await seedOReilly();
    res.status(200).send('O\'Reilly seeding requested/delivered!');
  } catch (error) {
    res.status(500).send(`Error seeding O\'Reilly: ${error.message}`);
  }
});

router.get('/seed/books/dummies/cis', async (req, res) => {
  try {
    await seedDummies();
    res.status(200).send('Dummies CIS seeding requested/delivered!');
  } catch (error) {
    res.status(500).send(`Error seeding Dummies CIS: ${error.message}`);
  }
});

router.get('/seed/books/dummies/travel', async (req, res) => {
  try {
    await seedDummiesTravel();
    res.status(200).send('Dummies Travel seeding requested/delivered!');
  } catch (error) {
    res.status(500).send(`Error seeding Dummies Travel: ${error.message}`);
  }
});

router.get('/seed/books/all', async (req, res) => {
  try {
    const promises = [seedMurach(), seedOReilly(), seedDummies(), seedDummiesTravel()];
    await Promise.all(promises);
    res.status(200).send('Seeding for all models completed!');
  } catch (error) {
    res.status(500).send(`Error seeding all models: ${error.message}`);
  }
});

export default router;
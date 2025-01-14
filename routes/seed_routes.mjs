import express from 'express';
const router = express.Router();
import {seedMurach, seedOReilly, seedDummies} from '../config/seed_util.mjs';

router.get('/seed/murach', async (req, res) => {
  try {
    await seedMurach();
    res.status(200).send('Murach seeding requested!');
  } catch (error) {
    res.status(500).send(`Error seeding Murach: ${error.message}`);
  }
});

router.get('/seed/oreilly', async (req, res) => {
  try {
    await seedOReilly();
    res.status(200).send('O\'Reilly seeding requested!');
  } catch (error) {
    res.status(500).send(`Error seeding O\'Reilly: ${error.message}`);
  }
});

router.get('/seed/dummies', async (req, res) => {
  try {
    await seedDummies();
    res.status(200).send('Dummies seeding requested!');
  } catch (error) {
    res.status(500).send(`Error seeding Dummies: ${error.message}`);
  }
});

router.get('/seed/all', async (req, res) => {
  try {
    const promises = [seedMurach(), seedOReilly(), seedDummies()];
    await Promise.all(promises); // Seed multiple models in parallel
    res.status(200).send('Seeding for all models completed!');
  } catch (error) {
    res.status(500).send(`Error seeding all models: ${error.message}`);
  }
});

export default router;
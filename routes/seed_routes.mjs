import express from 'express';
const router = express.Router();
import {seedMuscularSystem, seedSkeletalSystem, seedPhysiology} from '../config/seed_util.mjs';

router.get('/seed/muscular_system', async (req, res) => {
  try {
    await seedMuscularSystem();
    res.status(200).send('Muscular System seeding requested!');
  } catch (error) {
    res.status(500).send(`Error seeding Muscular System: ${error.message}`);
  }
});

router.get('/seed/skeletal_system', async (req, res) => {
  try {
    await seedSkeletalSystem();
    res.status(200).send('Skeletal System seeding requested!');
  } catch (error) {
    res.status(500).send(`Error seeding Skeletal System: ${error.message}`);
  }
});

router.get('/seed/physiology', async (req, res) => {
  try {
    await seedPhysiology();
    res.status(200).send('Physiology seeding requested!');
  } catch (error) {
    res.status(500).send(`Error seeding physiology: ${error.message}`);
  }
});

router.get('/seed/all', async (req, res) => {
  try {
    const promises = [seedMuscularSystem(), seedSkeletalSystem(), seedPhysiology()];
    await Promise.all(promises); // Seed multiple models in parallel
    res.status(200).send('Seeding for all models completed!');
  } catch (error) {
    res.status(500).send(`Error seeding all models: ${error.message}`);
  }
});

export default router;
import fs from 'fs/promises'; // Using promise-based fs
import path from 'path';
import { fileURLToPath } from 'url';

// Import data models
import Murach from '../models/murach.mjs';
import OReilly from '../models/oreilly.mjs';
import Dummies from '../models/dummies.mjs';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to read JSON data
async function readJsonFile(filePath) {
  try {
    const absolutePath = path.join(__dirname, filePath);
    const data = await fs.readFile(absolutePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    throw error;
  }
}

async function seedMurach() {
  try {
    const exists = await Murach.findOne();//Check if data already exists
    if (exists) {
      console.log('Data for Murach already seeded.');
      return;
    }
    //read seed data from file
    const data = await readJsonFile('../data/murach_seed.json');
    await Murach.insertMany(data);
    console.log('Murach seeding completed.');
  } catch (error) {
    console.error('Error seeding Murach:', error.message);
  }
}

async function seedOReilly() {
  try {
    const exists = await OReilly.findOne();
    if (exists) {
      console.log('Data for O\'Reilly already seeded.');
      return;
    }
    const data = await readJsonFile('../data/oreilly_seed.json');
    await OReilly.insertMany(data);
    console.log('O\'Reilly seeding completed.');
  } catch (error) {
    console.error('Error seeding O\'Reilly:', error.message);
  }
}

async function seedDummies() {
  try {
    const exists = await Dummies.findOne();
    if (exists) {
      console.log('Data for Dummies already seeded.');
      return;
    }
    const data = await readJsonFile('../data/dummies_seed.json');
    await Dummies.insertMany(data);
    console.log('Dummies seeding completed.');
  } catch (error) {
    console.error('Error seeding Dummies:', error.message);
  }
}

export { seedMurach, seedOReilly, seedDummies };
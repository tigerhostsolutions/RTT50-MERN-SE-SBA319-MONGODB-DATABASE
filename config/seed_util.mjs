import fs from 'fs/promises'; // Using promise-based fs
import path from 'path';
import { fileURLToPath } from 'url';

// Import data models
import Muscular_System from '../models/muscular_system.mjs';
import Skeletal_System from '../models/skeletal_system.mjs';
import Physiology from '../models/physiology.mjs';

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

// Seed data for Model 1
async function seedMuscularSystem() {
  try {
    const exists = await Muscular_System.findOne(); // Check if data already
    // exists
    if (exists) {
      console.log('Data for Muscular System already seeded.');
      return;
    }
    const data = await readJsonFile('../data/muscular_system.json');
    await Muscular_System.insertMany(data);
    console.log('Muscular System seeding completed.');
  } catch (error) {
    console.error('Error seeding Muscular System:', error.message);
  }
}

// Seed data for Model 2
async function seedSkeletalSystem() {
  try {
    const exists = await Skeletal_System.findOne(); // Check if data already exists
    if (exists) {
      console.log('Data for Skeletal System already seeded.');
      return;
    }
    const data = await readJsonFile('../data/skeletal_system.json');
    await Skeletal_System.insertMany(data);
    console.log('Skeletal System seeding completed.');
  } catch (error) {
    console.error('Error seeding Skeletal System:', error.message);
  }
}

// Seed data for Physiology
async function seedPhysiology() {
  try {
    const exists = await Physiology.findOne(); // Check if data already exists
    if (exists) {
      console.log('Data for Physiology already seeded.');
      return;
    }
    const data = await readJsonFile('../data/physiology.json');
    await Physiology.insertMany(data);
    console.log('Physiology seeding completed.');
  } catch (error) {
    console.error('Error seeding Physiology:', error.message);
  }
}

export { seedMuscularSystem, seedSkeletalSystem, seedPhysiology };
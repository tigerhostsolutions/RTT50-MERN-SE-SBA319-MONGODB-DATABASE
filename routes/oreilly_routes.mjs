import express from 'express';
import Oreilly from '../models/oreilly.mjs';
import {validate_route_param_id} from '../middlewares/validate_request.mjs';
import {logger} from '../middlewares/winston_logger.mjs';

const router = express.Router();

// Delete All
router.delete('/', async (req, res) => {
  try {
    const delete_all = await Oreilly.deleteMany({});
    logger.warn('Delete attempted: All data has been deleted!')
    console.warn('Delete attempted: All data has been deleted!')
    res.json(delete_all);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Retrieve All or Filter by Query Parameters
router.get('/', async (req, res) => {
  try {
    const { name, action, insertion } = req.query;
    const filters = {};

    // Apply filters dynamically based on provided query parameters
    if (name) filters.name = { $regex: name, $options: 'i' };
    if (action) filters.action = { $regex: action, $options: 'i' };
    if (insertion) filters.insertion = { $regex: insertion, $options: 'i' };

    // Perform the filtered search
    const results = await Oreilly.find(filters);
    res.json(results);
  } catch (e) {
    res.status(500).json({ errors: e.message });
  }
});
// Retrieve by Name - Route Parameters
router.get('/filter/:param', async (req, res) => {
  try {
    const filter_key = req.params.param.toLowerCase();
    const filtered_data = await Oreilly.find({
      name: { $regex: new RegExp(filter_key, "i") },
    });
    res.json(filtered_data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Retrieve All
router.get('/', async (req, res) => {
  try {
    const get_all = await Oreilly.find({});
    res.json(get_all);
  } catch (e) {
    res.status(500).json({ errors: e.message });
  }
});
// Retrieve by id
router.get('/:id', validate_route_param_id, async (req, res) => {
  try {
    const get_one = await Oreilly.findById(req.params.id);
    res.json(get_one);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Add new
router.post('/', async (req, res) => {
  try {
    const create = await Oreilly.create(req.body);
    console.log(req.body);
    res.json(create);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Update by id
router.put('/:id', validate_route_param_id, async (req, res) => {
  try {
    const update = await Oreilly.findByIdAndUpdate(req.params.id, req.body);
    res.json(update);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Delete by id
router.delete('/:id', validate_route_param_id,async (req, res) => {
  try {
    const delete_one = await Oreilly.findByIdAndDelete(req.params.id);
    logger.warn('Delete attempted: Item has been deleted!')
    console.warn('Delete attempted: Item has been deleted!')
    res.json(delete_one);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
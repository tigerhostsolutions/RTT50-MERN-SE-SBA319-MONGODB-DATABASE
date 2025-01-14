import express from 'express';
const router = express.Router();
import Dummies from 'models/dummies.mjs';
import {logger} from '../middlewares/winston_logger.mjs';

// Delete All
router.delete('/', async (req,res)=>{
  try{
    const delete_all = await Dummies.deleteMany({})
    logger.warn('Delete attempted!');
    console.warn('Delete attempted!');
    res.json(delete_all)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})

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
    const results = await Dummies.find(filters);
    res.json(results);
  } catch (e) {
    res.status(500).json({ errors: e.message });
  }
});

// Retrieve by Name - Route Parameters
router.get('/filter/:param', async (req, res) => {
  try {
    const filter_key = req.params.param.toLowerCase();
    const filtered_data = await Dummies.find({
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
    const get_all = await Dummies.find({});
    res.json(get_all);
  }
  catch (e) {
    res.status(500).json({errors: e.message});
  }
});
// Retrieve by id
router.get('/:id', async (req, res) => {
  try {
    const get_one = await Dummies.findById(req.params.id);
    res.json(get_one);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});

export default router;

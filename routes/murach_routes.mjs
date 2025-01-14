import express from 'express';
import Murach from 'models/murach.mjs';
import {logger} from '../middlewares/winston_logger.mjs';
import {validate_route_param_id} from '../middlewares/validate_request.mjs';

const router = express.Router();

// Delete All
router.delete('/', async (req,res)=>{
  try{
    const delete_all = await Murach.deleteMany({})
    logger.warn('Delete attempted!')
    console.warn('Delete attempted!')
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
    const results = await Murach.find(filters);
    res.json(results);
  } catch (e) {
    res.status(500).json({ errors: e.message });
  }
});
// Retrieve by Name - route param implementation
router.get('/filter/:param', async (req, res) => {
  try {
    const filter_key = req.params.param.toLowerCase();
    const filtered_data = await Murach.find({
      name: { $regex: new RegExp(filter_key, "i") },
    });
    res.json(filtered_data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Retrieve by id
router.get('/:id', validate_route_param_id, async (req, res) => {
  try {
    const get_one = await Murach.findById(req.params.id);
    res.json(get_one);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});
//Add new muscle
router.post('/', async (req, res) => {
  try {
    const create = await Murach.create(req.body);
    console.log(req.body);
    res.json(create);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});
//Update muscle by id
router.put('/:id', validate_route_param_id, async (req,res)=>{
  try {
    const update= await Murach.findByIdAndUpdate(req.params.id, req.body)
    res.json(update)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})
//Delete by id
router.delete('/:id', validate_route_param_id, async (req,res)=>{
  try{
    const delete_one = await Murach.findByIdAndDelete(req.params.id)
    logger.warn('Delete attempted!')
    console.warn('Delete attempted!')
    res.json(delete_one)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})

export default router;

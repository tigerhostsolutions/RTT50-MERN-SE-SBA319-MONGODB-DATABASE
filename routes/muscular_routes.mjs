import express from 'express';
const router = express.Router();
import Muscular_System from '../models/muscular_system.mjs';

// Delete All
router.delete('/', async (req,res)=>{
  try{
    const delete_all = await Muscular_System.deleteMany({})
    res.json(delete_all)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})
// Retrieve All
router.get('/', async (req, res) => {
  try {
    const get_all = await Muscular_System.find({});
    res.json(get_all);
  }
  catch (e) {
    res.status(500).json({errors: e.message});
  }
});
// Retrieve by id
router.get('/:id', async (req, res) => {
  try {
    const get_one = await Muscular_System.findById(req.params.id);
    res.json(get_one);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});

//create new muscle
router.post('/', async (req, res) => {
  try {
    const create = await Muscular_System.create(req.body);
    console.log(req.body);
    res.json(create);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});
//Add
router.put('/:id', async (req,res)=>{
  try {
    const update= await Muscular_System.findByIdAndUpdate(req.params.id, req.body)
    res.json(update)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})
//Delete by id
router.delete('/:id', async (req,res)=>{
  try{
    const delete_one = await Muscular_System.findByIdAndDelete(req.params.id)
    res.json(delete_one)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})

export default router;

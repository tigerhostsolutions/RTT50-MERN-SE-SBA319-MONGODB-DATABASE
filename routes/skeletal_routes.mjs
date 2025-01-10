import express from 'express';
const router = express.Router();
import Skeletal_System from '../models/skeletal_system.mjs';

//delete all bones
router.delete('/', async (req,res)=>{
  try{
    const delete_all = await Skeletal_System.deleteMany({})
    res.json(delete_all)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})

//get all bones
router.get('/', async (req, res) => {
  try {
    const get_all = await Skeletal_System.find({});
    res.json(get_all);
  }
  catch (e) {
    res.status(500).json({errors: e.message});
  }
});

//show route - get 1 bone
router.get('/:id', async (req, res) => {
  try {
    const get_one = await Skeletal_System.findById(req.params.id);
    res.json(get_one);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});

//create new bone
router.post('/', async (req, res) => {
  try {
    const create = await Skeletal_System.create(req.body);
    console.log(req.body);
    res.json(create);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});

//update bone
router.put('/:id', async (req,res)=>{
  try {
    const update= await Skeletal_System.findByIdAndUpdate(req.params.id, req.body)
    res.json(update)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})

//delete 1 bone
router.delete('/:id', async (req,res)=>{
  try{
    const delete_one = await Skeletal_System.findByIdAndDelete(req.params.id)
    res.json(delete_one)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})

export default router;

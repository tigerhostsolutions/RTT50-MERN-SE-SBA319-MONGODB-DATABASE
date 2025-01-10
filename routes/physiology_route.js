import express from 'express';
const router = express.Router();
import Physiology from '../models/physiology.js';

//delete all muscles
router.delete('/', async (req,res)=>{
  try{
    const delete_all = await Physiology.deleteMany({})
    res.json(delete_all)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})

//get all muscles
router.get('/', async (req, res) => {
  try {
    const get_all = await Physiology.find({});
    res.json(get_all);
  }
  catch (e) {
    res.status(500).json({errors: e.message});
  }
});

//show route - get 1 muscle
router.get('/:id', async (req, res) => {
  try {
    const get_one = await Physiology.findById(req.params.id);
    res.json(get_one);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});

//create new muscle
router.post('/', async (req, res) => {
  try {
    const create = await Physiology.create(req.body);
    console.log(req.body);
    res.json(create);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});

//update muscle
router.put('/:id', async (req,res)=>{
  try {
    const update= await Physiology.findByIdAndUpdate(req.params.id, req.body)
    res.json(update)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})

//delete 1 muscle
router.delete('/:id', async (req,res)=>{
  try{
    const delete_one = await Physiology.findByIdAndDelete(req.params.id)
    res.json(delete_one)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})

export default router;

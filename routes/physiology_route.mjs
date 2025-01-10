import express from 'express';
const router = express.Router();
import Physiology from '../models/physiology.mjs';

// Delete All
router.delete('/', async (req,res)=>{
  try{
    const delete_all = await Physiology.deleteMany({})
    res.json(delete_all)
  }catch (e) {
    res.status(500).json({error: e.message})
  }
})
// Retrieve All
router.get('/', async (req, res) => {
  try {
    const get_all = await Physiology.find({});
    res.json(get_all);
  }
  catch (e) {
    res.status(500).json({errors: e.message});
  }
});
// Retrieve by id
router.get('/:id', async (req, res) => {
  try {
    const get_one = await Physiology.findById(req.params.id);
    res.json(get_one);
  }
  catch (e) {
    res.status(500).json({error: e.message});
  }
});

export default router;

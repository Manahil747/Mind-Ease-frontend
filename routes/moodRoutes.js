const express=require('express');
const router= express.Router();
const {addMood, getMoodHistory, updateMood, deleteMood}= require('../controllers/moodController');
const authMiddleware=require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addMood);
router.get('/history', authMiddleware, getMoodHistory);
router.put('/update/:id', authMiddleware, updateMood);
router.delete('/delete/:id', authMiddleware, deleteMood);

module.exports=router;
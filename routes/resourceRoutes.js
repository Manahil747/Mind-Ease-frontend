const express=require('express');
const router=express.Router();
const {addResource, getAllResources, deleteResource}= require('../controllers/resourceController');
const authMiddleware=require('../middleware/authMiddleware');
const {adminMiddleware}=require("../middleware/adminMiddleware");

router.post('/add',authMiddleware, adminMiddleware,addResource);
router.get('/all', authMiddleware ,getAllResources);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteResource);

module.exports=router;
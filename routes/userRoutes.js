const express=require("express");
const router=express.Router();
const {getProfile, updateProfile, deleteAccount, changePassword}= require('../controllers/userController');
const authMiddleware=require('../middleware/authMiddleware');


router.get('/profile', authMiddleware, getProfile );
router.put('/update', authMiddleware, updateProfile);
router.delete('/delete', authMiddleware, deleteAccount);
router.put('/change-password', authMiddleware, changePassword);

module.exports=router;
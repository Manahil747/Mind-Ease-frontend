const express=require("express");
const router=express.Router();
const {addTherapist, getAllTherapists, getTherapistById}= require("../controllers/therapistController");
const authMiddleware=require("../middleware/authMiddleware");
const {adminMiddleware}=require("../middleware/adminMiddleware");

//Therapist Routes
router.post("/add", authMiddleware, adminMiddleware,addTherapist);
router.get("/all", authMiddleware,getAllTherapists);
router.get("/:id", authMiddleware,getTherapistById);

module.exports=router;
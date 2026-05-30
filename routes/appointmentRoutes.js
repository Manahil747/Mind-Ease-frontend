const express=require("express");
const router=express.Router();
const {bookAppointment, getUserAppointment, cancelAppointment}= require("../controllers/appointmentController");
const authMiddleware=require("../middleware/authMiddleware");

//Appointment Routes
router.post("/book", authMiddleware, bookAppointment);
router.get("/all", authMiddleware, getUserAppointment);
router.put("/cancel/:id", authMiddleware, cancelAppointment);

module.exports=router;
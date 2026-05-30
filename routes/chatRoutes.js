const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const {sendMessage, getChatHistory} =require("../controllers/chatController");

router.post("/send", authMiddleware, sendMessage);
router.get("/history", authMiddleware, getChatHistory);

module.exports=router;
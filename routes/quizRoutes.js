const express=require('express');
const router=express.Router();
const {createQuiz, getAllQuizzes, submitQuiz}= require('../controllers/quizController');
const authMiddleware=require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createQuiz);
router.get('/all', authMiddleware ,getAllQuizzes);
router.post('/submit',authMiddleware,submitQuiz);

module.exports=router;
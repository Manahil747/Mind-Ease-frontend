const Quiz=require('../models/quiz');
const Result =require('../models/quizResult');
const responseModel=require('../utils/responseModel');


//createQuiz
const createQuiz= async(req,res)=>{
    try{
       const {title, description, questions}=req.body;
       const createQuizes= new Quiz({title, description, questions, createdBy:req.user.userId});
       await createQuizes.save();
       res.status(202).json(responseModel({statusCode:202, success:true, data: createQuizes, message:'All quizes data created successfully:)'}))
    }
    catch(err){
       res.status(400).json(responseModel({statusCode:400, success:false, message:'Quiz not created:('}))
    }
}

//GetQuizes
const getAllQuizzes= async(req,res)=>{
    try{
      const getQuizes= await Quiz.find();
      res.status(200).json(responseModel({statusCode:200, success:true, data:getQuizes, message:'All quizes get successfully:)'}))
    }
    catch(err){
    res.status(404).json(responseModel({statusCode:404, success:false, message:'quiz data not found:('}))
    }
}


//SubmitQuiz
const submitQuiz= async(req,res)=>{
    try{
       const {quizId, answers}=req.body;
       const findQuiz= await Quiz.findById(quizId);
       let interpretation;
       let totalScore=0;
       answers.forEach((answerIndex, questionIndex) => {
       selectedOption= findQuiz.questions[questionIndex].options[answerIndex];
       totalScore+=selectedOption.weight;
        });
       const maxScore= findQuiz.questions.length*4; //max weight 4 ha
       const percentage=(totalScore/maxScore)*100;
       if(percentage<=40) interpretation='Low'
       else if(percentage <= 70) interpretation = "Moderate"
       else interpretation = "High"
       const quizResult=new Result({userId: req.user.userId, quizId, score: totalScore, interpretation});
       await quizResult.save();
       res.status(200).json(responseModel({statusCode: 200, success: true, data:quizResult, message:'Quiz result save successfully:)'}));

    }
    catch(err){
    res.status(400).json(responseModel({statusCode: 400, success:false, message:'Quiz data not submitted:('}));
    }
}

module.exports= {createQuiz, getAllQuizzes, submitQuiz };
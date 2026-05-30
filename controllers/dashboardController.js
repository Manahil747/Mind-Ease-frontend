const responseModel=require("../utils/responseModel");
const Mood = require("../models/mood");
const Appointment=require("../models/appointment");
const quizResult= require("../models/quizResult");

//GetDashboard
const getDashboard= async(req,res)=>{
    try{
    const userId= req.user.userId;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const [moodData, quizData, appointment]= await Promise.all([
           Mood.find({userId, date: {$gte: sevenDaysAgo}}),
           quizResult.findOne({userId}).sort({date: -1}),
           Appointment. find({userId, status:'booked'})
    ])
    res.status(200).json(responseModel({statusCode:200, success:true, data:{moodData, quizData, appointment}, message:'Successfully done:)'}));
    }
    catch(err){
    res.status(400).json(responseModel({statusCode:400, success:false, message:'Something went wrong', err:err.message}));
    }
}

module.exports={getDashboard};
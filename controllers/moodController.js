const moodData= require('../models/mood');
const responseModel = require('../utils/responseModel');

//Adding moods
const addMood= async(req,res)=>{
    try{
        const  {moodType, intensity, note, date} = req.body;
       const newMood=new moodData ({moodType, intensity, note, date, userId: req.user.userId});
       await newMood.save();
       res.status(200).json(responseModel({statusCode:200, success:true, data:newMood, message:'Mood data added successfully!'}));
    }
    catch(err){
         res.status(400).json(responseModel({statusCode:404, success:false, message:'Mood data not added:('}))
    }
}

//moodHistoty
const getMoodHistory=async(req,res)=>{
    try{
        const userId= req.user.userId;
     const moodHistory= await moodData.find({userId})
        res.status(200).json(responseModel({statusCode:200, success:true, data:moodHistory, message:'Mood data history!'}));
    }
    catch(err){
         res.status(404).json(responseModel({statusCode:404, success:false, message:'Mood data not found:('}))
    }
}

//updateMood
const updateMood= async(req,res)=>{
    try{
      const {moodType, intensity, note}= req.body;
      const moodUpdate= await moodData.findByIdAndUpdate(req.params.id, req.user.userId, {moodType, intensity, note}, {new:true});
      res.status(200).json(responseModel({statusCode:200, success:true, data:moodUpdate, message:'Updated successfuly'}));
    }
    catch(err){
     res.status(400).json(responseModel({statusCode:400, success:false, message:'Mood data not updated:('}))
    }
}

//deleteMood
const deleteMood= async(req,res)=>{
    try{
    const moodDelete= await moodData.findOneAndDelete(req.params.id, req.user.userId);
    res.status(200).json(responseModel({statusCode:200, success:true,message:'Deleted successfuly'}));
    }
    catch(err){
    res.status(400).json(responseModel({statusCode:400, success:false, message:'Mood data not deleted:('})) 
    }
}

module.exports={addMood, getMoodHistory, updateMood, deleteMood};
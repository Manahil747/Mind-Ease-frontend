const mongoose= require("mongoose");

const quizModel= new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    questions:[{questionText:{type:String, required:true}, options:[{text:{type:String}, weight:{type:Number}}]}], 
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User' }

}, {timestamps:true});

module.exports= mongoose.model('Quiz', quizModel);
const mongoose= require('mongoose');

const moodData= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    moodType:{type:String, required:true, enum:['happy', 'sad', 'anxious','angry','neutral']},
    intensity:{type:Number, required:true, min:1, max:10},
    note:{type:String},
    date:{type:Date, default:Date.now}
}, {timestamps:true});

module.exports= mongoose.model('Mood', moodData);
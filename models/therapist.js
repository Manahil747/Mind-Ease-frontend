const mongoose= require('mongoose');
const therapistModel=new mongoose.Schema({
    name:{type:String, required:true},
    specialization:[String],
    availability:[String],
    contactInfo:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
}, {timestamps:true})
module.exports=mongoose.model("Therapist",therapistModel);
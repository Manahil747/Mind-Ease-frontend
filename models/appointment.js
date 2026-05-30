const mongoose= require('mongoose');
const appointmentModel=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    therapistId:{type:mongoose.Schema.Types.ObjectId, ref:'Therapist', required:true},
    date:{type:Date},
    time:{type:String, required:true},
    status:{type:String, enum:['booked','cancelled','completed'], default:'booked'}
},{timestamps:true})
module.exports=mongoose.model('Appointment', appointmentModel);
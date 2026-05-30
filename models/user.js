const mongoose=require('mongoose');

const userData=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true },
    password:{type:String, required:true},
    role:{type:String, enum:['user', 'admin', 'therapist'], default:'user'},
    age:{type:Number, min:10},
    gender:{type:String, required:true, enum:['male','female','other'] }
}, {timestamps:true});
module.exports = mongoose.model("User",userData);
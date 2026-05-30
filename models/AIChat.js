const mongoose= require("mongoose");
const chatAI=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    message:{type:String, required:true},
    response:{type:String, required:true},

}, {timestamps:true});
module.exports=mongoose.model('AIChat',chatAI);
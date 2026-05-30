const bcrypt= require('bcrypt');
const User= require('../models/user');
const responseModel=require('../utils/responseModel');
const jwt=require('jsonwebtoken');


//signup User

const signupUser= async(req,res)=>{
    try{
        const{name, email, password, role, age, gender}=req.body;
        let user= await User.findOne({email});
        if(user){
           return res.status(400).json(responseModel({statusCode:400, success:false, data:user, message:'Email already exist'}));
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user = new User({name, email, password:hashPassword, role, age, gender});
        await user.save();
        res.status(201).json(responseModel({statusCode:201, success:true, data:user, message:'User registered successfully!'}));
    }
    catch(err){
        res.status(500).json(responseModel({statusCode:500, success:false, message:'Internal server error',err}));
    }
};


//login user

const loginUser= async(req,res)=>{
    try{
        const{email, password}= req.body;
        let user= await User.findOne({email});
        if(!user){
            return res.status(404).json(responseModel({statusCode:404, success:false, data:user, message:'User not found'}));
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){
           return res.status(400).json(responseModel({statusCode:400, success:false, data:user, message:'Invalid password'}));
        }
        const token=jwt.sign({userId:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn:'2h'});
        res.status(200).json(responseModel({statusCode:200, success:true, data:user, message:`Login successfully`, token}));
    }
    catch(err){
       res.status(500).json(responseModel({statusCode:500, success:false, message:'Internal server error',err}));
    }
}



module.exports={signupUser,loginUser};
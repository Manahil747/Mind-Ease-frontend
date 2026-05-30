const User= require('../models/user');
const responseModel=require('../utils/responseModel');

//Get Profile
const getProfile= async(req,res)=>{
    try{
        const user= await User.findById(req.user.userId .select('-password'));
        res.status(200).json(responseModel({statusCode:200, success:true,data:user }));

    }
    catch(err){
        res.status(404).json(responseModel({statusCode:404, success:false, message:'User not found :('}))
    }
}

//Update UserProfile
const updateProfile= async(req,res)=>{
    try{
        const {name, age, gender}= req.body;
        const updatedUser= await User.findByIdAndUpdate(req.user.userId, {name, age, gender}, {new:true} .select('-password'));

        res.status(200).json(responseModel({statusCode:200, success:true, data:updatedUser, message:'Updated successfuly'}));
    }
    catch(err){
        res.status(400).json(responseModel({statusCode:404, success:false, message:'User data not updated:('}))
    }
}


//Delete user
const deleteAccount= async(req,res)=>{
    try{
        const deleteUser= await User.findByIdAndDelete(req.user.userId);
        res.status(200).json(responseModel({statusCode:200, success:true,message:'Deleted successfuly'}));
    }
    catch(err){
        res.status(400).json(responseModel({statusCode:404, success:false, message:'User data not deleted:('}))
    }
}

//change password
const changePassword=async(req,res)=>{
    try{
        const {password, newPassword}= req.body;
        const userPassword= await User.findById(req.user.userId);
        const isMatch= await bcrypt.compare(password, userPassword.password);
        if(!isMatch){
            return res.status(400).json(responseModel({statusCode:400, success:false, message:'password not matched'}));
        }
        const hashedPassword= await bcrypt.hash(newPassword, 10);
        const userPasswords= await User.findByIdAndUpdate(userPassword._id, {password:hashedPassword}, {new:true});
       res.status(200).json(responseModel({statusCode:200, success:true, data:userPasswords, message:'Password change successfully!'}));
    }
    catch(err){
        res.status(400).json(responseModel({statusCode:404, success:false, message:'Something went wrong:('}))
    }
}


module.exports={getProfile, updateProfile, deleteAccount, changePassword};
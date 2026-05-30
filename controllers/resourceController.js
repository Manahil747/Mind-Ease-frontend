const responseModel=require("../utils/responseModel");
const Resource=require("../models/resource");

//Add Resources
const addResource = async(req,res)=>{
    try{
        const {title,type,description}= req.body;
        const resourceAdd= new Resource({title, type, description});
        await resourceAdd.save();
        res.status(201).json(responseModel({statusCode:201, success:true, data: resourceAdd, message:'All resources data added successfully:)'}));
    }
    catch(err){
       res.status(400).json(responseModel({statusCode:400, success:false, message:'Resources not added:('}));
    }
}


//Get All Resources
const getAllResources =async(req,res)=>{
    try{
      const getResources= await Resource.find();
      res.status(200).json(responseModel({statusCode:200, success:true, data:getResources, message:'Get all resources successfully:)'}));
    }
    catch(err){
      res.status(404).json(responseModel({statusCode:404, success:false, message:'Resource data not found:('}));
    }
}


//Delete Resources
const deleteResource =async(req,res)=>{
    try{
      const id= req.params.id;
      const deleteResourceData=await Resource.findByIdAndDelete(id);
      res.status(200).json(responseModel({statusCode:200, success:true, message:'Resource dta deleted successfully:('}));
    }
    catch(err){
      res.status(400).json(responseModel({statusCode:400, success:false, message:'Resources not deleted:('}));
    }
}

module.exports={addResource, getAllResources, deleteResource};
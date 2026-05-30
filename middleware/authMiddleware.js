const jwt= require("jsonwebtoken");
const responseModel = require("../utils/responseModel");

const authMiddleware= (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json(responseModel({statusCode:401, success:false, message:'Invalid token'}));
        }
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        next();

    }
    catch(err){
        res.status(401).json(responseModel({statusCode:401, success:false, message:'Invalid token', err}));
    }
}
module.exports=authMiddleware;
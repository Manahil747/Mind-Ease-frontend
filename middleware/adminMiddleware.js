const responseModel = require("../utils/responseModel");

const adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json(responseModel({statusCode:403, success:false, message:'Unauthorize access:('}));
    }
    next();
}

module.exports={adminMiddleware};
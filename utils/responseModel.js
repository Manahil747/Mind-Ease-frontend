const responseModel=({statusCode, success, data, message, totalDocuments, token})=>{
    return{
        statusCode, 
        success,
        data,
        message,
        totalDocuments:null,
        token
    }
};
module.exports=responseModel;
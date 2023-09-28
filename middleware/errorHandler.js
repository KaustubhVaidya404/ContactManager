const constants = require("../constants");
const { stack } = require("../routes/contactRoutes");

const errorHandler  = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Failed",
                message:message,
                stackTrace:err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title:"Not Found",
                message:message,
                stackTrace:err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title:"Unauthorized request",
                message:message,
                stackTrace:err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title:"Access Forbidden",
                message:message,
                stackTrace:err.stack
            });
            break;
        default:
            console.log("All set working Good");
            break;
    }
};

module.exports =  errorHandler;
const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // CastError : wrong mongodb id error
    if(err.name === 'CastError') {
        err = new ErrorHandler(`Resource not found with id ${err.value}`, 404);
    }

    // Mongoose duplicate key error
    if(err.code === 11000) {
        err = new ErrorHandler(`Duplicate ${Object.keys(err.keyValue)} Entered`, 400);
    }
    
    // Wrong JWT token
    if(err.code === "JsonWebTokenError") {
        err = new ErrorHandler(`Json Web Token is invalid, Try angain`, 400);
    }
    
    // JWT expired error
    if(err.code === "TokenExpiredError") {
        err = new ErrorHandler(`Json Web Token is Expired, Try angain`, 400);
    }
    
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}
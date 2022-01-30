const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtTokens");

// register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({ 
        name, email, password,
        avatar: {
            public_id: 'This is sample public id',
            url: 'This is sample url',
        },
    });
    
    const token = user.getJWTToken();

    sendToken(user, 201, res);
}); 

// login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isMatch = await user.comparePassword(password, user.password);

    if(!isMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = user.getJWTToken();

    sendToken(user, 200, res); // send token to the user

});
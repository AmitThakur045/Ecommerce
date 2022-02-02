const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtTokens");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is sample public id",
      url: "This is sample url",
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

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await user.comparePassword(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = user.getJWTToken();

  sendToken(user, 200, res); // send token to the user
});

// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get resetPassword token
  const resetToken = user.getResetPasswordToken();
  // Save the token to the user
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetUrl} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`;

  try {

    await sendEmail({
        email: user.email,
        subject: "Ecommerce Password Recovery",
        message,
    });

    res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
    });

  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    // finding hash token in user collection
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if(!user) {
        return next(new ErrorHandler("Reset password token is Invalid and has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    // setting new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;    // removing token
    user.resetPasswordExpire = undefined;   // removing expire

    await user.save();

    // send response
    sendToken(user, 200, res);
});

// Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
})
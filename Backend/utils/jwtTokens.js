// Creating token for the user and saving it in the cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    
    // Options for the cookie
    const options = {
        // expires in JWT_COOKIE_EXPIRES_IN * 24 hours
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;
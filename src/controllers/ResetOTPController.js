const generateOTP = require("../utils/generateOTP");
const User = require("../models/userModel");
const sendOTPEmail = require("../utils/nodemailer");
const jwt = require("jsonwebtoken");

const resetVerifyEmail = async (req, res) => {
  const { verifyEmail } = req.cookies;
  const otp = generateOTP();
  const now = Date.now();
  if (!verifyEmail)
    return res.status(401).json({ message: "invalid token or expired" });
  try {
    const decoded = jwt.verify(verifyEmail, process.env.VERIFY_EMAIL_TOKEN);
    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "user not exists" });
    user.otp = otp;
    user.otpExpires = now + 5 * 60 * 1000;
    await user.save();
    sendOTPEmail(user.email, otp);
    return res
      .status(200)
      .json({ message: "OTP reset successfuly , check you email" });
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = resetVerifyEmail;

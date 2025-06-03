const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const generateOTP = require("../utils/generateOTP");
const sendOTPEmail = require("../utils/nodemailer");

const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const now = Date.now();
  const { verifyEmail } = req.cookies;
  if (!verifyEmail) return res.status(403).json({ message: "token invalid" });
  try {
    const decoded = jwt.verify(verifyEmail, process.env.VERIFY_EMAIL_TOKEN);
    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "user not found" });
    if (user.otp !== otp)
      return res.status(400).json({ message: "invalid otp" });
    if (user.otpExpires < now)
      return res.status(400).json({ message: "otp expired" });
    user.otp = null;
    user.otpExpires = null;
    user.isVerified = true;
    await user.save();
    res.clearCookie("verifyEmail");
    return res.status(200).json({ message: "verified email successfully!" });
  } catch (err) {
    return res.status(401).json({ message: "token expired or not valid" });
  }
};


module.exports =  verifyEmail ;

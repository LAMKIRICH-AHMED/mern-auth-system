const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sendOTPEmail = require("../utils/nodemailer");
const generateOTP = require("../utils/generateOTP");
const {
  generateAccessToken,
  generateRefreshToken,
  generateVerifyEmailToken,
} = require("../utils/generateTokens");
const generateCookies = require("../utils/generateCookies");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Enter All fields" });
  try {
    const existingUser = await User.findOne({ email });

    const otp = generateOTP();
    const now = Date.now();
    if (existingUser) {
      const passwordCompare = await bcrypt.compare(
        password,
        existingUser.password
      );
      const verify_email_token = generateVerifyEmailToken(existingUser);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ message: "user exists , username or password incorrect!" });
      }
      if (!existingUser.isVerified) {
        existingUser.otp = otp;
        existingUser.otpExpires = now + 5 * 60 * 1000;
        await existingUser.save();
        sendOTPEmail(email, otp);
        generateCookies(res, "verifyEmail", verify_email_token, 5 * 60 * 1000);
        return res
          .status(200)
          .json({ message: "OTP sent. Please verify your email." });
      }
      return res.status(400).json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const otpExpires = now + 5 * 60 * 1000;
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role,
      otp,
      otpExpires,
    });
    sendOTPEmail(email, otp);
    const verify_email_token = generateVerifyEmailToken(newUser);
    generateCookies(res, "verifyEmail", verify_email_token, 5 * 60 * 1000);
    return res.status(200).json({
      message: "user created successfully!,check your email to verify",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "user not found" });
    if (!user.isVerified)
      return res
        .status(403)
        .json({ message: "you are not authentificate , verify you email" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials" });
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    if (user.refreshTokens.length < 2) {
      user.refreshTokens.push(refreshToken);
    } else {
      user.refreshTokens.shift();
      user.refreshTokens.push(refreshToken);
    }
    await user.save();
    generateCookies(res, "accessToken", accessToken, 15 * 60 * 1000);
    generateCookies(res, "refreshToken", refreshToken, 7 * 24 * 60 * 60 * 1000);
    return res.status(200).json({ message: "login successfully!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "server error" });
  }
};
module.exports = { register, login };

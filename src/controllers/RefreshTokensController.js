const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");
const generateCookies = require("../utils/generateCookies");
const refreshTokens = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res
      .status(400)
      .json({ message: "invalid refresh token or expired" });
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const user = await User.findOne({ refreshTokens: {$in:[refreshToken]} });
    if (!user) return res.status(404).json({ message: "user not found" });
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshTokens = user.refreshTokens.filter(
      (token) => token !== refreshToken
    );
    user.refreshTokens.push(newRefreshToken);
    await user.save();
    generateCookies(res, "accessToken", newAccessToken, 15 * 60 * 1000);
    generateCookies(
      res,
      "refreshToken",
      newRefreshToken,
      7 * 24 * 60 * 60 * 1000
    );
    return res.status(200).json({ message: "refresh Tokens successfuly" });
  } catch (err) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
};

module.exports = refreshTokens; 
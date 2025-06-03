const jwt = require("jsonwebtoken");
const generateAccessToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role },
    process.env.ACCESS_TOKEN,
    { expiresIn: "15m" }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role },
    process.env.REFRESH_TOKEN,
    { expiresIn: "7d" }
  );
};
const generateVerifyEmailToken = (user) => {
  return jwt.sign(
    { email: user.email, role: user.role },
    process.env.VERIFY_EMAIL_TOKEN,
    { expiresIn: "5m" }
  );
};
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateVerifyEmailToken,
};

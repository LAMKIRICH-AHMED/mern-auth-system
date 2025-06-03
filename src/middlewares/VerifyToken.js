const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) return res.status(401).json({ message: "invalid token" });
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "invalid token or expired!" });
  }
};

module.exports = verifyToken;

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    const roleUser = req?.user?.role;
    try {
      if (!roleUser || !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "access denied. you are not authorized!" });
      }
      next();
    } catch (err) {
        res.status(500).json({error:'internal server error during authorization'})
    }
  };
};

module.exports = authorizedRoles;

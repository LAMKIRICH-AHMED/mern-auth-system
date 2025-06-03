const getAdminDashboard = (req, res) => {
  return res.status(200).json({ message: `welcome ${req.user.role}: ${req.user.username} ` });
};
const getUserDashboard = (req, res) => {
  return res.status(200).json({ message: `welcome ${req.user.role} : ${req.user.username} ` });
};

module.exports = { getAdminDashboard, getUserDashboard };

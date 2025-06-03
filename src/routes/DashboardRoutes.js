const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const authorizedRoles = require('../middlewares/AuthorizedRoles');
const { getAdminDashboard, getUserDashboard } = require('../controllers/DashboardController');

const router = express.Router();


router.get('/admin',verifyToken,authorizedRoles('admin'),getAdminDashboard);
router.get('/user',verifyToken,authorizedRoles('admin','user'),getUserDashboard);


module.exports = router ;
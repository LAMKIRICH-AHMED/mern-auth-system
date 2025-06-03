const express= require('express');
const { register, login } = require('../controllers/AuthController');
const verifyEmail = require('../controllers/VerifyEmailController');
const resetVerifyEmail = require('../controllers/ResetOTPController');

const router = express.Router();

router.post('/register',register) ;
router.post('/login',login) ;
router.post('/verify-email',verifyEmail) ;
router.get('/reset-verify',resetVerifyEmail) ;




module.exports = router ;
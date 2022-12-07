const router = require('express').Router();

const {register, login, logout} = require('../Controller/user/auth');
const {forgotPassword, resetPassword} = require('../Controller/user/resetpassword');



router.post('/register', register),
router.post('/login', login),
router.post('/logout', logout),
router.put('/forgotpassword', forgotPassword),
router.put('/resetpassword', resetPassword);


module.exports = router;
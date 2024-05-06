const router = require('express').Router();

const {
  userRegister,
  userLogin,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
} = require('../controllers/authController');

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword);

module.exports = router;

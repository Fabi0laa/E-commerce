const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authController');

const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
  getMe,
  deleteOneUser,
} = require('../controllers/userController');

//Update the user details
router.patch('/', protect, restrictTo(['admin', 'user']), updateUser);

//delete a user
router.delete('/', protect, restrictTo(['admin', 'user']), deleteUser);

router.delete('/:id', protect, restrictTo(['admin']), deleteOneUser);
//Get a user details (only admin can access this)
router.get('/find/:id', protect, restrictTo(['admin', 'user']), getUser);

//Get all user details (only admin can access this)
router.get('/', protect, restrictTo(['admin']), getAllUsers);

//Get user stats (only admin can access this)
router.get('/stats', protect, restrictTo(['admin']), getUserStats);

router.get('/me', protect, getMe, getUser);

module.exports = router;

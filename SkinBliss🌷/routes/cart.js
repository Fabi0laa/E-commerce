const router = require('express').Router();

const { addCart, updateCart, getUserCart, deleteUserCart, getAllCarts } = require('../controllers/cartController');
const { protect, restrictTo } = require('../controllers/authController');

//Add a product to the cart
router.post('/', protect, restrictTo(['user']), addCart);

//Update the cart items
router.patch('/', protect, restrictTo(['user']), updateCart);

//Delete an item from the cart
router.delete('/:productId', protect, restrictTo(['user']), deleteUserCart);

//Get a specific user cart
router.get('/', protect, restrictTo(['user']), getUserCart);

module.exports = router;

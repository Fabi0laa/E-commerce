const router = require('express').Router();

const {
  createOrder,
  deleteOrder,
  getSingleOrder,
  getAllOrders,
  getLatestAddress,
} = require('../controllers/orderController');
const { protect, restrictTo } = require('../controllers/authController');

//Create an order
router.post('/', protect, restrictTo(['user']), createOrder);

// //Update an order (only admin can access this)
// router.patch('/:id', protect, restrictTo(['admin']), updateOrder);

//Delete an order (only admin can access this)
router.delete('/:id', protect, restrictTo(['admin']), deleteOrder);

//Get user orders
router.get('/:id', protect, restrictTo(['admin', 'user']), getSingleOrder);

router.get('/:id', protect, restrictTo(['user']), getLatestAddress);

// //Get all orders (only admin can access this)
router.get('/', protect, restrictTo(['admin', 'user']), getAllOrders);

// //Calculate the monthly income (only admin can access this)
// router.get('/income', protect, restrictTo(['admin']), calculateIncome);

module.exports = router;

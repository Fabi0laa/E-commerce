const { protect, restrictTo } = require('../controllers/authController');
const {
  createCategory,
  updateCategory,
  getCategory,
  getAllCategories,
  deleteCategory,
} = require('../controllers/categoryController');

const router = require('express').Router();

router.post('/', protect, restrictTo(['admin']), createCategory);
router.patch('/:id', protect, restrictTo(['admin']), updateCategory);
router.get('/:id', getCategory);
router.get('/', getAllCategories);
router.delete('/:id', protect, restrictTo(['admin']), deleteCategory);

module.exports = router;

const { protect, restrictTo } = require('../controllers/authController');
const { createBrand, updateBrand, getBrand, getAllBrands, deleteBrand } = require('../controllers/brandController');

const router = require('express').Router();

router.post('/', protect, restrictTo(['admin']), createBrand);
router.patch('/:id', protect, restrictTo(['admin']), updateBrand);
router.get('/:id', protect, getBrand);
router.get('/', protect, getAllBrands);
router.delete('/:id', protect, restrictTo(['admin']), deleteBrand);

module.exports = router;

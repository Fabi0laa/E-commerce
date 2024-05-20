const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authController');
const { getSkinQuizQuestions, saveSkinQuizResults } = require('../controllers/skinTypeController');

router.get('/questions', protect, restrictTo(['user']), getSkinQuizQuestions);

router.post('/questions', protect, restrictTo(['user']), saveSkinQuizResults);

module.exports = router;

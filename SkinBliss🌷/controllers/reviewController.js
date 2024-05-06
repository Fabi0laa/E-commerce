const Review = require('../models/Review');
const prisma = require('../prisma');
const catchAsync = require('../utils/catchAsync');

const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find()
    .populate({ path: 'userId', select: 'name surname' })
    .populate({ path: 'productId', select: 'name' });

  res.status(200).json(reviews);
});

const createReview = catchAsync(async (req, res, next) => {
  if (!req.body.productId) req.body.productId = req.params.productId;
  const newReview = await prisma.reviews.create({
    data: {
      rating: parseInt(req.body.rating),
      review: req.body.review,
      userId: parseInt(req.user.id),
      productId: parseInt(req.body.productId),
    },
  });
  res.status(200).json(newReview);
});

module.exports = { getAllReviews, createReview };

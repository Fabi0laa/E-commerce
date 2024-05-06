const Product = require('../models/Product');
const crypto = require('crypto-js');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const prisma = require('../prisma');

//Create a new product (only admin can access this)
const createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await prisma.product.create({
    data: req.body,
  });

  res.status(200).json(newProduct);
});

//Update a product (only admin can access this)
const updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });

  res.status(200).json(updatedProduct);
});

//Delete a product (make it inactive)
const deleteProduct = catchAsync(async (req, res, next) => {
  await prisma.product.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      active: false,
    },
  });

  res.status(200).json('Product is deleted');
});

//Get a specific product by id
const getProduct = catchAsync(async (req, res, next) => {
  let canSearchInactive = false;

  if (req.user.role === 'admin') {
    canSearchInactive = true;
  }

  const productAndReviews = await prisma.product.findUnique({
    where: {
      id: parseInt(req.params.id),
      ...(!canSearchInactive ? { active: true } : {}),
    },
    include: {
      reviews: true,
      category: true,
      brand: true,
    },
  });

  res.status(200).json(productAndReviews || []);
});

//Get all products with queries
const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await prisma.product.findMany({
    include: {
      reviews: true,
      category: true,
      brand: true,
    },
  });
  // const features = new APIFeatures(Product.find(), req.query).filter().sort().paginate();
  // const products = await features.query;

  res.status(200).json(products);
});

const getSuggestedProducts = catchAsync(async (req, res, next) => {
  const products = await prisma.product.findMany({
    where: {
      active: true,
      skinType: req.user.skinType,
    },
  });

  res.status(200).json(products);
});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSuggestedProducts,
};

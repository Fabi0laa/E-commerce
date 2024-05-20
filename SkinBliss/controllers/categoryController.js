const prisma = require('../prisma');
const catchAsync = require('../utils/catchAsync');

const createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await prisma.category.create({
    data: req.body,
  });

  res.status(201).json(newCategory);
});

const updateCategory = catchAsync(async (req, res, next) => {
  const updatedCategory = await prisma.category.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });

  res.status(200).json(updatedCategory);
});

const deleteCategory = catchAsync(async (req, res, next) => {
  await prisma.category.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).json('Category is deleted');
});

const getCategory = catchAsync(async (req, res, next) => {
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).json(category);
});

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await prisma.category.findMany({
    include: {
      product: true,
    },
  });

  res.status(200).json(categories);
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
};

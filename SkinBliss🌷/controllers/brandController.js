const prisma = require('../prisma');
const catchAsync = require('../utils/catchAsync');

const createBrand = catchAsync(async (req, res, next) => {
  const newBrand = await prisma.brand.create({
    data: req.body,
  });

  res.status(201).json(newBrand);
});

const updateBrand = catchAsync(async (req, res, next) => {
  const updatedBrand = await prisma.brand.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.status(200).json(updatedBrand);
});

const deleteBrand = catchAsync(async (req, res, next) => {
  await prisma.brand.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json('Brand is deleted');
});

const getBrand = catchAsync(async (req, res, next) => {
  const brand = await prisma.brand.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json(brand);
});

const getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await prisma.brand.findMany();

  res.status(200).json(brands);
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrands,
};

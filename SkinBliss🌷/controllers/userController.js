const router = require('express').Router();
const User = require('../models/User');

const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma');

const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//Update User details
const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
  }

  const filteredBody = filterObj(req.body, ['name', 'email', 'surname', 'phone', 'skinType']);
  // if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: filteredBody,
    select: {
      id: true,
      name: true,
      email: true,
      surname: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
      skinType: true,
    },
  });

  res.status(200).json({ message: 'success', user: updatedUser });
});

//delete a user
const deleteUser = catchAsync(async (req, res, next) => {
  await prisma.user.update({
    where: { id: req.user.id },
    data: { active: false },
  });
  res.status(200).json('User is inactive');
});

//Get a user details (only admin can access this)
const getUser = catchAsync(async (req, res, next) => {
  const findUser = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: {
      id: true,
      name: true,
      email: true,
      surname: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
      skinType: true,
    },
  });
  res.status(200).json(findUser);
});

//Get all user details (only admin can access this)
const getAllUsers = catchAsync(async (req, res, next) => {
  const findUser = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      surname: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
      skinType: true,
    },
  });

  res.status(200).json(findUser);
});

//Get user stats (only admin can access this)
const getUserStats = catchAsync(async (req, res, next) => {
  const current_date = new Date();
  const last_year = new Date(current_date.setFullYear(current_date.getFullYear() - 1));

  const data = await User.aggregate([
    {
      $match: { createdAt: { $gte: last_year } },
    },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json(data);
});

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
  getMe,
};

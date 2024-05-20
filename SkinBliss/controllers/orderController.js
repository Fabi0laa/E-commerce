const prisma = require('../prisma');
const catchAsync = require('../utils/catchAsync');
const { getUserShoppingCart, deleteAllCartItems } = require('./cartController');

const createOrder = catchAsync(async (req, res, next) => {
  const cart = await getUserShoppingCart(req.user.id);
  if (!cart) {
    return res.status(400).json({ message: 'Products are required' });
  }

  const products = cart.cartProducts;

  const total = products.reduce((acc, product) => {
    return acc + product.product.price * product.quantity;
  }, 0);

  const order = await prisma.orders.create({
    data: {
      address: {
        create: {
          ...req.body.address,
        },
      },
      user: {
        connect: {
          id: req.user.id,
        },
      },
      totalPrice: total,
      products: {
        create: products.map((product) => {
          return {
            quantity: product.quantity,
            product: {
              connect: {
                id: product.productId,
              },
            },
            price: product.product.price,
          };
        }),
      },
    },
  });

  await deleteAllCartItems(parseInt(req.user.id));
  res.status(201).json(order);
});

const getLatestAddress = catchAsync(async (req, res, next) => {
  const address = await prisma.orders.findFirstOrThrow({
    where: {
      userId: req.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      address: true,
    },
    take: 1,
  });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  let orders;

  if (req.user.role === 'admin') {
    orders = await prisma.orders.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            phone: true,
            email: true,
            role: true,
          },
        },
      },
    });
  } else {
    orders = await prisma.orders.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            phone: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  res.status(200).json(orders);
});

const getSingleOrder = catchAsync(async (req, res, next) => {
  let order;

  if (req.user.role === 'admin') {
    order = await prisma.orders.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            phone: true,
            email: true,
            role: true,
          },
        },
        address: true,
      },
    });
  } else {
    order = await prisma.orders.findUnique({
      where: {
        id: parseInt(req.params.id),
        userId: req.user.id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            phone: true,
            email: true,
            role: true,
          },
        },
        address: true,
      },
    });
  }

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json(order);
});

// const updateOrder = catchAsync(async (req, res, next) => {
//   const updated_order = await Order.findByIdAndUpdate(parseInt(req.params.id), req.body, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json(updated_order);
// });

const deleteOrder = catchAsync(async (req, res, next) => {
  await prisma.orders.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(204);
});

// const getUserOrders = catchAsync(async (req, res, next) => {
//   // console.log(req.params.id);
//   const find_order = await Order.find({ userId: req.params.id });
//   //console.log(find_cart);
//   res.status(200).json(find_order);
// });

// const getAllOrders = catchAsync(async (req, res, next) => {
//   const all_orders = await Order.find()
//     .populate({ path: "userId", select: "-__v -createdAt -updatedAt" }).populate({path:'product.productId' , select:'-_id -__v -createdAt -updatedAt'})
//     .sort({ createdAt: -1 });
//   res.status(200).json(all_orders);
// });

// const calculateIncome = catchAsync(async (req, res, next) => {
//   const productId = req.query.productId;
//   const date = new Date();
//   const last_month = new Date(date.setMonth(date.getMonth() - 1));
//   const previous_month = new Date(date.setMonth(last_month.getMonth() - 1));

//   const income = await Order.aggregate([
//     {
//       $match: {
//         createdAt: { $gte: previous_month },
//       },
//     },
//     { $project: { month: { $month: "$createdAt" }, sales: "$total" } },
//     {
//       $group: {
//         _id: "$month",
//         total: { $sum: "$sales" },
//       },
//     },
//   ]);

//   res.status(200).json(income);
// });

module.exports = {
  // calculateIncome,
  createOrder,
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  getLatestAddress,
  // updateOrder,
  // deleteOrder,
  // getUserOrders,
  // getAllOrders,
};

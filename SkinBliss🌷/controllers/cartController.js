const Cart = require('../models/Cart');

const catchAsync = require('../utils/catchAsync');
const prisma = require('../prisma');

//Add a product to the cart
const addCart = catchAsync(async (req, res, next) => {
  const product = req.body.product;
  const userCart = await getUserShoppingCart(req.user.id);
  console.log(product.productId, userCart.id);

  if (userCart) {
    const updatedCart = await prisma.shoppingCart.update({
      where: {
        userId: req.user.id,
      },
      data: {
        cartProducts: {
          upsert: {
            where: {
              shoppingCartId_productId: {
                shoppingCartId: userCart.id,
                productId: product.productId,
              },
            },
            update: {
              quantity: {
                increment: product.quantity,
              },
            },
            create: {
              productId: product.productId,
              quantity: product.quantity,
            },
          },
        },
      },
      select: {
        cartProducts: true,
      },
    });

    return res.status(200).json(updatedCart);
  }

  const newCart = await prisma.shoppingCart.create({
    data: {
      userId: req.user.id,
      cartProducts: {
        create: [
          {
            productId: product.productId,
            quantity: product.quantity,
          },
        ],
      },
    },
    select: {
      cartProducts: true,
    },
  });

  return res.status(201).json(newCart);
});

//Update the cart items
const updateCart = catchAsync(async (req, res, next) => {
  const product = req.body.product;

  console.log({
    product,
    userId: req.user.id,
  });

  const userCart = await getUserShoppingCart(req.user.id);

  if (!userCart) {
    return res.status(404).json('Cart not found');
  }

  const updatedCart = await prisma.shoppingCart.update({
    where: {
      userId: req.user.id,
    },

    data: {
      cartProducts: {
        update: {
          where: {
            shoppingCartId_productId: {
              shoppingCartId: userCart.id,
              productId: product.productId,
            },
          },
          data: {
            quantity: product.quantity,
          },
        },
      },
    },
    select: {
      cartProducts: true,
    },
  });

  res.status(200).json(updatedCart);
});

//Get a specific user cart
const getUserCart = catchAsync(async (req, res, next) => {
  const userCart = await getUserShoppingCart(req.user.id);

  if (!userCart) {
    return res.status(404).json('Cart not found');
  }

  res.status(200).json(userCart);
});

//Delete an item from the cart
const deleteUserCart = catchAsync(async (req, res, next) => {
  const userCart = await getUserShoppingCart(req.user.id);

  if (!userCart) {
    return res.status(404).json('Cart not found');
  }

  await prisma.cartProduct.delete({
    where: {
      shoppingCartId_productId: {
        shoppingCartId: userCart.id,
        productId: parseInt(req.params.productId),
      },
    },
  });

  res.status(200).json('Cart is deleted');
});

const getUserShoppingCart = async (userId) => {
  const userCart = await prisma.shoppingCart.findUnique({
    where: {
      userId: parseInt(userId),
    },
    include: {
      cartProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return userCart;
};

//Get all users carts (only admin can access this)
const getAllCarts = catchAsync(async (req, res, next) => {
  const all_carts = await Cart.find().sort({ createdAt: -1 });
  res.status(200).json(all_carts);
});

module.exports = {
  addCart,
  updateCart,
  getUserCart,
  deleteUserCart,
  getAllCarts,
};

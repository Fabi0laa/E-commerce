import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authSlice from './features/auth/authSlice';
import cartSlice from './features/cartSlice';
import compareSlice from './features/compareSlice';
import productModalSlice from './features/productModalSlice';
import shopFilterSlice from './features/shop-filter-slice';
import wishlistSlice from './features/wishlist-slice';
import couponSlice from './features/coupon/couponSlice';
import orderSlice from './features/order/orderSlice';
import quizModalSlice from './features/quizModalSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    productModal: productModalSlice,
    shopFilter: shopFilterSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    compare: compareSlice,
    coupon: couponSlice,
    order: orderSlice,
    quizModal: quizModalSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

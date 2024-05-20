import { use } from 'react';
import { apiSlice } from '../api/apiSlice';
import { notifyError, notifySuccess } from '@/utils/toast';

export const cartApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addProductToCart: builder.mutation({
      query: (data) => ({
        url: '/cart',
        method: 'POST',
        credentials: 'include',
        body: {
          product: data,
        },
      }),

      invalidatesTags: (result, error, arg) => ['Cart', { type: 'Cart', id: arg.id }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          notifySuccess(`Added to cart`);
        } catch (err) {
          notifyError(`Couldn't add to cart`);

          // do nothing
        }
      },
    }),
    updateCart: builder.mutation({
      query: (data) => {
        return {
          url: '/cart',
          method: 'PATCH',
          credentials: 'include',
          body: {
            product: data,
          },
        };
      },
      invalidatesTags: (result, error, arg) => ['Cart', { type: 'Cart', id: arg.id }],
      async onQueryStarted(arg, { dispatch, queryFulfilled, ...rest }) {
        try {
          await queryFulfilled;
          notifySuccess(`Cart updated`);
        } catch (err) {
          notifyError(`Couldn't update cart`);

          // do nothing
        }
      },
    }),
    removeProductFromCart: builder.mutation({
      query: (data) => {
        return {
          url: `/cart/${data.id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, arg) => ['Cart', { type: 'Cart', id: arg.id }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          notifySuccess(`Product removed from cart`);
        } catch (err) {
          notifyError(`Couldn't remove product from cart`);

          // do nothing
        }
      },
    }),
    getCart: builder.query({
      query: () => ({ url: '/cart', credentials: 'include', method: 'GET' }),
      providesTags: ['Cart'],
    }),
  }),
});

export const { useAddProductToCartMutation, useGetCartQuery, useRemoveProductFromCartMutation, useUpdateCartMutation } =
  cartApi;

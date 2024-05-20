import { apiSlice } from '../../api/apiSlice';
import { set_client_secret } from './orderSlice';

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // createPaymentIntent
    createOrder: builder.mutation({
      query: (data) => ({
        url: '/order',
        credentials: 'include',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          return result;
          // dispatch(set_client_secret(result.clientSecret));
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags: ['Cart'],
    }),

    // saveOrder
    saveOrder: builder.mutation({
      query: (data) => ({
        url: 'https://shofy-backend.vercel.app/api/order/saveOrder',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['UserOrders'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            localStorage.removeItem('couponInfo');
            localStorage.removeItem('cart_products');
            localStorage.removeItem('shipping_info');
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    // getUserOrders
    getAllOrders: builder.query({
      query: () => ({ url: `/order`, credentials: `include`, method: `GET` }),
      providesTags: ['UserOrders'],
      keepUnusedDataFor: 600,
    }),
    // getUserOrders
    getOrderById: builder.query({
      query: (id) => ({ url: `order/${id}`, credentials: `include`, method: `GET` }),
      providesTags: (result, error, arg) => [{ type: 'UserOrder', id: arg }],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useCreateOrderMutation, useSaveOrderMutation, useGetAllOrdersQuery, useGetOrderByIdQuery } = authApi;

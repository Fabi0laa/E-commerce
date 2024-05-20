import { apiSlice } from '@/redux/api/apiSlice';
import { userLoggedIn, userLoggedOut } from './authSlice';
import { use } from 'react';

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: 'http://localhost:3001/api/auth/register',
          method: 'POST',
          credentials: 'include',
          body: data,
        };
      },
    }),

    // login
    loginUser: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:3001/api/auth/login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({ url: 'http://localhost:3001/api/auth/logout', method: 'POST', credentials: 'include' }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags: ['auth'],
    }),
    // get me
    getUser: builder.query({
      query: () => ({ url: 'http://localhost:3001/api/user/me', method: 'GET', credentials: 'include' }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data,
            }),
          );
        } catch (err) {
          userLoggedOut();
          return null;
          // do nothing
        }
      },
      providesTags: ['auth'],
    }),
    deleteAccount: builder.mutation({
      query: () => ({ url: 'user/', method: 'DELETE', credentials: 'include' }),
      invalidatesTags: ['user'],
    }),
    getAllUsers: builder.query({
      query: () => ({ url: 'user/', method: 'GET', credentials: 'include' }),
      providesTags: ['user'],
    }),
    disableUserAccount: builder.mutation({
      query: (id) => ({ url: `user/${id}`, method: 'DELETE', credentials: 'include' }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useConfirmEmailQuery,
  useResetPasswordMutation,
  useConfirmForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useSignUpProviderMutation,
  useGetUserQuery,
  useLogoutMutation,
  useGetAllUsersQuery,
  useDisableUserAccountMutation,
} = authApi;

import { apiSlice } from '../api/apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: '/category',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Category'],
    }),
    getShowCategory: builder.query({
      query: () => ({ url: `/category`, method: 'GET', credentials: 'include' }),
      providesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({ url: `/category/${id}`, method: 'DELETE', credentials: 'include' }),
      invalidatesTags: ['Category'],
    }),
    getCategory: builder.query({
      query: (id) => ({ url: `/category/${id}`, method: 'GET', credentials: 'include' }),
      providesTags: ['Category'],
    }),
    editCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useEditCategoryMutation,
  useAddCategoryMutation,
  useGetShowCategoryQuery,
  useDeleteCategoryMutation,
} = categoryApi;

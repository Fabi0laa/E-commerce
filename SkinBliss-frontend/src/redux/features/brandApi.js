import { apiSlice } from '../api/apiSlice';

export const brandApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getActiveBrands: builder.query({
      query: () => ({ url: `/brand`, method: 'GET', credentials: 'include' }),
      providesTags: ['Brand'],
    }),
    addBrand: builder.mutation({
      query: (data) => ({
        url: '/brand',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    editBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brand/${id}`,
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({ url: `/brand/${id}`, method: 'DELETE', credentials: 'include' }),
      invalidatesTags: ['Brand'],
    }),
    getBrand: builder.query({
      query: (id) => ({ url: `/brand/${id}`, method: 'GET', credentials: 'include' }),
    }),
  }),
});

export const {
  useEditBrandMutation,
  useGetActiveBrandsQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
  useGetBrandQuery,
} = brandApi;

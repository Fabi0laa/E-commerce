import { apiSlice } from '../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({ url: `products/all`, method: 'GET', credentials: 'include' }),
      providesTags: ['Products'],
    }),
    getSuggestedProducts: builder.query({
      query: () => ({ url: `products/suggested`, method: 'GET', credentials: 'include' }),
      providesTags: ['ProductType'],
    }),

    addProduct: builder.mutation({
      query: (body) => ({
        url: 'products/',
        method: 'POST',
        body: { ...body, categoryId: parseInt(body.categoryId), brandId: parseInt(body.brandId) },
        credentials: 'include',
      }),
      invalidatesTags: ['Products'],
    }),

    // get single product
    getProduct: builder.query({
      query: (id) => ({ url: `products/find/${id}`, method: 'GET', credentials: 'include' }),
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg }],
      invalidatesTags: (result, error, arg) => [{ type: 'RelatedProducts', id: arg }],
    }),
    modifyProduct: builder.mutation({
      query: ({ id, ...data }) => ({ url: `products/${id}`, method: 'PATCH', body: data, credentials: 'include' }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({ url: `products/${id}`, method: 'DELETE', credentials: 'include' }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  // useGetSuggestedProductsQuery,
  useGetSuggestedProductsQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useModifyProductMutation,
} = productApi;

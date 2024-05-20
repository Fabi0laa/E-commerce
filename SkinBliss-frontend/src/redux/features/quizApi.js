import { apiSlice } from '../api/apiSlice';

export const quizApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => ({ url: '/skinquiz/questions', method: 'GET', credentials: 'include' }),
    }),
    postQuestions: builder.mutation({
      query: (data) => ({
        url: '/skinquiz/questions',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['auth', 'RelatedProducts'],
    }),
  }),
});

export const { useGetQuestionsQuery, usePostQuestionsMutation } = quizApi;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
};

export const quizModalSlice = createSlice({
  name: 'productModal',
  initialState,
  reducers: {
    handleQuizModalOpen: (state) => {
      state.isModalOpen = true;
    },
    handleQuizModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { handleQuizModalOpen, handleQuizModalClose } = quizModalSlice.actions;
export default quizModalSlice.reducer;

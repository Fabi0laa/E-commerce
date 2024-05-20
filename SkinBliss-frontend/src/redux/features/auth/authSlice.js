import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  user: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: {
      reducer(state, action) {
        state.isAuthenticated = true;
        state.user = action.payload;
      },
    },
    logoutUser: {
      reducer(state) {
        state.user = initialState.user;
        state.tokens = initialState.tokens;
        state.isAuthenticated = initialState.isAuthenticated;
      },
    },
  },
});

export const { updateUser, logoutUser } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;

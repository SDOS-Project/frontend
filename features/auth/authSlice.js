import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: {
      reducer(state, action) {
        console.log('setUser reducer called with payload:', action.payload);
        state.user = action.payload;
        state.isAuthenticated = true;
      },
    },
    clearUser: {
      reducer(state) {
        state.user = initialState.user;
        state.isAuthenticated = initialState.isAuthenticated;
      },
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;

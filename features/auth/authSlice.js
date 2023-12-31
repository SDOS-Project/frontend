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
        state.user = action.payload;
        state.isAuthenticated = true;
      },
    },
    updateUser: {
      reducer(state, action) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
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

export const { setUser, updateUser, clearUser } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  selectedUser: null, // Added selectedUser to state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut: (state) => { // Fixed typo
      state.user = null;
      state.isAuthenticated = false;
      state.selectedUser = null; // Clear selectedUser on logout
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload; // Set selected user
    },
  },
});

export const { userLoggedIn, userLoggedOut, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;

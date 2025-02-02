import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  selectedUser: null, // Added selectedUser to state
  onlineUsers:null,
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
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, setSelectedUser,setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;

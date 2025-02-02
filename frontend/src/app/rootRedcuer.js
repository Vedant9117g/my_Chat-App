import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import conversationReducer from "../features/conversationSlice"; 
import socketReducer from "../features/socketSlice"; // Import socketReducer
import { authApi } from "@/features/api/authApi";
import { conversationApi } from "@/features/api/conversationApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
  
    auth: authReducer,
    conversation: conversationReducer,
    socket: socketReducer, // Add socketReducer
});

export default rootReducer;
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import conversationReducer from "../features/conversationSlice"; 
import { authApi } from "@/features/api/authApi";
import { conversationApi } from "@/features/api/conversationApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
  
    auth: authReducer,
    conversation: conversationReducer,
});

export default rootReducer;

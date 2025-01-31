import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootRedcuer";
import { authApi } from "@/features/api/authApi";
import { conversationApi } from "@/features/api/conversationApi";

export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) =>
        defaultMiddleware().concat(authApi.middleware, conversationApi.middleware),
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }));
};

initializeApp();

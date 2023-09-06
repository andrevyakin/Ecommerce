import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./slices/apiSlice";
import authReducer from "./slices/reducers/authSlice";
import userSlice from "./slices/reducers/userSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        userCart: userSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
    //devTools: false
});

export default store;

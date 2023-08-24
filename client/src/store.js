import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./slices/apiSlice";
import authReducer from "./slices/reducers/authSlice";
import shopReducer from "./slices/reducers/shopSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        shop: shopReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;

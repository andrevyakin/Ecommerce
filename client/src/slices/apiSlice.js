import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";
import {setCredentials, logout} from "./reducers/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    //credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.userInfo?.accessToken || undefined;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401 || result?.error?.status === 403) {
        const refreshResult = await baseQuery(
            "api/auth/token",
            api,
            extraOptions
        );
        if (refreshResult?.data) {
            const user = api.getState().auth.userInfo;
            api.dispatch(setCredentials({...refreshResult.data, user}));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "Categories"],
    endpoints: (builder) => ({})
});

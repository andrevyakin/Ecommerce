import {apiSlice} from "../apiSlice";
import {
    LOGON_URL,
    LOGOUT_URL,
    PROFILE_URL,
    REGISTRATION_URL
} from "../../utils/consts";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: LOGON_URL,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: LOGOUT_URL,
                method: "POST"
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: REGISTRATION_URL,
                method: "POST",
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: PROFILE_URL,
                method: "PUT",
                body: data
            })
        })
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation
} = userApiSlice;

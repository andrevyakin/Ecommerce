import {apiSlice} from "../apiSlice";
import {CATEGORIES_URL, PRODUCT_URL} from "../../utils/consts";

export const shopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (body) => ({
                url: PRODUCT_URL,
                method: "POST",
                body,
                formData: true
            })
        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: CATEGORIES_URL,
                method: "POST",
                body
            })
        })
    })
});

export const {useAddProductMutation, useAddCategoryMutation} = shopApiSlice;

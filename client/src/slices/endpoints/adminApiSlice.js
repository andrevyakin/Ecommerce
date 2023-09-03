import {apiSlice} from "../apiSlice";
import {CATEGORIES_URL, PRODUCT_EDIT_URL, PRODUCT_URL} from "../../utils/consts";

export const shopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (body) => ({
                url: PRODUCT_URL,
                method: "POST",
                body,
                formData: true
            }),
            invalidatesTags: ["Products"]
        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: CATEGORIES_URL,
                method: "POST",
                body
            }),
            invalidatesTags: ["Categories"]
        }),
        editProduct: builder.mutation({
            query: (formData) => ({
                url: PRODUCT_EDIT_URL,
                method: "PUT",
                body: formData,
                formData: true
            }),
            invalidatesTags: ["Products"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCT_EDIT_URL}/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Products"]
        })
    })
});

export const {
    useAddProductMutation,
    useAddCategoryMutation,
    useEditProductMutation,
    useDeleteProductMutation
} = shopApiSlice;

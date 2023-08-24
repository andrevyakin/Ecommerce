import {apiSlice} from "../apiSlice";
import {CATEGORIES_URL, PRODUCT_URL, SHOP_ROUTE} from "../../utils/consts";

export const shopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => CATEGORIES_URL
        }),
        getProduct: builder.query({
            query: (params) => (params === SHOP_ROUTE ? PRODUCT_URL : params)
        })
    })
});

export const {useGetCategoriesQuery, useGetProductQuery} = shopApiSlice;

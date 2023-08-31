import {apiSlice} from "../apiSlice";
import {
    CATEGORIES_URL,
    PRODUCT_URL,
    PRODUCTS_BY_CATEGORY_COUNT_URL,
    PRODUCTS_COUNT_URL,
    SHOP_ROUTE
} from "../../utils/consts";

export const shopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => CATEGORIES_URL
        }),
        getProduct: builder.query({
            query: (params) => (params === SHOP_ROUTE ? PRODUCT_URL : params)
        }),
        getProductsCount: builder.query({
            query: () => PRODUCTS_COUNT_URL
        }),
        getProductsCountByCategory: builder.query({
            query: (params) => `${PRODUCTS_BY_CATEGORY_COUNT_URL}/${params}`
        })
    })
});

export const {
    useGetCategoriesQuery,
    useGetProductQuery,
    useGetProductsCountQuery,
    useGetProductsCountByCategoryQuery
} = shopApiSlice;

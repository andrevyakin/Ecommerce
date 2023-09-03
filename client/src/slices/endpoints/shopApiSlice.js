import {apiSlice} from "../apiSlice";
import {
    CATEGORIES_URL,
    PRODUCT_URL,
    PRODUCTS_BY_CATEGORY_COUNT_URL,
    SHOP_ROUTE
} from "../../utils/consts";

export const shopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => CATEGORIES_URL,
            providesTags: () => ["Categories"]
        }),
        getProduct: builder.query({
            query: (params) => (params === SHOP_ROUTE ? PRODUCT_URL : params),
            providesTags: () => ["Products"]
        }),
        getProductsCountByCategory: builder.query({
            query: (params) => `${PRODUCTS_BY_CATEGORY_COUNT_URL}/${params}`
        })
    })
});

export const {
    useGetCategoriesQuery,
    useGetProductQuery,
    useGetProductsCountByCategoryQuery
} = shopApiSlice;

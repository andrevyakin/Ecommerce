import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedCategory: "",
    isActive: false,
    products: []
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        selectedCategory: (state, action) => {
            state.categoryId = action.payload;
        },
        isActive: (state, action) => {
            state.categoryId = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    }
});

export const {selectedCategory, isActive, setProducts} = shopSlice.actions;
export default shopSlice.reducer;

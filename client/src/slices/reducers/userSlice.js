import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userCart",
    initialState: {
        currentUser: null,
        cart: []
        /*isLoading: false,
        formType: "signup",
        showForm: false*/
    },
    reducers: {
        addItemToCart: (state, {payload}) => {
            let newCart = [...state.cart];
            const found = state.cart.find(({_id}) => _id === payload._id);

            if (found) {
                newCart = newCart.map((item) =>
                    item._id === payload._id
                        ? {...item, quantity: payload.quantity || item.quantity + 1}
                        : item
                );
            } else {
                newCart.push({...payload, quantity: 1});
            }

            state.cart = newCart;
        },
        removeItemFromCart: (state, {payload}) => {
            state.cart = state.cart.filter(({_id}) => _id !== payload);
        }
    }
});

export const {addItemToCart, removeItemFromCart} =
    userSlice.actions;

export default userSlice.reducer;

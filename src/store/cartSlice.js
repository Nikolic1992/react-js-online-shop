import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalProducts: 0,
  },
  reducers: {
    saveInCartAction: (state, action) => {
      console.log(action.payload);
      let copyCart = [...state.cart];

      // check if the product is already in the cart
      let findIndex = null;
      copyCart.find((item, index) => {
        if (item.id === action.payload.id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex === null) {
        // if the product is not in the cart
        copyCart.push({
          ...action.payload,
          count: 1,
          cartTotal: action.payload.price,
        });
        state.totalProducts++;
      } else {
        // if the product is already in the cart
        copyCart[findIndex].count++;
      }

      state.cart = copyCart;
      // use localStorage to store the cart ( without backend )
      localStorage.setItem("cart_item", JSON.stringify(copyCart));
      localStorage.setItem("cart_total", JSON.stringify(state.totalProducts));
    },

    deleteFromCartAction: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { saveInCartAction, deleteFromCartAction } = cartSlice.actions;
export default cartSlice.reducer;

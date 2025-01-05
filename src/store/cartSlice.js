import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalProducts: 0,
    totalPrice: 0,
  },
  reducers: {
    saveInCartAction: (state, action) => {
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
        state.totalPrice += Math.floor(action.payload.price);
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
      let copyCart = [...state.cart];

      let findIndex = null;
      copyCart.find((item, index) => {
        if (item.id === action.payload.id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex !== null) {
        copyCart.splice(findIndex, 1);
        state.totalProducts--;
        state.totalPrice = subTotal(copyCart);
      }

      state.cart = copyCart;

      localStorage.setItem("cart_item", JSON.stringify(copyCart));
      localStorage.setItem("cart_total", JSON.stringify(state.totalProducts));
    },

    setPriceHandlerAction: (state, action) => {
      const { increment, index } = action.payload;
      let copyCart = [...state.cart];

      copyCart[index].cartTotal += copyCart[index].price * increment;
      state.totalPrice = subTotal(copyCart);

      if (copyCart[index].count === 1 && increment === -1) {
        copyCart.splice(index, 1);
        state.totalProducts--;
      } else {
        copyCart[index].count += increment;
      }

      state.cart = copyCart;
      localStorage.setItem("cart_item", JSON.stringify(copyCart));
      localStorage.setItem("cart_total", JSON.stringify(state.totalProducts));
    },
  },
});

function subTotal(arrayCart) {
  return arrayCart.reduce((acc, current) => {
    return acc + current.cartTotal;
  }, 0);
}

export const { saveInCartAction, deleteFromCartAction, setPriceHandlerAction } =
  cartSlice.actions;
export default cartSlice.reducer;

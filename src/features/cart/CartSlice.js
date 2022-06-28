import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;

      const existProduct = state.value.find(
        (item) => item._id === newProduct._id
      );

      if (!existProduct) {
        state.value.push({
          ...newProduct,
          total: newProduct.quantity * newProduct.price,
        });
      } else {
        existProduct.quantity += +newProduct.quantity;
        existProduct.total += newProduct.quantity * newProduct.price;
      }
    },

    reCart: (state, action) => {
      state.value = [];
    },

    removeItemCart: (state, action) => {
      const _id = action.payload;

      state.value = state.value.filter((item) => item._id !== _id);
    },

    increaseItem: (state, action) => {
      const _id = action.payload;
      const product = state.value.find((item) => item._id === _id);

      product.quantity++;
      product.total += product.price;
    },

    decreaseItem: (state, action) => {
      const _id = action.payload;
      const product = state.value.find((item) => item._id === _id);

      product.quantity--;
      product.total -= product.price;
      if (product.quantity < 1) {
        state.value = state.value.filter((item) => item._id !== _id);
      }
    },
  },
});

export const { addToCart, removeItemCart, increaseItem, decreaseItem, reCart } =
  cartSlice.actions;
export default cartSlice.reducer;

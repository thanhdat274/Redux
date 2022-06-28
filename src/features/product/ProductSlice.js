import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { list, add, listWithCategory, sortza } from "../../api/product";
import {
  remove,
  edit,
  listWithCate,
  read,
  search,
  sortaz,
  sortpricetang,
  sortpricegiam,
} from "../../api/product";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const { data } = await list();
  return data;
});

export const getProductsCate = createAsyncThunk(
  "product/getProductsCate",
  async () => {
    const { data } = await listWithCategory();
    return data;
  }
);

export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
  const { data } = await read(id);
  console.log(data);
  return data;
});

export const getProductSortaz = createAsyncThunk(
  "product/getProductSortaz",
  async () => {
    const { data } = await sortaz();
    console.log(data);
    return data;
  }
);

export const getProductSortza = createAsyncThunk(
  "product/getProductSortza",
  async () => {
    const { data } = await sortza();
    console.log(data);
    return data;
  }
);

export const getPrTangPrice = createAsyncThunk(
  "product/getPrTangPrice",
  async () => {
    const { data } = await sortpricetang();
    console.log(data);
    return data;
  }
);

export const getPrGiamPrice = createAsyncThunk(
  "product/getPrGiamPrice",
  async () => {
    const { data } = await sortpricegiam();
    console.log(data);
    return data;
  }
);

export const addProducts = createAsyncThunk(
  "product/addProducts",
  async (product) => {
    const { data } = await add(product);
    return data;
  }
);

export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (id) => {
    await remove(id);
    return id;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const { data } = await edit(product);
    return data;
  }
);

export const getProductwSearch = createAsyncThunk(
  "product/getProductwSearch",
  async (valueSearch) => {
    const { data } = await search(valueSearch);
    console.log(data);
    return data;
  }
);

export const getProductWC = createAsyncThunk(
  "product/getProductWC",
  async (id) => {
    console.log(id);
    const { data } = await listWithCate(id);
    console.log(data.products);
    return data.products;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    value: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(getProductSortaz.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(getPrTangPrice.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(getPrGiamPrice.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(getProductSortza.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(getProductwSearch.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(getProductsCate.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(addProducts.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value.push(action.payload);
    });

    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.value = state.value.filter((item) => item._id !== action.payload);
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.value = state.value.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    });

    builder.addCase(getProductWC.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default productSlice.reducer;

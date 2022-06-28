import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { list, remove, add, read, edit } from "../../api/category";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const { data } = await list();
    return data;
  }
);

export const removeCategories = createAsyncThunk(
  "category/removeCategories",
  async (id) => {
    await remove(id);
    return id;
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (category) => {
    const { data } = await add(category);
    return data;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category) => {
    const { data } = await edit(category);
    return data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    value: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(addCategory.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value.push(action.payload);
    });

    builder.addCase(removeCategories.fulfilled, (state, action) => {
      state.value = state.value.filter((item) => item._id !== action.payload);
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value = state.value.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    });
  },
});

export default categorySlice.reducer;

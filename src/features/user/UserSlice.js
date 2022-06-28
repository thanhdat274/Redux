import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { list, remove, signup, edit } from "../../api/user";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const { data } = await list();
  return data;
});

export const removeUser = createAsyncThunk("user/removeUser", async (id) => {
  await remove(id);
  return id;
});

export const addUser = createAsyncThunk("user/addUser", async (user) => {
  const { data } = await signup(user);
  return data;
});

export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  const { data } = await edit(user);

  return data;
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    value: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.value = state.value.filter((item) => item._id !== action.payload);
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value.push(action.payload);
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value = state.value.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    });
  },
});

export default userSlice.reducer;

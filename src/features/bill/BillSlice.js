import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { list, remove, listDetail } from "../../api/bill";
import { read } from "../../api/user";

export const getBills = createAsyncThunk("bill/getBills", async () => {
  const { data } = await list();
  return data;
});

export const getBillDetail = createAsyncThunk(
  "bill/getBillDetail",
  async (id) => {
    console.log(id);
    const { data } = await listDetail(id);
    return data;
  }
);

export const removeBill = createAsyncThunk("bill/removeBill", async (id) => {
  await remove(id);
  return id;
});

export const listBillwUser = createAsyncThunk(
  "bill/listBillwUser",
  async (id) => {
    const { data } = await read(id);
    return data.bills;
  }
);

const billSlice = createSlice({
  name: "bill",
  initialState: {
    value: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getBills.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(getBillDetail.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(listBillwUser.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    // builder.addCase(addCategory.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   state.value.push(action.payload);
    // });
    builder.addCase(removeBill.fulfilled, (state, action) => {
      state.value = state.value.filter((item) => item._id !== action.payload);
    });
    // builder.addCase(updateCategory.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   state.value = state.value.map((item) =>
    //     item._id === action.payload._id ? action.payload : item
    //   );
    // });
  },
});

export default billSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export interface WheatPurchase {
  id?: string;
  buyerName: string;
  quantityKg: number;
  pricePerKg: number;
  purchaseDate: string;
}

interface WheatState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: WheatState = {
  loading: false,
  error: null,
  success: false,
};

export const addWheatPurchase = createAsyncThunk(
  "wheat/addPurchase",
  async (data: WheatPurchase, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/buywheat", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to add purchase");
    }
  }
);


const wheatSlice = createSlice({
  name: "wheat",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWheatPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addWheatPurchase.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addWheatPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = wheatSlice.actions;
export default wheatSlice.reducer;
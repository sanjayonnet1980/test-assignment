import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export interface RicePurchase {
  id?: string;
  buyerName: string;
  quantityKg: number;
  pricePerKg: number;
  purchaseDate: string;
}

interface RiceState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RiceState = {
  loading: false,
  error: null,
  success: false,
};

export const addRicePurchase = createAsyncThunk(
  "rice/addPurchase",
  async (data: RicePurchase, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/buyrice", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to add purchase");
    }
  }
);


const riceSlice = createSlice({
  name: "rice",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRicePurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addRicePurchase.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addRicePurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = riceSlice.actions;
export default riceSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export interface Stocks {
  id?: string;
  clientName: string;
  quantityKg: number;
  pricePerKg: number;
  purchaseDate: string;
  productName: string;
  clientMno: string;
}

interface StockState {
  entries: Stocks[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: StockState = {
  entries: [],
  loading: false,
  error: null,
  success: false,
};

export const stockDataPost = createAsyncThunk(
  "stocks/customers",
  async (data: Stocks, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/stocks", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to add purchase");
    }
  }
);

export const fetchStocksData = createAsyncThunk(
  "stocks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/stocks");
      return response.data as Stocks[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

export const deleteStocksData = createAsyncThunk(
  "stocks/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/stocks/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete entry"
      );
    }
  }
);

export const updateStocksData = createAsyncThunk(
  "stocks/update",
  async (updatedEntry: Stocks, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/stocks/${updatedEntry.id}`,
        updatedEntry
      );
      return response.data as Stocks;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update entry"
      );
    }
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builer) => {
    builer
      .addCase(stockDataPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(stockDataPost.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(stockDataPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStocksData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStocksData.fulfilled,
        (state, action: PayloadAction<Stocks[]>) => {
          state.entries = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchStocksData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(
        deleteStocksData.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.entries = state.entries.filter(
            (entry) => entry.id !== action.payload
          );
        }
      )
      // Update
      .addCase(
        updateStocksData.fulfilled,
        (state, action: PayloadAction<Stocks>) => {
          const index = state.entries.findIndex(
            (e) => e.id === action.payload.id
          );
          if (index !== -1) {
            state.entries[index] = action.payload;
          }
        }
      );
  },
});

export const { resetStatus } = stocksSlice.actions;
export default stocksSlice.reducer;

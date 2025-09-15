import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { SellEntry } from "../../types/product";

interface SellProductState {
  sellProducts: SellEntry[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SellProductState = {
  sellProducts: [],
  loading: false,
  error: null,
  success: false,
};

export const fetchDailyProducts = createAsyncThunk(
  "dailyProducts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dailySellProducts");
      return response.data as SellEntry[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

// ✅ Add new sell product to backend
export const addSellProduct = createAsyncThunk(
  "sellProduct/add",
  async (data: SellEntry, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/dailySellProducts", data);
      return response.data as SellEntry;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to add product");
    }
  }
);

// ✅ Delete sell product by ID
export const deleteSellProduct = createAsyncThunk(
  "sellProduct/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/dailySellProducts/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to delete product");
    }
  }
);

const sellProductSlice = createSlice({
  name: "sellProduct",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
    addLocalEntry: (state, action: PayloadAction<SellEntry>) => {
      state.sellProducts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDailyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDailyProducts.fulfilled,
        (state, action: PayloadAction<SellEntry[]>) => {
          state.sellProducts = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchDailyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addSellProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addSellProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.sellProducts.push(action.payload);
      })
      .addCase(addSellProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSellProduct.fulfilled, (state, action) => {
        state.sellProducts = state.sellProducts.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(deleteSellProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus, addLocalEntry } = sellProductSlice.actions;
export default sellProductSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export interface BuyRiceEntry {
  id: string;
  buyerName: string;
  quantityKg: number;
  pricePerKg: number;
  purchaseDate: string;
}

interface BuyRiceState {
  entries: BuyRiceEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: BuyRiceState = {
  entries: [],
  loading: false,
  error: null,
};

export const addRicePurchase = createAsyncThunk(
  "rice/addPurchase",
  async (data: BuyRiceEntry, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/buyrice", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to add purchase");
    }
  }
);

export const fetchBuyRice = createAsyncThunk(
  'buyRice/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/buyrice');
      return response.data as BuyRiceEntry[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch data');
    }
  }
);

export const deleteBuyRice = createAsyncThunk(
  'buyRice/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/buyrice/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete entry');
    }
  }
);

export const updateBuyRice = createAsyncThunk(
  'buyWheat/update',
  async (updatedEntry: BuyRiceEntry, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/buywheat/${updatedEntry.id}`, updatedEntry);
      return response.data as BuyRiceEntry;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update entry');
    }
  }
);

const buyRiceSlice = createSlice({
  name: 'buyWheat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchBuyRice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyRice.fulfilled, (state, action: PayloadAction<BuyRiceEntry[]>) => {
        state.entries = action.payload;
        state.loading = false;
      })
      .addCase(fetchBuyRice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteBuyRice.fulfilled, (state, action: PayloadAction<string>) => {
        state.entries = state.entries.filter((entry) => entry.id !== action.payload);
      })

      // Update
      .addCase(updateBuyRice.fulfilled, (state, action: PayloadAction<BuyRiceEntry>) => {
        const index = state.entries.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      })
      
  },
});

export default buyRiceSlice.reducer;
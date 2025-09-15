// store/buyWheatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export interface BuyWheatEntry {
  id: string;
  buyerName: string;
  quantityKg: number;
  pricePerKg: number;
  purchaseDate: string;
}

interface BuyWheatState {
  entries: BuyWheatEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: BuyWheatState = {
  entries: [],
  loading: false,
  error: null,
};

export const fetchBuyWheat = createAsyncThunk(
  'buyWheat/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/buywheat');
      return response.data as BuyWheatEntry[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch data');
    }
  }
);

export const deleteBuyWheat = createAsyncThunk(
  'buyWheat/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/buywheat/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete entry');
    }
  }
);

export const updateBuyWheat = createAsyncThunk(
  'buyWheat/update',
  async (updatedEntry: BuyWheatEntry, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/buywheat/${updatedEntry.id}`, updatedEntry);
      return response.data as BuyWheatEntry;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update entry');
    }
  }
);

const buyWheatSlice = createSlice({
  name: 'buyWheat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchBuyWheat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyWheat.fulfilled, (state, action: PayloadAction<BuyWheatEntry[]>) => {
        state.entries = action.payload;
        state.loading = false;
      })
      .addCase(fetchBuyWheat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteBuyWheat.fulfilled, (state, action: PayloadAction<string>) => {
        state.entries = state.entries.filter((entry) => entry.id !== action.payload);
      })

      // Update
      .addCase(updateBuyWheat.fulfilled, (state, action: PayloadAction<BuyWheatEntry>) => {
        const index = state.entries.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      });
  },
});

export default buyWheatSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export interface BorrowCustomers {
  id?: string;
  customeName: string;
  quantityKg: number;
  pricePerKg: number;
  purchaseDate: string;
  customerAddress: string;
  mobileNumber: string;
}

interface CustomerState {
  entries: BorrowCustomers[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CustomerState = {
  entries: [],
  loading: false,
  error: null,
  success: false,
};

export const borrowCustomersPost = createAsyncThunk(
  "borrow/customers",
  async (data: BorrowCustomers, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/borrowCustomers", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to add purchase");
    }
  }
);

export const fetchBorrowCustomers = createAsyncThunk(
  "borrowCustomers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/borrowCustomers");
      return response.data as BorrowCustomers[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

export const deleteBorrowCustomers = createAsyncThunk(
  "borrowCustomers/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/borrowCustomers/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete entry"
      );
    }
  }
);

export const updateBorrowCustomers = createAsyncThunk(
  "borrowCustomers/update",
  async (updatedEntry: BorrowCustomers, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/borrowCustomers/${updatedEntry.id}`,
        updatedEntry
      );
      return response.data as BorrowCustomers;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update entry"
      );
    }
  }
);

const borrowCustomersSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builer) => {
    builer
      .addCase(borrowCustomersPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(borrowCustomersPost.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(borrowCustomersPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBorrowCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBorrowCustomers.fulfilled,
        (state, action: PayloadAction<BorrowCustomers[]>) => {
          state.entries = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchBorrowCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(
        deleteBorrowCustomers.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.entries = state.entries.filter(
            (entry) => entry.id !== action.payload
          );
        }
      )
      // Update
      .addCase(
        updateBorrowCustomers.fulfilled,
        (state, action: PayloadAction<BorrowCustomers>) => {
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

export const { resetStatus } = borrowCustomersSlice.actions;
export default borrowCustomersSlice.reducer;

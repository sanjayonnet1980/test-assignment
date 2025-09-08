import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { monthlyInv } from "../../types/mnthInv";

interface MonthInvState {
  monthlyInvestment: monthlyInv[];
  loading: boolean;
  error: string | null;
}

const initialState: MonthInvState = {
  monthlyInvestment: [],
  loading: false,
  error: null,
};

//Create montlyInvSlice details async method
export const addMnthInv = createAsyncThunk(
  "monthlyInvestment/add",
  async (monthlyInvestment: Omit<monthlyInv, "id">) => {
    const res = await axiosInstance.post<monthlyInv>("/monthlyInv", monthlyInvestment);
    return res.data;
  }
);

//Read montlyInvSlice details async method
export const fetchMnthInv = createAsyncThunk(
  "monthlyInvestment/fetch",
  async () => {
    const res = await axiosInstance.get<monthlyInv[]>("/monthlyInv");
    return res.data;
  }
);

//Update montlyInvSlice details async method
export const updateMnthInv = createAsyncThunk(
  "monthlyInvestment/update",
  async (monthlyInvestment: monthlyInv) => {
    const res = await axiosInstance.put<monthlyInv>(
      `/monthlyInv/${monthlyInvestment.id}`,
      monthlyInvestment
    );
    return res.data;
  }
);

//Delete montlyInvSlice details async method
export const deleteMnthInv = createAsyncThunk(
  "monthlyInvestment/delete",
  async (id: string) => {
    await axiosInstance.delete(`/monthlyInv/${id}`);
    return id;
  }
);

const montlyInvSlice = createSlice({
  name: "monthlyInvestment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMnthInv.fulfilled, (state, action) => {
        state.monthlyInvestment.push(action.payload);
      })
      .addCase(fetchMnthInv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMnthInv.fulfilled, (state, action) => {
        state.monthlyInvestment = action.payload;
        state.loading = false;
      })
      .addCase(fetchMnthInv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(updateMnthInv.fulfilled, (state, action) => {
        const index = state.monthlyInvestment.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.monthlyInvestment[index] = action.payload;
      })
      .addCase(deleteMnthInv.fulfilled, (state, action) => {
        state.monthlyInvestment = state.monthlyInvestment.filter(
          (p) => p.id.toString() !== action.payload
        );
      });
  },
});

export default montlyInvSlice.reducer;

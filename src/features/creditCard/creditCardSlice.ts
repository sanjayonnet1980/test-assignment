import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { CreditCard } from "../../types/creditCardTypes";

interface CreditCardState {
  creditCard: CreditCard[];
  loading: boolean;
  error: string | null;
}

const initialState: CreditCardState = {
  creditCard: [],
  loading: false,
  error: null,
};

//Create creditCard details async method
export const addCreditCard = createAsyncThunk(
  "creditCard/add",
  async (creditCard: Omit<CreditCard, "id">) => {
    const res = await axiosInstance.post<CreditCard>("/creditCard", creditCard);
    return res.data;
  }
);

//Read creditCard details async method
export const fetchCreditCard = createAsyncThunk(
  "creditCard/fetch",
  async () => {
    const res = await axiosInstance.get<CreditCard[]>("/creditCard");
    return res.data;
  }
);

//Update creditCard details async method
export const updateCreditCard = createAsyncThunk(
  "creditCard/update",
  async (creditCard: CreditCard) => {
    const res = await axiosInstance.put<CreditCard>(
      `/creditCard/${creditCard.id}`,
      creditCard
    );
    return res.data;
  }
);

//Delete creditCard details async method
export const deleteCreditCard = createAsyncThunk(
  "creditCard/delete",
  async (id: string) => {
    await axiosInstance.delete(`/creditCard/${id}`);
    return id;
  }
);

const creditCardSlice = createSlice({
  name: "creditCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCreditCard.fulfilled, (state, action) => {
        state.creditCard.push(action.payload);
      })
      .addCase(fetchCreditCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreditCard.fulfilled, (state, action) => {
        state.creditCard = action.payload;
        state.loading = false;
      })
      .addCase(fetchCreditCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(updateCreditCard.fulfilled, (state, action) => {
        const index = state.creditCard.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.creditCard[index] = action.payload;
      })
      .addCase(deleteCreditCard.fulfilled, (state, action) => {
        state.creditCard = state.creditCard.filter(
          (p) => p.id.toString() !== action.payload
        );
      });
  },
});

export default creditCardSlice.reducer;

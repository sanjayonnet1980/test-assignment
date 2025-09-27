import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { TodoEntry } from "../../types/todo";

interface TodoInvState {
  todoInvDetails: TodoEntry[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TodoInvState = {
  todoInvDetails: [],
  loading: false,
  error: null,
  success: false,
};

export const fetchTodoLists = createAsyncThunk(
  "todoInvPlans/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/todoInvPlans");
      return response.data as TodoEntry[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

// ✅ Add new sell product to backend
export const addTodoInvPlans = createAsyncThunk(
  "todoInvPlans/add",
  async (data: TodoEntry, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/todoInvPlans", data);
      return response.data as TodoEntry;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Failed to add todoInvPlans"
      );
    }
  }
);

// ✅ Delete sell product by ID
export const deleteTodoInvPlans = createAsyncThunk(
  "todoInvPlans/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/todoInvPlans/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Failed to delete todoInvPlans"
      );
    }
  }
);

export const updateTodoInv = createAsyncThunk(
  "todoInvPlans/update",
  async (updatedEntry: TodoEntry, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/todoInvPlans/${updatedEntry.id}`,
        updatedEntry
      );
      return response.data as TodoEntry;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update entry"
      );
    }
  }
);

const todoInvPlanSlice = createSlice({
  name: "todoInvPlans",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
    addLocalEntry: (state, action: PayloadAction<TodoEntry>) => {
      state.todoInvDetails.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTodoLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTodoLists.fulfilled,
        (state, action: PayloadAction<TodoEntry[]>) => {
          state.todoInvDetails = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTodoLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTodoInvPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addTodoInvPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.todoInvDetails.push(action.payload);
      })
      .addCase(addTodoInvPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTodoInvPlans.fulfilled, (state, action) => {
        state.todoInvDetails = state.todoInvDetails.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(deleteTodoInvPlans.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Update
      .addCase(
        updateTodoInv.fulfilled,
        (state, action: PayloadAction<TodoEntry>) => {
          const index = state.todoInvDetails.findIndex(
            (e) => e.id === action.payload.id
          );
          if (index !== -1) {
            state.todoInvDetails[index] = action.payload;
          }
        }
      );
  },
});

export const { resetStatus, addLocalEntry } = todoInvPlanSlice.actions;
export default todoInvPlanSlice.reducer;

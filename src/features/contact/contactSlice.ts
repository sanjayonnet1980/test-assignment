import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { Contact } from "../../types/contactTypes";



interface ContactState {
  contactDetails: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  contactDetails: [],
  loading: false,
  error: null,
};

//Create contact details async method
export const addContact = createAsyncThunk(
  "contact/add",
  async (contact: Omit<Contact, "id">) => {
    const res = await axiosInstance.post<Contact>("/contact", contact);
    return res.data;
  }
);

//Read contact details async method
export const fetchContacts = createAsyncThunk("contact/fetch", async () => {
  const res = await axiosInstance.get<Contact[]>("/contact");
  return res.data;
});

//Update contact details async method
export const updateContact = createAsyncThunk(
  "contact/update",
  async (contact: Contact) => {
    const res = await axiosInstance.put<Contact>(
      `/contact/${contact.id}`,
      contact
    );
    return res.data;
  }
);

//Delete contact details async method
export const deleteContact = createAsyncThunk(
  "contact/delete",
  async (id: number) => {
    await axiosInstance.delete(`/contact/${id}`);
    return id;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContact.fulfilled, (state, action) => {
        state.contactDetails.push(action.payload);
      })
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contactDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contactDetails.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.contactDetails[index] = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contactDetails = state.contactDetails.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default contactSlice.reducer;

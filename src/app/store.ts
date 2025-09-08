import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "../features/contact/contactSlice";
import creditCardSlice from "../features/creditCard/creditCardSlice";

export const store = configureStore({
  reducer: {
    contact: contactSlice,
    creditCard: creditCardSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

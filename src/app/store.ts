import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "../features/contact/contactSlice";
import creditCardSlice from "../features/creditCard/creditCardSlice";
import montlyInvSlice from '../features/MonthlyInv/monthlyInvSlice'
import authReducer from '../features/auth/authSlice';
import wheatReducer from '../features/WheatItems/wheatSlice'
import riceReducer from '../features/WheatItems/riceSlice'
import viewReducer from '../features/WheatItems/buyWheatSlice';
import viewRiceReducer from '../features/WheatItems/buyRiceSlice';

export const store = configureStore({
  reducer: {
    contact: contactSlice,
    creditCard: creditCardSlice,
    monthlyInv: montlyInvSlice,
    auth: authReducer,
    buyWheat: wheatReducer,
    buyRice: riceReducer,
    viewWheat: viewReducer,
    viewRice: viewRiceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

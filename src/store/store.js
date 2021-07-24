// store configuration function from toolkit
import { configureStore } from "@reduxjs/toolkit";

// importing slices to combine in the reducer
import employeesDataSlice from "./employeesData-slice";

// creating store
const store = configureStore({
  reducer: employeesDataSlice.reducer,
});

// exporting store to the app
export default store;

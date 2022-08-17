import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/login/userSlice.js";
import systemSlice from "./pages/systemState/SystemSlice.js";

const store = configureStore({
  reducer: {
    admin: userReducer,
    system: systemSlice,
  },
});

export default store;

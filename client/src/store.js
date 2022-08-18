import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/login/userSlice.js";
import systemSlice from "./pages/systemState/SystemSlice.js";
import categoryReducer from "./pages/categories/categorySlice";

const store = configureStore({
  reducer: {
    admin: userReducer,
    system: systemSlice,
    category: categoryReducer,
  },
});

export default store;

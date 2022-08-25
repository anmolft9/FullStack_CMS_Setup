import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/login/userSlice.js";
import systemSlice from "./pages/systemState/SystemSlice.js";
import categoryReducer from "./pages/categories/categorySlice.js";
import paymentMethodReducer from "./pages/payment-method/pmSlice.js";

const store = configureStore({
  reducer: {
    admin: userReducer,
    system: systemSlice,
    category: categoryReducer,
    paymentMethod: paymentMethodReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";

import { authApi } from "./auth/authApi";
import { employeeApi } from "./employee/employeeApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [authApi.reducerPath]: authApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, employeeApi.middleware
    ),
});
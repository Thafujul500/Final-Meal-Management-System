import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./api/apiService";

export const store = configureStore({
  reducer: {
    // pagination: paginationReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

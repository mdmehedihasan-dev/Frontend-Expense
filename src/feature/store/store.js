import { configureStore } from '@reduxjs/toolkit';
import { expensesApi } from '../Api/expensesApi';
import { authApi } from '../Api/authApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expensesApi.middleware,authApi.middleware),
});
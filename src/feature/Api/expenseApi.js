import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'https://expense-backend-po4h.onrender.com/api/expenses';

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); 
      }
      return headers;
    },
  }),
  tagTypes: ['Expenses'],
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.category && filters.category !== 'all') {
          params.append('category', filters.category);
        }
        if (filters.startDate) {
          params.append('startDate', filters.startDate);
        }
        if (filters.endDate) {
          params.append('endDate', filters.endDate);
        }
        return `?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [...result.expenses.map(({ _id }) => ({ type: 'Expenses', id: _id })), 'Expenses']
          : ['Expenses'],
    }),
    addExpense: builder.mutation({
      query: (expenseData) => ({
        url: '/',
        method: 'POST',
        body: expenseData,
      }),
      invalidatesTags: ['Expenses'],
    }),
    updateExpense: builder.mutation({
      query: ({ id, expenseData }) => ({
        url: `${id}`,
        method: 'PATCH',
        body: expenseData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Expenses', id }],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Expenses', id }],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;

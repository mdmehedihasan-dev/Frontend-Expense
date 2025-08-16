"use client";
import { useState } from "react";
import Link from "next/link";
import TotalDisplay from "../components/TotalDisplay";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} from "../feature/Api/expensesApi";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const { data, isLoading, isFetching, error } = useGetExpensesQuery({
    category: filterCategory,
    startDate: filterStartDate,
    endDate: filterEndDate,
  });

  const [addExpense] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();

  const handleAddOrUpdateExpense = async (expenseData) => {
    try {
      if (editingExpense) {
        await updateExpense({ id: editingExpense._id, expenseData });
      } else {
        await addExpense(expenseData);
      }
      setEditingExpense(null);
    } catch (err) {
      console.error("Failed to save expense:", err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const handleEditClick = (expense) => setEditingExpense(expense);
  const handleClearEdit = () => setEditingExpense(null);

  const expenses = data?.expenses || [];
  const total = data?.total || 0;
  const isDataLoading = isLoading || isFetching;

  const getErrorMessage = () => {
    if (error?.data?.message === "Not authorized, no token") {
      return (
        <span className="ml-2">
          You are not authorized. Please{" "}
          <Link
            href="/login"
            className="font-bold underline text-indigo-700 hover:text-indigo-900 transition-colors"
          >
            login
          </Link>
        </span>
      );
    }
    return (
      <span className="ml-2">
        {error?.data?.message || "An unexpected error occurred. Please try again."}
      </span>
    );
  };

  return (
    <div className="min-h-screen  mx-auto bg-gradient-to-br from-indigo-100 via-white to-indigo-50 ">
      {/*=============== Loading Overlay ======================*/}
      {isDataLoading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white/90 p-6 rounded-2xl shadow-lg flex flex-col items-center gap-3 border border-gray-200">
            <svg
              className="animate-spin h-10 w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-gray-700 text-lg font-medium">
              Loading expenses...
            </span>
          </div>
        </div>
      )}
    
    <div className="flex-col-reverse lg:flex-row flex justify-between w-auto lg:max-w-7xl mx-auto">
        {/* ==================== Side Bar  ======================== */}
       <div className=" w-auto lg:w-1/3 block lg:sticky  p-8">
          <Sidebar
            expenses={expenses}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterStartDate={filterStartDate}
            setFilterStartDate={setFilterStartDate}
            filterEndDate={filterEndDate}
            setFilterEndDate={setFilterEndDate}
          />
        </div>

      {/* ==================== Main Content Area ======================== */}
      <div className="w-auto p-8 ">
        <div className="sticky top-8 z-50 w-full mb-8">
          <div className="   border-white/20 rounded-3xl  p-6 text-center">
            <TotalDisplay total={total} />
          </div>
        </div>

        {/* ================== Expense Form ============== */}
        <div className="w-full mt-1 lg:mt-14">
          <ExpenseForm
            onSubmit={handleAddOrUpdateExpense}
            initialData={editingExpense}
            onClearEdit={handleClearEdit}
          />
        </div>

        {/* =============== Expense List ============== */}
        {!isDataLoading && !error && (
          <div className="w-full mt-8">
            <ExpenseList
              expenses={expenses}
              onEdit={handleEditClick}
              onDelete={handleDeleteExpense}
            />
          </div>
        )}
          {error && (
        <div className=" border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm  w-full ">
          <strong className="font-semibold">Error!</strong>
          {getErrorMessage()}
        </div>
      )}
      </div>
  </div>
    </div>
  );
}
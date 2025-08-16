"use client";
import React, { useState, useEffect } from "react";

const ExpenseForm = ({ onSubmit, initialData, onClearEdit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAmount(initialData.amount);
      setCategory(initialData.category);
      setDate(
        initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : ""
      );
    } else {
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || parseFloat(amount) <= 0 || !category || !date) {
      alert("Please fill in all fields correctly.");
      return;
    }

    onSubmit({ title, amount: parseFloat(amount), category, date });
    onClearEdit();
  };

  const handleClear = () => {
    onClearEdit();
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4   bg-gradient-to-br from-indigo-50 to-pink-50 p-6 rounded-2xl shadow-xl w-full max-w-4xl mb-8 transition-transform hover:scale-[1.01] border border-indigo-100"
    >
      <div className="col-span-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {initialData ? "Edit Expense" : "Add New Expense"}
        </h2>
      </div>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength="3"
        />
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="col-span-full flex justify-end space-x-4 mt-4">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1e2939]  focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          {initialData ? "Update Expense" : "Add Expense"}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;

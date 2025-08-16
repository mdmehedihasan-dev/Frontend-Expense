"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import ExpenseChart from "./ExpenseChart";
import { logout } from "@/feature/slice/authSlice";

export default function Sidebar({
  expenses,
  filterCategory,
  setFilterCategory,
  filterStartDate,
  setFilterStartDate,
  filterEndDate,
  setFilterEndDate,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg mt-0 lg:mt-24 border border-white/20 rounded-3xl shadow-xl p-3 md:p-6 sm:p-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight mb-6">
          Filter Expenses
        </h2>
        <div>
          {/*====================== Category ====================*/}
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              id="category-filter"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Others">Others</option>
            </select>
          </div>
          {/* ================= Start Date ==================== */}
          <div>
            <label htmlFor="start-date-filter" className="block text-sm font-medium text-gray-600">
              Start Date
            </label>
            <input
              type="date"
              id="start-date-filter"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
            />
          </div>
          {/* ====================End Date=============== */}
          <div>
            <label htmlFor="end-date-filter" className="block text-sm font-medium text-gray-600">
              End Date
            </label>
            <input
              type="date"
              id="end-date-filter"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* ======================Chart Section ===================*/}
      <div className="flex-1 min-w-0 mt-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight mb-6">
          Expense Chart
        </h2>
        <ExpenseChart expenses={expenses} />
      </div>

    </div>
  );
}

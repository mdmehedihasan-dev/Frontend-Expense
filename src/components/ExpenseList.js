import React from "react";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "Food":
        return "bg-yellow-100 text-yellow-800";
      case "Transport":
        return "bg-blue-100 text-blue-800";
      case "Shopping":
        return "bg-purple-100 text-purple-800";
      case "Entertainment":
        return "bg-green-100 text-green-800";
      case "Bills":
        return "bg-red-100 text-red-800";
      case "Healthcare":
        return "bg-teal-100 text-teal-800";
      case "Others":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-pink-50 p-3 lg:p-6 rounded-2xl  shadow-xl w-full max-w-4xl mb-8 transition-transform hover:scale-[1.01] border border-indigo-100">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Expense List
      </h2>
      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">
          No expenses added yet. Start adding some!
        </p>
      ) : (
        <div> 
          {/*================ Desktop Table ============== */}
          <div className="hidden sm:block" >
            <div className="overflow-x-auto">
              <table className="min-w-full  divide-gray-200">
                <thead className="bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                    >
                      Title
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-50 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map((expense) => (
                    <tr key={expense._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {expense.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadgeColor(
                            expense.category
                          )}`}
                        >
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${expense.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => onEdit(expense)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3 p-1 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out"
                          title="Edit Expense"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-pencil-line"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            <path d="m15 5 3 3" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDelete(expense._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out"
                          title="Delete Expense"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-trash-2"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
               {/*================ Mobile  Card  ============== */}
          <div className="block sm:hidden">
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="bg-white shadow-md rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between"
                >
                  <div className="flex flex-col sm:flex-row sm:space-x-6">
                    <div className="flex items-center gap-x-2">
                      <p className="font-semibold text-gray-500 text-sm">
                        Date:
                      </p>
                      <div className="text-gray-900">
                        {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <p className="font-semibold text-gray-500 text-sm">
                        Title:
                      </p>
                      <div className="text-gray-900">{expense.title}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-500 text-sm">
                        Category:
                      </span>
                      <div
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadgeColor(
                          expense.category
                        )}`}
                      >
                        {expense.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <p className="font-semibold text-gray-500 text-sm">
                        Amount:
                      </p>
                      <div className="text-gray-900">
                        ${expense.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex space-x-3">
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-gray-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(expense._id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-gray-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;

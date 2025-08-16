import React from 'react';

const TotalDisplay = ({ total }) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1e2939] text-white px-8 py-4 rounded-2xl shadow-xl border border-white/10 w-full max-w-lg text-center">
      <h2 className="text-lg sm:text-xl font-semibold tracking-wide opacity-90">
        Personal Expense Tracker
      </h2>
      <h2 className="text-2xl sm:text-3xl font-bold mt-1">
        Total Expenses:{' '}
        <span className="text-pink-400">${total.toFixed(2)}</span>
      </h2>
    </div>
  );
};

export default TotalDisplay;

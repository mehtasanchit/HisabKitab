import React from "react";
import moment from "moment";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

const TransactionItem = ({ transaction, onDelete }) => {
  const isIncome = transaction.type === "income";
  const icon = transaction.icon || (isIncome ? "💰" : "💸");

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200/50 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
          isIncome ? "bg-green-100" : "bg-red-100"
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">
            {isIncome ? transaction.source : transaction.category}
          </h4>
          <p className="text-sm text-gray-500">
            {moment(transaction.date).format("MMM DD, YYYY")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 ${isIncome ? "text-green-600" : "text-red-600"}`}>
            {isIncome ? (
              <HiArrowUp className="text-xl" />
            ) : (
              <HiArrowDown className="text-xl" />
            )}
            <span className={`font-bold text-lg ${isIncome ? "text-green-600" : "text-red-600"}`}>
              {isIncome ? "+" : "-"}₹{transaction.amount?.toLocaleString()}
            </span>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(transaction._id)}
              className="ml-4 text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;


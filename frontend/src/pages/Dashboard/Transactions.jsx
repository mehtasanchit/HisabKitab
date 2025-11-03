import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TransactionItem from "../../components/common/TransactionItem";
import { API_PATHS } from "../../services/ApiPaths";
import axiosInstance from "../../services/AxiosInstance";
import toast from "react-hot-toast";
import moment from "moment";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, income, expense

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const [incomeResponse, expenseResponse] = await Promise.all([
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE),
      ]);

      const incomeTransactions = incomeResponse.data.map((t) => ({
        ...t,
        type: "income",
      }));
      const expenseTransactions = expenseResponse.data.map((t) => ({
        ...t,
        type: "expense",
      }));

      const allTransactions = [...incomeTransactions, ...expenseTransactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTransactions(allTransactions);
    } catch (error) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      const path =
        type === "income"
          ? API_PATHS.INCOME.DELETE_INCOME(id)
          : API_PATHS.EXPENSE.DELETE_EXPENSE(id);
      await axiosInstance.delete(path);
      toast.success("Transaction deleted successfully");
      fetchTransactions();
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  };

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
    const date = moment(transaction.date).format("MMMM DD, YYYY");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">All Transactions</h1>
          <p className="text-gray-600">View and manage all your financial transactions</p>
        </div>

        {/* Filter and Stats */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("income")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "income"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setFilter("expense")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "expense"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Expense
              </button>
            </div>
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-xs text-gray-500">Total Income</p>
                <p className="text-lg font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total Expense</p>
                <p className="text-lg font-bold text-red-600">₹{totalExpense.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Balance</p>
                <p className="text-lg font-bold text-gray-800">
                  ₹{(totalIncome - totalExpense).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        {loading ? (
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
            <p className="text-gray-500 text-center py-8">Loading...</p>
          </div>
        ) : Object.keys(groupedTransactions).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedTransactions).map(([date, transactions]) => (
              <div key={date} className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{date}</h3>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <TransactionItem
                      key={transaction._id}
                      transaction={transaction}
                      onDelete={(id) => handleDelete(id, transaction.type)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
            <p className="text-gray-500 text-center py-8">No transactions found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Transactions;


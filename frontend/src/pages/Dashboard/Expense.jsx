import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseForm from "../../components/forms/ExpenseForm";
import TransactionItem from "../../components/common/TransactionItem";
import { API_PATHS } from "../../services/ApiPaths";
import axiosInstance from "../../services/AxiosInstance";
import toast from "react-hot-toast";
import { HiArrowDown } from "react-icons/hi";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      setExpenses(response.data);
    } catch (error) {
      toast.error("Failed to load expense data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success("Expense deleted successfully");
      fetchExpenses();
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Expenses</h1>
          <p className="text-gray-600">Track your spending</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-1">
            <ExpenseForm onSuccess={fetchExpenses} />
          </div>

          {/* Expense List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">All Expenses</h3>
                <div className="flex items-center gap-2 text-red-600">
                  <HiArrowDown className="text-xl" />
                  <span className="font-bold text-lg">₹{totalExpense.toLocaleString()}</span>
                </div>
              </div>

              {loading ? (
                <p className="text-gray-500 text-center py-8">Loading...</p>
              ) : expenses.length > 0 ? (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {expenses.map((expense) => (
                    <TransactionItem
                      key={expense._id}
                      transaction={{ ...expense, type: "expense" }}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No expense records yet. Add your first expense!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Expense;

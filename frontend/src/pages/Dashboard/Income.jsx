import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeForm from "../../components/forms/IncomeForm";
import TransactionItem from "../../components/common/TransactionItem";
import { API_PATHS } from "../../services/ApiPaths";
import axiosInstance from "../../services/AxiosInstance";
import toast from "react-hot-toast";
import { HiArrowUp } from "react-icons/hi";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncomes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      setIncomes(response.data);
    } catch (error) {
      toast.error("Failed to load income data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income?")) return;

    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      toast.success("Income deleted successfully");
      fetchIncomes();
    } catch (error) {
      toast.error("Failed to delete income");
    }
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Income</h1>
          <p className="text-gray-600">Manage your income sources</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-1">
            <IncomeForm onSuccess={fetchIncomes} />
          </div>

          {/* Income List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">All Income</h3>
                <div className="flex items-center gap-2 text-green-600">
                  <HiArrowUp className="text-xl" />
                  <span className="font-bold text-lg">₹{totalIncome.toLocaleString()}</span>
                </div>
              </div>

              {loading ? (
                <p className="text-gray-500 text-center py-8">Loading...</p>
              ) : incomes.length > 0 ? (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {incomes.map((income) => (
                    <TransactionItem
                      key={income._id}
                      transaction={{ ...income, type: "income" }}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No income records yet. Add your first income!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Income;

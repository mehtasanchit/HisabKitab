import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatCard from "../../components/common/StatCard";
import TransactionItem from "../../components/common/TransactionItem";
import IncomeExpenseChart from "../../components/common/IncomeExpenseChart";
import CategoryChart from "../../components/common/CategoryChart";
import { API_PATHS } from "../../services/ApiPaths";
import axiosInstance from "../../services/AxiosInstance";
import { HiCurrencyDollar, HiArrowUp, HiArrowDown, HiTrendingUp } from "react-icons/hi";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setDashboardData(response.data);
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error(error);
      // Set default empty data structure so UI still renders
      setDashboardData({
        totalBalance: 0,
        totalIncome: 0,
        totalExpenses: 0,
        last30DaysExpenses: { total: 0, transactions: [] },
        last60DaysIncome: { total: 0, transactions: [] },
        recentTransactions: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Default data structure if no data loaded yet
  const data = dashboardData || {
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    last30DaysExpenses: { total: 0, transactions: [] },
    last60DaysIncome: { total: 0, transactions: [] },
    recentTransactions: [],
  };

  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-nowrap">
          <button
            onClick={() => navigate("/income")}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <HiArrowUp className="text-xl" />
            ADD INCOME
          </button>
          <button
            onClick={() => navigate("/expense")}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <HiArrowDown className="text-xl" />
            ADD EXPENSE
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Balance"
            value={`₹${(data.totalBalance || 0).toLocaleString()}`}
            icon={HiCurrencyDollar}
            bgColor="bg-blue-100"
            textColor="text-blue-600"
          />
          <StatCard
            title="Total Income"
            value={`₹${(data.totalIncome || 0).toLocaleString()}`}
            icon={HiArrowUp}
            bgColor="bg-green-100"
            textColor="text-green-600"
          />
          <StatCard
            title="Total Expenses"
            value={`₹${(data.totalExpenses || 0).toLocaleString()}`}
            icon={HiArrowDown}
            bgColor="bg-red-100"
            textColor="text-red-600"
          />
          <StatCard
            title="Last 30 Days Expenses"
            value={`₹${(data.last30DaysExpenses?.total || 0).toLocaleString()}`}
            icon={HiTrendingUp}
            bgColor="bg-purple-100"
            textColor="text-purple-600"
            subText="30 days period"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeExpenseChart
            incomeData={data.last60DaysIncome?.transactions || []}
            expenseData={data.last30DaysExpenses?.transactions || []}
          />
          <CategoryChart
            data={data.last30DaysExpenses?.transactions || []}
            title="Expense Categories (Last 30 Days)"
          />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
          {data.recentTransactions?.length > 0 ? (
            <div className="space-y-3">
              {data.recentTransactions.map((transaction) => (
                <TransactionItem key={transaction._id} transaction={transaction} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No transactions yet. Start by adding some income or expenses!</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
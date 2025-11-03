import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";

const IncomeExpenseChart = ({ incomeData, expenseData }) => {
  // Prepare data for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = moment().subtract(6 - i, "days");
    return {
      date: date.format("MMM DD"),
      fullDate: date.format("YYYY-MM-DD"),
      income: 0,
      expense: 0,
    };
  });

  // Aggregate income data
  incomeData?.forEach((item) => {
    const date = moment(item.date).format("YYYY-MM-DD");
    const dayData = last7Days.find((d) => d.fullDate === date);
    if (dayData) {
      dayData.income += item.amount;
    }
  });

  // Aggregate expense data
  expenseData?.forEach((item) => {
    const date = moment(item.date).format("YYYY-MM-DD");
    const dayData = last7Days.find((d) => d.fullDate === date);
    if (dayData) {
      dayData.expense += item.amount;
    }
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Last 7 Days Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={last7Days}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#fff", 
              border: "1px solid #e5e7eb",
              borderRadius: "8px"
            }} 
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="income" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Income"
            dot={{ fill: "#10b981", r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="expense" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Expense"
            dot={{ fill: "#ef4444", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;


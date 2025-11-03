import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const CategoryChart = ({ data, title }) => {
  // Aggregate expenses by category
  const categoryData = {};
  data?.forEach((item) => {
    const category = item.category || item.source || "Other";
    categoryData[category] = (categoryData[category] || 0) + item.amount;
  });

  const chartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#8b5cf6", "#10b981", "#ef4444", "#f59e0b", 
    "#3b82f6", "#ec4899", "#14b8a6", "#f97316"
  ];

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-500 text-center py-8">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#fff", 
              border: "1px solid #e5e7eb",
              borderRadius: "8px"
            }}
            formatter={(value) => `₹${value.toLocaleString()}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;


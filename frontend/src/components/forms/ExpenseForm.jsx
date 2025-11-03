import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import Input from "../inputs/input";
import { API_PATHS } from "../../services/ApiPaths";
import axiosInstance from "../../services/AxiosInstance";
import toast from "react-hot-toast";

const ExpenseForm = ({ onSuccess }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [icon, setIcon] = useState("💸");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount: parseFloat(amount),
        date,
        icon,
      });

      toast.success("Expense added successfully!");
      setCategory("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
      setIcon("💸");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Expense</h3>
      
      <div className="mb-4 relative">
        <label className="text-[13px] text-slate-800 mb-2 block">Icon</label>
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-4xl p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {icon}
        </button>
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute z-10 mt-2">
            <EmojiPicker onEmojiClick={(emojiData) => {
              setIcon(emojiData.emoji);
              setShowEmojiPicker(false);
            }} />
          </div>
        )}
      </div>

      <Input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        label="Expense Category"
        placeholder="e.g., Food, Rent, Groceries, Transport"
        type="text"
      />

      <Input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />

      <div className="mb-4">
        <label className="text-[13px] text-slate-800 mb-2 block">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-box w-full"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading || !category || !amount}
        className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;


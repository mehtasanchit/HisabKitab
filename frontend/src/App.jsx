import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Transactions from "./pages/Dashboard/Transactions";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";
import UserProvider from "./context/UseContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/dashboard/transactions" element={<Transactions />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
      </div>
    </UserProvider>
  );
}

export default App;

const Root = () => {
  const isAuthenticated = localStorage.getItem("token");

  // redirect to dashboard if user is authenticated or take him to login page if not
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

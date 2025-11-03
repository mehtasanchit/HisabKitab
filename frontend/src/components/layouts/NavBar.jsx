import React from "react";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";

const Navbar = ({ activeMenu, toggleMenu, openSideMenu }) => {
  return (
    <div className="flex items-center gap-5 bg-white border-b border-gray-200/50 p-4 shadow-sm">
      <button className="text-2xl" onClick={toggleMenu}>
        {openSideMenu ? (
          <HiOutlineX className="text-gray-600" />
        ) : (
          <HiOutlineMenu className="text-gray-600" />
        )}
      </button>
      <h2 className="text-xl font-semibold text-gray-800">HISAB KITAB - Expense Tracker</h2>
    </div>
  );
};

export default Navbar;


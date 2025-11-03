import React from "react";
import { NavLink } from "react-router-dom";
import {SIDE_MENU_DATA} from "../../utils/Data";

const SideMenu = ({ activeMenu }) => {
  return (
    <div className="w-full p-4 flex flex-col gap-2">
      {SIDE_MENU_DATA.map((menu) => (
        <NavLink
          key={menu.id}
          to={menu.path}
          end={menu.path === "/dashboard" || menu.path === "/income" || menu.path === "/expense"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium transition-all duration-200 ${
              isActive
                ? "bg-purple-600 text-white shadow-md"
                : "hover:bg-gray-100"
            }`
          }
        >
          {React.createElement(menu.icon, { className: "text-xl" })}
          {menu.label}
        </NavLink>
      ))}
    </div>
  );
};

export default SideMenu;





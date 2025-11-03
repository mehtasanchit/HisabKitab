import React, { useState } from "react";
import Navbar from "../layouts/NavBar";
import SideMenu from "../layouts/SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(true);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar
        activeMenu={activeMenu}
        toggleMenu={() => setOpenSideMenu(!openSideMenu)}
        openSideMenu={openSideMenu}
      />

      {/* Layout Body */}
      <div className="flex flex-1 bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        {openSideMenu && (
          <div className="w-60 bg-white border-r border-gray-200/50 shadow-md overflow-y-auto">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {children || <div className="text-gray-500">No content available</div>}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;


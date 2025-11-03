import React, { useContext } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UseContext";
import { useNavigate } from "react-router-dom";
import { HiCog, HiLogout, HiShieldCheck, HiBell, HiColorSwatch } from "react-icons/hi";
import toast from "react-hot-toast";

const Settings = () => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      clearUser();
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  const settingsOptions = [
    {
      id: 1,
      title: "Notifications",
      description: "Manage your notification preferences",
      icon: HiBell,
      onClick: () => toast.info("Notification settings coming soon!"),
    },
    {
      id: 2,
      title: "Privacy & Security",
      description: "Manage your privacy and security settings",
      icon: HiShieldCheck,
      onClick: () => toast.info("Privacy settings coming soon!"),
    },
    {
      id: 3,
      title: "Appearance",
      description: "Customize the app appearance",
      icon: HiColorSwatch,
      onClick: () => toast.info("Appearance settings coming soon!"),
    },
    {
      id: 4,
      title: "About",
      description: "Learn more about the app",
      icon: HiCog,
      onClick: () => toast.info("Finance Tracker App v1.0.0"),
    },
  ];

  return (
    <DashboardLayout activeMenu="Settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your app preferences</p>
        </div>

        <div className="space-y-4 max-w-2xl">
          {settingsOptions.map((option) => (
            <div
              key={option.id}
              onClick={option.onClick}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <option.icon className="text-2xl text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Logout Button */}
          <div
            onClick={handleLogout}
            className="bg-red-50 rounded-xl p-6 shadow-md border border-red-200 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <HiLogout className="text-2xl text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800">Logout</h3>
                <p className="text-sm text-red-500">Sign out of your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;


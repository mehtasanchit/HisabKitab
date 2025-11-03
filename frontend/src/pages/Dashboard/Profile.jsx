import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UseContext";
import { API_PATHS } from "../../services/ApiPaths";
import axiosInstance from "../../services/AxiosInstance";
import toast from "react-hot-toast";
import { HiUser, HiMail, HiCalendar } from "react-icons/hi";
import moment from "moment";

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      updateUser(response.data);
    } catch (error) {
      toast.error("Failed to load user information");
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserInfo();
    }
  }, []);

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
          <p className="text-gray-600">Your account information</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50 max-w-2xl">
          {user ? (
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex justify-center">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-200">
                    <HiUser className="text-6xl text-purple-600" />
                  </div>
                )}
              </div>

              {/* User Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <HiUser className="text-xl text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-lg font-semibold text-gray-800">{user.fullName || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <HiMail className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-800">{user.email || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <HiCalendar className="text-xl text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {user.createdAt
                        ? moment(user.createdAt).format("MMMM DD, YYYY")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading profile information...</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;


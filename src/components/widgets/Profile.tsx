import React, { useEffect } from "react";
import { auth } from "../hooks/firebase";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";

const Profile: React.FC = () => {
  const { userDetails, isLoading, fetchUserData } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (confirmLogout) {
      await auth.signOut();
      navigate("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LuLoader2 className="animate-spin h-12 w-12 text-green-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          {userDetails?.photoURL ? (
            <img
              src={userDetails.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-green-400 object-cover"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400" />
          )}
        </div>

        {/* User Name */}
        <h1 className="text-xl font-semibold text-gray-800">
          {userDetails?.displayName ||
            `${userDetails?.first_name || ""} ${userDetails?.last_name || ""}`.trim() ||
            "User"}
        </h1>

        {/* User Email */}
        <p className="text-gray-500 text-sm">{userDetails?.email || "No email available"}</p>


        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200 w-full"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;

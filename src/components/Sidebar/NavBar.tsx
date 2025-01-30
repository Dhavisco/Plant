import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiPlantWatering } from 'react-icons/gi';
import { FaHome, FaSeedling, FaBell, FaCog, FaUser, FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa';
import { auth, db } from '../hooks/firebase'; // Import Firebase auth and Firestore
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const NavBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<{
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    firstName?: string;
    lastName?: string;
  } | null>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Basic details from Firebase Authentication
        const { displayName, email, photoURL, uid } = user;

        // Fetch additional details from Firestore for email/password users
        if (!displayName || !photoURL) {
          const userDoc = await getDoc(doc(db, 'Users', uid));
          if (userDoc.exists()) {
            const firestoreData = userDoc.data();
            setUser({
              displayName: displayName || firestoreData.displayName,
              email: email || firestoreData.email,
              photoURL: photoURL || firestoreData.photoURL,
              firstName: firestoreData.first_name,
              lastName: firestoreData.last_name,
            });
          } else {
            // No Firestore data found
            setUser({
              displayName: displayName || email || 'User',
              email,
              photoURL: photoURL || null,
            });
          }
        } else {
          // Google Sign-In user
          setUser({
            displayName,
            email,
            photoURL,
          });
        }
      } else {
        setUser(null); // No user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleNavToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Sidebar for Desktop */}
      <aside
        className={`hidden lg:flex flex-col justify-between bg-green-600 rounded-lg text-white ${
          isCollapsed ? 'w-16' : 'w-64'
        } h-screen transition-all duration-300`}
      >
        <div>
          {/* Logo */}
          <div
            className={`flex items-center p-4 hover:cursor-pointer ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <GiPlantWatering className="text-white w-10 h-10" />
            {!isCollapsed && <h2 className="text-3xl font-bold ml-1">Plant</h2>}
          </div>

          {/* Navigation */}
          <nav className={`mt-8 ${isCollapsed ? 'space-y-4' : ''}`}>
            <Link
              to="/dashboard"
              className={`flex items-center py-2 px-4 rounded hover:bg-green-700 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <FaHome className="mr-3" />
              {!isCollapsed && 'Dashboard'}
            </Link>
            <Link
              to="/crops"
              className={`flex items-center py-2 px-4 rounded hover:bg-green-700 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <FaSeedling className="mr-3" />
              {!isCollapsed && 'Crops'}
            </Link>
            <Link
              to="/alerts"
              className={`flex items-center py-2 px-4 rounded hover:bg-green-700 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <FaBell className="mr-3" />
              {!isCollapsed && 'Message Alerts'}
            </Link>
            <Link
              to="/settings"
              className={`flex items-center py-2 px-4 rounded hover:bg-green-700 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <FaCog className="mr-3" />
              {!isCollapsed && 'Settings'}
            </Link>
            <Link
              to="/profile"
              className={`flex items-center py-2 px-4 rounded hover:bg-green-700 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <FaUser className="mr-3" />
              {!isCollapsed && 'Profile'}
            </Link>
          </nav>
        </div>

        {/* Minimize/Expand Toggle */}
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center py-2 px-4 hover:cursor-pointer hover:font-medium"
            onClick={handleNavToggle}
          >
            {isCollapsed ? (
              <FaChevronRight className="text-white" />
            ) : (
              <FaChevronLeft className="text-white mr-3" />
            )}
            {!isCollapsed && 'Minimize Menu'}
          </button>

          {/* User Info */}
          {user && (
            <div className={`p-4 border-t border-green-500 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="flex items-center">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full border-2 border-white"
                  />
                ) : (
                  <FaUserCircle className="w-9 h-9 text-white" /> // Fallback avatar
                )}
                {!isCollapsed && (
                  <div className="ml-2">
                    <p className="font-semibold">
                      {user.displayName || `${user.firstName || ''} ${user.lastName || ''}` || 'User'}
                    </p>
                    <p className="text-sm text-green-200">{user.email}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

    
    </>
  );
};

export default NavBar;
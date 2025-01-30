import React, { useEffect, useState } from "react";
import { auth, db } from "./hooks/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu"; // Import a loading spinner icon

const Profile: React.FC = () => {
  interface UserDetails {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    displayName?: string;
    photoURL?: string;
  }

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;

          // Fetch data from Firestore
          const docRef = doc(db, "Users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // Merge Firestore data with Google Auth data
            const firestoreData = docSnap.data();
            setUserDetails({
              ...firestoreData,
              email: email || firestoreData.email,
              displayName: displayName || firestoreData.displayName,
              photoURL: photoURL || firestoreData.photoURL,
            } as UserDetails);
            console.log("User data from Firestore:", firestoreData);
          } else {
            // If no Firestore data exists for this user, save Google Sign-In details
            const defaultData: UserDetails = {
              email: email || undefined,
              displayName: displayName || undefined,
              photoURL: photoURL || undefined,
            };

            await setDoc(docRef, defaultData); // Save default data to Firestore
            setUserDetails(defaultData); // Update state with default data
            console.log("Created new Firestore document for the user:", defaultData);
          }
        } else {
          console.log("User is not logged in");
          navigate("/login"); // Redirect to login if not logged in
        }
        setIsLoading(false); // Set loading to false after data is fetched
      });
    };

    fetchUserData();
  }, [navigate]);

  async function handleLogout() {
    await auth.signOut();
    console.log("User logged out");
    navigate("/login");
  }

  const userName = userDetails?.first_name + " " + userDetails?.last_name;

  // Show a loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <LuLoader2 className="animate-spin h-12 w-12 text-green-600" />
      </div>
    );
  }

  return (
    <div className="profile-container p-6 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800 mb-4">
        Welcome, {userDetails?.displayName || userName || "User"}
      </h1>

      <div className="profile-details text-gray-700">
        {userDetails?.photoURL ? (
          <img
            src={userDetails.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-green-400"
          />
        ) : (
          <FaUserCircle className="w-24 h-24 text-gray-400" />
        )}
      </div>

      <div className="logout-button mt-6">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
// import React, {useEffect, useState} from 'react'
// import {auth, db} from "./hooks/firebase";
// import {doc, getDoc} from "firebase/firestore";
// import { useNavigate } from 'react-router-dom';




// const Profile: React.FC = () => {
//     interface UserDetails {
//         first_name?: string;
//         last_name?: string;
//         email?: string;
//         phone_number?: string;
//     }

//     interface User {
//         uid?: string;
//         email?: string | null;
//         displayName?: string | null;
//         photoURL?: string | null;
//     }

//     const [userDetails, setUserDetails] = useState<UserDetails | null>(null);  
//     const navigate = useNavigate();
//     const fetchUserData = async () => {
//         auth.onAuthStateChanged(async (user: User | null) => {
//             console.log(user);
//             if (user && user.uid) {
//                 const docRef = doc(db, "Users", user.uid);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists()) {
//                     setUserDetails(docSnap.data() as UserDetails);
//                     console.log(docSnap.data());
//                 } else {
//                     console.log("User document not found");
//                 }
//             } else {
//                 console.log("User is not logged in");
//             }
//         })
//     }

//     useEffect(()=>{
//         fetchUserData();
//     },[])

//     async function handleLogout() {
//         await auth.signOut();
//         console.log("User logged out");
//         navigate('/login');
//     }

//     return (
//         <>
//             <h1>Welcome {userDetails?.first_name}</h1>

//             <div>
//                 <p>Email: {userDetails?.email}</p>
//                 <p>First Name: {userDetails?.first_name}</p>
//                 <p>Last Name: {userDetails?.last_name}</p>
//             </div>
   
//             <div>
//                 <button className='bg-green-300 px-4 py-2 text-center' onClick={handleLogout}> Signout</button>
//             </div>
//         </>
//     )
// }
// export default Profile;
import React, { useEffect, useState } from "react";
import { auth, db } from "./hooks/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    });  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    await auth.signOut();
    console.log("User logged out");
    navigate("/login");
  }

  return (
    <div className="profile-container p-6 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800 mb-4">
        Welcome, {userDetails?.displayName || userDetails?.first_name  || "User"}
      </h1>

      <div className="profile-details text-gray-700">
        {/* <p>
          <span className="font-semibold">Email:</span> {userDetails?.email}
        </p> */}
        {/* <p>
          <span className="font-semibold">First Name:</span>{" "}
          {userDetails?.first_name || "Not Provided"}
        </p>
        <p>
          <span className="font-semibold">Last Name:</span>{" "}
          {userDetails?.last_name || "Not Provided"}
        </p> */}
        {userDetails?.photoURL && (
          <div className="mt-4">
            <img
              src={userDetails.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-green-400"
            />
          </div>
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

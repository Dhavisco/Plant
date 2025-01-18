import React, {useEffect, useState} from 'react'
import {auth, db} from "./hooks/firebase";
import {doc, getDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';




const Profile: React.FC = () => {
    interface UserDetails {
        first_name?: string;
        last_name?: string;
        email?: string;
        phone_number?: string;
    }

    interface User {
        uid?: string;
        email?: string | null;
        displayName?: string | null;
        photoURL?: string | null;
    }

    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);  
    const navigate = useNavigate();
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user: User | null) => {
            console.log(user);
            if (user && user.uid) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data() as UserDetails);
                    console.log(docSnap.data());
                } else {
                    console.log("User document not found");
                }
            } else {
                console.log("User is not logged in");
            }
        })
    }

    useEffect(()=>{
        fetchUserData();
    },[])

    async function handleLogout() {
        await auth.signOut();
        console.log("User logged out");
        navigate('/login');
    }

    return (
        <>
            <h1>Welcome {userDetails?.first_name}</h1>

            <div>
                <p>Email: {userDetails?.email}</p>
                <p>First Name: {userDetails?.first_name}</p>
                <p>Last Name: {userDetails?.last_name}</p>
            </div>
   
            <div>
                <button className='bg-green-300 px-4 py-2 text-center' onClick={handleLogout}> Signout</button>
            </div>
        </>
    )
}
export default Profile;

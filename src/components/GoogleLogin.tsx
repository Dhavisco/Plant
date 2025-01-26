import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuLoader2 } from 'react-icons/lu';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./hooks/firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

type GoogleLoginProps = {
  setNotification: (notification: { message: string; type: "success" | "error" }) => void;
};

const GoogleLogin: React.FC<GoogleLoginProps> = ({ setNotification }) => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const googleLogin = async () => {
    setLoading(true); // Set loading to true when the process starts
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if(result.user){
        console.log("User info:", result.user);
        setNotification({
          message: "Google sign-in successful! Redirecting...",
          type: "success",
        });
        // Simulate a redirection or further action
        setTimeout(() => {
          console.log("Redirecting user...");
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error: unknown) {
      console.error("Error during Google login:", error);
      if (error instanceof FirebaseError){
         switch (error.code) {
        case "auth/popup-closed-by-user":
          setNotification({ message: "Popup closed before completing the sign-in process.", type: "error" });
          break;
        case "auth/cancelled-popup-request":
          setNotification({ message: "Popup was canceled due to a new popup being opened.", type: "error" });
          break;
        case "auth/user-cancelled":
          setNotification({ message: "You canceled the Google sign-in. Please try again.", type: "error" });
          break;
        default:
          setNotification({ message: "An error occurred during sign-in. Please try again.", type: "error" });
      }
      }else {
    setNotification({ message: 'An unknown error occurred. Please try again', type: 'error' });
  }
     
    } finally {
      setLoading(false); // Reset loading state after the process ends
    }
  };

  return (
    <div className="google-sign flex flex-col items-center mt-5">
      <div className="text-center text-gray-600 mb-3">--Or continue with--</div>
      
      <button
    className={`flex items-center justify-center gap-3 border-2 border-green-600 rounded-lg px-4 py-2 ${
      loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-100"
    }`}
    onClick={googleLogin}
    disabled={loading} // Disable button when loading
  >
    <FcGoogle className="w-6 h-6" /> {/* Icon */}
    {loading ? (
      <LuLoader2 className="animate-spin text-green-600" />
    ) : (
      <span className="text-green-700 font-medium">Sign in with Google</span>
    )}
  </button>
    </div>
  );
};

export default GoogleLogin;

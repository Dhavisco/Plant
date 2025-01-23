import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuLoader2 } from 'react-icons/lu';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./hooks/firebase";
import { useNavigate } from "react-router-dom";

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
          navigate('/profile');
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error during Google login:", error);
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
    } finally {
      setLoading(false); // Reset loading state after the process ends
    }
  };

  return (
    <div className="google-sign flex flex-col items-center mt-5">
      <div className="text-center text-gray-600 mb-3">--Or continue with--</div>
      <button
        className={`flex gap-2 border-2 border-green-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={googleLogin}
        disabled={loading} // Disable button when loading
      >
        <span className="px-1 pt-1">
          <FcGoogle className="w-6 h-6" />
        </span>
        <span className="px-2 py-2 bg-green-600 hover:bg-green-700 text-white">
          {loading ? <div className='flex justify-center'><LuLoader2 className="animate-spin" /></div> : "Sign in with Google"}
        </span>
      </button>
    </div>
  );
};

export default GoogleLogin;

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./hooks/firebase";

const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);

  const googleLogin = async () => {
    setLoading(true); // Set loading to true when the process starts
    const provider = new GoogleAuthProvider();
     try {
      const result = await signInWithPopup(auth, provider);
      console.log("result", result)
      console.log("User info:", result.user);
      console.log("Token:", await result.user.getIdToken());
    } catch (error) {
      console.error("Error during Google login:", error);
      switch (error.code) {
        case "auth/popup-closed-by-user":
          alert("Popup closed before completing the sign-in process.");
          break;
        case "auth/cancelled-popup-request":
          alert("Popup was canceled due to a new popup being opened.");
          break;
        case "auth/user-cancelled":
         alert("You cancelled the Google sign-in. Please try again.");
         break;
        default:
          alert("An error occurred during sign-in. Please try again.");
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
        <span className="px-1 pt-2">
          <FcGoogle className="w-6 h-6" />
        </span>
        <span className="px-2 py-2 bg-green-600 hover:bg-green-700 text-white">
          {loading ? "Signing in..." : "Sign in with Google"}
        </span>
      </button>
    </div>
  );
};

export default GoogleLogin;

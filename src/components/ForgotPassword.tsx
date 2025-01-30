import React, { useState } from "react";
import { auth } from "./hooks/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox!");
      setError("");
    } catch (err: any) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="forgot-password-container p-6 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Forgot Password</h1>

      <div className="mb-4">
        <label className="block text-green-900 text-sm font-bold mb-2" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <button
        onClick={handleResetPassword}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700"
      >
        Reset Password
      </button>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <button
        onClick={() => navigate("/login")}
        className="text-green-600 hover:underline mt-4"
      >
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
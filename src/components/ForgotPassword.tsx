import React, { useState, useEffect } from "react";
import { auth } from "./hooks/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Card from "./UI/Card";
import { AiOutlineClose } from "react-icons/ai";

const ForgotPassword: React.FC = () => {
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleResetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setNotification({ message: "Password reset email sent. Check your email inbox!", type: "success" });
      setTimeout(() => navigate('/'), 4000);
    } catch (error: unknown) {
      setNotification({
        message: error instanceof Error ? error.message : "An unknown error occurred.",
        type: "error",
      });
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-50 to-white px-4">
      <Card title="Forgot Password?">
        {/* Notification Banner */}
        {notification && (
          <div
            className={`flex justify-between items-center px-4 py-2 rounded-lg mb-4 ${
              notification.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            <p className="text-sm font-medium">{notification.message}</p>
            <button onClick={() => setNotification(null)} className="text-xl">
              <AiOutlineClose />
            </button>
          </div>
        )}

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleResetPassword(values.email);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-green-900 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className={`w-full py-2 rounded-md font-medium ${
                  isSubmitting || !isValid || !dirty
                    ? "bg-green-300 text-white cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-700"
                }`}
              >
                {isSubmitting ? "Sending..." : "Reset Password"}
              </button>

              <button
                onClick={() => navigate("/login")}
                type="button"
                className="text-black font-medium hover:underline hover:text-green-500 mt-4 block mx-auto text-center"
              >
                Back to Login{" -->"}
              </button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ForgotPassword;

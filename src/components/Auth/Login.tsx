import React, { useState } from 'react';
// import { useAuth } from '../context/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { B2Home } from '../button/B2Home';
import Card from '../UI/Card';
import LoginNotification from '../UI/LoginNotification';

const Login: React.FC = () => {
  // const { login } = useAuth(); // Auth hook
  const navigate = useNavigate(); // Navigation hook
  const [apiError, setApiError] = useState<string | null>(null); // State to track API errors

  const handleRedirect = () => {
    navigate('/signup');
  };

  const notificationClose = () => {
    setApiError(null); // Close the notification
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-50 to-white px-4 sm:px-6 lg:px-8">
      
      {/* Show notification when an error occurs */}
      {apiError && (
          <LoginNotification message={apiError} onClose={notificationClose} />
        )}
      
      <Card title="Login to your account">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setApiError(null); // Clear previous errors
              // await login(values); // Use login function directly
              navigate('/dashboard'); // Redirect only on successful login
            } catch (error: unknown) {
              // Check if error is an instance of Error
              if (error instanceof Error) {
                setApiError(error.message || 'Invalid login credentials.');
              }
            } finally {
              setSubmitting(false);
            }
          }}      >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-green-900 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className={`w-full px-3 py-2 border text-sm md:text-base rounded-lg text-gray-700 focus:outline-none ${
                    touched.email && errors.email ? 'ring-1 ring-red-500' : 'focus:ring-1 focus:ring-green-500'
                  }`}
                  placeholder="Enter your email address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-green-900 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className={`w-full px-3 py-2 border text-sm md:text-base rounded-lg text-gray-700 focus:outline-none ${
                    touched.password && errors.password ? 'ring-1 ring-red-500' : 'focus:ring-1 focus:ring-green-500'
                  }`}
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

             
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </Card>

      <div className="mt-4">
        <span className="font-medium text-gray-400">Are you a new user?</span>
        <button onClick={handleRedirect} className="font-bold text-black underline ml-1 cursor-pointer hover:text-green-600">
          Create an account
        </button>
      </div>

      <B2Home />
    </div>
  );
};

export default Login;

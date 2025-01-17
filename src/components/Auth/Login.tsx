import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { B2Home } from '../button/B2Home';
import Card from '../UI/Card';
import LoginNotification from '../UI/LoginNotification';
import { LuLoader2 } from 'react-icons/lu';
import { FaCheckCircle} from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Login: React.FC = () => {
  // const { login } = useAuth(); // Auth hook
  const navigate = useNavigate(); // Navigation hook
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [progress, setProgress] = useState(100);

  const handleRedirect = () => {
    navigate('/signup');
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });


  useEffect(()=> {
    if(notification) {
      setProgress(100);
      const interval = setInterval(()=> {
        setProgress((prev)=> {
          if(prev <=0 ) {
            clearInterval(interval);
            setNotification(null)
          }
          return prev - 4
        });
      },100);
      return () => clearInterval(interval)
    }
  }, [notification])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-50 to-white px-4 sm:px-6 lg:px-8 relative">
       {notification && (
              <div className={`absolute top-4 right-4 w-80 p-4 rounded-lg shadow-lg bg-gray-100`}>
                <div className="flex justify-between items-center">
                  <span className={`font-medium text-sm lg:text-base flex items-center gap-1 text-gray-500`}>
                   {notification.type === 'success' ? <FaCheckCircle className='text-green-600 h-5 w-5'/> : <MdCancel className='text-red-600 h-5 w-5'/> } {notification.message}
                  </span>
                  <button
                    onClick={closeNotification}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    ✖
                  </button>
                </div>
                <div className="h-1 bg-gray-300 mt-2 rounded-full">
                  <div
                    className={`h-full rounded-full ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
     
      <Card title="Login to your account">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setNotification(null);
              // await login(values); // Uncomment when integrating login API
               // Simulate successful signup (replace with API call)
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setNotification({ message: 'Login successful! Redirecting...', type: 'success' });
              setTimeout(() => navigate('/dashboard'), 3000); // Redirect after 2 seconds
            } catch (error: unknown) {
              setNotification({ message: error instanceof Error ? error.message : 'Login failed.', type: 'error' });
            } finally {
              setSubmitting(false);
            }
          }}      >
          {({ isSubmitting, isValid, errors, touched }) => (
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
                className={`w-full text-center font-medium bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg focus:outline-none ${
            isSubmitting || !isValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? <div className='flex justify-center'><LuLoader2 className="animate-spin" /></div> : 'Login'}
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

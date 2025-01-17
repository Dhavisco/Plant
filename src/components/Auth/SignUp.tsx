import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Card from '../UI/Card';
import { B2Home } from '../button/B2Home';
import ProgressBar from '../UI/ProgressBar';
import { LuLoader2 } from 'react-icons/lu';
import { FaCheckCircle} from "react-icons/fa";
import { MdCancel } from "react-icons/md";

// Validation schemas for each step
const personalInfoSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
});

const accountInfoSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const contactInfoSchema = Yup.object({
  address: Yup.string().required('Address is required'),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must be digits')
    .required('Phone number is required'),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const data = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone_number: '',
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(data);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [progress, setProgress] = useState(100);

   const handleRedirect = () => {
    navigate('/login');
  };

  const handleNext = (values: typeof formData) => {
    setFormData(values);
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const signupHandler = async (values: typeof formData, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      // Simulate successful signup (replace with API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotification({ message: 'User registered successfully', type: 'success' });
      setTimeout(() => navigate('/login'), 5000); // Navigate after 5 seconds
    } catch (error) {
      setNotification({ message: 'Signup failed. Please try again.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (notification) {
      setProgress(100);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setNotification(null);
          }
          return prev - 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [notification]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-50 to-white px-4 sm:px-6 lg:px-8 relative">
      {/* Notification */}
      {notification && (
        <div className={`absolute top-4 right-4 w-80 p-4 rounded-lg shadow-lg bg-gray-100`}>
          <div className="flex justify-between items-center">
            <span className={`font-medium flex items-center gap-1 text-gray-500`}>
             {notification.type === 'success' ? <FaCheckCircle className='text-green-600 h-5 w-5'/> : <MdCancel className='text-red-600 h-5 w-5'/> } {notification.message}
            </span>
            <button
              onClick={() => setNotification(null)}
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

      {/* Main Form */}
      <Card title="Sign Up">
        <ProgressBar step={step} />
     <Formik
  initialValues={formData}
   enableReinitialize
  validationSchema={ step === 1 ? personalInfoSchema
              : step === 2 ? accountInfoSchema
              : contactInfoSchema}
  onSubmit={(values, actions) => {
    if (step < 3) {
      handleNext(values); // Move to the next step
      actions.setSubmitting(false);
    } else {
      signupHandler(values, actions.setSubmitting); // Final submission
    }
  }}
>
  {({ isSubmitting, isValid, errors, touched }) => (
    <Form>
      {step === 1 && (
        <>
          <div className="mb-2">
            <label htmlFor="first_name" className="block text-sm font-bold mb-2 text-gray-700">
              First Name
            </label>
            <Field
              name="first_name"
              type="text"
              placeholder="e.g., John"
              className={`w-full px-4 py-2 border rounded-lg ${
                touched.first_name && errors.first_name ? 'border-red-500' : ''
              }`}
            />
            {touched.first_name && errors.first_name && (
              <div className="text-red-500 text-sm mt-1">{errors.first_name}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="last_name" className="block text-sm font-bold mb-2 text-gray-700">
              Last Name
            </label>
            <Field
              name="last_name"
              type="text"
              placeholder="e.g., Doe"
              className={`w-full px-4 py-2 border rounded-lg ${
                touched.last_name && errors.last_name ? 'border-red-500' : ''
              }`}
            />
            {touched.last_name && errors.last_name && (
              <div className="text-red-500 text-sm mt-1">{errors.last_name}</div>
            )}
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-700">
              Email
            </label>
            <Field
              name="email"
              type="email"
              placeholder="e.g., john.doe@example.com"
              className={`w-full px-4 py-2 border rounded-lg ${
                touched.email && errors.email ? 'border-red-500' : ''
              }`}
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-bold mb-2 text-gray-700">
              Password
            </label>
            <Field
              name="password"
              type="password"
              placeholder="Enter a secure password"
              className={`w-full px-4 py-2 border rounded-lg ${
                touched.password && errors.password ? 'border-red-500' : ''
              }`}
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2 text-gray-700">
              Confirm Password
            </label>
            <Field
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              className={`w-full px-4 py-2 border rounded-lg ${
                touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : ''
              }`}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
            )}
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div className="mb-2">
            <label htmlFor="address" className="block text-sm font-bold mb-2 text-gray-700">
              Address
            </label>
            <Field
              name="address"
              type="text"
              placeholder="e.g., Lagos, Nigeria"
              className={`w-full px-4 py-2 border rounded-lg ${
                touched.address && errors.address ? 'border-red-500' : ''
              }`}
            />
            {touched.address && errors.address && (
              <div className="text-red-500 text-sm mt-1">{errors.address}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="phone_number" className="block text-sm font-bold mb-2 text-gray-700">
              Phone Number
            </label>
            <Field
              name="phone_number"
              type="text"
              placeholder="e.g., 2348123456789"
              className={`w-full px-4 py-2 border rounded-lg ${
                touched.phone_number && errors.phone_number ? 'border-red-500' : ''
              }`}
            />
            {touched.phone_number && errors.phone_number && (
              <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>
            )}
          </div>
        </>
      )}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button type="button" className="font-medium px-4 py-2 bg-gray-200 rounded-md" onClick={handlePrev}>
            Previous
          </button>
        )}
        <button
          type="submit"
          className={`font-medium px-4 py-2 text-white bg-green-500 rounded-md ${
            isSubmitting || !isValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? <LuLoader2 className="animate-spin" /> : step === 3 ? 'Sign Up' : 'Next'}
        </button>
      </div>
    </Form>
  )}
</Formik>


      </Card>
      <div className="mt-4">
              <span className="font-medium text-gray-400">Already an existing user?</span>
              <button onClick={handleRedirect} className="font-bold text-black underline ml-1 cursor-pointer hover:text-green-600">
                SignIn
              </button>
            </div>
      
            <B2Home />
    </div>
  );
};

export default SignUp;

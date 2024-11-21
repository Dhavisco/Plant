import React from 'react';
import { Link } from 'react-router-dom';
import { FaCloudSun, FaLeaf, FaBell } from 'react-icons/fa';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-center">
      {/* Hero Section */}
      <header className="bg-green-600 text-white w-full py-12">
        <h1 className="text-4xl font-bold">Farmer's Decision Support System</h1>
        <p className="mt-4 text-lg">Empowering Farmers with Data-Driven Insights</p>
        <div className="mt-8">
          <Link to="/signup">
            <button className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold mr-4 hover:bg-gray-200">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700">
              Log In
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-12 lg:px-24">
        <h2 className="text-3xl font-bold mb-6">Key Features</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center max-w-xs">
            <FaCloudSun size={40} className="text-green-600 mb-4" />
            <h3 className="text-xl font-semibold">Weather Forecasting</h3>
            <p className="mt-2 text-gray-600">
              Accurate weather updates to help you plan your farming activities.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center max-w-xs">
            <FaLeaf size={40} className="text-green-600 mb-4" />
            <h3 className="text-xl font-semibold">Crop Recommendations</h3>
            <p className="mt-2 text-gray-600">
              Get personalized crop advice based on your location and weather.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center max-w-xs">
            <FaBell size={40} className="text-green-600 mb-4" />
            <h3 className="text-xl font-semibold">Alerts & Notifications</h3>
            <p className="mt-2 text-gray-600">
              Stay informed with real-time alerts for weather and crop actions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Additional CTA */}
      <footer className="w-full py-6 bg-green-600 text-white">
        <p className="text-sm">Ready to optimize your farming decisions?</p>
        <Link to="/signup" className="text-white underline font-semibold">
          Get Started Today
        </Link>
      </footer>
    </div>
  );
};

export default LandingPage;

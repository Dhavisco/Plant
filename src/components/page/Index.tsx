import React from 'react';
import { Link } from 'react-router-dom';
import { FaCloudSun, FaLeaf, FaBell } from 'react-icons/fa';
import { GiButterflyFlower, GiPlantSeed, GiPlantWatering } from "react-icons/gi";
import Typewriter from "typewriter-effect";
import './Home.css'

const LandingPage: React.FC = () => {

  const description = 'Empowering Farmers with Data-Driven Insights';
  return (
    <div className="bg-gray-50 flex flex-col items-center text-center">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-transparent shadow-md lg:py-6 py-4 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-green-600 text-3xl font-bold font-serif">
          <GiPlantWatering className='md:h-10 w-auto text-yellow-500 inline mr-2'/>
          <span className='text-base md:text-xl lg:text-3xl'>Plant</span>
            
          </Link>
          <div className="md:space-x-6 space-x-4 text-xs md:text-base font-[Manrope] font-medium tracking-wider ">
            <Link to="/login" className="text-white hover:underline">
              Log In
            </Link>
            <Link to="/signup" className="bg-transparent border-white border-[1px] border-solid text-white px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-white hover:scale-x-125 hover:text-black transition duration-300 ease-in-out transform">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero lg:h-screen text-white py-12 w-full pt-24">
        <div className="hero-content flex flex-col items-start lg:mx-36 ml-6 my-24">
          <p className="font-[Manrope] text-sm tracking-wider mb-3">WELCOME TO PLANT <GiPlantSeed className='inline h-6 w-auto text-yellow-500'/> </p>
          <div className="lg:text-7xl text-left text-4xl flex flex-col font-bold title">
            <span>A</span>
            <span>Farmer's Decision</span>
            <span className=''> Support System </span>
            </div>
          <p className="mt-4 text-sm font-light lg:text-base font-[Manrope] tracking-wider">
            <Typewriter
        options={{ loop: true }}
        onInit={(typewriter) => {
        typewriter
          .typeString(description)
          .pauseFor(5000) // Pause before deleting
          .deleteAll()
          .start();
      }}
  />
            </p>
          <div className="mt-8">
            <Link to="/signup">
              <button className="bg-green-700 font-[Manrope] text-white text-sm px-6 py-3 rounded-md font-medium hover:bg-green-800 transition duration-200 ease-in-out transform">
                Discover More
              </button>
            </Link>
            <GiButterflyFlower className='inline w-auto h-10 ml-4 text-yellow-500 font-light rotate-10 hover:scale-125 transition duration-300 ease-in-out transform'/>
            {/* <Link to="/login">
              <button className="border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700">
                Log In
              </button>
            </Link> */}
          </div>
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

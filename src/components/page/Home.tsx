import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../../assets/homeimg.avif";
import Logo from '../icons/Logo';
import Preloader from '../UI/Preloader';
import './Home.css'

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true); 
  const [fadeIn, setFadeIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loginHandler = () => {
    navigate('/login');
  };

  const registerHandler = () => {
    navigate('/register');
  };

  // Show Preloader while loading
  if (loading) {
    return <Preloader />;
  }

  return (
    <div
      className={`flex flex-col items-center lg:py-5 justify-center gap-8 lg:gap-0 lg:justify-around min-h-screen bg-green-100 fade-t transition-opacity duration-500 ease-in-out ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
      
    >
      <div className="md:w-full flex justify-center max-w-md p-2 bg-white shadow-md rounded-lg text-center">
        <img
          src={img}
          alt="Homepage Illustration"
          loading="lazy"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        />
      </div>

      <div className="flex flex-col gap-6 lg:gap-2 p-6 px-7">
        <div className="flex justify-center">
          <div className="w-16 h-16 lg:h-[6rem] lg:w-[6rem]">
            <Logo />
          </div>
        </div>
        <div className="text-3xl font-medium md:text-center">Secure your financial future with us.</div>
        <div className="text-gray-500 lg:text-center">
          Your financial future, our priority. Secure your finances with your trusted services.
        </div>
        <div className="flex justify-center font-bold mt-3 gap-4">
          <button
            onClick={loginHandler}
            className="bg-black text-white rounded-3xl py-3 px-10 hover:shadow-xl"
          >
            Login
          </button>
          <button
            onClick={registerHandler}
            className="bg-white text-black rounded-3xl py-3 px-10 hover:shadow-xl"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


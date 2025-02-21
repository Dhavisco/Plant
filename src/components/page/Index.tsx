import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiButterflyFlower, GiPlantSeed, GiPlantWatering, GiFruitBowl, GiNigeria } from "react-icons/gi";
import { MdTipsAndUpdates, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { TiSocialFacebook, TiSocialTwitter, TiSocialLinkedin, TiSocialYoutube, TiSocialInstagram } from "react-icons/ti";
import Typewriter from "typewriter-effect";
import './Home.css'
import FeatureSection from '../Home/FeatureSection';
import Discover from '../button/Discover';

import farmer from '../../assets/bg/farm-plant.avif'
import crop from '../../assets/bg/crop.jpg'
import HowItWorks from '../Home/HowItWorks';
import Preloader from '../UI/Preloader';

const LandingPage: React.FC = () => {

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
   const timer = setTimeout(()=> setLoading(false), 2000);
   return () => clearTimeout(timer);
  })

  if (loading){
    return <Preloader/>
  }

  const description = 'Empowering Farmers with Data-Driven Insights';
  return (
    <div className="bg-gray-50 flex flex-col items-center text-center">
      {/* Fixed Navigation Bar */}
      <nav className="nav-landing fixed top-0 left-0 w-full bg-transparent shadow-md lg:py-6 py-4 z-50">
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
            <Discover/>
            <GiButterflyFlower className='inline w-auto h-10 ml-4 text-yellow-500 font-light rotate-10 hover:scale-125 transition duration-300 ease-in-out transform'/>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <FeatureSection/>

      {/* Introduction Section */}
<section className="my-16 mx-4 md:mx-12 lg:mx-40">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
    <div className="image flex justify-center items-center">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
        <img
          src={farmer}
          alt="First Image"
          className="w-full h-full rounded-full object-cover shadow-lg"
        />
        <img
          src={crop}
          alt="Second Image"
          className="absolute bottom-0 left-0 md:bottom-[-1rem] md:left-[-1rem] w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-full object-cover border-4 border-white hover:scale-110 transition duration-300 ease-in-out transform"
        />
      </div>
    </div>

    <div className="intro font-[Manrope] flex flex-col gap-5 mx-4 md:mx-0">
      <h2 className="title text-3xl lg:text-4xl text-yellow-500 font-semibold mb-[-1rem] text-left">Our Introduction</h2>
      <div className='sub-title text-2xl font-extrabold text-left'>Empowering Farmers with Smart Solutions</div>
      <p className='text-green-600 font font-bold text-left text-sm md:text-base'>Maximize Productivity with Data-Driven Insights</p>

      <div className='text-xs md:text-sm text-left text-gray-600 font-light items-start leading-6'>
        At Plant DSS, we understand the challenges farmers face in today's dynamic agricultural landscape. Our platform combines the power of advanced technology and data analytics to help you make smarter, more confident decisions for your farm.
        Whether it's predicting the weather, choosing the right crops, or receiving timely alerts, we've got you covered with actionable insights at your fingertips. With Plant DSS, you can focus on what truly matters—growing healthier crops and achieving better yields.
      </div>

      <div className="flex justify-between items-center font-semibold">
        <div className='flex items-center gap-2 md:gap-3 text-left text-sm md:text-base'>
          <div><GiFruitBowl className='h-10 w-auto text-yellow-500 font-light rotate-10 hover:scale-125 transition duration-300 ease-in-out transform'/></div>
          <div>Increasing Crop Yield</div>
        </div>
        <div className='flex items-center gap-2 md:gap-3 text-left text-sm md:text-base'>
          <div><MdTipsAndUpdates className='h-10 w-auto text-yellow-500 font-light rotate-10 hover:scale-125 transition duration-300 ease-in-out transform'/></div>
          <div>Tips for Storage</div>
        </div>
      </div>

      <div className='flex justify-start'>
        <Discover/>
      </div>
    </div>
  </div>
</section>

{/* How it Works */}
<HowItWorks/>

<section className="bg-section my-16 w-full h-[34rem] flex items-center">
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="relative z-10 text-left font-[Manrope] px-8 md:px-12 lg:px-40 text-white">
    <h2 className="text-3xl lg:text-5xl font-bold mb-4">Agriculture</h2>
    <h2 className="text-3xl lg:text-5xl font-bold mb-4">Matters to the</h2>
    <h2 className="text-3xl lg:text-5xl font-bold mb-4">Future of</h2>
    <h2 className="text-3xl lg:text-5xl font-bold mb-4">Nigeria <GiNigeria className="text-green-600 inline rotate-10 hover:scale-110 transition duration-300 ease-in-out transform"/> </h2>
    
  </div>
</section>

{/* Footer / Additional CTA */}
<section className="footer-section mt-8 w-full h-[28rem] flex items-center">
  <div className="absolute inset-0 bg-gray-950 bg-opacity-95"></div>
  <div className="relative grid md:grid-cols-3 grid-cols-1 gap-6 md:gap-12 z-10 text-left font-[Manrope] px-8 md:px-12 lg:px-32 text-white">
  <div className='flex flex-col gap-2 md:gap-6'>
    <Link to="/" className="text-green-600 text-3xl font-bold font-serif">
          <GiPlantWatering className='md:h-10 w-auto text-yellow-500 inline mr-2'/>
          <span className='text-base md:text-xl lg:text-3xl'>Plant</span>
          </Link>
    <div className='text-xs md:text-sm text-gray-300 font-light md:leading-10'> We are dedicated to empowering farmers with innovative solutions for smarter and more efficient farming practices.</div>
    <div>
     <ul className="flex gap-2 md:gap-4">
  <li className="bg-gray-900 rounded-full p-1.5 hover:scale-110 transition duration-300 ease-in-out transform">
    <TiSocialFacebook className='h-6 w-auto text-gray-200' />
  </li>
  <li className="bg-gray-900 rounded-full p-1.5 hover:scale-110 transition duration-300 ease-in-out transform">
    <TiSocialTwitter className='h-6 w-auto text-gray-200' />
  </li>
  <li className="bg-gray-900 rounded-full p-1.5 hover:scale-110 transition duration-300 ease-in-out transform">
    <TiSocialLinkedin className='h-6 w-auto text-gray-200' />
  </li>
  <li className="bg-gray-900 rounded-full p-1.5 hover:scale-110 transition duration-300 ease-in-out transform">
    <TiSocialInstagram className='h-6 w-auto text-gray-200' />
  </li>
  <li className="bg-gray-900 rounded-full p-1.5 hover:scale-110 transition duration-300 ease-in-out transform">
    <TiSocialYoutube className='h-6 w-auto text-gray-200' />
  </li>
</ul>

    </div>
          </div>
 
  <div>
    <div className=''>Explore</div>
    <div className='flex gap-1 mb-3 mt-1'>
      <div className="w-14 h-1 rounded-lg bg-green-500"/> 
     <div className='w-1 h-1 rounded-full bg-green-500'/>
    </div>
     
    <ul className="text-sm md:text-sm text-gray-300 font-light space-y-2 md:space-y-4">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#features" className="hover:underline">Features</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
          <li><a href="#about" className="hover:underline">About</a></li>
        </ul>
  </div>

  <div>
    <div>Contact</div>
     <div className='flex gap-1 mb-3 mt-1'>
      <div className="w-14 h-1 rounded-lg bg-green-500"/> 
     <div className='w-1 h-1 rounded-full bg-green-500'/>
    </div>
<ul className="text-sm md:text-sm text-gray-300 font-light space-y-2 md:space-y-4">
  <li className="flex items-center gap-2">
    <MdEmail className='h-5 w-5 text-yellow-600' />
    <span>Email: info@plantdss.com</span>
  </li>
  <li className="flex items-center gap-2">
    <MdPhone className='h-5 w-5 text-yellow-600' />
    <span>Phone: +123 456 7890</span>
  </li>
  <li className="flex items-center gap-2">
    <MdLocationOn className='h-5 w-5 text-yellow-600' />
    <span>Address: 1234 Farm Lane, Agri City</span>
  </li>
</ul>
  </div>
    
  </div>
</section>

<section className="w-full py-5 px-8 md:px-12 lg:px-32 text-sm text-gray-300 font-[Manrope] font-light bg-black">
  <div className='flex justify-between'>
      <div> © 2025 Plant DSS. All rights reserved.</div>
      <div>Terms of Use | Privacy Policy</div>
  </div>

  </section>

    </div>
  );
};

export default LandingPage;

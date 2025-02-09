
import { motion } from "motion/react";
import { FaCloudSun, FaLeaf, FaBell } from 'react-icons/fa';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3 }
  }),
};

const features = [
  {
    icon: <FaCloudSun size={40} className="text-green-600 mb-4" />,
    title: 'Weather Forecasting',
    description: 'Accurate weather updates to help you plan your farming activities.',
  },
  {
    icon: <FaLeaf size={40} className="text-green-600 mb-4" />,
    title: 'Crop Recommendations',
    description: 'Get personalized crop advice based on your location and weather.',
  },
  {
    icon: <FaBell size={40} className="text-green-600 mb-4" />,
    title: 'Alerts & Notifications',
    description: 'Stay informed with real-time alerts for weather and crop actions.',
  }
];

const FeatureSection = () => (
  <section className="my-16 mx-4 md:mx-12 lg:mx-24">
    <h2 className="title text-3xl lg:text-4xl text-yellow-500 font-semibold mb-6">Key Features</h2>
    <div className="flex flex-col md:flex-row justify-center gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={variants}
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center max-w-xs"
        >
          {feature.icon}
          <h3 className="text-xl font-semibold">{feature.title}</h3>
          <p className="mt-2 text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeatureSection;

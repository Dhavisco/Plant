
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaSearchLocation, FaSeedling, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: <FaSearchLocation size={40} className="text-green-600 mb-4" />,
    title: "Create Your Profile",
    description: "Sign up for free, and enable your location. This helps us personalize recommendations just for you!",
  },
  {
    icon: <FaSeedling size={40} className="text-green-600 mb-4" />,
    title: "Get Smart Insights",
    description: "Access real-time weather updates, soil conditions, and tailored crop suggestions to optimize your yield.",
  },
  {
    icon: <FaChartLine size={40} className="text-green-600 mb-4" />,
    title: "Take Action & Grow More",
    description: "Receive timely alerts, expert tips, and actionable insights to make data-driven farming decisions that maximize productivity.",
  },
];

const staggerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.4, duration: 0.6 },
  }),
};

const HowItWorksSection = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section ref={ref} className="my-16 mx-4 md:mx-12 lg:mx-24">
      <h2 className="text-3xl lg:text-4xl text-yellow-500 font-semibold mb-6 title">🛠️ How It Works – Get Started in 3 Easy Steps</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)" }}
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden"
          >
            <div className="bg-yellow-100 rounded-xl p-4 mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 mb-4">{step.description}</p>
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-green-200 opacity-50 z-0"></span>
          </motion.div>
        ))}
      </div>
    <div className="text-center mt-8">
  <button className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300">
    <Link to="/signup">Join Now</Link> 
  </button>
</div>
</section>
  );
};

export default HowItWorksSection;

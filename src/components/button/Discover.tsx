import { Link } from 'react-router-dom';

const Discover = () => {
  return (
     <Link to="/signup">
                  <button className="bg-green-600 font-[Manrope] text-white text-sm px-6 py-3 rounded-md font-medium hover:bg-green-700 transition duration-200 ease-in-out transform">
                    Discover More
                  </button>
                </Link>
  )
}

export default Discover

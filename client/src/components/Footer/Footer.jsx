import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white py-6"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6">
        {/* Left */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-0"
        >
          <Link to={"/"}>
            <img src="./home1.png" alt="Home" className="w-32" />
          </Link>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start"
        >
          <span className="text-lg font-bold mb-2">Information</span>
          <span className="text-gray-400 mb-4">145 New York, FL 5467, USA</span>

          <div className="flex space-x-4">
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-blue-300 cursor-pointer"
            >
              Property
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-blue-300 cursor-pointer"
            >
              Services
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-blue-300 cursor-pointer"
            >
              Product
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-blue-300 cursor-pointer"
            >
              About Us
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHome } from 'react-icons/fa';

const AlreadyConfirm = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-2xl p-8 border border-white/20 min-h-[500px] flex items-center justify-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center w-full"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-block p-6 bg-green-100 rounded-full mb-6">
              <FaCheckCircle className="text-green-600 text-6xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Already Confirm</h1>
            <p className="text-gray-600 text-lg">This order has already been confirmed in our system.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
              >
                <FaHome className="text-xl" />
                Return to Home
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AlreadyConfirm; 
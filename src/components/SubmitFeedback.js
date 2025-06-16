import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHeart, FaArrowRight } from 'react-icons/fa';
import { Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const SubmitFeedback = () => {
  const navigate = useNavigate();
  
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

  const handleFeedbackClick = () => {
    navigate('/FeedbackForm');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl px-8 py-12 text-center border border-white/20 w-full max-w-2xl"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="bg-green-100 p-4 rounded-full"
            >
              <FaCheckCircle className="text-green-600 text-5xl" />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Thank you!
            </h1>
            <p className="text-gray-600 text-lg">
              Your input helps us improve our service and provide better experiences.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-pink-500 text-4xl"
            >
             🎉🎉🎉
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFeedbackClick}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              Give Feedback
              <FaArrowRight className="text-sm" />
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">
              You may now close this page
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SubmitFeedback;

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTools, FaClipboardCheck, FaArrowRight } from 'react-icons/fa';

const OrderConfirmed = () => {
  const orderData = {
    orderId: 'ABC26052025016',
    product: 'Bowl',
    design: 'D123',
    quantity: 1,
    deliveryDate: '28-05-2025',
  };

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
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-2xl p-6 border border-white/20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-block p-2 bg-green-100 rounded-full mb-3">
              <FaCheckCircle className="text-green-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Order <span className="text-green-600">{orderData.orderId}</span> Confirmed!
            </h2>
            <p className="text-gray-600 mt-1 text-sm">Your order has been successfully processed</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FaTools className="text-green-600 text-lg" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Production Allocation Plan</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{orderData.product}</p>
                  <p className="text-xs text-gray-500">Design: {orderData.design}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Quantity</p>
                  <p className="font-semibold text-gray-800 text-sm">{orderData.quantity}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                <div>
                  <p className="font-medium text-gray-800 text-sm">Delivery Date</p>
                  <p className="text-xs text-gray-500">Expected completion</p>
                </div>
                <p className="font-semibold text-green-600 text-sm">{orderData.deliveryDate}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FaClipboardCheck className="text-green-600 text-lg" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Completion Summary</h3>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{orderData.product} - {orderData.design}</p>
                  <p className="text-xs text-gray-500">Production Status</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-semibold text-sm">Complete</span>
                  <FaCheckCircle className="text-green-600 text-sm" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>✍️</span>
              Give Feedback
              <FaArrowRight className="text-xs" />
            </motion.button>
            <p className="text-xs text-gray-500 mt-2">
              You may now close this page
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmed;

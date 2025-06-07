import React from "react";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaBuilding,
  FaUser,
  FaBox,
  FaPalette,
  FaHashtag,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaRupeeSign,
  FaShoppingCart,
  FaCreditCard,
} from "react-icons/fa";

const OrderPreview = () => {
  const orderData = {
    orderId: "ABC26052025016",
    company: "ABC Textiles",
    salesman: "Pulkit Arora",
    product: "Bowl",
    design: "D123",
    quantity: 1,
    advancePaid: 1,
    dueAmount: 1,
    deliveryDate: "28-05-2025",
    paymentMode: "Cash",
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-3xl p-8 border border-white/20"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="bg-indigo-100 p-3 rounded-full">
            <FaFileAlt className="text-indigo-600 text-2xl" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Order Preview
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <FaBuilding className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-semibold">{orderData.company}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <FaUser className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Salesman</p>
                <p className="font-semibold">{orderData.salesman}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <FaBox className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Product</p>
                <p className="font-semibold">{orderData.product}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <FaPalette className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Design</p>
                <p className="font-semibold">{orderData.design}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <FaShoppingCart className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-semibold">{orderData.quantity}</p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <FaHashtag className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold">{orderData.orderId}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <FaMoneyBillWave className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Advance Paid</p>
                <p className="font-semibold">₹{orderData.advancePaid}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <FaRupeeSign className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Due Amount</p>
                <p className="font-semibold">₹{orderData.dueAmount}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <FaCalendarAlt className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Delivery Date</p>
                <p className="font-semibold">{orderData.deliveryDate}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <FaCreditCard className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Payment Mode</p>
                <p className="font-semibold">{orderData.paymentMode}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <span>✅</span>
            Accept & Confirm Order
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderPreview;

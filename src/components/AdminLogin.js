import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaMobileAlt, FaIdCard, FaLock, FaBuilding } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [adminName, setAdminName] = useState("");
  const [userId, setUserId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://radhemelamime.onrender.com/api/auth/login",
        {
          userId,
          phoneNumber,
        }
      );

      if (response.data.success) {
        localStorage.setItem("jwtToken", response.data.data.token);
        console.log("Login successful:", response.data);
        navigate("/csv-dashboard");
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-2 sm:p-3 md:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-md p-3 sm:p-4 md:p-6 border border-white/20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3 sm:space-y-4"
        >
          <motion.div variants={itemVariants} className="text-center space-y-2 sm:space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg">
              <FaBuilding className="text-white text-xl sm:text-2xl" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Admin Portal
              </h2>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm">
                Enter your credentials to access the admin panel
              </p>
            </div>
          </motion.div>

          <motion.form
            variants={itemVariants}
            className="space-y-3 sm:space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="space-y-1 sm:space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                Admin Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  placeholder="Enter admin name"
                  className="w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  placeholder="Enter User ID"
                  className="w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMobileAlt className="text-gray-400 text-sm" />
                </div>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs sm:text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 sm:py-2.5 rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-sm">Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </motion.button>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="text-center pt-2 sm:pt-3 border-t border-gray-100"
          >
            <p className="text-xs text-gray-500">
              © 2024 Radhe Melamine. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

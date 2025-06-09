import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaMobileAlt, FaIdCard, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [adminName, setAdminName] = useState("");
  const [userId, setUserId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [success, setSuccess] = useState(""); // Removed as we will redirect
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
    // setSuccess(""); // Removed as we are redirecting

    try {
      const response = await axios.post(
        "https://radhemelamime.onrender.com/api/auth/login",
        {
          userId,
          phoneNumber,
        }
      );

      if (response.data.success) {
        // Store token and redirect
        localStorage.setItem("jwtToken", response.data.data.token); // Store the token
        console.log("Login successful:", response.data);
        navigate("/csv-dashboard"); // Redirect to the new dashboard route
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-md p-4 sm:p-6 md:p-8 border border-white/20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 sm:space-y-6"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-block p-2 sm:p-3 bg-indigo-100 rounded-full mb-3 sm:mb-4">
              <FaLock className="text-indigo-600 text-xl sm:text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Admin Login
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Enter your credentials to access the admin panel
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            className="space-y-3 sm:space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl">
                <div className="bg-indigo-100 p-1.5 sm:p-2 rounded-lg">
                  <FaUser className="text-indigo-600 text-base sm:text-lg" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Admin Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter admin name"
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl">
                <div className="bg-indigo-100 p-1.5 sm:p-2 rounded-lg">
                  <FaIdCard className="text-indigo-600 text-base sm:text-lg" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    User ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter User ID"
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl">
                <div className="bg-indigo-100 p-1.5 sm:p-2 rounded-lg">
                  <FaMobileAlt className="text-indigo-600 text-base sm:text-lg" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {/* Removed success message as we are redirecting */}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 sm:py-3 text-sm sm:text-base rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </motion.form>

          <motion.div variants={itemVariants} className="text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2025 Radhe Melamine Admin Panel
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

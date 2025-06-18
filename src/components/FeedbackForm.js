import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  FaStar,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaSmile,
  FaMeh,
  FaFrown,
} from "react-icons/fa";

const FeedbackForm = () => {
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState(""); // This is for additional comments, not part of the curl example
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'loading'
  const [loading, setLoading] = useState(true);

  // User-fillable fields
  const [salesmanName, setSalesmanName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [submissionDate, setSubmissionDate] = useState(""); // Format as YYYY-MM-DD for input type="date"

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = location.state?.orderId;
        if (orderId) {
          const response = await axios.get(
            `https://radhemelamime.onrender.com/get_order_details?order_id=${orderId}`
          );
          
          if (response.data) {
            setSalesmanName(response.data.salesman_name || "");
            setCompanyName(response.data.company_name || "");
            // Format the date to YYYY-MM-DD
            const date = response.data.created_at ? response.data.created_at.split('T')[0] : "";
            setSubmissionDate(date);
          }
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location.state?.orderId]);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please provide a rating before submitting.");
      return;
    }

    setSubmissionStatus("loading");
    try {
      const payload = new URLSearchParams();
      payload.append("salesman_name", salesmanName);
      payload.append("company_name", companyName);
      payload.append("rating", rating);
      payload.append("date", submissionDate);

      const response = await axios.post(
        "https://radhemelamime.onrender.com/submit_feedback",
        payload.toString(),
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (
        response.data &&
        response.data.message === "Feedback submitted successfully."
      ) {
        setSubmissionStatus("success");
        alert("Feedback submitted successfully!");
        // Optionally reset form or redirect
        setRating(0);
        setFeedback("");
      } else {
        setSubmissionStatus("error");
        alert(
          "Failed to submit feedback: " +
            (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

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

  const getRatingEmoji = (rating) => {
    if (rating >= 4) return <FaSmile className="text-green-500" />;
    if (rating >= 2) return <FaMeh className="text-yellow-500" />;
    return <FaFrown className="text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-2xl p-8 border border-white/20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Provide Feedback
            </h2>
            <p className="text-gray-600 mt-2">
              Your feedback helps us improve our service
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Salesman Name
              </label>
              <input
                type="text"
                value={salesmanName}
                onChange={(e) => setSalesmanName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter salesman's name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-center">
              <p className="font-semibold text-gray-800 mb-2">
                How would you rate your experience?
              </p>
              <div className="flex justify-center items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={() => setHoveredRating(star)}
                    onHoverEnd={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`w-8 h-8 transition-all duration-200 ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center justify-center gap-2"
                >
                  {getRatingEmoji(rating)}
                  <span className="text-gray-600">
                    {rating === 5
                      ? "Excellent"
                      : rating === 4
                      ? "Very Good"
                      : rating === 3
                      ? "Good"
                      : rating === 2
                      ? "Fair"
                      : "Poor"}
                  </span>
                </motion.div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">
                Additional Comments (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows="4"
                placeholder="Share your thoughts about our service..."
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
              disabled={submissionStatus === "loading"}
            >
              {submissionStatus === "loading"
                ? "Submitting..."
                : "Submit Feedback"}
            </motion.button>
            {submissionStatus === "success" && (
              <p className="text-green-600 mt-2">
                Feedback submitted successfully!
              </p>
            )}
            {submissionStatus === "error" && (
              <p className="text-red-600 mt-2">
                Failed to submit feedback. Please try again.
              </p>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeedbackForm;

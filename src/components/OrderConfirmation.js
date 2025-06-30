import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // Import motion
import AlreadyConfirm from "./AlreadyConfirm";

const OrderConfirmation = () => {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [autoRetryTimer, setAutoRetryTimer] = useState(null); // New state for auto-retry timer
  const [retryAttempt, setRetryAttempt] = useState(0); // Track auto-retry attempts
  const navigate = useNavigate();

  const MAX_RETRY_DURATION = 60 * 1000; // 1 minute in milliseconds
  const RETRY_INTERVAL = 10 * 1000; // 10 seconds in milliseconds

  const fetchOrderDetails = async (isAutoRetry = false) => {
    setLoading(true);
    setError(null);
    if (isAutoRetry) {
      setRetrying(true);
      setRetryAttempt((prev) => prev + 1);
    } else {
      setRetrying(false);
      setRetryAttempt(0); // Reset manual retry
    }

    try {
      const response = await axios.get(
        `https://radhemelamime.onrender.com/get_order_details?order_id=${order_id}`
      );
      console.log("Order Details Response:", response.data);
      setOrderDetails(response.data);
      setOrderConfirmed(
        response.data.status !== "Waiting For Client Notification"
      );
      // If successful, clear any auto-retry timer
      if (autoRetryTimer) {
        clearTimeout(autoRetryTimer);
        setAutoRetryTimer(null);
      }
    } catch (err) {
      console.error(`Error fetching order details:`, err);
      setError("Failed to fetch order details.");
      if (!orderConfirmed && !isAutoRetry) {
        // Only start auto-retry if not confirmed and not already in auto-retry
        startAutoRetry();
      }
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const startAutoRetry = () => {
    const startTime = Date.now();
    let currentAttempt = 0;

    const retryLoop = () => {
      if (Date.now() - startTime < MAX_RETRY_DURATION) {
        currentAttempt++;
        setRetryAttempt(currentAttempt);
        setRetrying(true);
        fetchOrderDetails(true); // Indicate this is an auto-retry
        const timer = setTimeout(retryLoop, RETRY_INTERVAL);
        setAutoRetryTimer(timer);
      } else {
        setError(
          "Order details not found after multiple retries. Please try again later."
        );
        setRetrying(false);
        setAutoRetryTimer(null);
      }
    };

    // Clear any existing timer before starting a new one
    if (autoRetryTimer) {
      clearTimeout(autoRetryTimer);
    }
    retryLoop(); // Start the first retry immediately
  };

  useEffect(() => {
    if (order_id) {
      fetchOrderDetails();
    }
    // Cleanup function to clear timer on component unmount
    return () => {
      if (autoRetryTimer) {
        clearTimeout(autoRetryTimer);
      }
    };
  }, [order_id]);

  const handleConfirmOrder = async () => {
    try {
      const response = await axios.post(
        // "https://radhemelamime.onrender.com/update_order_status",
         " https://radhemelamine-backend.onrender.com/update_order_status",
        `order_id=${order_id}&confirmation=true`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        setOrderConfirmed(true);
        alert("Order confirmed successfully!");
        navigate("/SubmitFeedback", {
          state: {
            orderId: order_id,
          },
        });
      } else {
        alert("Failed to confirm order: " + response.data.message);
      }
    } catch (err) {
      setError("Failed to confirm order. Please try again.");
      console.error("Error confirming order:", err);
      alert("Failed to confirm order. Check console for details.");
    }
  };

  const handleFeedback = () => {
    // Pass order ID to the feedback form
    navigate("/SubmitFeedback");
    navigate("/FeedbackForm", {
      state: {
        orderId: order_id,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {retrying ? (
            <>
              <div className="w-16 h-16 border-4 border-yellow-300 border-t-transparent rounded-full animate-bounce"></div>
              <p className="mt-4 text-white text-lg">
                Retrying... (Attempt {retryAttempt})
              </p>
            </>
          ) : (
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!orderDetails) {
    return <div className="text-center py-8">No order details found.</div>;
  }

  // If status is not "Waiting For Client Notification", show AlreadyConfirm page
  // If order is already confirmed (status is not "Waiting For Client Notification"), show AlreadyConfirm page
  if (orderConfirmed) {
    return <AlreadyConfirm />;
  }

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

  const productDetailsList = [];
  if (orderDetails && orderDetails.product) {
    const products = String(orderDetails.product).split(",");
    const sizes = String(orderDetails.size || "").split(",");
    const shapes = String(orderDetails.shape || "").split(",");
    const designs = String(orderDetails.design || "").split(",");

    for (let i = 0; i < products.length; i++) {
      productDetailsList.push({
        product: products[i] ? products[i].trim() : "-",
        size: sizes[i] ? sizes[i].trim() : "-",
        shape: shapes[i] ? shapes[i].trim() : "-",
        design: designs[i] ? designs[i].trim() : "-",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-2 sm:p-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full md:w-1/2 p-4 sm:p-6 md:p-8 border border-white/20"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 md:space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                Order Confirmation
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Order Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p>
                  <strong>Order ID:</strong> {orderDetails.order_id}
                </p>
                <p>
                  <strong>Salesman Name:</strong> {orderDetails.salesman_name}
                </p>
                <p>
                  <strong>Company Name:</strong> {orderDetails.company_name}
                </p>
                <p>
                  <strong>Booking Source:</strong> {orderDetails.booking_source}
                </p>
                <p>
                  <strong>Quantity:</strong> {orderDetails.quantity}
                </p>
                <p>
                  <strong>Delivery Date:</strong> {orderDetails.delivery_date}
                </p>
                <p>
                  <strong>Payment Mode:</strong> {orderDetails.payment_mode}
                </p>
                <p>
                  <strong>Is Completed:</strong> {orderDetails.is_completed}
                </p>
                <p>
                  <strong>Created At:</strong> {orderDetails.created_at}
                </p>
                <p>
                  <strong>Status:</strong> {orderDetails.status === 'Waiting For Client Notification' ? 'Waiting for client confirmation' : orderDetails.status}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full md:w-1/2 p-4 sm:p-6 md:p-8 border border-white/20 flex flex-col"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col flex-grow"
          >
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 text-center"
            >
              Product Specification
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="overflow-y-auto flex-grow"
            >
              <table className="min-w-full bg-transparent rounded-lg">
                <thead className="bg-gray-50 bg-opacity-50">
                  <tr>
                    <th className="sticky top-0 bg-gray-50/95 backdrop-blur-sm py-2 px-2 sm:py-3 sm:px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="sticky top-0 bg-gray-50/95 backdrop-blur-sm py-2 px-2 sm:py-3 sm:px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="sticky top-0 bg-gray-50/95 backdrop-blur-sm py-2 px-2 sm:py-3 sm:px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Shape
                    </th>
                    <th className="sticky top-0 bg-gray-50/95 backdrop-blur-sm py-2 px-2 sm:py-3 sm:px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Design
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productDetailsList.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 hover:bg-opacity-30"
                    >
                      <td className="py-3 px-2 sm:py-4 sm:px-6 whitespace-nowrap text-sm">
                        {item.product}
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-6 whitespace-nowrap text-sm">
                        {item.size}
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-6 whitespace-nowrap text-sm">
                        {item.shape}
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-6 whitespace-nowrap text-sm">
                        {item.design}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
            <div>
              <motion.div
                variants={itemVariants}
                className="mt-6 bg-white shadow-md rounded-lg p-4 sm:p-6"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 text-center">
                  Payment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <p>
                    <strong>Advance Paid:</strong> {orderDetails.advance_paid}
                  </p>
                  <p>
                    <strong>Due Amount:</strong> {orderDetails.due_amount}
                  </p>
                </div>
              </motion.div>
              {!orderConfirmed ? (
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
                >
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:shadow-outline"
                  >
                    Confirm Order
                  </button>
                  <button
                    onClick={() => fetchOrderDetails(false)} // Manual retry button
                    className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:shadow-outline"
                  >
                    Retry Fetch
                  </button>
                  <button
                    onClick={handleFeedback}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:shadow-outline"
                  >
                    Give Feedback
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center text-lg text-green-600 font-semibold mt-6 flex flex-col items-center"
                >
                  <span>Order has been confirmed!</span>
                  <button
                    onClick={handleFeedback}
                    className="mt-4 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:shadow-outline"
                  >
                    Give Feedback
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

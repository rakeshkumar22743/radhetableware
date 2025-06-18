import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // Import motion
import AlreadyConfirm from "./AlreadyConfirm";

const OrderConfirmation = () => {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `https://radhemelamime.onrender.com/get_order_details?order_id=${order_id}`
        );
        console.log('Order Details Response:', response.data);
        setOrderDetails(response.data);
      } catch (err) {
        setError("Failed to fetch order details. Please check the order ID.");
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (order_id) {
      fetchOrderDetails();
    }
  }, [order_id]);

  const handleConfirmOrder = async () => {
    try {
      const response = await axios.post(
        "https://radhemelamime.onrender.com/update_order_status",
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
            orderId: order_id
          }
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
        orderId: order_id
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
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
  if (orderDetails.status !== "Waiting For Client Notification") {
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Order Confirmation
            </h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white shadow-md rounded-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
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
                <strong>Product:</strong> {orderDetails.product}
              </p>
              <p>
                <strong>Size:</strong> {orderDetails.size}
              </p>
              <p>
                <strong>Shape:</strong> {orderDetails.shape}
              </p>
              <p>
                <strong>Design:</strong> {orderDetails.design}
              </p>
              <p>
                <strong>Quantity:</strong> {orderDetails.quantity}
              </p>
              <p>
                <strong>Advance Paid:</strong> {orderDetails.advance_paid}
              </p>
              <p>
                <strong>Due Amount:</strong> {orderDetails.due_amount}
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
                <strong>Status:</strong> {orderDetails.status}
              </p>
            </div>
          </motion.div>

          {!orderConfirmed ? (
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-4"
            >
              <button
                onClick={handleConfirmOrder}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:shadow-outline"
              >
                Confirm Order
              </button>
              <button
                onClick={handleFeedback}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:shadow-outline"
              >
                Give Feedback
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center text-lg text-green-600 font-semibold"
            >
              Order has been confirmed!
              <button
                onClick={handleFeedback}
                className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:shadow-outline"
              >
                Give Feedback
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;

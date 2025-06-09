import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `https://radhemelamime.onrender.com/get_order_details?order_id=${order_id}`
        );
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

  const handleConfirmOrder = () => {
    // In a real application, you would send a request to your backend to confirm the order.
    // For this example, we'll just update the local state.
    setOrderConfirmed(true);
    alert("Order confirmed!");
  };

  const handleFeedback = () => {
    // Redirect to feedback page or show a feedback form
    alert("Redirecting to feedback form...");
    // Example: history.push(`/feedback/${order_id}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading order details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!orderDetails) {
    return <div className="text-center py-8">No order details found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Order Confirmation
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
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
            <strong>Product:</strong> {orderDetails.product}
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
      </div>

      {!orderConfirmed ? (
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleConfirmOrder}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Confirm Order
          </button>
          <button
            onClick={handleFeedback}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Give Feedback
          </button>
        </div>
      ) : (
        <div className="text-center text-lg text-green-600 font-semibold">
          Order has been confirmed!
          <button
            onClick={handleFeedback}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Give Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;

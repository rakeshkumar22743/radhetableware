import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import OrderPreview from "./components/OrderPreview";
import OrderConfirmed from "./components/OrderConfirmed";
import FeedbackForm from "./components/FeedbackForm";
import SubmitFeedback from "./components/SubmitFeedback";
import AdminLogin from "./components/AdminLogin";
import CsvDashboard from "./components/CsvDashboard";
import CsvEditor from "./components/CsvEditor";
import OrderConfirmation from "./components/OrderConfirmation";
import AlreadyConfirm from "./components/AlreadyConfirm";
import CapacityTable from "./components/CapacityTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/orderpreview",
    element: <OrderPreview />,
  },
  // {
  //   path: "/OrderConfirmed",
  //   element: <OrderConfirmed />,
  // },
  {
    path: "/FeedbackForm",
    element: <FeedbackForm />,
  },
  {
    path: "/SubmitFeedback",
    element: <SubmitFeedback />,
  },
  {
    path: "/AdminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/csv-dashboard",
    element: <CsvDashboard />,
  },
  {
    path: "/csv-editor/:filename",
    element: <CsvEditor />,
  },
  {
    path: "/order-confirmation/:order_id",
    element: <OrderConfirmation />,
  },
  {
    path: "/already-confirm",
    element: <AlreadyConfirm />,
  },
   {
    path: "/capacity",
    element: <CapacityTable />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

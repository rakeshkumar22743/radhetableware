import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import OrderPreview from './components/OrderPreview';
import OrderConfirmed from './components/OrderConfirmed';
import FeedbackForm from './components/FeedbackForm';
import SubmitFeedback from './components/SubmitFeedback';
import AdminLogin from './components/AdminLogin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/orderpreview",
    element: <OrderPreview />,
  },
  {
    path: "/OrderConfirmed",
    element: <OrderConfirmed />,
  },
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
    element: <AdminLogin/>,
  },
 
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

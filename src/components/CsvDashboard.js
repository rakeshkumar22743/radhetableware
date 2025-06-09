import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CsvDashboard = () => {
  const [csvLinks, setCsvLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCsvLinks = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setError("No authentication token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://radhemelamime.onrender.com/list_csv_links",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Correctly access csv_files and map to get links
        if (response.data && Array.isArray(response.data.csv_files)) {
          setCsvLinks(response.data.csv_files.map((file) => file.link));
        } else {
          setError("Failed to fetch CSV links or invalid data format.");
        }
      } catch (err) {
        console.error("Error fetching CSV links:", err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching CSV links."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCsvLinks();
  }, []);

  const handleView = (csvLink) => {
    const filename = csvLink.split("/").pop(); // Extract filename from the link
    navigate(`/csv-editor/${filename}`, { state: { link: csvLink } });
  };

  const handleDownload = (csvLink) => {
    const filename = csvLink.split("/").pop();
    const link = document.createElement("a");
    link.href = csvLink;
    link.setAttribute("download", filename); // Set the download attribute with the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (csvLink) => {
    const filename = csvLink.split("/").pop(); // Extract filename from the link
    navigate(`/csv-editor/${filename}`, { state: { link: csvLink } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
        <div className="spinner"></div>
        <p className="ml-4 text-white text-xl">Loading CSV links...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-red-400 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-2xl p-4 sm:p-6 md:p-8 border border-white/20"
      >
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center mb-6">
          CSV Dashboard
        </h2>

        {csvLinks.length === 0 ? (
          <p className="text-center text-gray-600">No CSV files found.</p>
        ) : (
          <ul className="space-y-4">
            {csvLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm"
              >
                <span className="text-gray-800 font-medium mb-2 sm:mb-0 sm:mr-4 break-all">
                  {link.split("/").pop()} {/* Display file name */}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(link)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(link)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleEdit(link)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    Edit
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default CsvDashboard;

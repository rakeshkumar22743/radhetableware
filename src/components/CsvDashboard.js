import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CsvDashboard = () => {
  const [csvLinks, setCsvLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to convert string to camel case
  const toCamelCase = (str) => {
    return str
      .replace('.csv', '') // Remove .csv extension
      .split(/[-_\s]/) // Split by hyphen, underscore, or space
      .map((word, index) => {
        // Capitalize first letter of each word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(''); // Join words together
  };

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
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center">
        <div className="spinner"></div>
        <p className="ml-4 text-white text-xl">Loading CSV links...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-red-400 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-2 sm:p-3 md:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-[98%] sm:max-w-[95%] md:max-w-[90%] lg:max-w-2xl p-3 sm:p-4 md:p-6 border border-white/20 min-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center mb-6 sm:mb-8">
          CSV Dashboard
        </h2>

        {csvLinks.length === 0 ? (
          <p className="text-center text-gray-600 text-sm sm:text-base">No CSV files found.</p>
        ) : (
          <ul className="space-y-4 sm:space-y-6">
            {csvLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-3 sm:p-4 md:p-5 rounded-xl shadow-sm"
              >
                <span className="text-gray-800 font-medium mb-3 sm:mb-0 sm:mr-4 break-all text-sm sm:text-base text-center sm:text-left w-full sm:w-auto">
                  {toCamelCase(link.split("/").pop())}
                </span>
                <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => handleView(link)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-colors duration-200 w-full sm:w-auto"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(link)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-colors duration-200 w-full sm:w-auto"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleEdit(link)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-colors duration-200 w-full sm:w-auto"
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

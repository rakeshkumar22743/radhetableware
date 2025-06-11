import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Papa from "papaparse"; // Import PapaParse

const CsvEditor = () => {
  const { filename } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [csvContent, setCsvContent] = useState(""); // Keep for raw content if needed, but will primarily use tableData
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableData, setTableData] = useState([]); // Array of objects for rows
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");

  const backendBaseUrl = "https://radhemelamime.onrender.com";

  useEffect(() => {
    const fetchCsvContent = async () => {
      try {
        const link = location.state?.link;
        if (!link) {
          setError(
            "No CSV link provided. Please return to the dashboard and try again."
          );
          setLoading(false);
          return;
        }

        const response = await axios.get(link);
        const rawCsv = response.data;
        setCsvContent(rawCsv); // Store raw CSV content

        // Parse CSV content
        Papa.parse(rawCsv, {
          header: true, // Treat first row as headers
          skipEmptyLines: true,
          complete: (results) => {
            setTableHeaders(results.meta.fields || []);
            setTableData(results.data);
          },
          error: (err) => {
            console.error("Error parsing CSV:", err);
            setError("Failed to parse CSV content.");
          },
        });
      } catch (err) {
        console.error("Error fetching CSV content:", err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching CSV content."
        );
      } finally {
        setLoading(false);
      }
    };

    if (filename) {
      fetchCsvContent();
    } else {
      setError("No filename provided for editing.");
      setLoading(false);
    }
  }, [filename, location.state]);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(""); // Clear previous success message
    setError(""); // Clear previous error message

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setSaving(false);
        return;
      }

      // Convert tableData back to CSV string
      const updatedCsvContent = Papa.unparse(tableData, {
        columns: tableHeaders, // Ensure correct column order
      });

      // Create payload as URL-encoded form data
      const payload = new URLSearchParams();
      payload.append("csv_name", filename);
      payload.append("cloudinary_url", location.state?.link);
      payload.append("content", updatedCsvContent);

      const response = await axios.post(
        `${backendBaseUrl}/update_csv_file`,
        payload, // Send the URL-encoded payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded", // Set content type
          },
        }
      );

      if (response.data.success) {
        setSaveSuccess(
          response.data.message || "CSV file updated successfully!"
        ); // Use backend message for success
        console.log("Navigating to /csv-dashboard..."); // Debugging log
        navigate("/csv-dashboard"); // Redirect to dashboard on success
      } else {
        setError(response.data.message || "Failed to save CSV file.");
      }
    } catch (err) {
      console.error("Error saving CSV content:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while saving CSV content."
      );
    } finally {
      setSaving(false);
    }
  };

  // Function to handle cell changes (will be used in table inputs)
  const handleCellChange = (rowIndex, header, value) => {
    setTableData((prevData) =>
      prevData.map((row, idx) =>
        idx === rowIndex ? { ...row, [header]: value } : row
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center">
        <div className="spinner"></div>
        <p className="ml-4 text-white text-xl">Loading CSV content...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-3xl p-4 sm:p-6 md:p-8 border border-white/20"
      >
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center mb-6">
          Edit CSV: {filename}
        </h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {tableHeaders.map((header) => (
                    <td key={header} className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={row[header] || ""}
                        onChange={(e) =>
                          handleCellChange(rowIndex, header, e.target.value)
                        }
                        className="w-full border-none focus:ring-0 focus:outline-none p-0 m-0 bg-transparent"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {saveSuccess && (
          <p className="text-green-500 text-sm text-center mt-4">
            {saveSuccess}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/csv-dashboard")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-xl font-medium transition-colors duration-200"
          >
            Back to Dashboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium shadow-lg transition-all duration-300"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CsvEditor;

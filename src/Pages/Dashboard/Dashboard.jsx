import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../features/teacherSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate= useNavigate()
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.teacher);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: null,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, coverImage: e.target.files[0] }));
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("coverImage", formData.coverImage);

    dispatch(createCourse(formDataObj));
  };

  // State to Show/Hide Form
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      {/* Dashboard Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mb-6 md:flex md:justify-between">
      {/* Create Playlist - Opens Form */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        onClick={() => setShowForm(true)}
      >
        Create Playlist
      </motion.button>

      {/* Navigate to Manage Playlist */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        onClick={() => navigate("/manage-playlist")}
      >
        Manage Playlist
      </motion.button>

      {/* Navigate to View Playlist */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        onClick={() => navigate("/view-playlist")}
      >
        View Playlist
      </motion.button>

      {/* Navigate to View Profile */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        onClick={() => navigate("/profile")}
      >
        View Profile
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto bg-orange-700 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        onClick={() => navigate("/create-exam")}
      >
        Exam Profile
      </motion.button>
    </div>



      {/* Create Playlist Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h2 className="text-xl font-bold mb-4">Create a New Playlist</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
            >
              {isLoading ? "Creating..." : "Create Playlist"}
            </button>
          </form>

          {/* Close Form Button */}
          <button
            onClick={() => setShowForm(false)}
            className="mt-4 text-gray-400 hover:text-white"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;

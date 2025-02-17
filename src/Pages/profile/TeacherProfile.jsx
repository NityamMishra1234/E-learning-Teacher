import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherProfile } from "../../features/teacherSlice";
import { motion } from "framer-motion";

const TeacherProfile = () => {
  const dispatch = useDispatch();
  const { teacher, isLoading, error } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(getTeacherProfile());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Loading Animation */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
          ></motion.div>
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Profile Details */}
      {teacher && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl rounded-lg p-6 relative overflow-hidden"
        >
          {/* Background Blur */}
          <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-md"></div>

          {/* Profile Header */}
          <div className="relative flex items-center space-x-6 p-6">
            <motion.img
              src={teacher.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              whileHover={{ scale: 1.1 }}
            />
            <div>
              <h1 className="text-3xl font-bold">{teacher.name}</h1>
              <p className="text-lg opacity-80">{teacher.email}</p>
              <p className="text-sm mt-1">
                🎓 {teacher.qualification} | 📖 {teacher.subject} | 🏆{" "}
                {teacher.experience} Experience
              </p>
            </div>
          </div>

          {/* Playlists Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Created Playlists
            </h2>
            {teacher.playlists?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacher.playlists.map((playlist) => (
                  <motion.div
                    key={playlist._id}
                    className="bg-white text-gray-900 p-4 rounded-lg shadow-lg cursor-pointer relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Playlist Cover Image */}
                    <img
                      src={playlist.coverImage}
                      alt={playlist.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition"
                    />

                    {/* Overlay */}
                    <div className="relative z-10 p-4">
                      <h3 className="font-bold text-lg">{playlist.title}</h3>
                      <p className="text-sm opacity-80">
                        {playlist.description || "No description available"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-300">No playlists created yet.</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TeacherProfile;

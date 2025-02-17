import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylistsByTeacher, deletePlaylist } from "../../features/playlistSlice";
import { addVideoToPlaylist, deleteVideo } from "../../features/videoSlice";
import { motion } from "framer-motion";

const ManagePlaylist = () => {
  const dispatch = useDispatch();

  // Get teacher info from Redux store
  const teacher = useSelector((state) => state.teacher.teacher);
  const teacherId = teacher?._id;

  // Get teacher's playlists from Redux store
  const { teacherPlaylists, isLoading, error } = useSelector((state) => state.playlists);

  // Local state for selected playlist and video form
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnailFile: null,
    // Add materials if needed
  });

  // Fetch teacher playlists on component mount
  useEffect(() => {
    if (teacherId) {
      dispatch(fetchPlaylistsByTeacher(teacherId));
    }
  }, [dispatch, teacherId]);

  // Handle playlist selection
  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setVideoForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setVideoForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler to add a new video to the selected playlist
  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;

    const formData = new FormData();
    formData.append("title", videoForm.title);
    formData.append("description", videoForm.description);
    formData.append("video", videoForm.videoFile);
    formData.append("thumbnail", videoForm.thumbnailFile);
    // Append additional fields if needed

    dispatch(addVideoToPlaylist({ playlistId: selectedPlaylist._id, videoData: formData }));

    // Reset the form fields after submission
    setVideoForm({
      title: "",
      description: "",
      videoFile: null,
      thumbnailFile: null,
    });
  };

  // Handler to delete a playlist
  const handleDeletePlaylist = (playlistId) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      dispatch(deletePlaylist(playlistId));
      if (selectedPlaylist && selectedPlaylist._id === playlistId) {
        setSelectedPlaylist(null);
      }
    }
  };

  // Handler to delete a video
  const handleDeleteVideo = (videoId) => {
    if (window.confirm("Delete this video?")) {
      dispatch(deleteVideo(videoId));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar: List of Playlists */}
      <div className="lg:w-1/4 bg-gray-800 p-4 overflow-auto border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4">Your Playlists</h2>
        {isLoading ? (
          <p className="text-center">Loading playlists...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : teacherPlaylists.length === 0 ? (
          <p className="text-gray-400">No playlists found.</p>
        ) : (
          <ul className="space-y-2">
            {teacherPlaylists.map((playlist) => (
              <motion.li
                key={playlist._id}
                onClick={() => handleSelectPlaylist(playlist)}
                className={`p-2 rounded-lg cursor-pointer transition-all flex justify-between items-center ${
                  selectedPlaylist?._id === playlist._id ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.03 }}
              >
                <span>{playlist.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePlaylist(playlist._id);
                  }}
                  className="text-red-400 hover:text-red-600 text-xs"
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Content: Manage Selected Playlist */}
      <div className="flex-1 p-6 overflow-auto">
        {selectedPlaylist ? (
          <>
            {/* Playlist Header */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
              <h2 className="text-2xl font-bold">{selectedPlaylist.title}</h2>
              <button
                onClick={() => handleDeletePlaylist(selectedPlaylist._id)}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Playlist
              </button>
            </div>

            {/* Add Video Form */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
  <h3 className="text-2xl font-bold text-white mb-4 text-center">
    🎥 Add Video to Playlist
  </h3>

  <form onSubmit={handleAddVideo} className="space-y-5">
    {/* Video Title & Description */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col w-full sm:w-1/2">
        <label className="text-gray-300 mb-1 font-semibold">Video Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter video title..."
          value={videoForm.title}
          onChange={handleFormChange}
          required
          className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col w-full sm:w-1/2">
        <label className="text-gray-300 mb-1 font-semibold">Video Description</label>
        <input
          type="text"
          name="description"
          placeholder="Enter video description..."
          value={videoForm.description}
          onChange={handleFormChange}
          required
          className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Video & Thumbnail Upload */}
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Video Upload */}
      <div className="flex flex-col w-full sm:w-1/2">
        <label className="text-gray-300 mb-1 font-semibold flex items-center gap-2">
          📹 Upload Video
        </label>
        <input
          type="file"
          name="videoFile"
          onChange={handleFormChange}
          required
          className="file:bg-blue-600 file:hover:bg-blue-700 file:text-white file:font-semibold file:py-2 file:px-4 file:rounded-lg cursor-pointer"
        />
      </div>

      {/* Thumbnail Upload */}
      <div className="flex flex-col w-full sm:w-1/2">
        <label className="text-gray-300 mb-1 font-semibold flex items-center gap-2">
          🖼️ Upload Thumbnail
        </label>
        <input
          type="file"
          name="thumbnailFile"
          onChange={handleFormChange}
          required
          className="file:bg-green-600 file:hover:bg-green-700 file:text-white file:font-semibold file:py-2 file:px-4 file:rounded-lg cursor-pointer"
        />
      </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
    >
      ➕ Add Video
    </button>
  </form>
</div>


            {/* Video List */}
            <h3 className="text-2xl font-bold mb-4">Videos</h3>
            {selectedPlaylist.videos && selectedPlaylist.videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedPlaylist.videos.map((video) => (
                  <motion.div
                    key={video._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-lg relative cursor-pointer hover:shadow-2xl transition-all"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <h4 className="mt-2 font-semibold">{video.title}</h4>
                    <p className="text-sm text-gray-400">{video.description}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteVideo(video._id);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-xs px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No videos in this playlist.</p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-400 mt-10">Select a playlist to manage its videos.</p>
        )}
      </div>
    </div>
  );
};

export default ManagePlaylist;

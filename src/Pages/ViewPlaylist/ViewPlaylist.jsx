import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylistsByTeacher } from "../../features/playlistSlice";
import { motion } from "framer-motion";
import React from "react";

const ViewPlaylist = () => {
  const dispatch = useDispatch();
  const teacherId = useSelector((state) => state.teacher.teacher?._id);
  const { teacherPlaylists, isLoading, error } = useSelector((state) => state.playlists);
  
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchPlaylistsByTeacher(teacherId));
    }
  }, [dispatch, teacherId]);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
    if (playlist.videos.length > 0) {
      setCurrentVideo(playlist.videos[0]); // Play first video
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - Playlist List */}
      <div className="w-1/4 bg-gray-800 p-4 overflow-auto border-r border-gray-700">
        <h2 className="text-lg font-bold mb-4">Your Playlists</h2>
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
                className={`p-2 rounded-lg cursor-pointer transition-all text-center ${
                  selectedPlaylist?._id === playlist._id ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
                onClick={() => handlePlaylistClick(playlist)}
                whileHover={{ scale: 1.05 }}
              >
                {playlist.title}
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Content - Video Player & Video List */}
      <div className="w-3/4 p-6 flex flex-col items-center">
        {selectedPlaylist ? (
          <>
            {/* Video Player */}
            <div className="w-full max-w-4xl">
              <div className="relative w-full pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <motion.video
                  key={currentVideo?._id}
                  src={currentVideo?.videoUrl}
                  controls
                  autoPlay
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <h3 className="text-xl font-semibold mt-4">{currentVideo?.title}</h3>
              <p className="text-gray-400">{currentVideo?.description}</p>
            </div>

            {/* Video List with Thumbnails */}
            {selectedPlaylist.videos.length > 1 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
                {selectedPlaylist.videos.map((video) => (
                  <motion.div
                    key={video._id}
                    className={`p-2 rounded-lg cursor-pointer transition-transform ${
                      currentVideo?._id === video._id ? "border-2 border-blue-500" : "hover:shadow-lg"
                    }`}
                    onClick={() => setCurrentVideo(video)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <p className="text-sm mt-2 text-center">{video.title}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-center mt-10">Select a playlist to start watching</p>
        )}
      </div>
    </div>
  );
};

export default ViewPlaylist;

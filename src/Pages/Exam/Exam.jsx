import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylistsByTeacher } from "../../features/playlistSlice";
import { createExam } from "../../features/examSlice";
import React from "react";
import ExamNav from "../../Components/ExamNav/ExamNav";

const Exam = () => {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teacher.teacher);
  const teacherId = teacher?._id;
  const playlists = useSelector((state) => state.playlists.teacherPlaylists);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [examName, setExamName] = useState(""); // New state for exam name
  const [mcqs, setMcqs] = useState([]);
  const [longAnswers, setLongAnswers] = useState([]);

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchPlaylistsByTeacher(teacherId));
    }
  }, [teacherId, dispatch]);

  const handleSelectPlaylist = (playlistId) => setSelectedPlaylist(playlistId);

  const handleAddMcq = () => {
    setMcqs([...mcqs, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const handleMcqChange = (index, field, value) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[index][field] = value;
    setMcqs(updatedMcqs);
  };

  const handleOptionChange = (mcqIndex, optionIndex, value) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[mcqIndex].options[optionIndex] = value;
    setMcqs(updatedMcqs);
  };

  const handleAddLongAnswer = () => {
    setLongAnswers([...longAnswers, { question: "" }]);
  };

  const handleLongAnswerChange = (index, value) => {
    const updatedLongAnswers = [...longAnswers];
    updatedLongAnswers[index].question = value;
    setLongAnswers(updatedLongAnswers);
  };

  const handleSubmitExam = () => {
    if (!selectedPlaylist) return alert("Please select a playlist!");
    if (!examName.trim()) return alert("Please enter an exam name!"); // Validate examName

    dispatch(createExam({
      examName, // Include exam name in API payload
      playlistId: selectedPlaylist,
      teacherId,
      mcqs,
      longAnswers,
    }));

    // Reset states after submission
    setSelectedPlaylist(null);
    setExamName("");
    setMcqs([]);
    setLongAnswers([]);
  };

  return (
    <>
      <ExamNav />
      <div className="p-6 flex flex-col lg:flex-row gap-6 bg-gray-900 text-white min-h-screen">
        {/* Left Panel - Playlist Selection */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Select a Playlist</h2>

          {/* Large Screen Playlist Grid */}
          <div className="hidden md:grid grid-cols-1 gap-4">
            {playlists?.map((playlist) => (
              <button
                key={playlist._id}
                onClick={() => handleSelectPlaylist(playlist._id)}
                className={`p-4 rounded-xl shadow-md transition duration-300 ${
                  selectedPlaylist === playlist._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-blue-500"
                }`}
              >
                {playlist.title}
              </button>
            ))}
          </div>

          {/* Small Screen Dropdown */}
          <div className="relative md:hidden">
            <select
              onChange={(e) => handleSelectPlaylist(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Playlist</option>
              {playlists?.map((playlist) => (
                <option key={playlist._id} value={playlist._id}>
                  {playlist.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Panel - Exam Creation Form */}
        {selectedPlaylist && (
          <div className="lg:w-2/3 p-6 rounded-xl bg-gray-800 shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Create Exam</h3>

            {/* Exam Name Input Field */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Exam Name</h4>
              <input
                type="text"
                placeholder="Enter Exam Name"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="w-full p-2 border rounded bg-gray-900 text-white focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* MCQs Section */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Multiple Choice Questions</h4>
              {mcqs.map((mcq, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-700">
                  <input
                    type="text"
                    placeholder="Question"
                    value={mcq.question}
                    onChange={(e) => handleMcqChange(index, "question", e.target.value)}
                    className="w-full p-2 border rounded bg-gray-900 text-white focus:ring-2 focus:ring-blue-400"
                  />
                  {mcq.options.map((option, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, i, e.target.value)}
                      className="w-full p-2 border rounded mt-1 bg-gray-900 text-white focus:ring-2 focus:ring-blue-400"
                    />
                  ))}
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={mcq.correctAnswer}
                    onChange={(e) => handleMcqChange(index, "correctAnswer", e.target.value)}
                    className="w-full p-2 border rounded mt-2 bg-gray-900 text-white focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
              <button
                onClick={handleAddMcq}
                className="p-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                + Add MCQ
              </button>
            </div>

            {/* Long Answer Questions Section */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Long Answer Questions</h4>
              {longAnswers.map((q, index) => (
                <div key={index} className="mb-4 p-3 border rounded-lg shadow-sm bg-gray-700">
                  <input
                    type="text"
                    placeholder="Question"
                    value={q.question}
                    onChange={(e) => handleLongAnswerChange(index, e.target.value)}
                    className="w-full p-2 border rounded bg-gray-900 text-white focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
              <button
                onClick={handleAddLongAnswer}
                className="p-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                + Add Long Answer
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitExam}
              className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition text-lg font-semibold"
            >
              Submit Exam
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Exam;

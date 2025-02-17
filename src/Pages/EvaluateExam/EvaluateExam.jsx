import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylistsByTeacher } from "../../features/playlistSlice";
import { fetchSubmittedExams, reviewExam } from "../../features/examSlice";
import ExamNav from "../../Components/ExamNav/ExamNav";
import React from "react";

const EvaluateExam = () => {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teacher.teacher);
  const teacherId = teacher?._id;
  const playlists = useSelector((state) => state.playlists.teacherPlaylists);
  const submittedExams = useSelector((state) => state.exam.submittedExams);
  
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchPlaylistsByTeacher(teacherId));
    }
  }, [teacherId, dispatch]);

  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylist(playlistId);
    dispatch(fetchSubmittedExams(playlistId));
  };

  const handleMarksChange = (examId, value) => {
    setMarks((prev) => ({
      ...prev,
      [examId]: value,
    }));
  };

  const handleSubmitMarks = (examId) => {
    const totalScore = marks[examId];
    if (!totalScore) return alert("Please enter a score before submitting!");

    dispatch(reviewExam({ examSubmissionId: examId, totalScore }));
    alert("Marks submitted successfully!");
  };

  return (
    <>
      <ExamNav />
      <div className="p-6 flex flex-col lg:flex-row gap-6 bg-gray-900 text-white min-h-screen">
        {/* Left Panel - Playlist Selection */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Select a Playlist</h2>
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

        {/* Right Panel - Submitted Exams */}
        {selectedPlaylist && (
          <div className="lg:w-2/3 p-6 rounded-xl bg-gray-800 shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Evaluate Exams</h3>
            {submittedExams.length === 0 ? (
              <p className="text-gray-400">No submitted exams for this playlist.</p>
            ) : (
              <div>
                {submittedExams.map((exam) => (
                  <div key={exam._id} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-700">
                    <p className="font-semibold">Student: {exam.studentId.name}</p>
                    <p className="mt-2 font-medium">MCQ Answers: {exam.mcqAnswers.join(", ")}</p>
                    <p className="mt-2 font-medium">Long Answer Questions:</p>
                    <ul className="list-disc pl-5">
                      {exam.longAnswers.map((ans) => (
                        <li key={ans._id}>
                          <strong>Q:</strong> {ans.question} <br />
                          <strong>Student's Answer:</strong> {ans.answer}
                        </li>
                      ))}
                    </ul>
                    <input
                      type="number"
                      value={marks[exam._id] || ""}
                      onChange={(e) => handleMarksChange(exam._id, e.target.value)}
                      className="border p-2 mt-2 w-20 rounded-md bg-gray-600 text-white"
                      placeholder="Marks"
                    />
                    <button
                      onClick={() => handleSubmitMarks(exam._id)}
                      className="ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Submit Marks
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EvaluateExam;

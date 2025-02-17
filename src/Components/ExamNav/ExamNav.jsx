import { useNavigate } from "react-router-dom";
import React from "react";
const ExamNav = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center gap-6 p-4 bg-gray-100 shadow-md rounded-lg">
      <button
        onClick={() => navigate("/create-exam")}
        className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Create Exam
      </button>
      <button
        onClick={() => navigate("/evaluate-exam")}
        className="px-6 py-3 text-lg font-semibold bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
      >
        Evaluate Exam
      </button>
    </div>
  );
};

export default ExamNav;

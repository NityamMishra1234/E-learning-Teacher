import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerTeacher } from "../../features/teacherSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import signupAnimation from "../../assets/signup Animation.json";
import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { FaGoogle, FaLinkedin, FaGithub, FaCloudUploadAlt } from "react-icons/fa";

const TeacherSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, success } = useSelector((state) => state.teacher);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    googleAccount: "",
    githubAccount: "",
    linkedinAccount: "",
    qualification: "",
    experience: "",
    subject: "",
    profilePicture: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "e-learning");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dgnctsygn/image/upload",
          formData
        );
        setFormData((prev) => ({ ...prev, profilePicture: response.data.secure_url }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerTeacher(formData));
  };

  useEffect(() => {
    if (success) {
      navigate("/teacher/dashboard");
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full flex flex-col md:flex-row"
      >
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Lottie animationData={signupAnimation} className="w-72 h-72" />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-center text-gray-800">Teacher Signup</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <motion.input whileFocus={{ scale: 1.05 }} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-lg shadow-sm" />
            <motion.input whileFocus={{ scale: 1.05 }} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-lg shadow-sm" />
            <motion.input whileFocus={{ scale: 1.05 }} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-3 border rounded-lg shadow-sm" />

            <div className="flex flex-col items-center space-y-2">
              {preview && <img src={preview} alt="Profile Preview" className="w-24 h-24 rounded-full border shadow-md" />}
              <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
                <FaCloudUploadAlt /> Upload Profile Picture
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <motion.input whileFocus={{ scale: 1.05 }} type="text" name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} required className="w-full p-3 border rounded-lg shadow-sm" />
            <motion.input whileFocus={{ scale: 1.05 }} type="text" name="experience" placeholder="Experience (e.g., 5 years)" value={formData.experience} onChange={handleChange} required className="w-full p-3 border rounded-lg shadow-sm" />
            <motion.input whileFocus={{ scale: 1.05 }} type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="w-full p-3 border rounded-lg shadow-sm" />

            <motion.button whileTap={{ scale: 0.95 }} type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </motion.button>
             <p className="text-center mt-4">
                      Don't have an account? <NavLink to="/" className="text-blue-500 hover:underline">Login</NavLink>
                    </p>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">Or sign up with</p>
            <div className="flex justify-center gap-3 mt-2">
              <motion.button whileHover={{ scale: 1.1 }} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaGoogle /> Google</motion.button>
              <motion.button whileHover={{ scale: 1.1 }} className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaLinkedin /> LinkedIn</motion.button>
              <motion.button whileHover={{ scale: 1.1 }} className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaGithub /> GitHub</motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherSignup;

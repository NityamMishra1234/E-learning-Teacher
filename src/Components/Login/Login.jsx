import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { loginTeacher } from "../../features/teacherSlice";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/Login Animation.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher, loading, error, success } = useSelector((state) => state.teacher);

  useEffect(() => {
    if (success && teacher) {
      navigate("/"); 
    }
  }, [success, teacher, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginTeacher({ email, password }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
     
      <motion.div
        className="md:w-1/2 flex justify-center"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Lottie animationData={loginAnimation} className="w-3/4 md:w-2/3" />
      </motion.div>

      
      <motion.div
        className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome Back! Please Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex flex-col space-y-2">
          <button className="flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-100">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-100">
            <FaGithub className="text-xl" /> Continue with GitHub
          </button>
          <button className="flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-100">
            <FaLinkedin className="text-xl text-blue-600" /> Continue with LinkedIn
          </button>
        </div>
        <p className="text-center mt-4">
          Don't have an account? <NavLink to="/signup" className="text-blue-500 hover:underline">Sign up</NavLink>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
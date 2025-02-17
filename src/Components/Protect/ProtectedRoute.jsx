import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
const ProtectedRoute = ({ children }) => {
  const teacher = useSelector((state) => state.teacher?.teacher);

  return teacher ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

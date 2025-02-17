import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar/Navbar";

function Layout() {
  const teacher = useSelector((state) => state.teacher?.teacher); // Get teacher data

  return (
    <>
      {teacher && <Navbar />} {/* Show Navbar only when logged in */}
      <Outlet />
    </>
  );
}

export default Layout;

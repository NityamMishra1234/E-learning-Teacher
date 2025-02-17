import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const teacher = useSelector((state) => state.teacher); // Assuming teacher details are in auth slice

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-bold">E-Learning</div>

      {/* Teacher Profile */}
      {teacher && (
        <div className="flex items-center space-x-3">
          <span className="text-lg font-medium">{teacher.teacher.name}</span>
          <img
            src={teacher.teacher.profilePicture || '/default-profile.png'} // Fallback image
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

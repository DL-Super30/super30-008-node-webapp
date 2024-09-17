"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBell, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import 'material-icons/iconfont/material-icons.css';


export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  // Handle logout process
  const handleLogout = () => {
    // Clear session data from localStorage or sessionStorage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirect to the login page
    router.push("/");
  };

  // Function to show confirmation modal
  const confirmLogout = () => {
    setShowLogoutModal(true); // Show confirmation modal
    setShowProfileDropdown(false); // Close profile dropdown
  };


  const pathname = usePathname();

  const getLinkClass = (path) => {
    return pathname === path
      ? "py-2 px-4 font-bold bg-red-200 text-black border-b-4 border-b-red-500" // Lighter background and black text with red bottom border
      : "py-2 px-4 hover:bg-gray-100 text-gray-700 border-b-4 border-b-transparent hover:border-b-red-500"; // Gray bottom border initially, red on hover
  };
  
  
  

  return (
    <nav className="sticky top-0 p-2 flex flex-col md:flex-row items-center justify-between shadow-md bg-white z-50">
      {/* Logo and Hamburger Icon for mobile */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="text-xl font-bold pl-8">
          <Link href="/dashboard">
            <img
              className="h-10 md:h-8" 
              src="https://www.skillcapital.ai/images/logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-2xl ml-4"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navigation Links for larger screens */}
      <div className="hidden md:flex md:space-x-3 flex-grow justify-center">
        <Link href="/dashboard" className={getLinkClass("/dashboard")}>
          Home
        </Link>
        <Link href="/leads" className={getLinkClass("/leads")}>
          Leads
        </Link>
        <Link href="/opportunities" className={getLinkClass("/opportunities")}>
          Opportunities
        </Link>
        <Link href="/learners" className={getLinkClass("/learners")}>
          Learners
        </Link>
        <Link href="/courses" className={getLinkClass("/courses")}>
          Courses
        </Link>
        <Link href="/activities" className={getLinkClass("/activities")}>
          Activities
        </Link>
        <Link href="/analytics" className={getLinkClass("/analytics")}>
          Analytics
        </Link>
      </div>

      {/* Right-side icons for larger screens */}
      <div className="hidden md:flex items-center space-x-4 ml-auto">
        {/* Notification Icon */}
        <div className="relative">
          <FaBell
            className="text-2xl cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-10">
              <div className="p-4">
                <p className="text-gray-700 font-bold">Recent Notifications</p>
                <ul>
                  <li className="text-gray-500 mt-2">Notification 1</li>
                  <li className="text-gray-500 mt-2">Notification 2</li>
                  <li className="text-gray-500 mt-2">Notification 3</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div className="relative">
          <FaUser
            className="text-2xl cursor-pointer"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          />
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick = {confirmLogout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} w-full mt-4`}
      >
        <div className="flex flex-col items-center">
          <Link href="/dashboard" className={getLinkClass("/dashboard")}>
            Home
          </Link>
          <Link href="/leads" className={getLinkClass("/leads")}>
            Leads
          </Link>
          <Link href="/opportunities" className={getLinkClass("/opportunities")}>
            Opportunities
          </Link>
          <Link href="/learners" className={getLinkClass("/learners")}>
            Learners
          </Link>
          <Link href="/courses" className={getLinkClass("/courses")}>
            Courses
          </Link>
          <Link href="/activities" className={getLinkClass("/activities")}>
            Activities
          </Link>
          <Link href="/analytics" className={getLinkClass("/analytics")}>
            Analytics
          </Link>

          {/* Icons in Mobile Menu */}
          <div className="flex space-x-4 mt-4">
            <div className="relative">
              <FaBell
                className="text-2xl cursor-pointer"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-10">
                  <div className="p-4">
                    <p className="text-gray-700 font-bold">Recent Notifications</p>
                    <ul>
                      <li className="text-gray-500 mt-2">Notification 1</li>
                      <li className="text-gray-500 mt-2">Notification 2</li>
                      <li className="text-gray-500 mt-2">Notification 3</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <FaUser
                className="text-2xl cursor-pointer"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              />
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Profile Settings
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={handleLogout} // Perform logout
              >
                Logout
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                onClick={() => setShowLogoutModal(false)} // Cancel logout
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

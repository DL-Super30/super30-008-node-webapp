"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBell, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import 'material-icons/iconfont/material-icons.css';
import Image from 'next/image';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal
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
      ? "py-2 px-4 font-bold bg-teal-100 text-black border-b-4 border-b-teal-500"
      : "py-2 px-4 hover:bg-gray-100 text-gray-700 border-b-4 border-b-transparent hover:border-b-teal-500";
  };

  return (
    <>
      <nav className="sticky top-0 p-2 flex flex-col lg:flex-row items-center justify-between shadow-md bg-white z-50">
        {/* Logo and Hamburger Icon for mobile */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="text-xl font-bold pl-8">
            <Link href="/dashboard">
              <div className="flex justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={0} // Set your desired width
                  height={0} // Set your desired height
                  layout="responsive"
                  className="h-auto w-auto" // Use this class if needed
                />
              </div>
            </Link>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-2xl ml-4"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links for larger screens */}
        <div className={`lg:flex lg:space-x-3 flex-grow justify-center ${mobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
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
        <div className="hidden lg:flex items-center space-x-4 ml-auto">
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
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={confirmLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

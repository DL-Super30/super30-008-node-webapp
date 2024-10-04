
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
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        router.push("/");
    };

    const confirmLogout = () => {
        setShowLogoutModal(true);
        setShowProfileDropdown(false);
    };

    const pathname = usePathname();

    const getLinkClass = (path) => {
        return pathname === path
            ? "py-2 px-4 font-bold bg-teal-100 text-black border-l-4 border-l-teal-500 lg:border-l-0 lg:border-b-4 lg:border-b-teal-500"
            : "py-2 px-4 hover:bg-gray-100 text-gray-700 border-l-4 border-l-transparent hover:border-l-teal-500 lg:border-l-0 lg:border-b-4 lg:border-b-transparent lg:hover:border-b-teal-500";
    };

    return (
        <>
            <nav className="sticky top-0 p-2 flex flex-col lg:flex-row items-center justify-between shadow-md bg-white z-50">
                <div className="flex items-center justify-between w-full lg:w-auto">
                    <div className="text-xl font-bold pl-8">
                        <Link href="/dashboard">
                            <div className="flex justify-center">
                                <Image
                                    src="/images/SkillCapital-Logo.webp"
                                    alt="Logo"
                                    width={0}
                                    height={0}
                                    layout="responsive"
                                    className="h-auto w-auto"
                                />
                            </div>
                        </Link>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-2xl ml-4"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                <div className={`lg:flex lg:space-x-3 flex-grow justify-center ${mobileMenuOpen ? 'flex flex-col w-full' : 'hidden'} lg:flex-row`}>
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

                <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} lg:flex items-center space-x-4 mt-4 lg:mt-0`}>
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
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={confirmLogout}>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

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

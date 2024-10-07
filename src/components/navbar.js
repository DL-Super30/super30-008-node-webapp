
"use client";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
    const pathName = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getClassLink = (pathId) => pathId === pathName ? 'active' : '';

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <div className="mx-auto z-10 bg-white flex justify-between items-center relative shadow-lg py-2 lg:py-0 lg:pt-4 px-2 lg:px-6 md:pr-4">
            <div className="flex items-center">
                <div className="flex gap-4 lg:pb-1 align-middle">
                    <img
                        className="xl:!w-80 xl:h-14 my-2 lg:my-0 xl:pb-2 cursor-pointer"
                        src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=640&q=75"
                        alt="Logo"
                    />
                </div>
            </div>

            {/* Navigation Menu for larger screens */}
            <div className="hidden md:flex gap-4 xl:gap-8 items-center flex-grow ml-20">
                <Link href="/dashboard" className={`text-base font-medium flex items-center text-black ${getClassLink('/dashboard')}`}>
                    Home
                </Link>
                <Link href="/leads" className={`text-base font-medium flex items-center text-black ${getClassLink('/leads')}`}>
                    Leads
                    <img
                        alt="down arrow"
                        loading="lazy"
                        width="16"
                        height="16"
                        decoding="async"
                        src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                        className="ml-2"
                    />
                </Link>
                <Link href="/opportunities" className={`text-base font-medium flex items-center text-black ${getClassLink('/opportunities')}`}>
                    Opportunities
                    <img
                        alt="down arrow"
                        loading="lazy"
                        width="16"
                        height="16"
                        decoding="async"
                        src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                        className="ml-2"
                    />
                </Link>
                <Link href="/learners" className={`text-base font-medium flex items-center text-black ${getClassLink('/learners')}`}>
                    Learners
                    <img
                        alt="down arrow"
                        loading="lazy"
                        width="16"
                        height="16"
                        decoding="async"
                        src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                        className="ml-2"
                    />
                </Link>
                <Link href="/courses" className={`text-base font-medium flex items-center text-black ${getClassLink('/courses')}`}>
                    Courses
                    <img
                        alt="down arrow"
                        loading="lazy"
                        width="16"
                        height="16"
                        decoding="async"
                        src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                        className="ml-2"
                    />
                </Link>
                <Link href="/activities" className={`text-base font-medium flex items-center text-black ${getClassLink('/activities')}`}>
                    Activities
                    <img
                        alt="down arrow"
                        loading="lazy"
                        width="16"
                        height="16"
                        decoding="async"
                        src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                        className="ml-2"
                    />
                </Link>
                <Link href="/analytics" className={`text-base font-medium flex items-center text-black ${getClassLink('/analytics')}`}>
                    Analytics
                    <img
                        alt="down arrow"
                        loading="lazy"
                        width="16"
                        height="16"
                        decoding="async"
                        src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                        className="ml-2"
                    />
                </Link>

                <div className='flex justify-evenly'>
                    <div>
                        <button><FontAwesomeIcon icon={faBell} width={20} height={40} className='mx-5 ' /></button>
                    </div>
                    <div>
                        <button> <FontAwesomeIcon icon={faUser} width={20} height={40} className=" rounded-full border-2 border-black mx-2" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bars Menu Button (visible only on small screens) */}
            <button onClick={toggleMenu} className='md:hidden p-2'>
                <FontAwesomeIcon icon={faBars} className='text-black-500  text-3xl' />
            </button>

            {/* Mobile Menu (visible only on small screens) */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-2">
                    <Link href="/dashboard" className={`text-base font-medium w-full text-center py-2 ${getClassLink('/dashboard')}`}>
                        Home
                    </Link>
                    <Link href="/leads" className={`text-base font-medium w-full text-center py-2 ${getClassLink('/leads')}`}>
                        Leads
                        <img
                            alt="down arrow"
                            loading="lazy"
                            width="16"
                            height="16"
                            decoding="async"
                            src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                            className="ml-2"
                        />
                    </Link>
                    <Link href="/opportunities" className={`text-base font-medium w-full text-center py-2 ${getClassLink('/opportunities')}`}>
                        Opportunities
                        <img
                            alt="down arrow"
                            loading="lazy"
                            width="16"
                            height="16"
                            decoding="async"
                            src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                            className="ml-2"
                        />
                    </Link>
                    <Link href="/learners" className={`text-base font-medium w-full text-center py-2 ${getClassLink('/learners')}`}>
                        Learners
                        <img
                            alt="down arrow"
                            loading="lazy"
                            width="16"
                            height="16"
                            decoding="async"
                            src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                            className="ml-2"
                        />
                    </Link>
                    <Link href="/courses" className={`text-base font-medium w-full text-center py-2 ${getClassLink('/courses')}`}>
                        Courses
                        <img
                            alt="down arrow"
                            loading="lazy"
                            width="16"
                            height="16"
                            decoding="async"
                            src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                            className="ml-2"
                        />
                    </Link>
                    <Link href="/activities" className={`text-base font-medium w-full text-center py-2 ${getClassLink('/activities')}`}>
                        Activities
                        <img
                            alt="down arrow"
                            loading="lazy"
                            width="16"
                            height="16"
                            decoding="async"
                            src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                            className="ml-2"
                        />
                    </Link>
                    <Link href="/analytics" className={`text-base font-medium w-full text-center py-2 ${getClassLink('/analytics')}`}>
                        Analytics
                        <img
                            alt="down arrow"
                            loading="lazy"
                            width="16"
                            height="16"
                            decoding="async"
                            src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-down-512.png"
                            className="ml-2"
                        />
                    </Link>

                </div>
            )}
        </div>
    );
}

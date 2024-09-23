"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch,} from "react-redux";
import { logout } from "@/slices/loginSlice";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'


export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const login = useSelector((state) => state.login);
  // const login = useSelector((state) => state.login);
  // console.log(login);
  // if (!login?.isLoggedIn) return null;

  const handleLogout = ()=> {
dispatch(logout());
  }

  useEffect(() => {
    if(!login.isLoggedIn){
    router.push('/login')}
  }, [login.isLoggedIn]);

  return (
    <div>
      <nav className="pt-4 px-3 shadow-lg shadow-gray-200 fixed top-0 w-full z-30 bg-white">
        <div className="flex gap-5 justify-between items-center">
          <div className="flex items-center gap-1">
            <button>
              <Image
                src="/images/menu-icon.png"
                alt="menu-icon-img"
                width={30}
                height={30}
                className="inline-block"
              />
            </button>
            <button>
              <Link href="/dashboard">
                <Image
                  src="/images/skillcaplogo"
                  alt="skillcaplogo"
                  width={305}
                  height={40}
                  className="inline-block pb-1"
                />
              </Link>
            </button>
          </div>
          <div className="space-x-4">
            <div className="flex gap-5">
              <div className="flex gap-5 text-base font-normal">
                <button>
                  <Link
                    className={`text-black hover:text-black ${
                      pathname === "/homepage"
                        ? "text-black border border-white border-b-orange-500 border-b-4 bg-red-100 p-2"
                        : ""
                    }`}
                    href="/homepage"
                  >
                    Home
                  </Link>
                </button>

                <button>
                  <Link
                    className={`text-black flex items-center hover:text-black ${
                      pathname === "/leads"
                        ? "text-black border border-white border-b-orange-500 border-b-4 bg-red-100 p-2"
                        : ""
                    }`}
                    href="/leads"
                  >
                    Leads
                    <FaChevronDown className="ml-1 text-xs items-center font-thin" />
                  </Link>
                </button>

                <button>
                  <Link
                    className={`text-black flex items-center hover:text-black ${
                      pathname === "/opportunities"
                        ? "text-black border border-white border-b-orange-500 border-b-4 bg-red-100 p-2"
                        : ""
                    }`}
                    href="/opportunities"
                  >
                    opportunities
                    <FaChevronDown className="ml-1 text-xs items-center font-thin" />
                  </Link>
                </button>

                <button>
                  <Link
                    className={`text-black flex items-center hover:text-black ${
                      pathname === "/learners"
                        ? "text-black border border-white border-b-orange-500 border-b-4 bg-red-100 p-2"
                        : ""
                    }`}
                    href="/learners"
                  >
                    Learners
                    <FaChevronDown className="ml-1 text-xs items-center font-thin" />
                  </Link>
                </button>

                <button>
                  <Link
                    className={`text-black flex items-center hover:text-black ${
                      pathname === "/courses"
                        ? "text-black border border-white border-b-orange-500 border-b-4 bg-red-100 p-2"
                        : ""
                    }`}
                    href="/courses"
                  >
                    Courses
                    <FaChevronDown className="ml-1 text-xs items-center font-thin" />
                  </Link>
                </button>

                <button>
                  <Link
                    className={`text-black flex items-center hover:text-black ${
                      pathname === "/activities"
                        ? "text-black border border-white border-b-orange-500 border-b-4 bg-red-100 p-2"
                        : ""
                    }`}
                    href="/activities"
                  >
                    Activities
                    <FaChevronDown className="ml-1 text-xs items-center font-thin" />
                  </Link>
                </button>

                <button>
                  <Link
                    className={`text-black flex items-center hover:text-black ${
                      pathname === "/analytics"
                        ? "text-black border border-white border-b-orange-500 border-b-4 bg-red-100 p-2"
                        : ""
                    }`}
                    href="/analytics"
                  >
                    Analytics
                    <FaChevronDown className="ml-1 text-xs items-center font-thin" />
                  </Link>
                </button>
              </div>
              <div className="flex space-x-1 m-0 p-0">
                <div>
                  <Image
                    src="/images/stars-icon.png"
                    alt="stars-icon-img"
                    width={30}
                    height={40}
                    className="inline-block"
                  />
                </div>

                <div>
                  <Image
                    src="/images/notification-icon.png"
                    alt="notification-icon-img"
                    width={30}
                    height={40}
                    className="inline-block"
                  />
                </div>
                <div>
                  <Image
                    src="/images/logout-icon.png"
                    alt="logout-icon-img"
                    width={30}
                    height={40}
                    className="inline-block"
                    onClick={handleLogout}
                
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

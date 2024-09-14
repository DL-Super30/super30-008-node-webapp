"use client";

import { useSelector } from "react-redux";
import Navbar from "./navbar"; 
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function ClientNavbar() {
  const pathname = usePathname();
  const hideNavbar = pathname === '/';
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const login = useSelector((state) => state.login);
  

  useEffect(() => {
    setIsLoggedIn(login.isLoggedIn);
  }, [login.isLoggedIn]);

  return (
    <>
      {!hideNavbar && isLoggedIn && <Navbar />} {/* Conditionally render Navbar */}
    </>
  );
}
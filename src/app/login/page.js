"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { checkLoginStatus, loginApi } from "@/slices/loginSlice";



export default function Login() {
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  
  useEffect(() => {
  
    const savedUserName = localStorage.getItem("userName");
    const savedPassword = localStorage.getItem("password");

    if (savedUserName && savedPassword) {
      setUserName(savedUserName);
      setPassword(savedPassword);
      setRememberMe(true);
      
    }
    dispatch(checkLoginStatus());
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!userName) {
      newErrors.userName = "Please enter username.";
    }else if (/^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/.test(userName)) {
      newErrors.userName = "Username is invalid";
    }

    if (!password) {
      newErrors.password = "Please enter password.";
    }else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one digit";
    } else if (!/[\W_]/.test(password)) {
      newErrors.password = "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
      
 


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (rememberMe) {
        localStorage.setItem("userName", userName);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
      }
//  alert("form submitted successfully");
 dispatch(loginApi({userName, password}));
router.push('/dashboard')
    }
  }; 


  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen p-0">
      <div className="flex-1 w-full lg:w-1/2 p-4 lg:p-0">
        <form onSubmit={handleSubmit} className="flex flex-col w-full mt-9 items-center">
          <div className=" text-center mb-2">
            <Image
              src="/images/skillcaplogo.png"
              alt="skillcaplogo"
              width={400}
              height={55}
              className="inline-block"
            />
          </div>

          <div className="w-3/4 border rounded-lg border-gray-300 shadow-lg p-6 mt-8">
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-sm  font-normal mb-1"
              >
                User Name
              </label>
              <input
                type="text"
                className={`w-full p-3 border border-gray-300 rounded-lg ${
                  errors.userName ? "border-red-500" : "border-gray-300"
                }`}
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

                {errors.userName && (
      <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
    )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-normal mb-1"
              >
                Password
              </label>
              <input
    type="password"
    className={`w-full p-3 border rounded-lg ${
      errors.password ? "border-red-500" : "border-gray-300"
    }`}
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
  )}
            </div>
              <div className="mt-8">
                <button  type="submit" className="w-full text-sm font-semibold text-white py-2 rounded-lg bg-gradient-to-r from-orange-300 to-pink-500">
                  Login
                </button>
            </div>

            <div className="flex items-center mt-8">
            <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="mr-2 h-5 w-5"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className=" text-gray-500 text-sm">
                Remember Me
              </label>
            </div>

            <p className="text-gray-500 text-sm font-medium mt-24 text-center block">
              ©2024, All rights reserved
            </p>
          </div>
        </form>
      </div>

      <div className="flex-1 w-full lg:w-1/2 p-4 lg:p-0">
        <div className="flex flex-col w-full">
              <div className="text-center px-4 lg:px-14 mt-10">
                  <h1 className="text-[#042D60] text-2xl lg:text-[2rem] leading-normal font-bold">
                    Seamlessly manage all learner data in a unified platform.
                  </h1>
                  <p className="text-[#042D60] text-base lg:text-lg font-normal mb-4">
                    Centralize customer data effortlessly. Streamline communication,
                    sales, and support for seamless growth.
                  </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/skillcapital.png"
                  alt="skillCapitalHM"
                  width={673}
                  height={474}
                  className="w-full lg:w-auto"
                />
              </div>
          </div>
      </div>
    </div>
  );
}



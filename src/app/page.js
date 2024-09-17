"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if user is already logged in by checking localStorage/sessionStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!savedToken) {
      // If there's no token, prevent URL change or redirection without login
      if (router.pathname !== "/") {
        router.push('/');
      }
    } else {
      // User is already logged in
      router.push('/dashboard');
    }
  }, [router]);

  // Handle form submission and API login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // Send a POST request to the login API
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;

        // Store the token based on the "Remember Me" option
        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        alert("Login successful!");
        router.push('/dashboard');
      } else {
        setErrorMessage("Invalid username or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
        <div className="mb-10">
          <img
            src="https://www.skillcapital.ai/images/logo.png"
            alt="Company Logo"
            className="h-18"
          />
        </div>

        {/* Login Form */}
        <div className="bg-white shadow-lg p-8 w-3/4 rounded-lg">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="block mb-2 text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customPink"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password" className="block mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customPink"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Error Message */}
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

            {/* Remember Me */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-gray-700">
                Remember Me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg bg-gradient-to-r from-customOrange to-customPink"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            &copy; 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex md:w-1/2 flex-col">
        <div className="flex-1 justify-center items-center  mt-4">
          <h1 className="text-4xl text-[#042d60] font-bold mb-3 text-center">
            Seamlessly manage all learner data in a unified platform.
          </h1>
          <p className="text-2xl text-[#042d60] text-center">
            Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth.
          </p>
        </div>
        <div className="flex justify-center items-end">
          <img src="/login-pic.png" alt="Welcome" className="h-auto w-auto" />
        </div>
      </div>
    </div>
  );
}

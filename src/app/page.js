
"use client"
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginUser = async (data) => {
    setIsLoading(true);
    setServerError("");

    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:3000/login');

        if (!response.ok) {
          throw new Error("Failed to fetch users from the server");
        }

        const users = await response.json();

        const user = users.find(
          (user) => user.username === data.username && user.password === data.password
        );

        if (user) {
          console.log('Login successful:', user);
          router.replace('/dashboard');
        } else {
          setServerError("Invalid username or password");
        }
      } catch (error) {
        setServerError("Network error or server is down");
        console.error('Error logging in:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className='flex h-screen'>
      <div className='flex justify-center mt-4 md:mt-30 w-full md:w-1/2 p-6 md:p-0'>
        <div className="flex flex-col justify-center w-full max-w-sm md:max-w-md lg:max-w-lg">
          <div className='flex justify-center'>
            <Image
              src="/images/SkillCapital-Logo.webp"
              alt="logo"
              width={400}
              height={60}
            />
          </div>
          <form
            className="mt-10 bg-white border border-gray-300 p-7 rounded-lg shadow-lg"
            onSubmit={handleSubmit(loginUser)}
          >
            <div>
              <label htmlFor="username" className="block text-sm font-normal leading-6 text-gray-900">User Name</label>
              <input
                type="text"
                id="username"
                className="w-full rounded-lg border border-gray-300 p-1.5 text-gray-900 focus:border-sky-500 focus:outline-none h-12 sm:text-sm sm:leading-6"
                placeholder=""
                {...register('username', { required: "Username is required" })}
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>
            <div className='mt-6'>
              <label htmlFor="password" className="block text-gray-900">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-lg border border-gray-300 p-1.5 text-gray-900 focus:border-sky-500 focus:outline-none h-12 sm:text-sm sm:leading-6"
                placeholder=""
                {...register('password', { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            {serverError && <div className="text-red-500 text-sm mt-4">{serverError}</div>}
            <div className="mt-9">
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-lg bg-gradient-to-r from-orange-300 to-pink-500 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loader"></div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <div className="flex gap-2 mt-8">
              <input type="checkbox" className="h-5 w-5" />
              <span className="font-normal text-sm text-gray-600">Remember Me</span>
            </div>
            <span className="text-gray-500 text-sm font-medium mt-24 text-center block">©2024, All rights reserved</span>
          </form>
        </div>
      </div>
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-white">
        <div className="px-15 2xl:px-24 mt-10 text-center">
          <h1 className="text-[#042D60] font-bold text-[2rem] leading-[normal]">Seamlessly manage all learner data in a unified platform.</h1>
          <p className="text-[#042D60] font-normal text-lg">Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth.</p>
        </div>
        <div className="relative h-[525px] lg:h-[535px] xl:h-[500px] w-full">
          <Image
            src="/images/pinkcrm.webp"
            alt="the image"
            width={1000}
            objectFit="cover"
            height={1000}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
function courses(){
    const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!savedToken) {
      router.push('/');
    }
  }, [router]);

    return(
        <div>courses</div>
    )
}
export default courses;
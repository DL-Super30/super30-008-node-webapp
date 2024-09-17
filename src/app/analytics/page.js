"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
function analytics(){
    const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!savedToken) {
      router.push('/');
    }
  }, [router]);

    return(

        <div>analytics</div>
    )
}
export default analytics;
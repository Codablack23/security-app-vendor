"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";


export default function Page() {
    const router  = useRouter()

      const next  = ()=>{
        router.push("/auth/verify-otp")
    }
  
    const onSubmit:FormEventHandler<HTMLFormElement> =(e)=>{
        e.preventDefault()
        next()
    }

    return (
        <main className="min-h-[100vh] flex items-center justify-center">
            <section className="bg-white flex-1 max-w-[700px] px-4 min-h-[431px] py-20">
                <form onSubmit={onSubmit} action="" className="max-w-[350px] mx-auto">
                    <p className="text-3xl text-center text-[rgba(16,24,40,1)] font-semibold">Reset Password</p>
                    <p className="text-center text-[rgba(71,84,103,1)]"> Enter your email address, we will send you a 6 digit OTP.</p>
                    <div className="space-y-5 py-8">
                        <input type="text" className="border-[rgba(208,213,221,1)] border w-full h-11 p-2 rounded-lg" placeholder="Enter your email" />
                    </div>
                    <button className="h-12 w-full text-white mb-3 bg-[rgba(47,93,168,1)] rounded-[32px] shadow-lg">Continue</button>
                </form>
            </section>
        </main>
    )
}
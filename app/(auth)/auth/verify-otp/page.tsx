"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";


export default function Page() {
    const router = useRouter()
    const next = () => {
        router.push("/auth/reset-password")
    }


    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        next()
    }


    return (
        <main className="min-h-[100vh] flex items-center justify-center">
            <section className="bg-white flex-1 max-w-[700px] px-4 min-h-[431px] py-20">
                <form onSubmit={onSubmit} action="" className="max-w-[350px] mx-auto">
                    <p className="text-3xl text-center text-[rgba(16,24,40,1)] font-semibold">Enter OTP</p>
                    <p className="text-center text-[rgba(71,84,103,1)]">A 6 digit OTP has been sent to your email <b>Johndoe@yahoo.com</b>.</p>
                    <div className="space-y-1 py-8">
                        <input type="text" className="border-[rgba(208,213,221,1)] border w-full h-11 p-2 rounded-lg" placeholder="Enter OTO" />
                        <button type="button" className="text-[rgba(47,93,168,1)] w-full text-center">Didn’t Receive OTP? <b>Resend</b></button>
                    </div>
                    <button className="h-12 w-full text-white mb-3 bg-[rgba(47,93,168,1)] rounded-[32px] shadow-lg">Continue</button>
                </form>
            </section>
        </main>
    )
}
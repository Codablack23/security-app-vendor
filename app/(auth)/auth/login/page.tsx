"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function Page() {

    const router = useRouter()

    const next = () => {
        router.push("/auth/change-password")
    }


    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        next()
    }

    return (
        <main className="min-h-[100vh] flex items-center justify-center">
            <section className="bg-white flex-1 max-w-[700px] px-4 min-h-[431px] py-20">
                <form onSubmit={onSubmit} action="" className="max-w-[350px] mx-auto">
                    <p className="text-3xl text-center text-[rgba(16,24,40,1)] font-semibold">Login to your account</p>
                    <p className="text-center text-[rgba(71,84,103,1)]"> Please enter your details.</p>
                    <div className="space-y-5 py-8">
                        <input type="text" className="border-[rgba(208,213,221,1)] border w-full h-11 p-2 rounded-lg" placeholder="Enter your email" />
                        <input type="password" className="border-[rgba(208,213,221,1)] h-11 p-2 w-full border rounded-lg" placeholder="Enter Password" />
                    </div>
                    <button className="h-12 w-full text-white mb-3 bg-[rgba(47,93,168,1)] rounded-[32px] shadow-lg">Sign in</button>
                    <Link href={"/auth/forgot-password"}>
                        <button className="text-[rgba(47,93,168,1) w-full" type="button">Forgot Password</button>
                    </Link>
                </form>
            </section>
        </main>
    )
}
"use client";

import { CustomSpinner } from "@/app/shared";
import { useLogin } from "@/hooks";
import { message, notification } from "antd";
import Link from "next/link";


export default function Page() {

    const [api,context] = notification.useNotification()

    const {loading,loginForm,handleInput,handleSubmit} = useLogin((description)=>{
        api.error({
            message:<p className="text-xl font-semibold">Login Failed</p>,
            description,
        })
    })

    return (
        <>
        {context}
        <main className="min-h-[100vh] flex items-center justify-center">
            <section className="bg-white flex-1 max-w-[700px] px-4 min-h-[431px] py-20">
                <form onSubmit={handleSubmit} action="" className="max-w-[350px] mx-auto">
                    <p className="text-3xl text-center text-[rgba(16,24,40,1)] font-semibold">Login to your account</p>
                    <p className="text-center text-[rgba(71,84,103,1)]"> Please enter your details.</p>
                    <div className="space-y-5 py-8">
                        <input required value={loginForm.email} name="email" onChange={handleInput} type="email" className="border-[rgba(208,213,221,1)] border w-full h-11 p-2 rounded-lg" placeholder="Enter your email" />
                        <input required value={loginForm.password} name="password" onChange={handleInput} type="password" className="border-[rgba(208,213,221,1)] h-11 p-2 w-full border rounded-lg" placeholder="Enter Password" />
                    </div>
                    <button disabled={loading} className="h-12 w-full text-white mb-3 bg-[rgba(47,93,168,1)] rounded-[32px] shadow-lg">
                        {loading
                        ?<CustomSpinner color="#ffffff"/>
                        :<span>Sign in</span>}
                    </button>
                    <Link href={"/auth/forgot-password"}>
                        <button  className="text-[rgba(47,93,168,1) w-full" type="button">Forgot Password</button>
                    </Link>
                </form>
            </section>
        </main>
        </>
    )
}
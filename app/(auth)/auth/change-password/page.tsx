"use client"
import { CustomSpinner } from "@/app/shared";
import { useChangePassword } from "@/hooks";
import { notification } from "antd";
import { FormEventHandler } from "react";

export default function Page() {

    const [api, contextHolder] = notification.useNotification()

    const { handleSubmit, loading, formData, handleInput } = useChangePassword((description) => {
        api.error({
            message: <p className="text-xl font-semibold">Login Failed</p>,
            description,
        })
    })

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => handleSubmit(e)
    return (
        <>
            {contextHolder}
            <main className="min-h-[100vh] flex items-center justify-center">
                <section className="bg-white flex-1 max-w-[700px] px-4 min-h-[431px] py-20">
                    <form onSubmit={onSubmit} action="" className="max-w-[350px] mx-auto">
                        <p className="text-3xl text-center text-[rgba(16,24,40,1)] font-semibold">Change Password</p>
                        <p className="text-center text-[rgba(71,84,103,1)]">  Please enter your new password</p>
                        <div className="space-y-5 py-8">
                            <input onChange={handleInput} name="new_password" value={formData.new_password} type="password" className="border-[rgba(208,213,221,1)] border w-full h-11 p-2 rounded-lg" placeholder="New password" />
                            <input onChange={handleInput} name="confirm_password" value={formData.confirm_password} type="password" className="border-[rgba(208,213,221,1)] h-11 p-2 w-full border rounded-lg" placeholder="Re-enter new Password" />
                        </div>
                        <button disabled={loading} className="h-12 w-full text-white mb-3 bg-[rgba(47,93,168,1)] rounded-[32px] shadow-lg">
                            {loading
                                ? <CustomSpinner color="#ffffff" />
                                : <span>Sign in</span>}
                        </button>
                    </form>
                </section>
            </main>
        </>
    )
}
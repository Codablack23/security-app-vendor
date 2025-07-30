"use client"

import { useAuthContext } from "@/contexts/Auth"
import { ConfigProvider, Spin } from "antd"
import { ReactNode, useEffect } from "react"

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout(props: AuthLayoutProps) {
    const { isLoggedIn, isLoading } = useAuthContext()

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            window.location.assign("/auth/login")
        }
    }, [isLoading])

    return (
        <>
            {isLoading && (
                <div className="bg-white fixed z-[100] flex items-center justify-center top-0 left-0 h-full w-full">
                    <div className="text-center">
                        <ConfigProvider theme={{
                            components: {
                                Spin: {
                                    colorPrimary: "#2F5DA8"
                                }
                            }
                        }}>
                            <Spin size="large" />
                            <p>Loading Dashboard</p>
                        </ConfigProvider>
                    </div>
                </div>
            )}
            {props.children}
        </>
    )

}
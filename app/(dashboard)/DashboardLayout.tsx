"use client";

import Link from "next/link"
import { ReactNode } from "react"
import { BellIcon, CallIcon, HomeIcon, LogoutIcon, SettingsIcon } from '../icons/';
import { useAuthContext } from "@/contexts/Auth";

interface DashboardLayoutProps {
    children: ReactNode,
    activePage?: "home" | "conversations" | "settings"
}

interface LinkButtonProps {
    isActive?: boolean,
    url: string,
    label: ReactNode
    icon: {
        active: ReactNode,
        default: ReactNode
    }
}

function LinkButton(props: LinkButtonProps) {

    if (props.isActive) {
        return (
            <Link className="block" href={props.url}>
                <button className="w-full h-12 px-7 text-left flex items-center gap-x-4 text-white bg-[rgba(47,93,168,1)]"> {props.icon.default} {props.label}</button>
            </Link>
        )
    }

    return (
        <Link className="block" href={props.url}>
            <button className="w-full h-12 px-7 text-left flex items-center gap-x-4 text-[rgba(119,126,144,1)]"> {props.icon.default} {props.label}</button>
        </Link>
    )
}

export default function DashboardLayout({ activePage = "home", ...props }: DashboardLayoutProps) {

    const {auth} = useAuthContext()


    return (
        <main>
            <aside className="fixed left-0 px-[10px] top-0 w-[250px] bg-white pt-[155px] h-full">
                <nav className="space-y-3 mb-[55px]">
                    <LinkButton
                        url="/"
                        isActive={activePage == "home"}
                        label={"Home"}
                        icon={{
                            default: <span><HomeIcon /></span>,
                            active: <span><HomeIcon /></span>
                        }}
                    />
                    <LinkButton
                        isActive={activePage == "conversations"}
                        url="/conversations"
                        label={"Conversations"}
                        icon={{
                            default: <span><CallIcon fill="currentColor"/></span>,
                            active: <span><CallIcon /></span>
                        }}
                    />
                    <LinkButton
                        isActive={activePage == "settings"}
                        url="/settings"
                        label={"Settings"}
                        icon={{
                            default: <span><SettingsIcon /></span>,
                            active: <span><SettingsIcon /></span>
                        }}
                    />
                </nav>

                <LinkButton
                    url="/"
                    label={<span className="text-[rgba(255,51,51,1)]">Logout</span>}
                    icon={{
                        default: <span className="text-[rgba(255,51,51,1)]"><LogoutIcon /></span>,
                        active: null
                    }}
                />

            </aside>
            <section className="ml-[250px]">
                <header className="bg-white sticky top-0 h-[80px] flex justify-between items-center p-5 pr-[50px]">
                    <p className="text-3xl font-semibold text-[rgba(16,24,40,1)]">Welcome, David</p>
                    <div className="flex items-center gap-x-4">
                        <button className=""><BellIcon height={36} width={36}/></button>
                        <button className="h-[36px] w-[36px] rounded-full bg-gray-400">
                            <img src={auth.user?.avatar} className="h-9 w-9 rounded-full" alt="" />
                        </button>
                    </div>
                </header>
                <div className="p-8">
                    {props.children}
                </div>
            </section>
        </main>
    )
}
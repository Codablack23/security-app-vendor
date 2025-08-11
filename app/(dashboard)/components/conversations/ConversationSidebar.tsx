"use client";

import { ButtonHTMLAttributes, useState } from "react"
import ConversationList from "./ConversationList";
import { useConversation } from "@/hooks";

interface ConversationTypeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    isActive?:boolean
}
function ConversationTypeButton({isActive,className,children,...btnProps}:ConversationTypeButtonProps){

    if(isActive){
        return (
            <button className="flex-1 h-[42px] rounded-[10px] text-lg font-medium bg-[#E3EEFF] text-[#2F5DA8]">{children}</button>
        )
    }

    return (
        <button {...btnProps} className="h-[42px] font-medium flex-1 text-lg text-[#777E90]">{children}</button>
    )
}

export default function ConversationSidebar(){

    const {} = useConversation()

    const [conversationType,setConversationType] = useState<"chats"|"calls">("chats")
    const [userType,setUserType] = useState("")

    return (
        <aside>
            <header className="sticky top-0 bg-[rgba(249,249,249,1)] pb-7">
                <header className="flex p-2 max-w-[238px] rounded-[10px] border border-[#999999]">
                <ConversationTypeButton
                onClick={()=>{setConversationType("chats")}}
                isActive={conversationType =="chats"}>Chats</ConversationTypeButton>
                <ConversationTypeButton
                onClick={()=>{setConversationType("calls")}}
                isActive={conversationType =="calls"}>Calls</ConversationTypeButton>
            </header>
            </header>
            <div className="bg-white">
                <header className="py-2 w-full flex items-center gap-x-3">
                <div className="border gap-x-4 flex-1 flex items-center border-[#999999] rounded-[10px] p-2">
                    <span><i className="bi bi-search text-2xl text-[#999999]"></i></span>
                    <input type="text" className="placeholder:text-[#999999] outline-none w-full flex-1" placeholder="Search" name="" id="" />
                </div>
              <div>
                  <button className="bg-[#2F5DA8] text-white h-11 w-11 flex items-center justify-center rounded-full">
                    <i className="bi bi-plus-lg text-2xl"></i>
                </button>
              </div>
            </header>
            <header className="py-2 w-full flex items-center gap-x-3 mt-7">
              <button
              onClick={()=>setUserType("")}
              className={`${userType  == "" ?"text-[#2F5DA8] font-medium" :"text-[#999999]"}`}>All</button>
              <button
               onClick={()=>setUserType("asa")}
              className={`${userType  == "asa" ?"text-[#2F5DA8] font-medium" :"text-[#999999]"}`}>ASA/SA</button>
            </header>
            <div className="mt-3">
                <ConversationList/>
            </div>
            </div>
        </aside>
    )
}
"use client"
import { ConversationProvider } from "@/services/Conversations"
import { useCallback, useEffect, useState } from "react"

export function useConversation(){
    const [loading,setLoading] = useState(false)

    const getConversations = useCallback(async()=>{
        const res = await ConversationProvider.getConversations()
        console.log(res)
    },[])

    useEffect(()=>{
        getConversations()
    },[getConversations])


    return {
        refetch:getConversations,
        loading
    }
}
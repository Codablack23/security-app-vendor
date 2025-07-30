"use client";
import { ContextProviderProps } from "@/types";
import { AuthContext } from "./context";
import { useAuth } from "@/hooks";

export function AuthContextProvider({children}:ContextProviderProps){
    const authContext = useAuth()
    return (
        <AuthContext value={authContext}>
            {children}
        </AuthContext>
    )
}
"use client";
import { createContext } from "react";
import { AuthData,defaultAuth } from '@/hooks';

export interface AuthContextObject{
    auth:AuthData,
    logout:()=>void,
    getToken:()=>string,
    updateAuth:(auth:AuthData)=>void,
    isLoggedIn:boolean,
    isLoading:boolean,
}

export const AuthContext = createContext<AuthContextObject>({
    auth:defaultAuth,
    getToken(){ return ""},
    logout() {},
    updateAuth(auth) {},
    isLoggedIn:false,
    isLoading:true
})
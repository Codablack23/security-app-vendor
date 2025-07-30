"use client";

import { useEffect, useState } from "react";
import { AuthUser } from "@/services/Auth";
import { Serializer } from "@/utils";

export interface AuthData {
    accessToken?: string | null;
    user?: AuthUser;
}

export const defaultAuth: AuthData = {
    accessToken: null,
};

export function useAuth() {
    const [auth, setAuth] = useState<AuthData>(defaultAuth);
    const [isLoading, setIsLoading] = useState(true);

    const updateAuth = (data: AuthData) => {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
    };

    const logout = () => {
        updateAuth(defaultAuth);
    };

    const getToken = () => auth.accessToken ?? "";

    const isTokenExpired = (token: string): boolean => {
        try {
            const [, payloadBase64] = token.split(".");
            const decodedPayload = JSON.parse(atob(payloadBase64));
            const now = Math.floor(Date.now() / 1000);
            return decodedPayload.exp && decodedPayload.exp < now;
        } catch {
            return true;
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem("auth");
        if (saved) {
            const parsed = Serializer.parseJSON(saved, defaultAuth);
            if (parsed.accessToken && isTokenExpired(parsed.accessToken)) {
                logout();
            } else {
                setAuth(parsed);
            }
        }
        setIsLoading(false); // even if no saved auth, done loading
    }, []);

    return {
        auth,
        updateAuth,
        logout,
        getToken,
        isLoggedIn: !!auth.accessToken,
        isLoading, // 🔥 expose this
    };
}

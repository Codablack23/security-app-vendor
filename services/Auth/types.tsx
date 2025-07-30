import { BaseApiResponse } from '../../types/';

export interface AuthUser {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatar: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    pss?: {
        _id: string;
        user: string;
        zone: string;
        camp: string;
        team: string;
        securityContact: {
            _id: string;
        };
        pmsHistory: {
            totalVolume: number;
            suppliesReceived: number;
            _id: string;
        };
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}

interface LoginResponse {
    access_token: string;
    user: AuthUser;
}


export type AuthResponse = BaseApiResponse<LoginResponse>

export type AuthLoginResponse = AuthResponse & { status:"success" | "failed" }
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
    vendor:VendorProfile,
    __v: number;
}

export interface VendorProfile {
    user: string; // User ID reference
    company_name: string;
    address: string;
    secondary_phone: string;
    secondary_email: string;
    logo: string; // URL to the logo image
    _id: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
}

interface LoginResponse {
    access_token: string;
    user: AuthUser;
    vendor: VendorProfile
}


export type AuthResponse = BaseApiResponse<LoginResponse>

export type AuthLoginResponse = AuthResponse & { status: "success" | "failed" }
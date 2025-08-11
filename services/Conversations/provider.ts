import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL, SUCCESS_STATUS_CODES } from "../config";
import { BaseApiResponse } from "@/types";
import { Serializer } from "@/utils";
import { defaultAuth } from "../../hooks/useAuth";
import { PmsStatsResponse, UpdateVendorRequestData } from './types';

export class ConversationProvider {
    private static endpoint = `${BASE_URL}/conversations`;

    private static instance: AxiosInstance = axios.create({
        baseURL: this.endpoint,
    });

    // ✅ Attach token automatically before every request
    private static initialize() {
        this.instance.interceptors.request.use((config) => {
            const authString = localStorage.getItem("auth");
            const token = Serializer.parseJSON(authString ?? "", defaultAuth)?.accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    static async getConversations() {
        try {
            this.initialize();
             // 🔁 Ensure interceptors are set (call once or guard against multiple calls)
            const res = await this.instance.get<BaseApiResponse>("");

            if (!SUCCESS_STATUS_CODES.includes(res.data.statusCode))
                throw new Error(res.data.message);

            return {
                status: "success",
                ...res.data,
            } as PmsStatsResponse;
        } catch (error) {
            const err = error as AxiosError<BaseApiResponse>;
            const errResponse = err.response?.data;

            return {
                status: "failed",
                statusCode: 500,
                message:
                    errResponse?.message ??
                    err.message ??
                    "An error occurred, could not fetch vendor profile",
            } as BaseApiResponse;
        }
    }
    static async getConversation(id:string) {
        try {
            this.initialize();
             // 🔁 Ensure interceptors are set (call once or guard against multiple calls)
            const res = await this.instance.get<BaseApiResponse>(id);

            if (!SUCCESS_STATUS_CODES.includes(res.data.statusCode))
                throw new Error(res.data.message);

            return {
                status: "success",
                ...res.data,
            } as PmsStatsResponse;
        } catch (error) {
            const err = error as AxiosError<BaseApiResponse>;
            const errResponse = err.response?.data;

            return {
                status: "failed",
                statusCode: 500,
                message:
                    errResponse?.message ??
                    err.message ??
                    "An error occurred, could not fetch vendor profile",
            } as BaseApiResponse;
        }
    }
    static async updateVendor(id:string,updatedProfile:UpdateVendorRequestData) {
        try {
            this.initialize();
             // 🔁 Ensure interceptors are set (call once or guard against multiple calls)
            const res = await this.instance.patch<BaseApiResponse>(id,updatedProfile);

            if (!SUCCESS_STATUS_CODES.includes(res.data.statusCode))
                throw new Error(res.data.message);

            return {
                status: "success",
                ...res.data,
            } as PmsStatsResponse;
        } catch (error) {
            const err = error as AxiosError<BaseApiResponse>;
            const errResponse = err.response?.data;

            return {
                status: "failed",
                statusCode: 500,
                message:
                    errResponse?.message ??
                    err.message ??
                    "An error occurred, could not fetch vendor profile",
            } as BaseApiResponse;
        }
    }
}

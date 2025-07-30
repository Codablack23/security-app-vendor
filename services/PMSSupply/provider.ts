import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL, SUCCESS_STATUS_CODES } from "../config";
import { BaseApiResponse } from "@/types";
import { Serializer } from "@/utils";
import { defaultAuth } from "../../hooks/useAuth";
import { PmsStatsResponse, PmsStatsApiResponse, PmsSupplyApiResponse, PmsSupplyResponse } from "./types";

export class PmSProvider {
    private static endpoint = `${BASE_URL}/pms-supply`;

    private static instance: AxiosInstance = axios.create({
        baseURL: PmSProvider.endpoint,
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

    static async getVendorStats(period?: "day" | "week" | "month" | "year") {
        try {
            this.initialize(); // 🔁 Ensure interceptors are set (call once or guard against multiple calls)

            const res = await this.instance.get<PmsStatsApiResponse>(
                `/vendor/stats${period ? `?period=${period}` : ""}`
            );

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
                    "An error occurred, could not fetch stats",
            } as PmsStatsResponse;
        }
    }
    static async getSupply() {
        try {
            this.initialize(); // 🔁 Ensure interceptors are set (call once or guard against multiple calls)

            const res = await this.instance.get<PmsSupplyApiResponse>("");

            if (!SUCCESS_STATUS_CODES.includes(res.data.statusCode))
                throw new Error(res.data.message);

            return {
                status: "success",
                ...res.data,
            } as PmsSupplyResponse;
        } catch (error) {
            const err = error as AxiosError<BaseApiResponse>;
            const errResponse = err.response?.data;

            return {
                status: "failed",
                statusCode: 500,
                message:
                    errResponse?.message ??
                    err.message ??
                    "An error occurred, could not fetch stats",
            } as PmsSupplyResponse;
        }
    }
}

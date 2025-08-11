import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL, SUCCESS_STATUS_CODES } from "../config";
import { BaseApiResponse } from "@/types";
import { Serializer } from "@/utils";
import { defaultAuth } from "../../hooks/useAuth";
import { PmsStatsResponse, PmsStatsApiResponse, PmsSupplyApiResponse, PmsSupplyResponse } from "./types";

export class CommonProvider {
    private static endpoint = `${BASE_URL}/file/`;

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

    static async uploadFile(file: File) {

        try {
            this.initialize();
            // 🔁 Ensure interceptors are set (call once or guard against multiple calls)
            const res = await this.instance.post<BaseApiResponse>("upload", {file}, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                // Optional: Track upload progress
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
                    );
                    console.log(`Upload progress: ${percent}%`);
                },
            });

            if (!SUCCESS_STATUS_CODES.includes(res.data.statusCode)) {
                throw new Error(res.data.message);
            }

            return {
                status: "success",
                ...res.data,
            } as BaseApiResponse;
        } catch (error) {
            const err = error as AxiosError<BaseApiResponse>;
            const errResponse = err.response?.data;

            return {
                status: "failed",
                statusCode: 500,
                message:
                    errResponse?.message ??
                    err.message ??
                    "An error occurred, could not upload file",
            } as BaseApiResponse;
        }
    }

}

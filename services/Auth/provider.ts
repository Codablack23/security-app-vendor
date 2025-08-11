import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL, SUCCESS_STATUS_CODES } from '../config';
import { AuthLoginResponse, AuthResponse } from './types';
import { BaseApiResponse } from "@/types";
import { Serializer } from "@/utils";
import { defaultAuth } from "@/hooks";



export class AuthProvider{
    private static endpoint = `${BASE_URL}/auth`

      private static instance: AxiosInstance = axios.create({
        baseURL: this.endpoint,
    });


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

    static async loginUser(email:string,password:string){
        try {
            const res = await axios.post<AuthResponse>(`${this.endpoint}/login`,{email,password})
            if(!SUCCESS_STATUS_CODES.includes(res.data.statusCode)) throw new Error(res.data.message)
            return {
                status:"success",
                ...res.data as AuthResponse
            } as AuthLoginResponse
        } catch (error) {

            const err = error as AxiosError<BaseApiResponse>
            const errResponse = err.response?.data
            return {
                status:"failed",
                statusCode:500,
                message:errResponse?.message ?? err.message ?? "An Error occurred could not login"
            } as AuthLoginResponse
        }
    }
    static async changePassword(old_password:string,new_password:string){

        this.initialize()

        try {
            const res = await this.instance.post<AuthResponse>(`change-password`,{new_password,old_password})
            if(!SUCCESS_STATUS_CODES.includes(res.data.statusCode)) throw new Error(res.data.message)
            return {
                status:"success",
                ...res.data as AuthResponse
            } as AuthLoginResponse
        } catch (error) {

            const err = error as AxiosError<BaseApiResponse>
            const errResponse = err.response?.data
            return {
                status:"failed",
                statusCode:500,
                message:errResponse?.message ?? err.message ?? "An Error occurred could not login"
            } as AuthLoginResponse
        }
    }

}
import axios, { AxiosError } from "axios";
import { BASE_URL, SUCCESS_STATUS_CODES } from '../config';
import { AuthLoginResponse, AuthResponse } from './types';
import { BaseApiResponse } from "@/types";



export class AuthProvider{
    private static endpoint = `${BASE_URL}/auth`

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

}
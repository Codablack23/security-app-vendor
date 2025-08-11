import { useAuthContext } from "@/contexts/Auth";
import { AuthProvider } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

interface LoginForm {
    email: string,
    password: string,
}

export function useLogin(onFail?:(message?:string)=>void) {
    const { updateAuth } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: ""
    })

    const router = useRouter()

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setLoginForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if(!loginForm.email) throw new Error("Please provide your email");
            if(!loginForm.password) throw new Error("Password is required");

            const res = await AuthProvider.loginUser(loginForm.email, loginForm.password)
            if (!res || res.status == "failed") throw new Error(res.message ?? "An error occured could not login");
            updateAuth({
                accessToken:res.data?.access_token,
                ...res.data
            })
            if(res.data?.user.status == "change_password"){
                sessionStorage.setItem("temp_password",loginForm.password)
                return router.push("/auth/change-password")
            }
            router.push("/")
        }
        catch (error) {
            onFail?.((error as Error).message)
        }
        finally {
            setLoading(false)
        }
    }

    return {
        handleInput,
        handleSubmit,
        loading,
        loginForm,
    }

}

export function useChangePassword(onFail?:(message?:string)=>void){
      const [loading, setLoading] = useState(false)
    const [formData,setFormData] = useState({
        new_password:"",
        confirm_password:"",
    })

     const router = useRouter()

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const oldPassword = sessionStorage.getItem("temp_password") ?? ""

            if(!formData.new_password) throw new Error("New Password is required");
            if(!formData.confirm_password) throw new Error("Confirm Password is required");

            if(formData.confirm_password !== formData.new_password){
                throw new Error("Passwords do not match!")
            }

            const res = await AuthProvider.changePassword(oldPassword, formData.new_password)
            if (!res || res.status == "failed") throw new Error(res.message ?? "An error occured could not login");
            sessionStorage.clear()
            router.push("/auth/login")
        }
        catch (error) {
            onFail?.((error as Error).message)
        }
        finally {
            setLoading(false)
        }
    }

      return {
        handleInput,
        handleSubmit,
        loading,
        formData,
    }
}
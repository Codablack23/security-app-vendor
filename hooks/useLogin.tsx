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
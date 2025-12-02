"use client"

import api from "@/utils/api";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserSession {
        userId: string;
        userType: string;
        userName: string;
}

interface IAuthContext {
    user: UserSession | null,
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => Promise<void>,
}

const initialAuthCOntextData: IAuthContext = {
    user: null,
    login: async () => false,
    logout: async () => {},
}

export const AuthContext = createContext<IAuthContext>(initialAuthCOntextData);

function AuthProvider({ children }: {children: ReactNode}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        api.get("/v1/auth/me").then((res)=>{
            setUser(res.data)
        }).catch((err) => console.log(err))
    }, []);
    
    const login = async (email: string, password: string) => {
        try{
            const res = await api.post(`/v1/auth/login`, {email, password})

            console.log(res.status)

            if(res.status === 200) {
                setUser(res.data)
                return true
            }
            return false
        }
        catch(e){
            console.log(e)
            return false
        }

    }

    const logout = async () => {
        const res = await api.delete("/v1/auth/logout")
        if (res.status === 200) {
            setUser(null);
        }
    };

    return(
        <AuthContext.Provider value={{user, login, logout}}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
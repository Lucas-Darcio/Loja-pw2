"use client"

import { createContext, ReactNode, useState } from "react";

interface UserSession {
        userId: string;
        userType: string;
        userName: string;
}

interface IAuthContext {
    user: UserSession | null,
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void,
}

const initialAuthCOntextData: IAuthContext = {
    user: null,
    login: async () => false,
    logout: async () => {},
}

export const AuthContext = createContext<IAuthContext>(initialAuthCOntextData);

function AuthProvider({ children }: {children: ReactNode}) {
    const [user, setUser] = useState(null)
    
    const login = async (email: string, password: string) => {
        console.log(JSON.stringify({email, password}))

        const res = await fetch(`http://localhost:7788/v1/auth/login`, {
            method: "POST",
            body: await JSON.stringify({email, password}),
            headers: {"Content-Type":"application/json"},
            credentials: "include",
        })

        console.log(res.status)

        if(res.status === 200) {
            const data = await res.json()
            setUser(data)
            return true
        } 
        else{
            console.log(await res.json())
        }

        return false

    }

    const logout = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/auth/logout`, {
            method: "POST",
            credentials: "include"
        });
        if (res.ok) {
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
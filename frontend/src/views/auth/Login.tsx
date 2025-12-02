"use client"

import TextInput from "@/components/form/TextInput/TextInput";
import { AuthContext } from "@/providers/AuthProvider/AuthProvider";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useContext(AuthContext);
    const router = useRouter()
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const ok = await login(email, password);

        if(ok) {
            router.push("/");
        } else {
            setError("Email e/ou senha incorretos!")

        }
    }

    return(
        <>
        <h1 className="text-2xl font-bold mb-2">Login de Usuário</h1>
        <form onSubmit={handleSubmit}  className="flex max-w-md flex-col gap-4">
            <TextInput value={email} onChange={setEmail} name="email" label="Email" focus error={error} required />
            <TextInput value={password} onChange={setPassword} name="password" label="Senha" type="password" error={error} required />
            <Button type="submit">Enviar</Button>
        </form>
        </>
    )
}

export default Login
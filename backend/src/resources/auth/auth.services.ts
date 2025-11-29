import { LoginDto } from "./auth.types";
import { getUserByEmail } from "../users/user.services";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function checkCredentials(credentials: LoginDto): Promise<User| null> {
    const user = await getUserByEmail(credentials.email);

    if (!user) return null;

    const ok = await bcrypt.compare(credentials.password, user.password);

    return ok ? user: null

}
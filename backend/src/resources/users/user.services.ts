import { PrismaClient, User } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "./user.types";
import { UserTypes } from "../userType/userType.constants";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
}

export async function createUser(createUser: CreateUserDTO): Promise<User> {

    const {password} = createUser;
    const round = parseInt(process.env.SALT_ROUNDS as string) || 11;

    // console.log(`Round:${round}`);

    const salt = await bcrypt.genSalt(round)
    const hash = await bcrypt.hash(password, salt)

    return prisma.user.create({ 
        data: {...createUser, password:hash }, 
        
    })
}

export async function getUserByEmail(email:string): Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
}

export async function getUser(id?: string): Promise<User | null>{
    if(!id) return null
    return prisma.user.findFirst({ 
        where: { 
            id, 
        },
    })
}

export async function updateUser(id: string, updatedUser: UpdateUserDTO): Promise<User> {
    

    if(updatedUser.password) {
        const {password} = updatedUser;
        const round = parseInt(process.env.SALT_ROUNDS as string) || 11;

        const salt = await bcrypt.genSalt(round)
        const hash = await bcrypt.hash(password, salt)
        
        return prisma.user.update({
            where: { id:id },
            data: {...updatedUser, password:hash },
        })
    }


    else{
        return prisma.user.update({
            where: { id:id },
            data: updatedUser,
        })
    }
    
    
}

export async function removeUser(id: string): Promise <User> {
    return prisma.user.delete({
      where: {id : id}
    })
}
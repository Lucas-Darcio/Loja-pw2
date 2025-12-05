import { Request, Response } from "express";
import { createUser, getUser, getUserByEmail } from "../users/user.services";
import { ReasonPhrases } from "http-status-codes";
import { StatusCodes } from "http-status-codes";
import { UserTypes } from "../userType/userType.constants";
import { SignUpDto, LoginDto } from "./auth.types";
import { checkCredentials } from "./auth.services";



const createClient = async (req: Request, res: Response) => {

    try{
        const user = req.body as SignUpDto;

        if(!(await getUserByEmail(user.email))) {
            const newUser = await createUser({...user, userTypeId: UserTypes.CLIENT});

            res.status(StatusCodes.CREATED).json(newUser);
        }
        else{
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
        }
    }

    catch(e){
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({1:ReasonPhrases.INTERNAL_SERVER_ERROR, 2: "Auth.controller", 3:e})
    }
}

const checkAuth = async (req: Request, res: Response) => {

    const credentials = req.body as LoginDto;
    try{
        const user = await checkCredentials(credentials)


        if(!user){
            res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
        }

        else{
            req.session.uid = user.id;
            req.session.tipoUsuario = user.userTypeId;

            await res.status(StatusCodes.OK).json({
                userId: user.id,
                userType: user.userTypeId,
                userName: user.name
                })
        }
    }
    catch(e) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({"user": credentials})
    }

}

const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                    error: err
                });
        }
        res.clearCookie("connect.sid");

        return res
            .status(StatusCodes.OK)
            .json({ message: "Logout realizado com sucesso!" });
    });
}


const me = async(req: Request, res: Response) => {
    const user = await getUser(req.session.uid)
    if(user) {
        res.status(StatusCodes.OK).json({
            userId: user.id,
            userType: user.userTypeId,
            userName: user.name 
        })
    } else {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json(ReasonPhrases.UNAUTHORIZED)
    }

}

export default {createClient, checkAuth, logout, me}
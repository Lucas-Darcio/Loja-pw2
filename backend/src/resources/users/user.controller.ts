import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { createUser, getUser, getUserByEmail, getAllUsers, updateUser, removeUser } from "./user.services";
import { CreateUserDTO } from "./user.types";


const index = async (req: Request, res: Response) => {

    try{
        const users = await getAllUsers();

        res.status(StatusCodes.OK).json(users);
    }
    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
}


const create = async (req: Request, res: Response) => {


    try{
        const user =  req.body as CreateUserDTO;

        if( !(await getUserByEmail(user.email)) ){
            const createdUser = await createUser(user);

            res.status(StatusCodes.OK).json(createdUser);
        }
        else{
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
        }
    
        

    }
    catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({1:ReasonPhrases.INTERNAL_SERVER_ERROR, 2:"Dentro de users.controller"});
    }
}

const update = async (req: Request, res: Response) => {

    try{
        const id = req.params.id as string;
        const userNew = req.body as CreateUserDTO;

        if(!getUserByEmail(userNew.email)){
            const updatedUser = await updateUser(id, userNew);
            res.status(StatusCodes.OK).json(updatedUser);

        }

        else{
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);

        }


    }

    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}

const read = async (req: Request, res: Response) => {

    try{
        const id = req.params.id as string
        const user = await getUser(id);

        if(!user) {
            res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
        }

        else {
            res.status(StatusCodes.OK).json(user);
        }
    }

    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
}

const remove = async (req: Request, res: Response) => {


    try{
        const id = req.params.id as string;
        const removedUser = await removeUser(id);

        res.status(StatusCodes.OK).json(removedUser);
    }
    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Erro ao remover o objeto", e});

    }

}


export default {index, create, update, remove, read}
import { Request, Response, NextFunction } from "express";
import { UserTypes } from "../resources/userType/userType.constants";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

function isAdmin(req: Request, res:Response, next: NextFunction) {
    if(req.session.tipoUsuario !== UserTypes.ADMIN) {
        res.status(StatusCodes.FORBIDDEN).json({1:ReasonPhrases.FORBIDDEN, 2: "Not admin"});
    }
    else{
        next()
    }

}

export default isAdmin;
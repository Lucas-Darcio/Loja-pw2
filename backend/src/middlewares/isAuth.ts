import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

function isAuth(req: Request, res:Response, next: NextFunction) {
    if(!req.session.uid) {
        res.status(StatusCodes.FORBIDDEN).json({1:ReasonPhrases.FORBIDDEN, 2: "Not auth."});
    }
    else{
        next()
    }

}

export default isAuth;
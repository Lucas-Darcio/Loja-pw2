import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema } from "joi";

function validateSchema(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if(error) {
            res.status(StatusCodes.BAD_REQUEST).json({msg: "Problema no schema"});

        }

        else{
            next();
        }
        
    };
}

export default validateSchema;
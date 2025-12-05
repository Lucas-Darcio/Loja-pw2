import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getCart, getCartItems } from "./purchase.service";

const cart = async (req: Request, res: Response) => {
    const userId = req.session.uid
    if(!userId) return res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
    try{
        const userCart = await getCartItems(userId);
        res.status(StatusCodes.OK).json(userCart);
    } catch(e) {
        console.log(e)
    }
}

export default { cart}
import { Request, Response } from "express"
import { IncDto } from "./purchaseItem.types"
import { decPurchaseItem, incPurchaseItem } from "./purchaseItem.service"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

const inc = async (req: Request, res: Response) => {
    const { productId } = req.body as IncDto
    const userId = req.session.uid
    if(!userId) return res.status(StatusCodes.UNAUTHORIZED)
    try{
        await incPurchaseItem(userId, productId)
        res.json(ReasonPhrases.OK)
    } catch(e) {
        console.log(e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



const dec = async (req: Request, res: Response) => {
    const { productId } = req.body as IncDto
    const userId = req.session.uid
    if(!userId) return res.status(StatusCodes.UNAUTHORIZED)
    try{
        await decPurchaseItem(userId, productId)
        res.json(ReasonPhrases.OK)
    } catch(e) {
        console.log(e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


export default {inc, dec}
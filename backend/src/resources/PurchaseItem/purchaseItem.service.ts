import { PrismaClient } from "@prisma/client";
import { getCart } from "../Purchase/purchase.service";


const prisma = new PrismaClient()

export const decPurchaseItem = async (userId: string, productId: string) => {
    const cart = await getCart(userId);
    let purchasedItem = await prisma.purchaseItem.findFirst({
        where: {
            purchaseId: cart.id,
            productId
        }
    })

    if(!purchasedItem){
        throw new Error("Para decrementar a quantidade, o produto deve estar no carrinho de compra")
    }
    
    if(purchasedItem.quantity === 1) {
        purchasedItem = await prisma.purchaseItem.delete({
            where: {
                id: purchasedItem.id,
                productId
            }
        })
    } else {
        await prisma.purchaseItem.update({
            where: {
                id: purchasedItem.id
            },
            data: {
                purchaseId: cart.id,
                productId,
                quantity: { decrement: 1},
            }
        })
    }
}


export const incPurchaseItem = async (userId: string, productId: string) => {
    const cart = await getCart(userId);
    let purchasedItem = await prisma.purchaseItem.findFirst({
        where: {
            purchaseId: cart.id,
            productId
        }
    })
    if(!purchasedItem) {
        purchasedItem = await prisma.purchaseItem.create({
            data: {
                purchaseId: cart.id,
                productId,
                quantity: 1
            }
        })
    } else {
        await prisma.purchaseItem.update({
            where: {
                id: purchasedItem.id
            },
            data: {
                purchaseId: cart.id,
                productId,
                quantity: { increment: 1},
            }
        })
    }
}
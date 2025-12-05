import { PrismaClient, Purchase, PurchaseItem } from "@prisma/client"
import { purchaseStatus } from "./purchase.constants"

const prisma = new PrismaClient()


export const getCart = async (userId:string): Promise<Purchase> => {
    let cart = await prisma.purchase.findFirst({
        where: {
            userId,
            status: purchaseStatus.cart
        }
    })

    if (!cart) {
        cart = await prisma.purchase.create({
            data: {
                userId,
                status: purchaseStatus.cart,

            },
        })
    }

    return cart
}

export const getCartItems = async (userId: string): Promise<PurchaseItem[]> => {
    const cart = await getCart(userId)
    return prisma.purchaseItem.findMany({
        where: {
            purchaseId: cart.id
        }
    })
}
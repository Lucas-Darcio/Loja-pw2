"use client"
import api from "@/utils/api";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { CartDto } from "@/views/cart/cart.types";

interface CartContextProps {
    cartProducts: Record<string, number>;
    incCartProduct: (productId:string) => void;
    decCartProduct: (productId:string) => void;

}

const initialCart: CartContextProps = {
    cartProducts: {},
    incCartProduct: () => {},
    decCartProduct: () => {},

}

export const CartContext = createContext<CartContextProps>(initialCart);

function CartProvider({ children }: {children: ReactNode} ) {
    const {user } = useContext(AuthContext)
    const [cartProducts, setCartProducts] = useState<Record<string, number>>({})

    useEffect(() => {
        if(user) {
            api.get("/v1/purchase/cart").then((res)=>{
                const cart: CartDto = res.data
                const cartState: Record<string, number> = {}
                cart.forEach(i => {
                    cartState[i.productId] = i.quantity
                })
                setCartProducts(cartState)
            })
        }
    }, [user])

    const incCartProduct = async (productId:string) => {
        try{
            await api.post("/v1/purchaseItem/inc", {productId})
        } catch (e) {
            console.log(e)
            return;
        }
        setCartProducts(c => ({
            ...c,
            [productId] : (c[productId] ?? 0) + 1
        }))
    }

    const decCartProduct = async (productId:string) => {
        try{
            await api.post("/v1/purchaseItem/dec", {productId})
        } catch (e) {
            console.log(e)
            return;
        }

        if(cartProducts[productId] === 1 ) {
            const copyCartProducts = { ...cartProducts}
            delete copyCartProducts[productId]
            setCartProducts(copyCartProducts)
        } else {
            setCartProducts(c => ({
            ...c,
            [productId] : c[productId] - 1
        }))
        }
    }

    return <CartContext.Provider value={{
        cartProducts,
        incCartProduct,
        decCartProduct,
    }} >{children}</CartContext.Provider>
}

export default CartProvider
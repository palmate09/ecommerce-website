import { cartReducer } from "@/reducers/cartReducer"
import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react"


interface cartItem {
    id: number
    title: string
    price: number
    image: string
    quantity: number
}

interface CartContextType {
    cart: cartItem[]
    dispatch: React.Dispatch<any>
    totalCountMemoised: number
    totalPriceMemoised: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    const intialState: cartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const [cart, dispatch] = useReducer(cartReducer, intialState)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const totalCountMemoised = useMemo(() =>{
        return totalCount
    }, [totalCount])

    const totalPriceMemoised = useMemo(() => {
        return totalPrice
    }, [totalPrice])

    return (
        <CartContext.Provider value={{cart, dispatch, totalCountMemoised, totalPriceMemoised}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart () {
    const context = useContext(CartContext)
    if(!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
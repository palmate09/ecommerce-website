import { useLocalStorage } from "@/hooks"
import { cartReducer, type CartAction } from "@/reducers/cartReducer"
import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react"

export interface cartItem {
    id: number
    title: string
    price: number
    image: string
    quantity: number
}

interface CartStateContextType {
    cart: cartItem[]
    totalCountMemoised: number
    totalPriceMemoised: number
}

type CartDispatchContextType = React.Dispatch<CartAction>

const CartStateContext = createContext<CartStateContextType | null>(null)
const CartDispatchContext = createContext<CartDispatchContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    const initialState: cartItem[] = (() => {
        try {
            return JSON.parse(localStorage.getItem("cart") || "[]")
        } catch {
            return []
        }
    })()

    const [cart, dispatch] = useReducer(cartReducer, initialState)
    const [, setLocalStorageCart] = useLocalStorage<cartItem[]>("cart", initialState)

    useEffect(() => {
        setLocalStorageCart(cart)
    }, [cart, setLocalStorageCart])

    const { totalCountMemoised, totalPriceMemoised } = useMemo(() => {
        return cart.reduce(
            (acc, item) => {
                acc.totalCountMemoised += item.quantity
                acc.totalPriceMemoised += item.price * item.quantity
                return acc
            },
            { totalCountMemoised: 0, totalPriceMemoised: 0 }
        )
    }, [cart])

    const stateValue = useMemo(
        () => ({ cart, totalCountMemoised, totalPriceMemoised }),
        [cart, totalCountMemoised, totalPriceMemoised]
    )

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={stateValue}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export function useCartState(): CartStateContextType {
    const context = useContext(CartStateContext)
    if (!context) {
        throw new Error("useCartState must be used within a CartProvider")
    }
    return context
}

export function useCartDispatch(): CartDispatchContextType {
    const context = useContext(CartDispatchContext)
    if (!context) {
        throw new Error("useCartDispatch must be used within a CartProvider")
    }
    return context
}

export function useCart() {
    const state = useCartState()
    const dispatch = useCartDispatch()
    return {
        ...state,
        dispatch,
    }
}
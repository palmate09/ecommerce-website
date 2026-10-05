import { useCartDispatch, type cartItem } from "@/context/CartContext";
import { useMemo } from "react";

interface CartActions {
    addItem: (item: Omit<cartItem, "quantity">) => void; 
    removeItem: (id: number) => void;
    increaseQuantity: (id: number) => void; 
    decreaseQuantity: (id: number) => void; 
    clearCart: () => void;
}

export function useCartActions(): CartActions {
    const dispatch = useCartDispatch();

    return useMemo(() => {
        const addItem = (item: Omit<cartItem, "quantity">) => {
            dispatch({ type: "ADD_ITEM", payload: item });
        };

        const removeItem = (id: number) => {
            dispatch({ type: "REMOVE_ITEM", payload: id });
        };

        const increaseQuantity = (id: number) => {
            dispatch({ type: "INCREASE", payload: id });
        };

        const decreaseQuantity = (id: number) => {
            dispatch({ type: "DECREASE", payload: id });
        };

        const clearCart = () => {
            dispatch({ type: "CLEAR_CART" });
        };

        return { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart };
    }, [dispatch]);
}
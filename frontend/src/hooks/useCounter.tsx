import { useState } from "react";


export function useCounter (
    initialValue: number
): [number, {increment: () => void; decrement: () => void, reset: () => void;}] {

    const [ count, setCount ] = useState(initialValue); 

    const increment = () => setCount((prev) => prev + 1);

    const decrement = () => setCount((prev) => prev > 1 ? prev -1 : 1)

    const reset = () => setCount(0);

    return [count, {increment, decrement, reset}]
}
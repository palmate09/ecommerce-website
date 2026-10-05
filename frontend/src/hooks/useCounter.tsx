import { useCallback, useMemo, useState } from "react";

export function useCounter(
    initialValue: number = 0
): [number, { increment: () => void; decrement: () => void; reset: () => void }] {
    const [count, setCount] = useState(initialValue);

    const increment = useCallback(() => setCount((prev) => prev + 1), []);
    const decrement = useCallback(() => setCount((prev) => (prev > 1 ? prev - 1 : 1)), []);
    const reset = useCallback(() => setCount(initialValue), [initialValue]);

    const actions = useMemo(() => ({ increment, decrement, reset }), [increment, decrement, reset]);

    return [count, actions];
}
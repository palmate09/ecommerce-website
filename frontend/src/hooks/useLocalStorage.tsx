import { useCallback, useState } from "react"

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => T | undefined] {

    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : initialValue
        } catch {
            return initialValue
        }
    })

    const setValue = useCallback((value: T | ((val: T) => T)) => {
            setStoredValue(prev => {
                const valueToStore = value instanceof Function ? value(prev) : value
                try {
                    localStorage.setItem(key, JSON.stringify(valueToStore))
                } catch {
                }
                return valueToStore
            })
        },
        [key]
    )

    const getValue = useCallback(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : null;
        }catch {
            return null; 
        }
    }, [key])

    return [storedValue, setValue, getValue]
}
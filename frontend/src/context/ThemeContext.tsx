import { useLocalStorage } from "@/hooks";
import { createContext, useLayoutEffect, type ReactNode } from "react";

interface ThemeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    darkMode: false,
    toggleDarkMode: () => {},
});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
    // Use useLayoutEffect so the initial DOM matches the state before paint (avoid FOUC)
    const prefersDark = 
        typeof window !== "undefined"
            ? window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
            : false; 
    
    const [darkMode , setDarkMode] = useLocalStorage("ThemeMode", prefersDark); 
        
    useLayoutEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode)
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}
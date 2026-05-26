import { createContext, useLayoutEffect, useState, type ReactNode } from "react";

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
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        const stored = localStorage.getItem("ThemeMode");
        if (stored) {
            return stored === "dark";
        }
        
        // fallback to system preference
        return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    });

    useLayoutEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("ThemeMode", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("ThemeMode", "light");
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}
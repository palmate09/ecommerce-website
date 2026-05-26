import { ThemeContext } from "@/context/ThemeContext"
import { IconBrightnessDown, IconMoon } from "@tabler/icons-react"
import { useContext } from "react"


export function ThemeToggle() {

    const { darkMode, toggleDarkMode } = useContext(ThemeContext)

    return (
        <button
            onClick={toggleDarkMode}
            className=""
        >
            {darkMode 
                ? <IconBrightnessDown size={20} className="text-white"/> 
                : <IconMoon size={18} /> 
            }
        </button>
    )
}
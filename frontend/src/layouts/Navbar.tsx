import { IconSearch, IconTallymark3 } from "@tabler/icons-react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ThemeToggle } from "@/components/ui";
import { memo } from "react";

interface NavbarType {
    className?: string; 
}

export const Navbar = memo((
    {className}: NavbarType
) => {

    const navigate = useNavigate(); 
    const { totalCountMemoised } = useCart(); 

    function handleclick () {
        navigate('/'); 
    }

    return (
        <nav className={cn("w-full shadow-md bg-white inset-0 sticky overflow-hidden dark:bg-neutral-900 dark:shadow-2xl dark:shadow-black/20", className)}>
            <div className="container mx-auto px-4 sm:px-6 py-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                    <button 
                        className="flex items-center justify-center selection:bg-transparent cursor-pointer"
                        onClick={handleclick}    
                    >
                        <div className="flex text-xl font-medium font-finlandica">
                            <p className="font-finlandica dark:text-white text-neutral-900">BLOOM</p>
                            <span className="text-amber-500 font-finlandica">SHOP</span>
                        </div>
                    </button>

                    <a href="/contact" className="hidden md:block text-sm font-medium dark:text-white dark:hover:bg-neutral-400/20 px-3 py-1 rounded-full cursor-pointer text-neutral-900 font-finlandica">Contact</a>
                </div>

                <div className="hidden lg:flex flex-1 max-w-md lg:items-center">
                    <Input className="py-0.5 flex items-center" />
                </div>

                <div className="text-xs flex items-center tracking-tight gap-3">

                    {/* search icon */}
                    <button className="md:hidden">
                        <IconSearch className="text-neutral-800" size={17} />
                    </button>
                    
                    {/* Mobile Menu */}
                    <button className="md:hidden">
                        <IconTallymark3 
                            className="rotate-90 h-15"
                        />
                    </button>
                    
                    <ThemeToggle />

                    <Link to={"/cart"} className="flex items-center justify-center dark:hover:bg-neutral-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-300 cursor-pointer">
                        <ShoppingCart size={18} className="dark:text-neutral-50"/>
                        {totalCountMemoised > 0 && (
                            <span className="relative -top-2 bg-amber-500 px-1 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                                {totalCountMemoised > 99 ? "99+" : totalCountMemoised}
                            </span>
                        )}
                    </Link>
                    <Link to="/signin" className="hidden md:block font-finlandica dark:text-white dark:hover:bg-neutral-900 dark:hover:text-white hover:bg-amber-100/40 px-2 py-1 rounded-full hover:text-amber-800 cursor-pointer selection:bg-transparent">Sign In</Link>
                    <Link to="/signup" className="hidden md:block font-finlandica bg-amber-500 px-2 py-1 rounded-full cursor-pointer">Sign Up</Link>
                </div>
            </div>
        </nav>
    )
})

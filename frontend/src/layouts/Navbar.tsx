import { IconSearch, IconTallymark3, IconX } from "@tabler/icons-react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ThemeToggle } from "@/components/ui";
import { memo, useCallback, useEffect, useState } from "react";
import { Test } from "@/components/Test";
import { useIsMobile } from "@/hooks";

interface NavbarType {
    className?: string; 
}

export const Navbar = memo((
    {className}: NavbarType
) => {

    const [isOpen, setIsOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const isMobile = useIsMobile()
    const navigate = useNavigate(); 
    const { totalCountMemoised } = useCart(); 

    const handleClick = useCallback(() => {
        navigate('/'); 
    }, [navigate])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            setIsOpen(prev => !prev);
          }
    
          if (e.key === "Escape") {
            setIsOpen(false);
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setMobileMenuOpen(false)
        }
    }, [isMobile])

    return (
        <>
            <Test isOpen={isOpen} onClose={() => setIsOpen(false)}/>
            <nav className={cn("sticky top-0 z-40 w-full shadow-md bg-white dark:bg-neutral-900 dark:shadow-2xl dark:shadow-black/20", className)}>
                <div className="container mx-auto px-4 sm:px-6 py-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-8">
                        <button 
                            className="flex items-center justify-center selection:bg-transparent cursor-pointer"
                            onClick={handleClick}    
                        >
                            <div className="flex text-xl font-medium font-finlandica">
                                <p className="font-finlandica dark:text-white text-neutral-900">BLOOM</p>
                                <span className="text-amber-500 font-finlandica">SHOP</span>
                            </div>
                        </button>

                        <a href="/contact" className="hidden md:block text-sm font-medium dark:text-white dark:hover:bg-neutral-400/20 px-3 py-1 rounded-full cursor-pointer text-neutral-900 font-finlandica">Contact</a>
                    </div>

                    <button className="hidden lg:flex flex-1 max-w-md lg:items-center" onClick={() => setIsOpen(true)}>
                        <Input className="py-0.5 flex items-center" />
                    </button>

                    <div className="text-xs flex items-center tracking-tight gap-3">

                        {/* search icon */}
                        {isMobile && (
                            <button onClick={() => setIsOpen(true)}>
                                <IconSearch className="text-neutral-800 dark:text-white" size={17} />
                            </button>
                        )}
                        
                        {/* Mobile Menu */}
                        {isMobile && (
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                {mobileMenuOpen ? (
                                    <IconX className="dark:text-white" size={20} />
                                ) : (
                                    <IconTallymark3 className="rotate-90 dark:text-white" />
                                )}
                            </button>
                        )}
                        
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

                {isMobile && mobileMenuOpen && (
                    <div className="border-t border-neutral-200 bg-white px-4 py-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex flex-col gap-3 font-finlandica text-sm">
                            <Link
                                to="/contact"
                                className="rounded-full px-3 py-2 text-neutral-900 hover:bg-amber-100/40 dark:text-white dark:hover:bg-neutral-400/20"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <Link
                                to="/signin"
                                className="rounded-full px-3 py-2 text-neutral-900 hover:bg-amber-100/40 dark:text-white dark:hover:bg-neutral-400/20"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="rounded-full bg-amber-500 px-3 py-2 text-neutral-900"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
        
    )
})

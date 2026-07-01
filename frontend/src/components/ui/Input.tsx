import { IconSearch } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react"; 

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { className, ...props }, ref
) {
    return (
        <form className={cn("relative w-full", className)} onSubmit={(e) => e.preventDefault()}>
            <IconSearch
                stroke={2}
                className="absolute left-3 top-1/4 w-4 h-4 text-neutral-500 cursor-pointer dark:text-white"
            />
            <input
                ref={ref}
                type="text"
                className="w-full pl-10 pr-4 py-1.5 rounded-full h-full border border-neutral-400/40 dark:border-neutral-700 focus:outline-none focus:ring-1 dark:focus:ring-none dark:bg-neutral-900 dark:text-white focus:ring-gray-900 focus:border-transparent transition-all duration-200 text-xs text-neutral-800 font-finlandica selection:bg-none"
                aria-label="Search Products"
                placeholder="Search products..."
                {...props}
            />
        </form>
    );
});

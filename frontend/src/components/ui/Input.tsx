import { IconSearch } from "@tabler/icons-react";
import { cn } from "@/utils/cn";

interface exportType {
    className?: string
}

export function Input({className}: exportType) {
    return (
        <form className={cn("relative w-full", className)}>
            <IconSearch
                stroke={2}
                className="absolute left-3 top-1/4 w-4 h-4 text-neutral-500 cursor-pointer dark:text-white"
            />
            <input
                type="search"
                className="w-full pl-10 pr-4 py-1.5 rounded-full h-full border border-neutral-400/40 dark:border-neutral-700 focus:outline-none focus:ring-1 dark:focus:ring-none dark:bg-neutral-900 dark:text-white focus:ring-gray-900 focus:border-transparent transition-all duration-200 text-xs text-neutral-800 font-finlandica selection:bg-none"
                aria-label="Search Products"
                placeholder="Search products..."
            />
        </form>
    )
}

import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/layouts/Footer";
import { Navbar } from "@/layouts/Navbar";
import { cn } from "@/utils/cn";
import { products } from "@/data/products";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState, useDeferredValue } from "react";
import { ChevronDown, Filter } from "lucide-react";

interface LandingPageType {
    className?: string;
}

interface filterItem {
    id: number
    item: string
}

const filterItems: filterItem[] = [
    {
        id: 1, 
        item: "name", 
    }, 
    {
        id: 2, 
        item: "title"
    }, 
    {
        id: 3, 
        item: "price"
    }
]

export function LandingPage({className}: LandingPageType) {
    
    const navigate = useNavigate(); 
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const deferredSearchTerm = useDeferredValue(searchTerm);
    const isStale = searchTerm !== deferredSearchTerm;

    const filteredFilterItems = useMemo(() => {
        const term = deferredSearchTerm.toLowerCase();
        if (!term) return filterItems;
        return filterItems.filter((f) => f.item.toLowerCase().includes(term));
    }, [deferredSearchTerm]);

    const displayProducts = useMemo(() => {
        let result = [...products];

        if (activeFilter === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (activeFilter === "title") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (activeFilter === "price") {
            result.sort((a, b) => a.price - b.price);
        }

        return result;
    }, [activeFilter]);

    const handleclick= useCallback((id: number) => {
        navigate(`/product/${id}`); 
    }, [])

    const handleFilterSelect = useCallback((item: string) => {
        setActiveFilter(prev => prev === item ? null : item);
        setIsFilterOpen(false);
    }, []);

    return (
        <section className={cn("min-h-screen w-full bg-neutral-50 dark:bg-neutral-900", className)}>
            <Navbar className="z-50/"/>

            <section className="flex-1 max-w-360 mx-auto px-5 mb-15">
                <div className="mt-10 mb-10 max-w-xl mx-auto px-10 pt-5 flex items-center flex-col gap-2 text-center">
                    <h1 className="font-finlandica text-5xl font-semibold text-amber-500 tracking-tight">
                        Step Into Style
                    </h1>
                    <p className="text-xl text-neutral-700 dark:text-neutral-300">
                        Discover our latest collection of premium sneakers
                        <br />
                        — comfort, design, and performance in every pair.
                    </p>
                </div>

                <div className="mt-4 flex items-center justify-end gap-3 w-full pb-5">
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(prev => !prev)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors cursor-pointer",
                                activeFilter
                                    ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                    : "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-amber-400"
                            )}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="text-sm capitalize">{activeFilter || "Filter"}</span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isFilterOpen && "rotate-180")} />
                        </button>

                        {isFilterOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg z-20 overflow-hidden">
                                    <div className="p-2 border-b border-neutral-200 dark:border-neutral-700">
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && filteredFilterItems.length > 0) {
                                                    handleFilterSelect(filteredFilterItems[0].item);
                                                }
                                            }}
                                            className="w-full px-2 py-1.5 text-sm rounded border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none focus:border-amber-400 transition-colors"
                                        />
                                    </div>
                                    {filteredFilterItems.map((filter) => (
                                        <button
                                            key={filter.id}
                                            onClick={() => handleFilterSelect(filter.item)}
                                            className={cn(
                                                "w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer capitalize",
                                                activeFilter === filter.item
                                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium"
                                                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            )}
                                        >
                                            {filter.item}
                                        </button>
                                    ))}
                                    {activeFilter && (
                                        <button
                                            onClick={() => { setActiveFilter(null); setIsFilterOpen(false); }}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer border-t border-neutral-200 dark:border-neutral-700"
                                        >
                                            Clear filter
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {isStale && (
                        <span className="text-xs text-amber-500 animate-pulse">
                            Updating…
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {displayProducts.map((product, index) => (
                        <ProductCard 
                            key={index}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image.src}
                            onclick={() => handleclick(product.id)}
                        />
                    ))}
                </div>
            </section>

            <hr className="text-neutral-200 dark:text-neutral-700"/>
            
            <Footer className="min-h-fit"/>
        </section>
    );
}

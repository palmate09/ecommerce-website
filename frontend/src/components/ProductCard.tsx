import { useCartActions } from "@/hooks/useCartActions";
import { cn } from "@/utils/cn";
import { IconCheck } from "@tabler/icons-react";
import { Heart, Eye, ShoppingCart, Loader } from "lucide-react";
import { memo, useCallback, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";

interface productType {
    id: number, 
    title: string, 
    price: number, 
    image: string,
    onclick: (id: number) => void 
}

export const ProductCard = memo(({
    id, 
    title,
    price,
    image, 
    onclick
}:productType) => {

    const key = "liked_" + id; 

    // const { dispatch } = useCart()
    const { addItem } = useCartActions(); 
    const [isClick, setIsClick] = useState(() => {
        return JSON.parse(localStorage.getItem(key) ?? "false"); 
    })
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

    const handleAddToCart = useCallback((e: React.MouseEvent) => {
        setIsAdding(true)
        e.stopPropagation();

        setTimeout(() => {
            setIsAdding(false); 
            setIsAdded(true); 
        }, 500)

        setTimeout(() => {
            setIsAdded(false);
            addItem({id, title, price, image})
        }, 1500)

        toast.success("Item added to cart!"); 

    }, [addItem, id, title, price, image])

    const handleclick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsClick((prev: boolean) => {
            const next = !prev
            localStorage.setItem(key, JSON.stringify(next))
            return next
        }); 
    }, [key])

    const handleQuickView = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsQuickViewOpen(true);
    }, [])

    return (
        <>
        <div className="rounded-2xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-neutral-800" onClick={() => onclick(id)}>

            {/* Image Area */}
            <div className="relative overflow-hidden">

                {/* Heart Button */}
                <button
                    className={cn(
                        "group absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-neutral-700/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-colors duration-150 cursor-pointer", isClick ? "bg-red-500" : "")}
                    onClick={handleclick}
                >
                    <Heart className={cn("w-4 h-4 dark:text-white transition-colors duration-150", isClick ? "bg-red-500 fill-red-500 text-white" : " hover:bg-blue-50")} />
                </button>

                <div onClick={handleQuickView} className="block relative cursor-pointer">

                    <div className="aspect-square overflow-hidden animation:toast-in-right">

                        <img
                            src={image}
                            alt={title}
                            className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-300
                            group-hover:scale-105
                        "   
                        />
                    </div>

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-white/60 dark:bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                    >

                        <button
                            className=" flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500 text-black text-[11px] font-finlandica font-bold cursor-pointer "
                            onClick={handleQuickView}
                        >
                            <Eye className="w-4 h-4" />
                            Quick View
                        </button>

                    </div>

                </div>

            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">

                <div>
                    <p className="font-semibold font-finlandica text-xl text-neutral-900 dark:text-white hover:text-amber-500 cursor-pointer">
                        {title}
                    </p>

                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                        ${price}
                    </p>
                </div>

                <button
                    className={cn("w-full py-2 rounded-full bg-amber-500 text-black flex text-xs items-center justify-center gap-2 transition cursor-pointer", isAdding ? "bg-amber-500" : isAdded ? "bg-green-500" : "bg-amber-500")}
                    onClick={handleAddToCart}
                    // disabled={isAdding}
                >
                    {isAdding ? (
                        <div className="flex items-center gap-2">
                            <Loader className="w-4 h-4 animate-spin" />
                            Adding
                        </div>
                    ) : isAdded ? (
                        <div className="flex items-center gap-2 text-white">
                            <IconCheck size={16} />
                            Added!
                        </div>
                    ) : (
                        <>
                            <ShoppingCart className="w-4 h-4" />    
                            Add to Cart
                        </>
                    )}
                </button>

            </div>

        </div>
        <Modal isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)}>
            <div className="grid gap-5 pt-8 md:grid-cols-[1fr_1fr] md:pt-0">
                <img src={image} alt={title} className="aspect-square w-full rounded-2xl object-cover" />
                <div className="flex flex-col justify-center gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-amber-500">Quick View</p>
                        <h2 className="mt-1 font-finlandica text-3xl font-bold text-neutral-900 dark:text-white">{title}</h2>
                        <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white">${price}</p>
                    </div>
                    <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                        Preview this product before opening the full details page.
                    </p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
                            onClick={(event) => handleAddToCart(event)}
                        >
                            Add to Cart
                        </button>
                        <button
                            type="button"
                            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                            onClick={() => onclick(id)}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
        </>
    );
})

import { useCart } from "@/context/CartContext";
import { cn } from "@/utils/cn";
import { IconCheck } from "@tabler/icons-react";
import { Heart, Eye, ShoppingCart, Loader } from "lucide-react";
import { memo, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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

    const { dispatch } = useCart()
    const [isClick, setIsClick] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = useCallback((e: React.MouseEvent) => {
        setIsAdding(true)
        e.stopPropagation();

        setTimeout(() => {
            setIsAdding(false); 
            setIsAdded(true); 
        }, 500)

        setTimeout(() => {
            setIsAdded(false);
            dispatch({type: "ADD_ITEM", payload: {id, title, price, image}})
        }, 1500)

        toast.success("Item added to cart!"); 

    }, [dispatch, setIsAdded, setIsAdding])

    const handleclick = useCallback((e:any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsClick((prev) => !prev); 
    }, [setIsClick])

    return (
        <div className="rounded-2xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-neutral-800" onClick={() => onclick(id)}>

            {/* Image Area */}
            <div className="relative overflow-hidden">

                {/* Heart Button */}
                <button
                    className={cn(
                        "absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-neutral-700/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer", isClick ? "bg-red-500" : "")}
                    onClick={handleclick}
                >
                    <Heart className={cn("w-4 h-4 dark:text-white", isClick ? "bg-red-500 fill-red-500" : "")} />
                </button>

                <Link to={"/"} onClick={(e:any) => e.preventDefault()} className="block relative">

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
                        className="
                        absolute
                        inset-0
                        bg-white/60
                        dark:bg-neutral-900/60
                        opacity-0
                        group-hover:opacity-100
                        transition-all
                        duration-300
                        flex
                        items-center
                        justify-center
                    "
                    >

                        <button
                            className="
                            flex
                            items-center
                            gap-2
                            px-3
                            py-1.5
                            rounded-full
                            bg-amber-500
                            text-black
                            text-[11px]
                            font-finlandica
                            font-bold
                            cursor-pointer
                        "
                        >
                            <Eye className="w-4 h-4" />
                            Quick View
                        </button>

                    </div>

                </Link>

            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">

                <div>
                    <Link
                        className="font-semibold font-finlandica text-xl text-neutral-900 dark:text-white hover:text-amber-500 cursor-pointer"
                    >
                        {title}
                    </Link>

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
    );
})
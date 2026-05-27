import { useCart } from "@/context/CartContext";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { memo } from "react";

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

    function handleAddToCart(e: React.MouseEvent) {
        e.stopPropagation(); 
        dispatch({type: "ADD_ITEM", payload: {id, title, price, image}})
    }

    return (
        <div className="rounded-2xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-neutral-800" onClick={() => onclick(id)}>

            {/* Image Area */}
            <div className="relative overflow-hidden">

                {/* Heart Button */}
                <button
                    className="
                    absolute
                    top-3
                    right-3
                    z-10
                    p-2
                    rounded-full
                    bg-white/80
                    dark:bg-neutral-700/80
                    backdrop-blur-sm
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-300
                "
                >
                    <Heart className="w-4 h-4 dark:text-white" />
                </button>

                <a href="#" onClick={(e) => e.preventDefault()} className="block relative">

                    <div className="aspect-square overflow-hidden">

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

                </a>

            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">

                <div>
                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="
                        font-semibold
                        font-finlandica
                        text-sm
                        text-neutral-900
                        dark:text-white
                        hover:text-amber-500
                        cursor-pointer
                    "
                    >
                        {title}
                    </a>

                    <p className="text-lg font-bold text-neutral-900 dark:text-white">
                        ${price}
                    </p>
                </div>

                <button
                    className="
                    w-full
                    py-2
                    rounded-full
                    bg-amber-500
                    text-black
                    flex
                    text-xs
                    items-center
                    justify-center
                    gap-2
                    transition
                    cursor-pointer
                    "
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                </button>

            </div>

        </div>
    );
})
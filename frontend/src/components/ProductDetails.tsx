import { useCart } from "@/context/CartContext"
import { cn } from "@/utils/cn"
import { IconCheck, IconMinus, IconPlus } from "@tabler/icons-react"
import { HeartIcon, Loader, Share2, StarIcon } from "lucide-react"
import { Fragment, memo, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { product, buttonType } from "@/data/products"

const Ratings = memo(function Ratings({ rating }: { rating: number }) {
    if (rating <= 0) return null;

    return (
        <>
            {Array.from({ length: Math.floor(rating) }, (_, i) => (
                <StarIcon key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
            ))}
        </>
    );
});

export function ProductDetails ({
    product,
    className
}: {
    product: product
    className?: string
}){

    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isClick, setIsClick] = useState(false);

    const { dispatch } = useCart();

    const buttons : buttonType[] = [
        {
            id: 1,
            label: "Add to Wishlist",
            Icon: HeartIcon
        },
        {
            id: 2,
            label: "Share",
            Icon: Share2
        }
    ]

    function handleclickplus () {
        setCount((prev) => prev + 1)
    }

    function handleclickminus () {
        setCount((prev) => (prev > 1 ? prev - 1 : 1));
    }


    const handleclick = useCallback(() => {
        setIsAdding(true); 

        for(let i = 0; i<count; i++){
            dispatch({
                type: "ADD_ITEM", 
                payload: { id: product.id, title: product.name, price: product.price, image: product.image.src}
            })
        }

        setTimeout(() => {
            setIsAdding(false); 
            setIsAdded(true)
        }, 500)

        setTimeout(() => {
            setIsAdded(false); 
        }, 1500)
    }, [count, dispatch, product])

    const handleBuyNow =  useCallback(() => {
        setIsAdding(true);

        for(let i = 0; i< count; i++){
            dispatch({
                type: "ADD_ITEM",
                payload: { id: product.id, title: product.name, price: product.price, image: product.image.src}
            })
        }

        setTimeout(() => {
            setIsAdding(false);
            setIsAdded(true);
        }, 500)

        setTimeout(() => {
            setIsAdded(false);
            navigate("/cart");
        }, 1500)
    }, [count, dispatch, product])

    const handleclickwishlist= useCallback(() =>  {
        setIsClick((prev) => !prev)
    }, [])


    return (
        <section className={cn("grid grid-cols-1 md:grid-cols-2 gap-12 mb-10", className)}>
            <div className="space-y-4">
                <div className="w-full max-w-[500px] mx-auto flex flex-col items-center px-4">
                    <img
                        key={product.image.id}
                        src={product.image.src}
                        alt={product.image.alt}
                        className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg overflow-hidden mb-4"
                    />
                </div>
            </div>


            <div className="px-4">
                <div key={product.id} className="space-y-3">
                    <h1
                        className="font-bold text-2xl font-finlandica text-neutral-900 dark:text-white"
                    >
                        {product.name}
                    </h1>

                    <div className="flex gap-2 items-center">
                        <div className="flex space-x-1 items-center">
                            <Ratings rating={product.rating} />
                        </div>

                        <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                            ({product.rating}) <span className="mx-1">•</span> {product.reviews} reviews
                        </div>
                    </div>

                    <p className="font-bold text-2xl text-neutral-900 dark:text-white tracking-wide">
                        ${Number(product.price).toFixed(2)}
                    </p>

                    <p className="text-sm font-finlandica text-neutral-500 dark:text-neutral-400">
                        {product.details}
                    </p>

                    <hr className="text-neutral-200 dark:text-neutral-700"/>

                    <div className="flex flex-col space-y-1">
                        <h1
                            className="text-sm font-semibold text-neutral-900 dark:text-white font-finlandica"
                        >
                            Quantity
                        </h1>
                        <div className="h-9 w-30 border rounded-full border-neutral-200 dark:border-neutral-700 flex justify-between items-center ">

                            <button
                                className="px-3 hover:bg-amber-100/20 dark:hover:bg-neutral-800 transition-all duration-150 h-full rounded-l-full"
                                onClick={handleclickminus}
                            >
                                <IconMinus className="w-4 h-4 text-neutral-500 dark:text-neutral-400"/>
                            </button>

                            <span
                                className="font-semibold text-neutral-900 dark:text-white text-sm"
                            >
                                {count}
                            </span>

                            <button
                                className="group px-3 hover:bg-amber-100/30 dark:hover:bg-neutral-800 transition-all duration-150 h-full rounded-r-full cursor-pointer"
                                onClick={handleclickplus}
                            >
                                <IconPlus className="w-4 h-4 text-neutral-900 dark:text-white group-hover:text-amber-600 transition-colors duration-150"/>
                            </button>

                        </div>

                        <div className="flex items-center w-full py-2 gap-2 flex-col md:flex-row">
                            {product.button.map((item) => {
                                return (
                                    <div key={item.id} className="w-full">
                                        {(item.label).toLowerCase() === ("add to cart").toLowerCase() ?
                                        <button
                                            className={cn("w-full py-2 text-[13px] font-semibold font-finlandica rounded-full shadow-md dark:shadow-2xl dark:shadow-black/30 flex justify-center items-center transition-colors duration-1000 cursor-pointer", isAdding ? "bg-amber-500" : isAdded ? "bg-green-500" : "bg-amber-500")}
                                            onClick={handleclick}
                                            disabled={isAdding}
                                        >
                                            {isAdding ? (
                                                <div className="flex gap-2">
                                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                                    Adding
                                                </div>
                                            ) : isAdded ? (
                                                <div className="text-white flex gap-1 items-center">
                                                    <IconCheck size={16} />
                                                    Add to cart!
                                                </div>
                                            ) : (
                                                item.label
                                            )}
                                        </button>
                                        :
                                        <button
                                            className={cn("w-full py-2 text-[13px] font-semibold font-finlandica rounded-full shadow-md dark:shadow-2xl dark:shadow-black/30 flex justify-center items-center transition-colors duration-1000 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white cursor-pointer")}
                                            onClick={handleBuyNow}
                                        >
                                            {item.label}
                                        </button>}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="group rounded-full flex gap-10 mt-2 px-2 items-center">
                            {buttons.map((item) => {
                                const Icon = item.Icon;

                                return (
                                    <Fragment key={item.id}>
                                    {(item.label).toLowerCase() === ("add to wishlist").toLowerCase() ?
                                        <button
                                            className={cn("hover:bg-amber-100/50 rounded-full py-1 px-3 flex gap-3 items-center text-[11px] font-semibold font-finlandica text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-300", isClick ? "hover:text-neutral-900 text-red-500": "")}
                                            onClick={handleclickwishlist}
                                        >
                                            {isClick ? (
                                                <div className="group flex gap-3">
                                                    {Icon && <Icon className="w-4 h-4 group-hover:fill-neutral-900 dark:group-hover:fill-neutral-50 fill-red-500" />}
                                                    {item.label}
                                                </div>
                                            ): (
                                                <div className="flex gap-3">
                                                    {Icon && <Icon className="w-4 h-4" />}
                                                    {item.label}
                                                </div>
                                            )}
                                        </button>
                                        :
                                        <button className="hover:bg-amber-100/50 dark:hover:bg-neutral-800 rounded-full py-1 px-3 flex gap-3 items-center text-[11px] font-semibold font-finlandica text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-300">
                                            {Icon && <Icon className="w-4 h-4" />}
                                            {item.label}
                                        </button>
                                    }
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

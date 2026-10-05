import { CartItemList } from "@/components/CartItemList"
import { useCart } from "@/context/CartContext"
import { useCartActions } from "@/hooks"
import { Footer, Navbar } from "@/layouts"
import { cn } from "@/utils/cn"
import { IconTrash } from "@tabler/icons-react"
import { ArrowLeft, Heart, Shield, ShoppingBag, Truck, TruckIcon } from "lucide-react"
import type { ComponentType } from "react"
import { Link, useNavigate } from "react-router-dom"

interface exportType {
    className?: string
}

interface orderSummaryPoint {
    id: number
    description: string
    Icon: ComponentType<{className?: string}>
}

interface Feature {
    id: number
    description: string
    Icon: React.ComponentType<{className?: string}>
}

const ORDER_SUMMARY_POINTS: orderSummaryPoint[] = [
    {
        id: 1, 
        description: "Secure SSL checkout", 
        Icon: Shield
    }, 
    {
        id: 2, 
        description: "Free returns within 30 days", 
        Icon: Truck
    }, 
    {
        id: 3, 
        description: "24/7 customer support", 
        Icon: Heart
    }
];

const FEATURES: Feature[] = [
    {
        id: 1, 
        description: "Free shipping over $50", 
        Icon: TruckIcon
    }, 
    {
        id: 2, 
        description: "Secure checkout", 
        Icon: Shield
    }
];

export function CartPage ({className}: exportType) {
    const { cart, totalCountMemoised, totalPriceMemoised } = useCart()
    const { removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCartActions(); 
    const navigate = useNavigate()

    function handleProductRedirect() {
        navigate(`/`); 
    }
    

    return (
        <section className={cn("min-h-screen w-full bg-neutral-50 dark:bg-neutral-900", className)}>
            <Navbar className="z-10" />

            {cart.length === 0 ? (
                <section className="flex flex-col items-center justify-center my-40 gap-4">
                    <div className="space-y-4 flex flex-col items-center text-center ml-10">
                        <ShoppingBag size={80} className="text-gray-500 dark:text-neutral-400"/>
                        <p className="text-3xl font-bold text-neutral-900 dark:text-white font-finlandica">Your cart is empty</p>
                        <p className="text-base md:text-lg font-medium font-finlandica text-neutral-500 dark:text-neutral-400">Looks like you haven't added anything to your cart yet.</p>
                        <button onClick={handleProductRedirect} className="mt-3 font-semibold px-6 py-2.5 bg-amber-500 rounded-full text-sm font-finlandica hover:bg-amber-500/90 cursor-pointer text-neutral-900 capitalize">continue Shopping</button>
                        <div className="flex gap-8">
                            {FEATURES.map((item) => {
                                const Icon = item.Icon;

                                return (
                                    <div key={item.id} className="flex gap-2 items-center text-sm font-finlandica text-neutral-500 dark:text-neutral-400">
                                        <Icon className="w-4 h-4"/>
                                        <p>{item.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="flex-1 max-w-378 mx-auto px-5 mb-8  mt-10">
                    <div className="flex items-center justify-between">
                        <div className="gap-3 flex flex-col items-start">
                            <h1 className="text-2xl md:text-3xl font-finlandica font-bold dark:text-white">Shopping Cart</h1>
                            <p className="text-sm font-finlandica font-medium text-neutral-500 dark:text-neutral-400">{totalCountMemoised} {totalCountMemoised === 1 ? "item" : "items"} in your cart</p>
                        </div>
                        <Link to={"/"} className="flex gap-2 items-center text-sm text-neutral-500 dark:text-neutral-400 font-finlandica font-medium">
                            <ArrowLeft size={16} />
                            Continue Shopping
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 w-full mt-10">
                        <CartItemList>
                            <div className="flex items-center justify-between px-2">
                                <h1 className="text-base font-semibold text-neutral-900 dark:text-white font-finlandica ">Cart Items</h1>
                                <button className="group flex text-sm text-neutral-500 dark:text-neutral-400 font-medium font-finlandica capitalize gap-3 items-center hover:bg-amber-100/50 dark:hover:bg-neutral-700 py-1 px-2 rounded-full transition-colors duration-300 hover:text-red-500" onClick={() => clearCart()}>
                                    <IconTrash size={14} className="group-hover:text-red-500"/>
                                    clear all 
                                </button>
                            </div>

                            <div>
                                {cart.map((item, index) => (
                                    <CartItemList.Item
                                        key={item.id}
                                        item={item}
                                        showDivider={index < cart.length - 1}
                                        onRemove={removeItem}
                                        onIncrease={increaseQuantity}
                                        onDecrease={decreaseQuantity}
                                    />
                                ))}
                            </div>
                        </CartItemList>

                        <CartItemList.Summary
                            totalCount={totalCountMemoised}
                            totalPrice={totalPriceMemoised}
                            points={ORDER_SUMMARY_POINTS}
                        />
                    </div>

                    <div className="mt-15 border rounded-3xl border-neutral-200 dark:border-neutral-700 shadow-md dark:shadow-2xl dark:shadow-black/30 px-5 py-4 text-base flex flex-col bg-linear-to-br from-transparent via-transparent to-transparent dark:from-neutral-800/30 dark:via-neutral-900 dark:to-neutral-950">
                        <div className="flex items-center w-full mb-10"> 
                            <h1 className="text-neutral-900 dark:text-white font-semibold font-finlandica">You might also like</h1>
                        </div>

                        <div className="flex items-center justify-center mb-8 mt-3 flex-col gap-3 ">
                            <p className="text-base text-neutral-500 dark:text-neutral-400 font-finlandica">Discover more products that match your style</p>
                            <button className="border px-3 py-1.5 rounded-full border-neutral-200 dark:border-neutral-700 shadow text-sm font-semibold font-finlandica capitalize hover:bg-amber-100/30 dark:hover:bg-neutral-700 hover:text-amber-700 dark:text-white transition-colors duration-300 cursor-pointer" onClick={handleProductRedirect}>Browse products</button>
                        </div>
                    </div>
                </section>
            )}

            <hr className="text-neutral-200 dark:text-neutral-700"/>

            <Footer className="" />
        </section>
    )
}

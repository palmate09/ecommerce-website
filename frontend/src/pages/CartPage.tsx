import { useCart } from "@/context/CartContext"
import { Footer, Navbar } from "@/layouts"
import { cn } from "@/utils/cn"
import { IconCreditCardPay, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react"
import { ArrowLeft, Heart, Shield, ShoppingBag, Truck, TruckIcon } from "lucide-react"
import { Fragment, type ComponentType } from "react"
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

export function CartPage ({className}: exportType
) {

    const { cart, dispatch, totalCountMemoised, totalPriceMemoised } = useCart()
    const navigate = useNavigate()

    const tax = totalPriceMemoised * 0.08

    const orderSummaryPoints : orderSummaryPoint[] = [
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
    ]

    const features: Feature[] = [
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
    ]

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
                            {features.map((item) => {
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
                        <div className="flex-2 h-fit border rounded-2xl border-neutral-200 dark:border-neutral-700 p-5 shadow dark:shadow-2xl dark:shadow-black/30 py-6">
                            <div className="flex items-center justify-between px-2">
                                <h1 className="text-base font-semibold text-neutral-900 dark:text-white font-finlandica ">Cart Items</h1>
                                <button className="group flex text-sm text-neutral-500 dark:text-neutral-400 font-medium font-finlandica capitalize gap-3 items-center hover:bg-amber-100/50 dark:hover:bg-neutral-700 py-1 px-2 rounded-full transition-colors duration-300 hover:text-red-500" onClick={() => dispatch({type: "CLEAR_CART"})}>
                                    <IconTrash size={14} className="group-hover:text-red-500"/>
                                    clear all 
                                </button>
                            </div>

                            <div>
                                {cart.map((item, index) => (
                                    <Fragment key={item.id}>
                                        <div className="flex items-center py-2 gap-3">
                                            <div className="w-20 h-auto mt-4 ml-4 overflow-hidden ">
                                                <img src={item.image} alt={item.title} className="w-18 rounded-2xl bg-cover h-19" />
                                            </div>
            
                                            <div className="w-full mt-3 px-2 overflow-hidden flex flex-col  gap-2">
                                                <div className="flex justify-between">
                                                    <div className="flex flex-col gap-1">
                                                        <h2 className="text-base font-semibold text-neutral-900 dark:text-white font-finlandica">{item.title}</h2>
                                                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">${Number(item.price).toFixed(2)} <span className="font-finlandica">each</span></p>
                                                    </div>
                                                    <button className="cursor-pointer" onClick={() => dispatch({type: "REMOVE_ITEM", pyload: item.id})}>
                                                        <IconTrash size={15} className="text-neutral-500 dark:text-neutral-400"/>
                                                    </button>
                                                </div>
            
                                                <div className="flex justify-between items-center">
                                                    <div className="rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                                                        <button className={cn("group hover:bg-amber-100/50 dark:hover:bg-neutral-700 h-full rounded-l-full px-2 transition-colors duration-300 font-bold py-1.5")}
                                                        onClick={() => dispatch({type: "DECREASE", pyload: item.id})}>
                                                            <IconMinus size={13} className={cn("group-hover:text-amber-500" , item.quantity === 1 ? "text-neutral-400" : "text-neutral-900 dark:text-white")}/>
                                                        </button>
                                                        <p className="text-sm font-medium px-3 dark:text-white">{item.quantity}</p>
                                                        <button className="group hover:bg-amber-100/50 dark:hover:bg-neutral-700 h-full rounded-r-full px-2 transition-colors duration-300"
                                                        onClick={() => dispatch({type: "INCREASE", pyload: item.id})}>
                                                            <IconPlus size={13} className="text-neutral-900 dark:text-white group-hover:text-amber-500"/>
                                                        </button>
                                                    </div>

                                                    <p className="font-bold text-neutral-900 dark:text-white text-lg md:text-xl">
                                                        ${Number(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {index < cart.length - 1 && <hr className="text-neutral-200 dark:text-neutral-700" />}
                                    </Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 h-auto rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow dark:shadow-2xl dark:shadow-black/30 px-5 py-6">
                            <h1 className="text-base md:text-lg font-semibold font-finlandica text-neutral-900 dark:text-white">Order Summary</h1>

                            <div className="flex items-center justify-between text-sm mt-3 text-neutral-400 dark:text-neutral-500 font-medium">
                                <h1>Subtotal ({totalCountMemoised} items)</h1>
                                <p className="text-neutral-900 dark:text-white">${totalPriceMemoised.toFixed(2)}</p>
                            </div>

                            <div className="flex items-center justify-between text-sm mt-3 text-neutral-400 dark:text-neutral-500 font-medium">
                                <h1>Shipping</h1>
                                <p className="text-neutral-900 dark:text-white px-2 text-sm md:text-base bg-neutral-200/60 dark:bg-neutral-700 rounded-full py-0.5">Free</p>
                            </div>

                            <div className="flex items-center justify-between text-sm mt-3 text-neutral-400 dark:text-neutral-500 font-medium">
                                <h1>Tax</h1>
                                <p className="text-neutral-900 dark:text-white">${tax.toFixed(2)}</p>
                            </div>

                            <hr className="mt-3 text-neutral-200 mb-3 dark:text-neutral-700"/>

                            <div className="flex items-center justify-between text-sm mt-5 text-neutral-400 dark:text-neutral-500 font-medium mb-5">
                                <h1 className="text-base font-semibold text-neutral-900 dark:text-white font-finlandica">Total</h1>
                                <p className="font-bold text-base text-amber-500">${(totalPriceMemoised + tax).toFixed(2)}</p>
                            </div>

                            <button className="w-full rounded-full bg-amber-500 flex items-center justify-center py-2 text-sm md:text-base font-medium gap-2 cursor-pointer hover:bg-amber-500/95">
                                <IconCreditCardPay size={16}/>
                                Proceed to Checkout
                            </button>
                            

                            <hr className="mt-5 text-neutral-200 dark:text-neutral-700"/>

                            {orderSummaryPoints.map((item) => {
                                const Icon = item.Icon

                                return (
                                    <div key={item.id} className="flex items-center gap-4 mt-4">
                                        {item.id === 1 ? <Icon className="w-4 h-4 text-green-500"/>: item.id === 2 ? <Icon className="w-4 h-4 text-blue-500" />: <Icon className="w-4 h-4 text-red-500"/>}
                                        <p className="text-sm leading-none text-neutral-500 dark:text-neutral-400 font-finlandica">{item.description}</p>
                                    </div>
                                )
                            })}
                            
                        </div>
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
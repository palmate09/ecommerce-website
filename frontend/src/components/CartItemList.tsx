import type { cartItem } from "@/context/CartContext";
import { cn } from "@/utils/cn";
import { IconCreditCardPay, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import type { ComponentType, ReactNode } from "react";

type CartItemListProps = {
    children: ReactNode;
    className?: string;
}

type CartItemProps = {
    item: cartItem;
    showDivider?: boolean;
    onRemove: (id: number) => void;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
}

type SummaryPoint = {
    id: number;
    description: string;
    Icon: ComponentType<{className?: string}>;
}

type CartSummaryProps = {
    totalCount: number;
    totalPrice: number;
    points: SummaryPoint[];
}

function CartItemListRoot({children, className}: CartItemListProps) {
    return (
        <div className={cn("flex-2 h-fit border rounded-2xl border-neutral-200 dark:border-neutral-700 p-5 shadow dark:shadow-2xl dark:shadow-black/30 py-6", className)}>
            {children}
        </div>
    )
}

function CartItemListItem({item, showDivider, onRemove, onIncrease, onDecrease}: CartItemProps) {
    return (
        <>
            <div className="flex items-center py-2 gap-3">
                <div className="w-20 h-auto mt-4 ml-4 overflow-hidden ">
                    <img src={item.image} alt={item.title} className="w-18 rounded-2xl bg-cover h-19" />
                </div>

                <div className="w-full mt-3 px-2 overflow-hidden flex flex-col gap-2">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-base font-semibold text-neutral-900 dark:text-white font-finlandica">{item.title}</h2>
                            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">${Number(item.price).toFixed(2)} <span className="font-finlandica">each</span></p>
                        </div>
                        <button className="cursor-pointer" onClick={() => onRemove(item.id)}>
                            <IconTrash size={15} className="text-neutral-500 dark:text-neutral-400"/>
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                            <button className={cn("group hover:bg-amber-100/50 dark:hover:bg-neutral-700 h-full rounded-l-full px-2 transition-colors duration-300 font-bold py-1.5")}
                            onClick={() => onDecrease(item.id)}>
                                <IconMinus size={13} className={cn("group-hover:text-amber-500" , item.quantity === 1 ? "text-neutral-400" : "text-neutral-900 dark:text-white")}/>
                            </button>
                            <p className="text-sm font-medium px-3 dark:text-white">{item.quantity}</p>
                            <button className="group hover:bg-amber-100/50 dark:hover:bg-neutral-700 h-full rounded-r-full px-2 transition-colors duration-300"
                            onClick={() => onIncrease(item.id)}>
                                <IconPlus size={13} className="text-neutral-900 dark:text-white group-hover:text-amber-500"/>
                            </button>
                        </div>

                        <p className="font-bold text-neutral-900 dark:text-white text-lg md:text-xl">
                            ${Number(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
            {showDivider && <hr className="text-neutral-200 dark:text-neutral-700" />}
        </>
    )
}

function CartItemListSummary({totalCount, totalPrice, points}: CartSummaryProps) {
    const tax = totalPrice * 0.08;

    return (
        <div className="flex-1 h-auto rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow dark:shadow-2xl dark:shadow-black/30 px-5 py-6">
            <h1 className="text-base md:text-lg font-semibold font-finlandica text-neutral-900 dark:text-white">Order Summary</h1>

            <div className="flex items-center justify-between text-sm mt-3 text-neutral-400 dark:text-neutral-500 font-medium">
                <h1>Subtotal ({totalCount} items)</h1>
                <p className="text-neutral-900 dark:text-white">${totalPrice.toFixed(2)}</p>
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
                <p className="font-bold text-base text-amber-500">${(totalPrice + tax).toFixed(2)}</p>
            </div>

            <button className="w-full rounded-full bg-amber-500 flex items-center justify-center py-2 text-sm md:text-base font-medium gap-2 cursor-pointer hover:bg-amber-500/95">
                <IconCreditCardPay size={16}/>
                Proceed to Checkout
            </button>

            <hr className="mt-5 text-neutral-200 dark:text-neutral-700"/>

            {points.map((item) => {
                const Icon = item.Icon

                return (
                    <div key={item.id} className="flex items-center gap-4 mt-4">
                        {item.id === 1 ? <Icon className="w-4 h-4 text-green-500"/>: item.id === 2 ? <Icon className="w-4 h-4 text-blue-500" />: <Icon className="w-4 h-4 text-red-500"/>}
                        <p className="text-sm leading-none text-neutral-500 dark:text-neutral-400 font-finlandica">{item.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export const CartItemList = Object.assign(CartItemListRoot, {
    Item: CartItemListItem,
    Summary: CartItemListSummary,
});


import { ProductDetails } from "@/components"
import { Footer, Navbar } from "@/layouts"
import { cn } from "@/utils/cn"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { products } from "@/data/products"
import { infoItems } from "@/data/productInfo"
import { relatedProducts } from "@/data/relatedProducts"

interface routeType {
    className?: string
}

export function ProductPage({className}: routeType) {

    const { id } = useParams()

    const product = products.find(p => p.id === Number(id))

    if (!product) {
        return (
            <section className={cn('min-h-screen w-full flex flex-col bg-white dark:bg-neutral-900', className)}>
                <Navbar className="z-20 bg-white dark:bg-neutral-900"/>
                <div className="flex flex-col items-center justify-center flex-1 gap-4">
                    <h1 className="text-2xl font-bold font-finlandica dark:text-white">Product not found</h1>
                    <Link to="/" className="text-sm font-semibold text-amber-500">Return to shop</Link>
                </div>
                <Footer className=""/>
            </section>
        )
    }

    return (
        <section className={cn('min-h-screen w-full flex flex-col bg-white dark:bg-neutral-900', className)}>
            <Navbar className="z-20 bg-white dark:bg-neutral-900"/>
            <section className="max-w-363 w-full min-h-screen mx-auto mb-10 px-4">
                <div className="mb-5 mt-10 flex items-start w-full h-10 ">
                    <Link
                        to={"/"}
                        className="text-xs font-semibold gap-2 font-finlandica flex items-center px-3 py-2 w-fit cursor-pointer hover:bg-amber-100/50 dark:hover:bg-neutral-800 hover:text-neutral-900 transition-all duration-150 rounded-full leading-none tracking-tight text-gray-500 dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                        <ArrowLeft size={13} />
                        Return to shop
                    </Link>
                </div>

                <ProductDetails
                    key={product.id}
                    product={product}
                />

                <div className="border py-8 rounded-3xl border-neutral-200 dark:border-neutral-700 w-full shadow-md dark:shadow-2xl dark:shadow-black/30 px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-6 md:gap-10">
                        {infoItems.map((item) => {
                            const Icon = item.Icon

                            return (
                                <div key={item.id} className="flex gap-5 items-center px-2 sm:px-10 justify-start w-full">
                                    <Icon className="bg-orange-300/20 text-amber-500 w-9 h-10 p-1 px-2 py-2 rounded-full"/>
                                    <div className="flex flex-col item-center gap-2">
                                        <h1 className="text-sm font-bold font-finlandica capitalize leading-none text-neutral-900 dark:text-white">
                                            {item.label}
                                        </h1>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-finlandica">
                                            {item.details}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <section className="w-full mt-15 mb-10">
                    <div className="w-full flex justify-between items-center mb-10">
                        <h1 className="text-xl tracking-tight font-bold font-finlandica dark:text-white">Related Products</h1>
                        <Link to={"/"} className="text-sm tracking-tight capitalize  font-finlandica font-medium text-amber-500 px-2">
                            view all
                        </Link>
                    </div>

                    {/* Related products section  */}                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-full">
                        {relatedProducts
                            .filter((item) => item.id !== product.id)
                            .slice(0, 4)
                            .map((item) => {
                            return (
                                <Link key={item.id} to={`/product/${item.id}`} onClick={() => window.scrollTo(0, 0)} className="h-auto md:h-100 border rounded-2xl border-neutral-200 dark:border-neutral-700 shadow-md dark:shadow-2xl dark:shadow-black/30 flex flex-col cursor-pointer dark:bg-neutral-800">
                                    <div key={item.image.id} className="overflow-hidden rounded-t-2xl group relative object-cover">
                                        <img src={item.image.src} alt={item.image.alt} className="h-60 md:h-80 object-cover w-full group-hover:scale-105 transition-transform duration-300 overflow-hidden"/>
                                    </div>

                                    <div className="rounded-b-2xl px-3 mt-3 space-y-2 flex items-start flex-col">
                                        <h1 className="text-sm font-semibold text-neutral-900 dark:text-white">{item.label}</h1>
                                        <p className="text-sm font-bold text-amber-500 ">${Number(item.price).toFixed(2)}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>
            </section>

            <hr className="text-neutral-200 mt-15 dark:text-neutral-700"/>

            <Footer/>
        </section>
    )
}

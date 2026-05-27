import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/layouts/Footer";
import { Navbar } from "@/layouts/Navbar";
import { cn } from "@/utils/cn";
import { products } from "@/data/products";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

interface LandingPageType {
    className?: string;
} 

export function LandingPage({className}: LandingPageType) {
    
    const navigate = useNavigate(); 
    
    const handleclick= useCallback((id: number) => {
        navigate(`/product/${id}`); 
    }, [])

    return (
        <section className={cn("min-h-screen w-full bg-neutral-50 dark:bg-neutral-900", className)}>
            <Navbar className="z-10"/>

            <section className="flex-1 max-w-7xl mx-auto px-5 mb-15">
                <div className="mt-10 mb-10 max-w-lg mx-auto px-10 pt-5 flex items-center flex-col gap-2 text-center">
                    <h1 className="font-finlandica text-4xl font-semibold text-amber-500 tracking-tight">
                        Step Into Style
                    </h1>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        Discover our latest collection of premium sneakers
                        <br />
                        — comfort, design, and performance in every pair.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
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

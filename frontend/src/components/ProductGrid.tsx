import { ProductCard } from "@/components/ProductCard";
import type { product } from "@/data/products";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type ProductGridProps = {
    children: ReactNode;
    className?: string;
}

type ProductGridItemProps = {
    product: product;
    onSelect: (id: number) => void;
}

function ProductGridRoot({children, className}: ProductGridProps) {
    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8", className)}>
            {children}
        </div>
    )
}

function ProductGridItem({product, onSelect}: ProductGridItemProps) {
    return (
        <ProductCard
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image.src}
            onclick={onSelect}
        />
    )
}

export const ProductGrid = Object.assign(ProductGridRoot, {
    Item: ProductGridItem,
});


import { IconShoppingCart } from "@tabler/icons-react"

export interface productImage {
    id: number
    alt: string
    src: string
}

export interface buttonType {
    id: number
    label: string
    Icon?: React.ElementType<{ className?: string }>
}

export interface product {
    id: number
    title: string
    name: string
    price: number
    rating: number
    reviews: number
    details: string
    image: productImage
    button: buttonType[]
}

export const products: product[] = [
    {
        id: 1,
        title: "AirFlex Runner",
        name: "AirFlex Runner",
        rating: 4.8,
        reviews: 127,
        price: 89.00,
        details: "Lightweight running sneakers designed for speed and comfort. Breathable mesh and durable sole.",
        image: {
            id: 1,
            alt: "Airflex runner",
            src: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=687&auto=format&fit=crop"
        },
        button: [
            { id: 1, label: "Add to cart", Icon: IconShoppingCart },
            { id: 2, label: "Buy Now" }
        ]
    },
    {
        id: 2,
        title: "Urban Sneaker",
        name: "Sport Elite",
        rating: 4.8,
        reviews: 127,
        price: 119.00,
        details: "Retro-inspired sneakers with a tennis court vibe. Perfect balance between comfort and style.",
        image: {
            id: 2,
            alt: "Sport Elite",
            src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170"
        },
        button: [
            { id: 1, label: "Add to cart", Icon: IconShoppingCart },
            { id: 2, label: "Buy Now" }
        ]
    },
    {
        id: 3,
        title: "Sport Elite",
        name: "Urban Street Pro",
        rating: 4.8,
        reviews: 127,
        price: 119.00,
        details: "Minimalist sneakers for everyday wear. Premium leather with a modern urban look.",
        image: {
            id: 3,
            alt: "Urban Street Pro",
            src: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1025"
        },
        button: [
            { id: 1, label: "Add to cart", Icon: IconShoppingCart },
            { id: 2, label: "Buy Now" }
        ]
    },
    {
        id: 4,
        title: "AeroFlex Lite",
        name: "AeroFlex Lite",
        rating: 4.8,
        reviews: 127,
        price: 75.00,
        details: "Performance sneakers with bold details. Responsive cushioning for all-day energy.",
        image: {
            id: 4,
            alt: "AeroFlex Lite",
            src: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        button: [
            { id: 1, label: "Add to cart", Icon: IconShoppingCart },
            { id: 2, label: "Buy Now" }
        ]
    },
    {
        id: 5,
        title: "Zenith Flow",
        name: "Zenith Flow",
        rating: 4.8,
        reviews: 129,
        price: 119.00,
        details: "Minimalist sneakers for everyday wear. Premium leather with a modern urban look.",
        image: {
            id: 5,
            alt: "Zenith Flow",
            src: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        button: [
            { id: 1, label: "Add to cart", Icon: IconShoppingCart },
            { id: 2, label: "Buy Now" }
        ]
    },
    {
        id: 6,
        title: "Pulse React",
        name: "Pulse React",
        rating: 4.8,
        reviews: 127,
        price: 119.00,
        details: "Premium lifestyle sneakers blending high-quality knit material and futuristic design.",
        image: {
            id: 6,
            alt: "Pulse React",
            src: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        button: [
            { id: 1, label: "Add to cart", Icon: IconShoppingCart },
            { id: 2, label: "Buy Now" }
        ]
    }
]

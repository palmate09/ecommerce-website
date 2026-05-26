
import type { productImage } from "./products"

export interface relatedProduct {
    id: number
    image: productImage
    label: string
    price: number
}

export const relatedProducts: relatedProduct[] = [
    {
        id: 1,
        image: {
            id: 1,
            src: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=687&auto=format&fit=crop",
            alt: "AirFlex Runner"
        },
        label: "AirFlex Runner",
        price: 89.00
    },
    {
        id: 2,
        image: {
            id: 2,
            src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170",
            alt: "Urban Sneaker"
        },
        label: "Urban Sneaker",
        price: 199.00
    },
    {
        id: 3,
        image: {
            id: 3,
            src: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1025",
            alt: "Sport Elite"
        },
        label: "Sport Elite",
        price: 99.00
    },
    {
        id: 4,
        image: {
            id: 4,
            src: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "AeroFlex Lite"
        },
        label: "AeroFlex Lite",
        price: 75.00
    },
    {
        id: 5,
        image: {
            id: 5,
            src: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Zenith Flow"
        },
        label: "Zenith Flow",
        price: 129.00
    },
    {
        id: 6,
        image: {
            id: 6,
            src: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Pulse React"
        },
        label: "Pulse React",
        price: 99.00
    }
]

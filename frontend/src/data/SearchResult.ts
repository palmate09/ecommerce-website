import { IconHome, IconPhone } from "@tabler/icons-react"
import { products, type productImage } from "./products"

interface SearchResult {
    id: number
    label: string
    sectionSearchResult: sectionSearchResult[]
}

interface sectionSearchResult {
    id: number
    Icon?: React.ComponentType<{className?: string, size?: number}>
    Img?: productImage
    page: string
    description?: string
}

export const SearchResult: SearchResult[] = [
    {
        id: 1, 
        label: "pages", 
        sectionSearchResult: [
            {
                id: 1, 
                Icon: IconHome,
                page: "Home"
            }, 
            {
                id: 2, 
                Icon: IconPhone, 
                page: "contact"
            }
        ]
    },

    {
        id: 2, 
        label: "products", 
        sectionSearchResult: products.map((product) => ({
            id: product.id,
            Img: product.image, 
            page: product.title,
            description: product.details
        }))
    }
]
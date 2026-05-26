
import { TruckIcon, Shield, RotateCcw } from "lucide-react"
import type { ComponentType } from "react"

export interface infoItem {
    id: number
    Icon: ComponentType<{ className?: string }>
    label: string
    details: string
}

export const infoItems: infoItem[] = [
    {
        id: 1,
        Icon: TruckIcon,
        label: "free shipping",
        details: "On orders over $50"
    },
    {
        id: 2,
        Icon: Shield,
        label: "Warranty",
        details: "1 year guarntee"
    },
    {
        id: 3,
        Icon: RotateCcw,
        label: "Easy Returns",
        details: "30-day return policy"
    }
]

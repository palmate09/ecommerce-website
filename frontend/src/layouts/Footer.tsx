import { IconArrowNarrowRight, IconBrandGithub, IconBrandInstagram, IconBrandMeta, IconBrandTwitter, IconHeart, IconMail, IconMapPin, IconPhoneCalling  } from "@tabler/icons-react"
import { cn } from "@/utils/cn"
import appstoreIcon from "@/assets/apple_logo.png"
import googleplayIcon from "@/assets/google_play.png"
import { Link } from "react-router-dom"
import { memo } from "react"

interface exportType {
    className?: string
}

interface infoItem {
    id: number 
    description: string 
    icon: React.ComponentType<{className?: string}>
}

interface socialIcon {
    id: number
    path: string 
    icon: React.ComponentType<{className?: string}>
}

interface items {
    id:number
    label: string 
    path: string
}

interface footerItem {
    id: number
    path: string
    label: string
    item: Array<items>
}

interface termItem {
    id: number
    path: string
    item: string
}

interface storeButton {
    id: number
    path: string 
    label: string
    description: string
    src: string
    alt: string
}

export const Footer = memo((
    {className}: exportType 
) => {

    const infoItems: infoItem[] = [
        {
          id: 1, 
          description: "123 Fashion Street, Style City, SC 12345",  
          icon: IconMapPin  
        },
        {
          id: 2, 
          description: "+1 (555) 123-4567",  
          icon: IconPhoneCalling  
        },

        {
          id: 3, 
          description: "hello@bloomshop.com",  
          icon: IconMail  
        },
    ]

    const socialIcons: socialIcon[] = [
        {
            id: 1, 
            path: "www://facebook.com", 
            icon: IconBrandMeta
        },

        {
            id: 2, 
            path: "www://facebook.com", 
            icon: IconBrandTwitter
        },

        {
            id: 3, 
            path: "www://facebook.com", 
            icon: IconBrandInstagram
        },

        {
            id: 4, 
            path: "www://facebook.com", 
            icon: IconBrandGithub
        },
    ]

    const footerItems: footerItem[] = [
        {
            id: 1, 
            path: "/", 
            label: "shop", 
            item: [
                {id:1, label: "All Products", path: "/"},
                {id:2, label: "new arrivals", path: "/"}, 
                {id:3, label: "sale", path: "/"},
                {id:4, label: "Featured", path: "/"}
            ]
        }, 

        {
            id: 2, 
            path: "/", 
            label: "customer care", 
            item: [
                {id:1, label: "New Arrivals", path: "/"},
                {id:2, label: "help center", path: "/"},
                {id:3, label: "shipping info", path: "/"},
                {id:4, label: "returns & exchanges", path: "/"}
            ]
        }, 

        {
            id: 3, 
            path: "/", 
            label: "company", 
            item: [
                {id:1, label: "About Us", path: "/"},
                {id:2, label: "Carrers", path: "/"},
                {id:3, label: "Blog", path: "/"},
                {id:4, label: "Press", path: "/"}
            ]
        },

        {
            id: 4, 
            path: "/", 
            label: "legal", 
            item: [
                {id:1, label: "Privacy Policy", path: "/"},
                {id:2, label: "Terms & conditions", path: "/"},
                {id:3, label: "cookie policy", path: "/"},
                {id:4, label: "accessibility", path: "/"}
            ]
        }
    ]

    const termItems: termItem[] = [
        {
            id: 1, 
            path: "/",
            item: "privacy"
        }, 
        {
            id: 2, 
            path: "/",
            item: "terms"
        }, 
        {
            id:3, 
            path: "/",
            item: "cookies"
        }
    ]

    const storeButtons: storeButton[] = [
        {
            id: 1, 
            path: "/", 
            label: "app store", 
            description: "Download on the", 
            src: appstoreIcon, 
            alt: "app store icon"
        },

        {
            id: 2, 
            path: "/", 
            label: "google play", 
            description: "get it on", 
            src: googleplayIcon, 
            alt: "app store icon"
        }
    ]

    return (
        <footer className={cn("mt-10 max-w-7xl mx-auto px-5", className)}>
            <div className="space-y-3 text-center mb-10">
                <h1 className="font-finlandica font-bold text-[22px] tracking-tight text-neutral-950 dark:text-white">Stay in the Loop</h1>
                <p className="font-finlandica text-neutral-600 text-sm dark:text-neutral-400">Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.</p>
                <form className="flex items-center justify-center gap-3 h-7">
                    <input type="text" required className="border border-neutral-300 dark:border-neutral-700 shadow-md leading-none px-1 py-1.5 rounded-full pl-3 text-xs flex items-end w-75 focus:outline-none focus:ring focus:ring-amber-500 dark:text-white" placeholder="Enter your email"/>
                    <button type="submit" className="rounded-[14px] bg-amber-500 px-3 h-full hover:bg-amber-500/90">
                        <IconArrowNarrowRight stroke={2} size={17} className="dark:text-white"/>
                    </button>
                </form>
            </div>

            <hr className="text-neutral-200 mb-10 dark:text-neutral-700"/>

            <section className="w-full flex flex-col lg:flex-row items-start gap-10 lg:gap-25 mb-20">
                <div className="w-full lg:flex-1 space-y-5">
                    <div className="">
                        <div className="selection:bg-transparent cursor-pointer font-semibold font-finlandica text-xl">
                            <Link to={"/"}  className="text-neutral-900 dark:text-white">BLOOM</Link>
                            <span className="text-amber-500">SHOP</span>
                        </div>

                        <p className="font-finlandica text-[13px] font-medium tracking-tight text-neutral-700/80 dark:text-neutral-400">
                            Discover unique products that inspire your lifestyle. 
                            Quality craftsmanship meets modern design.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {infoItems.map((item) => {
                            const Icon = item.icon; 

                            return (
                                <div key={item.id} className="flex items-center gap-2">
                                    <Icon className="w-4 h-3.5 text-amber-500"/>

                                    <p className="text-xs text-neutral-500 font-finlandica leading-none dark:text-neutral-400">{item.description}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex justify-start gap-2 ml-1 ">
                        {socialIcons.map((item) => {

                            const Icon = item.icon; 

                            return (
                                <a key={item.id} href={item.path} className="p-1">
                                    <Icon className="w-7 h-7 bg-neutral-200/40 dark:bg-neutral-900 p-2 rounded-full dark:text-white dark:ring dark:ring-neutral-400"/>
                                </a>
                            )
                        })}
                    </div>
                </div>

                <div className="w-full lg:flex-3 flex flex-col">
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 ">
                        {footerItems.map((item) => {
                            const Label = item.label
                            
                            return (
                                <div key={item.id} className="space-y-3">
                                    <h1 className="text-[13px] uppercase font-finlandica font-semibold tracking-tight leading-none dark:text-white">{Label}</h1>
                                    {item.item.map((item) => {
                                        const itemLabel = item.label; 

                                        return (
                                            <a key={item.id} href={item.path} className="flex text-[12px] text-neutral-500 font-finlandica capitalize cursor-pointer dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white">{itemLabel}</a>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-8 flex justify-start lg:justify-end flex-wrap gap-4 w-full">
                        {storeButtons.map((item) => (
                            <button
                                key={item.id}
                                className="w-40 px-2 py-2 bg-neutral-800 hover:bg-neutral-950 rounded-lg flex items-center gap-3 ring-2 ring-neutral-700 cursor-pointer active:scale-90 transition-all duration-300 "
                            >
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-8 h-8 shrink-0"
                                />

                                <div className="flex flex-col items-start leading-tight">
                                    {item.label === "google play" ? <p className="text-[11px] text-neutral-300 uppercase">{item.description}</p>: <p className="text-[11px] text-neutral-300">{item.description}</p>}

                                    <h1 className="text-white text-base font-semibold font-finlandica capitalize">
                                        {item.label}
                                    </h1>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

            </section>

            <hr className="text-neutral-200 dark:text-neutral-700"/>
            
            <section className="mt-10 flex items-center justify-between flex-col lg:flex-row gap-2 pb-5">
                <div className="flex flex-col text-xs text-neutral-500 font-finlandica dark:text-neutral-300">
                    <div className="flex items-center">
                        &copy; 2025 BloomShop&trade;. Made with <span className="mx-1"><IconHeart stroke={2} size={16} fill="oklch(63.7% 0.237 25.331)" className="text-red-500"/></span>
                        All Rights Reserved. <br />
                    </div>

                    <div className="flex items-center gap-1">
                        Developed by <Link to={"/"} className="font-bold">Bloomtpl &bull;</Link> Distributed by <Link to={"/"} className="font-bold">ThemeWagon</Link>
                    </div>
                </div>

                <div className="flex items-center space-x-5">
                    {termItems.map((item) => {
                        return (
                            <a key={item.id} href={item.path} className="text-xs font-finlandica text-neutral-500 capitalize dark:text-neutral-300">{item.item}</a>
                        )
                    })}
                </div>
            </section>
        </footer>
    )

})

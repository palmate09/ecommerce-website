import { SearchResult } from "@/data/SearchResult";
import { cn } from "@/utils/cn";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react"


interface exportType {
    className?: string
}

export function Test ({className}: exportType) {

    const [isOpen, setIsOpen] = useState(false); 
    const inputRef = useRef<HTMLInputElement>(null); 

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if((e.metaKey || e.ctrlKey) && (e.key === "k")) {
                e.preventDefault(); 
                setIsOpen(true); 
            }

            if(e.key === "Escape") {
                setIsOpen(false);
            }
        }; 

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, []); 

    useEffect(() => {
        if(isOpen) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 50);
        }
    },[isOpen])

    // if(!isOpen) return null

    return (
        <section className={cn("flex flex-col items-center pt-10 justify-start gap-5 h-screen w-full ", className)}>

            <button
                onClick={() => setIsOpen(true)}
                className="bg-neutral-200 px-3 py-1 rounded-full text-neutral-900 capitalize font-medium font-finlandica text-sm"
            >
                click Me
            </button>

            {isOpen && 
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm transition-opacity duration-1000"
                    />
                    
                    <div className="relative shadow-md bg-neutral-50/90 rounded-xl  flex flex-col overflow-hidden transform transition-all w-full max-w-2xl mx-auto h-200 ">

                        <div className="flex w-full py-5 px-2 items-center border-b border-neutral-400/40">
                            <IconSearch stroke={2} size={25} className="mx-2 text-neutral-600" />
                            
                            <input ref={inputRef} type="text" className="outline-none pl-2 bg-transparent w-full text-xl font-finlandica leading-none" placeholder="Search pages, products, cart items..."/>
                            
                            <kbd className="ring-2 ring-neutral-400 bg-blue-100/40 px-2 py-2.5 text-center rounded-sm mx-4 text-sm flex leading-2 text-nuetral-500 font-finlandica font-semibold text-neutral-600">ESC</kbd> 
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            {SearchResult.map((item) => {

                                return (
                                    <div key={item.id} className="flex flex-col py-5 px-2">
                                        <h1 className="font-finlandica font-bold text-neutral-600 tracking-widest uppercase">{item.label}</h1>

                                        <div className="flex flex-col gap-5 px-5 mt-5">
                                            {item.sectionSearchResult.map((item) => {

                                                const Icon = item.Icon
                                                const Image = item.Img

                                                return (
                                                    <button className="flex gap-5 items-center">
                                                        {Icon && (
                                                            <Icon className="bg-blue-200/20 p-3 rounded-xl text-neutral-500 border border-neutral-200" size={52} />
                                                        )}
                                                        {Image && (
                                                            <img
                                                                src={Image.src}
                                                                alt={Image.alt}
                                                                className="bg-blue-200/20 p-3 rounded-xl text-neutral-500 border border-neutral-200 object-cover"
                                                                style={{ width: 52, height: 52 }}
                                                            />
                                                        )}
                                                        <h2 className="flex items-center text-xl font-finlandica font-medium capitalize">{item.page}</h2>
                                                    </button>
                                                )

                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>


                    </div>

                </div>
            }


        </section>
    )
}
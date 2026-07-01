import { cn } from "@/utils/cn"
import { useEffect, useRef, useState, type HTMLAttributes } from "react"
import { Input } from "./ui";
import ProductCard1 from "./ProductCard1";

interface PracticeProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function Practice({ className, ...props }: PracticeProps) {

    const [isFocused, setisFocused] = useState(false); 
    const inputRef = useRef<HTMLInputElement>(null); 
    const refInput = useRef<HTMLInputElement>(null); 

    const keyDownHandler = (e: KeyboardEvent) => {
        if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            console.log("You just pressed Control and K!")
            e.preventDefault(); 

            if(!inputRef.current) return; 

            if(isFocused){
                inputRef.current?.blur()
            }else {
                inputRef.current?.focus();
            }
        }
    };
    
    useEffect(() => {
        // auto focus by clicking on ctrl + K 
        window.addEventListener("keydown", keyDownHandler); 

        return () => window.removeEventListener("keydown", keyDownHandler);
    }, [isFocused])



    const [Focused , setFocused] = useState(false); 

    const keyDownHandler1 = (e: KeyboardEvent) => {
        if(e.altKey && e.key.toLowerCase() === "k"){
            e.preventDefault(); 
            
            if(Focused) {
                refInput.current?.blur(); 
            }else {
                refInput.current?.focus(); 
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler1); 

        return () => window.removeEventListener("keydown", keyDownHandler1)
    })


    return (
        <div className={cn("flex flex-col h-screen items-center", className)} {...props}>
            hello!

            <Input className="max-w-xl mt-10" ref={inputRef} onFocus={() => setisFocused(true)} onBlur={() => setisFocused(false)}>

            </Input>

            <ProductCard1 />

            <input type="text" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}  className="border mt-10 max-w-xl w-full outline-none rounded-full border-neutral-300 focus:ring-1 focus:ring-neutral-900 pl-10 font-bold text-lg" ref={refInput}/>
        </div>
    );
}
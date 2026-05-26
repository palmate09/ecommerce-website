import { Footer, Navbar } from "@/layouts";
import { cn } from "@/utils/cn";
import { IconSend2 } from "@tabler/icons-react";
import { contacts, forms, services, faqs, buttons } from "@/data/contactData";

interface exportType {
    className?: string
}

export function ContactPage ({className}: exportType) {
    return (
        <section className={cn("min-h-screen w-full bg-neutral-50 dark:bg-neutral-900 flex flex-col", className)}>
            <Navbar className="dark:shadow-2xs"/>

            <section className="flex-1">
                <div className="bg-linear-to-br from-primary/5 to-slate-50/5 md:py-30 py-20">
                    <div className="flex flex-col space-y-5 w-full items-center justify-center max-w-4xl mx-auto px-4">
                        <p className="text-sm py-1 px-4 bg-amber-500 rounded-full font-finlandica font-bold shadow-md hover:bg-amber-500/80 transition-colors duration-300">
                            Get in Touch
                        </p>

                        <div className="text-center space-y-6">
                            <h1 className="text-3xl md:text-7xl px-15 font-bold tracking-wide md:tracking-normal text-neutral-900 font-finlandica dark:text-white">We'd love to <span className="text-amber-500 ml-3">hear from you</span></h1>
                            <p className="font-finlandica text-[16px] md:text-[22px] text-neutral-500 md:text-center">Have a question, suggestion, or just want to say hello? We're here to help and would love to hear from you.</p>
                        </div>
                    </div>
                </div>

                <div className="my-20 md:my-30 max-w-361 mx-auto flex gap-10 mb-16 md:mb-60 flex-col md:flex-row px-4 md:px-0">
                    <div className="flex-2 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow dark:shadow-2xl dark:shadow-black/30 p-5 h-fit">
                        <h1 className="text-2xl font-bold font-finlandica text-neutral-900 dark:text-white">Send us a message</h1>

                        <p className="my-2 text-[16px] font-finlandica text-neutral-500 dark:text-neutral-300">Fill out the form below and we'll get back to you as soon as possible.</p>

                        <form className="mt-8 flex flex-col gap-2">
                            {/* Use forms array to dynamically render fields */}
                            <div className="flex gap-4 w-full flex-col md:flex-row">
                                {forms.slice(0, 2).map((field) => (
                                    <div key={field.id} className="flex-1 flex flex-col">
                                        <label className="text-sm font-finlandica text-neutral-900 mb-1 font-semibold dark:text-white">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.label.toLowerCase().includes("email") ? "email" : "text"}
                                            placeholder={field.placeholder}
                                            className="border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 dark:ring-neutral-600 dark:shadow-neutral-50 shadow font-finlandica font-medium dark:text-white"
                                        />
                                    </div>
                                ))}
                            </div>
                            {forms.slice(2).map((field, idx) => (
                                <div
                                    key={idx}
                                    className={`w-full flex flex-col space-y-1 mt-4`}
                                >
                                    <label className="text-[13px] font-finlandica text-neutral-900 mb-1 font-semibold dark:text-white">
                                        {field.label}
                                    </label>
                                    {field.label.toLowerCase().includes("message") ? (
                                        <div className="relative w-full">
                                            <textarea
                                                className="border border-neutral-200 dark:border-neutral-700 rounded-xl shadow px-3 py-2 text-sm font-medium font-finlandica h-28 w-full focus:outline-none focus:ring-1 focus:ring-amber-500 dark:ring-neutral-600 dark:shadow-neutral-50 resize-none dark:text-white"
                                                style={{ minHeight: "7rem", maxHeight: "7rem" }}
                                                placeholder={field.placeholder}
                                            />
                                        </div>
                                  
                                  
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder={field.placeholder}
                                            className="border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-2 text-sm font-medium font-finlandica shadow focus:outline-none focus:ring-1 focus:ring-amber-500 dark:ring-neutral-600 dark:shadow-neutral-50 dark:text-white"
                                        />
                                    )}
                                </div>
                            ))}
                        </form>
                
                        <button className="mt-5 rounded-2xl px-5 py-2 bg-amber-500 text-neutral-900 text-[12px] gap-2 flex items-center justify-center font-semibold font-finlandica capitalize dark:text-white cursor-pointer">
                            <IconSend2 size={18} className="-rotate-40 pl-1" />
                            send Message
                        </button>
                    </div>
                    <div className="flex-1">
                        <div className=" border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow p-5 flex flex-col h-fit ">
                            <h1 className="text-2xl font-semibold font-finlandica dark:text-white">Contact Information</h1>
                            <div className="mt-7 px-2">
                                {contacts.map((item) => {

                                    const Icon = item.Icon

                                    return (
                                        <div className="flex flex-col items-start mb-6 dark:text-white">
                                            <div className="flex gap-4 px-2">
                                                <Icon className="w-9 h-9 p-2 bg-amber-500/10 rounded-full text-amber-500"/>
                                                <div className="flex flex-col">
                                                    <h1 className="font-semibold font-finlandica text-[17px] mb-1.5">{item.label}</h1>
                                                    <p className="text-sm font-finlandica text-neutral-500 dark:text-neutral-400">{item.item1}</p>
                                                    <p className="text-sm font-finlandica text-neutral-500 dark:text-neutral-400">{item.item2}</p>
                                                    <p className="text-sm font-finlandica text-neutral-500 dark:text-neutral-400">{item.details}</p>
                                                </div>  
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="mt-10 border rounded-2xl border-neutral-200 dark:border-neutral-700 shadow-md h-fit px-5 py-6">
                            <h1 className="text-xl font-semibold font-finlandica dark:text-white">Why Contact Us?</h1>
                            <div className="h-full mt-5">
                                {services.map((item) => {
                                    const Icon = item.Icon; 

                                    return (
                                        <div key={item.id} className="flex flex-col mt-4 gap-4 w-full px-2">
                                            <div className="flex gap-4">
                                                <Icon className="w-5 h-5 mt-1 text-amber-800" />
                                                <div className="flex flex-col gap-0.5 items-start">
                                                    <h1 className="text-sm font-finlandica font-bold text-neutral-900 dark:text-white">{item.label}</h1>
                                                    <p className="text-xs font-finlandica font-semibold text-neutral-500 dark:text-neutral-400">{item.details}</p>
                                                </div>
                                            </div>
                                            {item.id !== 3 && <hr className="text-neutral-300 dark:text-neutral-700"/>}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-30 md:-mt-10 my-20 md:my-60 text-center max-w-4xl mx-auto">
                    <div className="w-full flex justify-center items-center leading-none">
                        <h1 className="flex items-center mt-5 px-2.5 py-0.5 rounded-full text-xs bg-neutral-100/20 text-neutral-900 font-finlandica font-semibold border border-neutral-200 dark:border-neutral-700 dark:text-white">
                            FAQ
                        </h1>
                    </div>

                    <div className="mt-5 space-y-5 text-center px-2 md:px-0">
                        <h1 className="text-3xl font-bold font-finlandica text-neutral-900 dark:text-white leading-none">Frequently Asked Questions</h1>
                        <p className="font-sm font-semibold font-finlandica text-neutral-500/80 leading-none dark:text-neutral-400">Find quick answers to common questions about our products and services.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 px-3">
                        {faqs.map((item) => {
                            return (
                                <div key={item.id} className="flex flex-col items-start space-y-3 p-5 text-start border border-neutral-200 dark:border-neutral-700 shadow-md/10 rounded-2xl">
                                    <h1 className="text-[15px] font-bold font-finlandica text-neutral-900 dark:text-white">{item.question}</h1>
                                    <p className="text-[13px] font-medium font-finlandica text-neutral-500 dark:text-neutral-400">{item.answer}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="px-3 md:px-0">
                    <div className="w-full py-12 max-w-361 mx-auto border text-center border-orange-200 dark:border-neutral-700 my-20 space-y-4 rounded-3xl bg-linear-to-br from-orange-50/70 via-white to-amber-50/30 dark:from-neutral-800/30 dark:via-neutral-900 dark:to-neutral-950 shadow-md dark:shadow-2xl dark:shadow-black/30">
                        <h1 className="text-neutral-900 font-finlandica text-3xl font-bold px-20 dark:text-white">Still have questions?</h1>
                        <p className="text-[16px] text-neutral-500 font-finlandica px-20 dark:text-neutral-200">Can't find what you're looking for? Our customer support team is here to help.</p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10 items-center">
                            {buttons.map((item) => {
                                const Icon = item.Icon; 
                                return (
                                <div key={item.id} className={cn("flex items-center justify-center shadow md:px-6 py-2 rounded-full", item.id === 1 ? "bg-amber-500 px-20": "bg-white dark:bg-neutral-800 dark:ring-neutral-700 ring-1 ring-neutral-200 px-22" )}>
                                    <button  className={cn("w-full flex items-center gap-3 font-finlandica font-semibold text-sm capitalize dark:text-white")}>
                                        <Icon className={cn("w-4 h-4 text-neutral-900 dark:text-white")} />
                                        {item.text}
                                    </button>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <hr className="text-neutral-200 dark:text-neutral-700"/>
            <Footer/> 
        </section>
    )
}
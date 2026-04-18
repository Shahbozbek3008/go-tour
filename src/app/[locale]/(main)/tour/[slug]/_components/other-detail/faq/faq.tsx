"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { FAQ_DATA } from "./faq-data"

export const Faq = () => {
    const [openItems, setOpenItems] = useState<string[]>([])

    return (
        <section className="w-full my-15">
            <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">
                Good to know
            </h2>
            <div className="space-y-4">
                <Accordion
                    type="multiple"
                    value={openItems}
                    onValueChange={setOpenItems}
                    className="space-y-4"
                >
                    {FAQ_DATA.map((faq) => (
                        <AccordionItem
                            key={faq.id}
                            value={faq.id}
                            className="relative border border-border/60 last:border-b rounded-xl px-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] bg-card transition-shadow hover:shadow-[0_4px_14px_rgb(0,0,0,0.04)]"
                        >
                            <AccordionTrigger className="py-5 text-[15px] font-semibold text-foreground hover:no-underline [&>svg]:hidden">
                                <span className="flex-1 text-left">
                                    {faq.title}
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="pb-5">
                                {faq.content}
                            </AccordionContent>
                            <ChevronDownIcon
                                className="absolute right-5 top-5 text-muted-foreground pointer-events-none size-[18px] shrink-0 translate-y-[3px] transition-transform duration-200 data-[state=open]:rotate-180"
                                data-state={
                                    openItems.includes(faq.id) ? "open" : (
                                        "closed"
                                    )
                                }
                            />
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

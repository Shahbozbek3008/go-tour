"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { useTourGoodToKnowQuery } from "../../../_hooks"
import { GTKItem } from "../../../_types"

export const Faq = () => {
    const { gtk, isLoading } = useTourGoodToKnowQuery()
    const [openItems, setOpenItems] = useState<string[]>([])

    if (isLoading || !gtk || gtk.length === 0) return null

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
                    {(gtk as GTKItem[])?.map((item) => {
                        const id = item?.id?.toString()
                        const title = item?.titleUz
                        const content = item?.descriptionUz

                        return (
                            <AccordionItem
                                key={id}
                                value={id}
                                className="relative border border-border/60 last:border-b rounded-xl px-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] bg-card transition-shadow hover:shadow-[0_4px_14px_rgb(0,0,0,0.04)]"
                            >
                                <AccordionTrigger className="py-5 text-[15px] font-semibold text-foreground hover:no-underline [&>svg]:hidden">
                                    <span className="flex-1 text-left">
                                        {title}
                                    </span>
                                </AccordionTrigger>

                                <AccordionContent className="pb-5 text-[14px] leading-relaxed text-muted-foreground whitespace-pre-line">
                                    {content}
                                </AccordionContent>
                                <ChevronDownIcon
                                    className="absolute right-5 top-5 text-muted-foreground pointer-events-none size-[18px] shrink-0 translate-y-[3px] transition-transform duration-200 data-[state=open]:rotate-180"
                                    data-state={
                                        openItems.includes(id) ? "open" : (
                                            "closed"
                                        )
                                    }
                                />
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </div>
        </section>
    )
}

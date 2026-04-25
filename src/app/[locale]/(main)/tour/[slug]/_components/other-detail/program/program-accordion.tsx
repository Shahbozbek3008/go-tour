"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDownIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { TourDay } from "../../../_types"
import { DayDescription } from "./day-description"
import { DayImageGrid } from "./day-image-grid"
import { useLanguage } from "@/hooks/use-language"

interface ProgramAccordionProps {
    days: TourDay[]
    openItems: string[]
    setOpenItems: Dispatch<SetStateAction<string[]>>
}

export function ProgramAccordion({
    days,
    openItems,
    setOpenItems,
}: ProgramAccordionProps) {
    const { isRussian } = useLanguage()

    return (
        <div className="space-y-4">
            <Accordion
                type="multiple"
                value={openItems}
                onValueChange={setOpenItems}
                className="space-y-4"
            >
                {days.map((day) => {
                    const id = day.id.toString()
                    const title = isRussian ? day.titleRu : day.titleUz
                    const description = isRussian ? day.descriptionRu : day.descriptionUz
                    const dayLabel = isRussian ? `День ${day.dayNumber}` : `${day.dayNumber}-kun`

                    return (
                        <AccordionItem
                            key={id}
                            value={id}
                            className="relative border border-border/60 last:border-b rounded-xl px-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] bg-card transition-shadow hover:shadow-[0_4px_14px_rgb(0,0,0,0.04)]"
                        >
                            <AccordionTrigger className="py-5 text-[15px] font-semibold text-foreground hover:no-underline [&>svg]:hidden">
                                <span className="flex-1 text-left">
                                    {title || `${dayLabel}`}
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="pb-5">
                                <DayImageGrid images={day.imageUrls} />
                                <DayDescription text={description} />
                            </AccordionContent>
                            <ChevronDownIcon
                                className="absolute right-5 top-5 text-muted-foreground pointer-events-none size-[18px] shrink-0 translate-y-[3px] transition-transform duration-200 data-[state=open]:rotate-180"
                                data-state={
                                    openItems.includes(id) ? "open" : "closed"
                                }
                            />
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )
}

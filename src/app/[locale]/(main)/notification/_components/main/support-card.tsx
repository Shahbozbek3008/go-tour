"use client"

import { IconSettings } from "@/assets/icons/settings"
import { IconVerifiedGradient } from "@/assets/icons/verified-gradient"
import ClientTranslate from "@/components/common/translation/client-translate"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { formatDistance } from "@/lib/utils/format-date"
import { cn } from "@/lib/utils/shadcn"
import parse from "html-react-parser"
import { useState } from "react"
import { Notification } from "../../_types/notification"

interface SupportCardProps {
    support: Notification
}

export default function SupportCard({ support }: SupportCardProps) {
    const [val, setVal] = useState("")

    return (
        <Accordion
            type="single"
            collapsible
            onValueChange={(val) => {
                setVal(val)
            }}
        >
            <BackgroundGradient
                animate
                className="rounded-lg bg-background px-3 py-4"
                containerClassName="p-0.5 rounded-lg"
                motion1ClassName="blur rounded-lg"
                motion2ClassName="rounded-lg"
            >
                <AccordionItem value="1">
                    <AccordionTrigger className="cursor-pointer text-primary font-semibold absolute right-3 bottom-4 z-10 [&_svg]:hidden md:text-sm text-xs">
                        {val === "1" ? "Close as read" : "View changes"}
                    </AccordionTrigger>
                    <div className="flex justify-between clamp-[gap,2,4] relative transition-all">
                        <hgroup className="flex md:items-center clamp-[gap,3,8]">
                            <div className="flex sm:items-center gap-3">
                                {!support.is_read && (
                                    <span className="w-2 h-2 md:block hidden rounded-full gradient-2" />
                                )}
                                <span className="w-14 h-14 rounded-full gradient-2 grid place-items-center">
                                    <IconSettings />
                                </span>
                            </div>
                            <div>
                                <h4 className="clamp-[text,base,lg] font-semibold mb-0.5">
                                    {support?.title}
                                </h4>

                                <div className="clamp-[text,xs,sm] text-text-400 sm:mb-3.5 mb-6">
                                    {parse(support.body)}
                                </div>
                                <hgroup className="hidden sm:flex items-center gap-2">
                                    <IconVerifiedGradient />
                                    <span className="text-gradient text-xs font-bold">
                                        <ClientTranslate translationKey="inexLynkSupport" />
                                    </span>
                                </hgroup>
                            </div>
                        </hgroup>

                        <hgroup className="flex md:items-end items-center flex-col md:justify-between gap-4">
                            <p className="text-text-300 text-sm font-medium whitespace-nowrap">
                                {formatDistance(support?.created_at)}
                            </p>
                            {!support?.is_read && (
                                <span className="w-2 h-2 md:hidden rounded-full gradient-2" />
                            )}
                        </hgroup>
                    </div>

                    <AccordionContent>
                        <article
                            className={cn(
                                "prose-sm border-t border-stroke-gray mt-4 pt-4 lg:ml-[6.75rem] px-10 pb-8 overflow-hidden transition-all duration-300 ease-in-out",
                            )}
                        >
                            {parse(support?.body)}
                        </article>
                    </AccordionContent>
                </AccordionItem>
            </BackgroundGradient>
        </Accordion>
    )
}

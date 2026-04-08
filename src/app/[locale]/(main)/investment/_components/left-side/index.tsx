"use client"

import { IconArrowUpRight } from "@/assets/icons/arrow-up-right"
import IconFilter2 from "@/assets/icons/filter2"
import whiteLogo from "@/assets/images/white-logo-without-text.png"
import { useAi } from "@/components/common/ai-chat/_hooks/use-ai"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useLanguage } from "@/hooks/use-language"
import useSearch from "@/hooks/use-search"
import { getArray } from "@/lib/utils/get-array"
import { cn } from "@/lib/utils/shadcn"
import Image from "next/image"
import { useMemo } from "react"
import Filter from "./filter"

export default function LeftSide() {
    const { isArabic } = useLanguage()
    const params = useSearch()

    const { totalSelected } = useMemo(() => {
        const categoryCount = getArray(params.category).length
        const countryCount = getArray(params.countries).length
        const requestCount = getArray(params.request_type).length
        return {
            categoryCount,
            countryCount,
            totalSelected: categoryCount + countryCount + requestCount,
        }
    }, [params.category, params.countries, params.request_type])

    const { openAiModal } = useAi()

    function handleAiClick() {
        openAiModal("investment_filter")
    }

    return (
        <aside className="block flex-none w-full md:w-[15.625rem] md:min-w-[15.625rem] md:max-w-[15.625rem] lg:w-[17.5rem]  lg:min-w-[17.5rem]  lg:max-w-[17.5rem]">
            <div className="flex items-center py-0 justify-between md:sticky md:top-24">
                <hgroup className="flex flex-col gap-4 w-full">
                    <main
                        onClick={handleAiClick}
                        className="cursor-pointer border-gradient w-fit self-start md:w-full md:self-stretch"
                    >
                        <div className="flex items-center justify-between border-gradient-inner p-2">
                            <hgroup className="flex items-center gap-2.5">
                                <div className="gradient-1 relative clamp-[w,8,11] clamp-[h,8,11] clamp-[rounded,0.5rem,0.75rem] grid place-items-center">
                                    <Image
                                        src={whiteLogo}
                                        alt="iNex AI logo"
                                        width={24}
                                        height={24}
                                        className="clamp-[w,6,8] clamp-[h,6,8] object-contain"
                                        priority
                                    />
                                </div>

                                <h5>iNex AI</h5>
                            </hgroup>
                            <Button
                                className="hidden md:flex w-6 h-6"
                                icon={
                                    <IconArrowUpRight
                                        className={cn(isArabic && "rotate-270")}
                                    />
                                }
                            />
                        </div>
                    </main>

                    <Filter className="hidden md:flex" />
                </hgroup>

                <Drawer direction="bottom" dismissible>
                    <DrawerTrigger asChild>
                        <Button
                            variant="ghost"
                            className="md:hidden relative inline-flex h-10 w-10 items-center justify-center"
                            icon={<IconFilter2 />}
                        >
                            {totalSelected > 0 && (
                                <Badge
                                    className="absolute top-0 left-3 ml-2 !p-0 h-5.5 min-w-5.5 inline-flex items-center justify-center text-xs font-semibold bg-primary leading-none text-white rounded-full"
                                    aria-label={`${totalSelected} selected`}
                                >
                                    {totalSelected}
                                </Badge>
                            )}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <Filter className="md:hidden" />
                    </DrawerContent>
                </Drawer>
            </div>
        </aside>
    )
}

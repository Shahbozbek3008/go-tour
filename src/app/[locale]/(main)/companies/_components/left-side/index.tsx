"use client"

import { IconArrowUpRight } from "@/assets/icons/arrow-up-right"
import IconFilter2 from "@/assets/icons/filter2"
import whiteLogo from "@/assets/images/white-logo-without-text.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import useSearch from "@/hooks/use-search"
import { getArray } from "@/lib/utils/get-array"
import Image from "next/image"
import { useMemo } from "react"
import Filter from "./filter"

export default function LeftSide() {
    const params = useSearch()

    const { totalSelected } = useMemo(() => {
        const countryCount = getArray(params.country).length
        const businessTypeCount = getArray(params.business_type).length
        return {
            countryCount,
            businessTypeCount,
            totalSelected: countryCount + businessTypeCount,
        }
    }, [params.country, params.business_type])

    return (
        <aside className="block flex-none w-full md:w-[15.625rem] md:min-w-[15.625rem] md:max-w-[15.625rem] lg:w-[17.5rem]  lg:min-w-[17.5rem]  lg:max-w-[17.5rem]">
            <div className="flex items-center py-0 justify-between md:sticky md:top-6">
                <hgroup className="flex flex-col gap-4 w-full">
                    <main className="border-gradient w-fit self-start md:w-full md:self-stretch p-2.5">
                        <div className="flex items-center justify-between border-gradient-inner">
                            <hgroup className="flex items-center gap-2.5">
                                <div className="gradient-1 relative clamp-[w,8,11] clamp-[h,8,11] clamp-[rounded,0.5rem,0.75rem] grid place-items-center">
                                    <Image
                                        src={whiteLogo}
                                        alt="iNex AI Logo"
                                        width={24}
                                        height={24}
                                        className="clamp-[w,6,8] clamp-[h,6,8] object-contain"
                                        priority
                                    />
                                </div>
                                <h5>INex AI</h5>
                            </hgroup>
                            <Button
                                className="hidden md:flex w-6 h-6"
                                icon={<IconArrowUpRight />}
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

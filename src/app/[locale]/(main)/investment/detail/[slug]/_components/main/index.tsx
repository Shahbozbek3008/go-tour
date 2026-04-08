"use client"

import { useInvestmentItemQuery } from "../../_hooks/use-investment-item-query"
import Description from "./description"
import ImageGallery from "./gallery"
import Header from "./header"

export default function Main() {
    const { data } = useInvestmentItemQuery()

    return (
        <>
            <Header className="hidden md:flex" />
            <ImageGallery />
            <div className="flex flex-col">
                <h2 className="md:hidden font-semibold text-2xl">
                    {data?.name}
                </h2>
            </div>
            <Description />
        </>
    )
}

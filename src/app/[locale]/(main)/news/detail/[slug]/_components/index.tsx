"use client"

import { formatRelativeDate } from "@/lib/utils/format-relative-date"
import { useNewDetailQuery } from "../_hooks/use-new-detail-query"
import LatestNews from "./latest-news"
import Main from "./main"
import MoreNews from "./more-news"
import Navigation from "./navigation"

export default function Index() {
    const { data } = useNewDetailQuery()
    return (
        <>
            <Navigation />
            {/* <Categories /> */}
            <div className="clamp-[mt,3,6] flex flex-col lg:flex-row items-stretch gap-6 mb-12">
                <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl font-medium mb-1.5">
                        {data?.name}
                    </h3>
                    <p className="text-text700 mb-8">
                        {formatRelativeDate(data?.created_at || "")}
                    </p>
                    <Main className="flex-1" />
                </div>

                <div className="w-full md:w-[30%] flex flex-col mt-[2.3rem]">
                    <MoreNews id={data?.slug} className="flex-1" />
                </div>
            </div>

            <LatestNews />
        </>
    )
}

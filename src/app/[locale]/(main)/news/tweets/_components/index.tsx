"use client"

import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useEffect, useState } from "react"
import CategoriesComponent from "../../_components/categories"
import NewsCard from "../../_components/news-card"
import TweetCard from "../../_components/tweets-section/tweet-card"
import { useBlogListQuery } from "../../_hooks/use-blog-list-query"
import { useNewsGlobalQuery } from "../../_hooks/use-news-global-query"
import Navigation from "./navigation"

function useResponsivePageSize() {
    const [pageSize, setPageSize] = useState(12)

    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth < 768) {
                setPageSize(3)
            } else {
                setPageSize(12)
            }
        }

        updateSize()
        window.addEventListener("resize", updateSize)

        return () => window.removeEventListener("resize", updateSize)
    }, [])

    return pageSize
}

export default function Index() {
    const search = useSearch()
    const pageSize = useResponsivePageSize()
    const { data, newsList } = useBlogListQuery({
        params: {
            page_size: pageSize,
            page: search.page,
        },
        options: {
            enabled: !search.category,
        },
    })

    const { data: newsGlobalData, newsGlobal } = useNewsGlobalQuery({
        params: {
            page: search.page,
            page_size: pageSize,
            category: search.category,
        },
        options: {
            enabled: !!search.category,
        },
    })

    return (
        <>
            <Navigation />
            <CategoriesComponent />
            <div className="clamp-[mt,4,10] grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-3">
                {!search.category &&
                    newsList?.map((t, i) => {
                        return <TweetCard key={i} item={t} />
                    })}

                {search.category &&
                    newsGlobal?.map((t, i) => {
                        return <NewsCard key={i} item={t} />
                    })}
            </div>

            {search.category ?
                <ParamPagination
                    pageSize={pageSize}
                    count={newsGlobalData?.count}
                    className="mt-20"
                />
            :   <ParamPagination
                    pageSize={pageSize}
                    count={data?.count}
                    className="mt-20"
                />
            }
        </>
    )
}

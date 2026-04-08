"use client"

import { IconBookmarkEmpty } from "@/assets/icons/bookmark-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../../_components/empty"
import { BlogsCard } from "../../../blogs/_components/blogs-card"
import { useProfileBookmarkBlogQuery } from "../../_hooks/use-profile-bookmark-blog-query"

export default function BookmarkNews() {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, bookmarkBlog } = useProfileBookmarkBlogQuery({
        params: { ...params, page_size: pageSize },
    })
    return (
        <>
            {bookmarkBlog.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {bookmarkBlog.map((item) => (
                        <BlogsCard item={item} key={item.slug} />
                    ))}
                </div>
            :   <Empty
                    emptyIcon={<IconBookmarkEmpty />}
                    title={t("youHaveNotBookmarked")}
                    description={t("youHaveNotBookmarkedDesc")}
                />
            }

            <ParamPagination
                count={data?.count}
                pageSize={pageSize}
                className="mt-12 justify-end"
            />
        </>
    )
}

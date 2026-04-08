"use client"

import { IconBlogEmpty } from "@/assets/icons/blog-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../../_components/empty"
import { BlogsCard } from "../../_components/blogs-card"
import { useProfileBlogPostsQuery } from "../../_hooks/use-profile-blog-posts-query"

export const BlogActive = () => {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, blogPosts } = useProfileBlogPostsQuery({
        params: {
            ...params,
            page_size: pageSize,
        },
    })

    return (
        <>
            {blogPosts.length > 0 ?
                <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {blogPosts.map((item) => (
                        <BlogsCard key={item.slug} fromActive item={item} />
                    ))}
                </div>
            :   <Empty
                    emptyIcon={<IconBlogEmpty />}
                    title={t("noActiveBlogs")}
                    description={t("noActiveListingsDesc")}
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

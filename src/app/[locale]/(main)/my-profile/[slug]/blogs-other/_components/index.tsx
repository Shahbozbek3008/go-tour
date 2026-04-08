"use client"
import { IconBlogEmpty } from "@/assets/icons/blog-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import Empty from "../../_components/empty"
import { BlogsCard } from "../../blogs/_components/blogs-card"
import { useOtherBlogPostsQuery } from "../_hooks/use-other-blog-posts-query"

export default function BlogsOtherPage() {
    const params = useSearch()
    const pageSize = 12
    const { data, otherBlogPosts } = useOtherBlogPostsQuery({
        params: { ...params, page_size: pageSize },
    })
    return (
        <>
            {otherBlogPosts.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {otherBlogPosts.map((item) => (
                        <BlogsCard item={item} key={item.slug} />
                    ))}
                </div>
            :   <Empty
                    emptyIcon={<IconBlogEmpty />}
                    title="No active listings in your Blogs"
                    description="Create a listing to find funding, deals, or strategic partners."
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

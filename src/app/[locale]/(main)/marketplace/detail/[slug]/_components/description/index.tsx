"use client"

import { Badge } from "@/components/ui/badge"
import { getArray } from "@/lib/utils/get-array"
import parse from "html-react-parser"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"

const Description = () => {
    const { data } = useMarketplaceProductQuery()
    const tags = getArray(data?.tags)

    return (
        <div>
            <article className="lg:prose">
                {parse(data?.description || "")}
            </article>
            <div className="flex flex-col gap-5 mt-7">
                <h3 className="text-lg font-medium">Tags:</h3>
                <div className="flex flex-wrap items-center gap-2 w-full">
                    {tags.map((tag) => {
                        return (
                            <Badge
                                key={tag.id}
                                className="rounded-[30px] px-4 text-base"
                                variant="gray"
                            >
                                #{tag.name}
                            </Badge>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Description

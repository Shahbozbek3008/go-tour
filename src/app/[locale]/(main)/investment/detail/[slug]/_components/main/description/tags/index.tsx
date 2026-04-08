"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { Badge } from "@/components/ui/badge"
import { useInvestmentItemQuery } from "../../../../_hooks/use-investment-item-query"

const Tags = () => {
    const { tags } = useInvestmentItemQuery()

    return (
        <div className="mt-4 md:mt-0 flex flex-col gap-5">
            <h3 className="text-lg font-medium">
                <ClientTranslate translationKey="tags" />:
            </h3>
            <div
                className="flex items-center gap-2  w-full"
                style={{ flexWrap: "wrap" }}
            >
                {tags.map((tag) => {
                    return (
                        <Badge
                            key={tag.id}
                            className="rounded-[1.875rem] px-4 text-base"
                            variant="gray"
                        >
                            # {tag.tag}
                        </Badge>
                    )
                })}
            </div>
        </div>
    )
}

export default Tags

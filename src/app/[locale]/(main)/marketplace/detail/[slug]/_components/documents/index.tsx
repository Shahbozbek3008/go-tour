"use client"

import IconFileDigit from "@/assets/icons/file-digit"
import { IconScreenShare } from "@/assets/icons/screen-share"
import { Button } from "@/components/ui/button"
import { getArray } from "@/lib/utils/get-array"
import { getFileSizeUnit } from "@/lib/utils/get-file-size-unit"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"

const Documents = () => {
    const { data, isPreview } = useMarketplaceProductQuery()
    const documents = getArray(data?.documents)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 clamp-[gap,2.5,4]">
            {documents.map((d, idx: number) => (
                <a
                    href={d.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="border rounded-xl p-5"
                    key={idx}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <span className="border w-14 h-14 bg-gray-100 flex items-center justify-center rounded-lg">
                                <IconFileDigit />
                            </span>
                            <div className="flex flex-col gap-[2px]">
                                <h4 className="font-semibold text-lg truncate max-w-48">
                                    {d.name}
                                    {d.extension}
                                </h4>
                                <p className="text-sm typography">
                                    {getFileSizeUnit(d.size)}
                                </p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            icon={<IconScreenShare />}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (!isPreview) {
                                    navigator.share({
                                        title: `${d.name}${d.size}`,
                                        url: d.url,
                                    })
                                }
                            }}
                        />
                    </div>
                </a>
            ))}
        </div>
    )
}

export default Documents

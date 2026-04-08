"use client"

import IconFileDigit from "@/assets/icons/file-digit"
import { IconScreenShare } from "@/assets/icons/screen-share"
import { Button } from "@/components/ui/button"
import { getFileSizeUnit } from "@/lib/utils/get-file-size-unit"
import { useInvestmentItemQuery } from "../../../../_hooks/use-investment-item-query"

const Documents = () => {
    const { docs, isPreview } = useInvestmentItemQuery()

    return (
        <div className="mt-4 md:mt-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {docs.map((item, i) => (
                <a
                    href={item.document_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="border rounded-xl p-5"
                    key={item.id || i}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <span className="border w-14 h-14 bg-gray-100 flex items-center justify-center rounded-lg">
                                <IconFileDigit />
                            </span>
                            <div className="flex flex-col gap-[2px]">
                                <h4 className="font-semibold text-lg">
                                    {item.name}
                                </h4>
                                <p className="text-sm typography">
                                    {getFileSizeUnit(item.size)}
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
                                        title: `${item.name}${item.size}`,
                                        url: item.document_url,
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
